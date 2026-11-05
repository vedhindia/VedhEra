"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Loader2 } from "lucide-react";
import useHydratedReducedMotion from "@/components/animations/useHydratedReducedMotion";
import {
  STALL_SEQUENCE_FRAME_COUNT,
  stallFrameSrc,
  stallSequenceConfig as CFG,
  stallSequenceUi,
} from "@/data/stallGallery";

const EASE = [0.22, 1, 0.36, 1];

/**
 * `cover` trims the edges to fill the frame. It is only allowed to trim when
 * the viewport is reasonably close to the 16:9 source; below this ratio of
 * viewport aspect to source aspect the frame is letterboxed instead, so the
 * stalls stay inside the view on a phone held upright.
 */
const LETTERBOX_BELOW = 0.75;

/** Phone-width viewports, matching the breakpoint the rest of the site uses. */
const COMPACT_MAX_WIDTH = 767;

/**
 * Decode one frame into an offscreen canvas, downscaled to `maxWidth`.
 *
 * Decoding to a canvas rather than keeping the `Image` alive keeps memory
 * proportional to the drawing surface instead of the (much larger) decoded
 * source, and it makes every later draw a cheap 1:1 blit. Resolves `null` when
 * the frame is missing or cannot be decoded, so the caller can carry on.
 */
function decodeFrame(url, maxWidth) {
  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";

    image.onload = () => {
      try {
        const width = Math.max(1, Math.min(maxWidth, image.naturalWidth));
        const height = Math.max(
          1,
          Math.round((width * image.naturalHeight) / image.naturalWidth)
        );

        const surface = document.createElement("canvas");
        surface.width = width;
        surface.height = height;

        const ctx = surface.getContext("2d");
        if (!ctx) {
          resolve(null);
          return;
        }

        ctx.drawImage(image, 0, 0, width, height);
        resolve(surface);
      } catch {
        resolve(null);
      }
    };

    image.onerror = () => resolve(null);
    image.src = url;
  });
}

/**
 * Constrained devices skip the high-resolution tier entirely. Both hints are
 * optional and non-standard in some browsers, so their absence is treated as
 * "capable" rather than "weak".
 */
function readDeviceLimits() {
  if (typeof navigator === "undefined") return { constrained: false };

  const memory =
    typeof navigator.deviceMemory === "number" ? navigator.deviceMemory : null;
  const cores =
    typeof navigator.hardwareConcurrency === "number"
      ? navigator.hardwareConcurrency
      : null;

  return {
    constrained: (memory !== null && memory <= 4) || (cores !== null && cores <= 4),
  };
}

/**
 * Scroll-controlled cinematic frame sequence.
 *
 * The 120 supplied frames are drawn into a single canvas and mapped 1:1 onto
 * scroll progress: frame 1 at the top of the track, frame 120 at the bottom.
 * The sequence never autoplays — it advances forward as the visitor scrolls
 * down and reverses as they scroll back, and stops dead on the exact frame the
 * moment scrolling stops.
 *
 * The track is tall and the stage inside it is `sticky`, so the sequence is
 * held in the viewport for its full length and then released naturally once
 * the final frame is reached. (A CSS sticky track is used instead of a GSAP
 * `pin`: this section renders inside `PageTransition`, whose transform creates
 * a containing block that makes `position: fixed` pinning jump. The lock,
 * hold, and release behaviour is identical.)
 *
 * The stage fills one viewport, edge to edge. Frames are always scaled by a
 * single uniform factor on both axes, so they are never stretched; how much of
 * the frame is shown depends on the viewport. `cover` is used where the
 * viewport is close to the 16:9 source, and a tall, narrow viewport is
 * letterboxed over the black stage instead so the stalls stay fully in view.
 *
 * @param {object} props
 * @param {number} [props.frameCount] Total frames. Defaults to the configured
 *   count in `src/data/stallGallery.js`.
 * @param {"cover"|"contain"} [props.fit] Preferred fit. `cover` still falls
 *   back to letterboxing on tall, narrow viewports; `contain` always shows the
 *   whole frame regardless of viewport shape.
 * @param {string} [props.className] Applied to the stage box.
 */
export default function StallScrollSequence({
  frameCount = STALL_SEQUENCE_FRAME_COUNT,
  fit = "cover",
  className = "",
  embedded = false,
  scrollTrackRef = null,
  trackHeightClass = "h-[300svh] sm:h-[360svh] lg:h-[420svh]",
  stageHeightClass = "h-[100svh]",
  stickyTopClass = "top-0",
}) {
  const reduceMotion = useHydratedReducedMotion();

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const progressRef = useRef(null);

  /* Frame caches, all held in refs so scrolling never touches React state. */
  const baseRef = useRef([]);
  const sharpRef = useRef(new Map());
  const sharpQueueRef = useRef([]);
  const sharpInFlightRef = useRef(new Set());
  const sharpBusyRef = useRef(0);
  const pumpRef = useRef(null);

  const ctxRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const frameRef = useRef(-1);
  const pendingRef = useRef(0);
  const rafRef = useRef(null);
  const disposedRef = useRef(false);
  const loadedRef = useRef(0);
  const skipSharpRef = useRef(false);

  const frameCountRef = useRef(frameCount);
  const fitRef = useRef(fit);

  const [inView, setInView] = useState(false);
  const [eagerReady, setEagerReady] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    frameCountRef.current = frameCount;
  }, [frameCount]);

  useEffect(() => {
    fitRef.current = fit;
  }, [fit]);

  /* ------------------------------------------------------------- drawing */

  /**
   * Best available source for a frame index:
   *   1. the sharp copy, if it has been decoded;
   *   2. the always-resident base copy;
   *   3. the nearest loaded base copy — so a fast scroll or a still-arriving
   *      frame shows a slightly-off stall rather than a blank canvas.
   *
   * Returning `null` means "nothing usable yet"; the caller then leaves the
   * current frame untouched instead of clearing the canvas.
   */
  const pickSource = useCallback((index) => {
    const sharp = sharpRef.current.get(index);
    if (sharp) return sharp;

    const base = baseRef.current;
    const exact = base[index];
    if (exact) return exact;

    for (let distance = 1; distance <= CFG.nearestSearchRadius; distance += 1) {
      const before = base[index - distance];
      if (before) return before;

      const after = base[index + distance];
      if (after) return after;
    }

    return null;
  }, []);

  /** Paint the given frame. Returns false when nothing could be drawn. */
  const draw = useCallback(
    (index) => {
      const canvas = canvasRef.current;
      if (!canvas) return false;

      const source = pickSource(index);
      if (!source) return false;

      const { w, h } = sizeRef.current;
      if (!w || !h) return false;

      if (!ctxRef.current) {
        ctxRef.current = canvas.getContext("2d", { alpha: false });
      }
      const ctx = ctxRef.current;
      if (!ctx) return false;

      const dpr = Math.min(window.devicePixelRatio || 1, CFG.maxDpr);
      const backingWidth = Math.round(w * dpr);
      const backingHeight = Math.round(h * dpr);

      // Resizing a canvas clears it, so it only happens when it truly changed.
      if (canvas.width !== backingWidth || canvas.height !== backingHeight) {
        canvas.width = backingWidth;
        canvas.height = backingHeight;
      }

      // Resizing resets the transform, so it is re-applied on every paint.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /*
       * `cover` fills the viewport but trims the edges, so it is only used
       * where the viewport is close enough to the 16:9 source for that trim to
       * be slight. A tall, narrow viewport letterboxes instead and shows the
       * whole frame. The stage beneath is black, so the bars read as part of
       * the composition rather than as a defect.
       */
      const sourceAspect = source.width / source.height;
      const contain =
        fitRef.current === "contain" || w / h < sourceAspect * LETTERBOX_BELOW;

      const scale = contain
        ? Math.min(w / source.width, h / source.height)
        : Math.max(w / source.width, h / source.height);
      const drawWidth = source.width * scale;
      const drawHeight = source.height * scale;

      // Only `contain` can leave an uncovered edge, so only it needs a fill.
      if (contain) {
        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, w, h);
      }

      // A single uniform scale on both axes: the artwork is never stretched.
      ctx.drawImage(
        source,
        (w - drawWidth) / 2,
        (h - drawHeight) / 2,
        drawWidth,
        drawHeight
      );

      frameRef.current = index;
      return true;
    },
    [pickSource]
  );

  /* Judgment is superseded at scroll time; requests are coalesced to one rAF. */
  const requestFrame = useCallback(
    (index) => {
      pendingRef.current = Math.max(0, Math.min(frameCountRef.current - 1, index));

      if (rafRef.current != null) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (disposedRef.current) return;
        if (pendingRef.current === frameRef.current) return;

        draw(pendingRef.current);
        pumpRef.current?.();
      });
    },
    [draw]
  );

  /* --------------------------------------------------- sharp frame window */

  /** Drop sharp copies that have drifted out of the window behind the playhead. */
  const evictSharp = useCallback((center) => {
    const span = CFG.sharpWindowRadius * 2;

    sharpRef.current.forEach((_, index) => {
      if (Math.abs(index - center) > span) sharpRef.current.delete(index);
    });
  }, []);

  /**
   * Decode sharp copies near the playhead, nearest first, a couple at a time.
   * The queue is rebuilt around the current frame on every call, so a fast
   * scroll redirects the work instead of finishing stale frames.
   */
  const pumpSharp = useCallback(() => {
    const queue = sharpQueueRef.current;

    while (
      sharpBusyRef.current < CFG.sharpConcurrency &&
      queue.length > 0
    ) {
      const index = queue.shift();
      if (sharpRef.current.has(index) || sharpInFlightRef.current.has(index)) {
        continue;
      }

      sharpInFlightRef.current.add(index);
      sharpBusyRef.current += 1;

      decodeFrame(
        stallFrameSrc(index, frameCountRef.current),
        CFG.sharpMaxWidth
      ).then((surface) => {
        sharpBusyRef.current -= 1;
        sharpInFlightRef.current.delete(index);

        if (disposedRef.current) return;

        if (surface) {
          sharpRef.current.set(index, surface);
          evictSharp(index);

          // Repaint at higher quality if this is the frame on screen.
          if (index === pendingRef.current) draw(index);
        }

        pumpRef.current?.();
      });
    }
  }, [draw, evictSharp]);

  useEffect(() => {
    pumpRef.current = pumpSharp;
  }, [pumpSharp]);

  const primeSharp = useCallback((center) => {
    if (skipSharpRef.current) return;

    const radius = CFG.sharpWindowRadius;
    const wanted = [];

    for (let distance = 0; distance <= radius; distance += 1) {
      if (center + distance < frameCountRef.current) wanted.push(center + distance);

      const behind = center - distance;
      if (distance !== 0 && behind >= 0) wanted.push(behind);
    }

    const stale = sharpQueueRef.current.filter((index) => !wanted.includes(index));
    const queue = wanted.filter(
      (index) =>
        !sharpRef.current.has(index) &&
        !sharpInFlightRef.current.has(index) &&
        !stale.includes(index)
    );

    sharpQueueRef.current = [...stale, ...queue];
    pumpRef.current?.();
  }, []);

  /* ------------------------------------------- defer work until it is near */

  useEffect(() => {
    if (reduceMotion) return undefined;

    const section = sectionRef.current;
    if (!section) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(id);
    }

    // Roughly a viewport of lead time: the sequence is warm by the time it is
    // in front of the visitor, without downloading it on first paint.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100% 0px 100% 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reduceMotion]);

  /* ------------------------------------------------------------ preload */

  useEffect(() => {
    if (reduceMotion || !inView) return undefined;

    disposedRef.current = false;
    /*
     * The high-resolution tier exists to keep this crisp on large screens. On a
     * phone the canvas is small enough that the always-resident tier already
     * matches it, so the extra tier would cost memory and decoding work for no
     * visible gain — as would a device that reports itself as low on memory or
     * cores. Both cases skip it and keep only the base tier.
     */
    skipSharpRef.current =
      window.innerWidth <= COMPACT_MAX_WIDTH || readDeviceLimits().constrained;

    let cancelled = false;
    const timers = [];

    const base = new Array(frameCountRef.current);
    baseRef.current = base;
    loadedRef.current = 0;

    const loadBase = (index) =>
      decodeFrame(stallFrameSrc(index, frameCountRef.current), CFG.baseMaxWidth).then(
        (surface) => {
          if (cancelled) return;
          if (surface) {
            base[index] = surface;
            loadedRef.current += 1;
          }
        }
      );

    const run = async () => {
      // 1. The opening frames, so the sequence can be revealed.
      const eager = [];
      for (let i = 0; i < Math.min(CFG.eagerFrames, frameCountRef.current); i += 1) {
        eager.push(loadBase(i));
      }
      await Promise.all(eager);
      if (cancelled) return;

      // 2. Nothing decoded at all means the assets are missing. Hand over to
      //    the fallback rather than leaving an empty stage.
      if (loadedRef.current === 0) {
        setFailed(true);
        return;
      }

      requestFrame(0);
      primeSharp(0);
      setEagerReady(true);
      setLoaded(loadedRef.current);

      // 3. The rest of the sequence, in small batches so the main thread keeps
      //    answering scroll events while it streams in.
      for (
        let i = CFG.eagerFrames;
        i < frameCountRef.current;
        i += CFG.baseBatchSize
      ) {
        if (cancelled) return;

        const batch = [];
        for (let k = 0; k < CFG.baseBatchSize && i + k < frameCountRef.current; k += 1) {
          batch.push(loadBase(i + k));
        }
        await Promise.all(batch);
        if (cancelled) return;

        setLoaded(loadedRef.current);

        await new Promise((resolve) => {
          timers.push(window.setTimeout(resolve, CFG.baseBatchGap));
        });
      }
    };

    run();

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [reduceMotion, inView, requestFrame, primeSharp]);

  /* Explicit teardown: drop the decoded surfaces with the component. */
  useEffect(
    () => () => {
      disposedRef.current = true;
      baseRef.current = [];
      sharpRef.current.clear();
      sharpQueueRef.current = [];
      sharpInFlightRef.current.clear();
      ctxRef.current = null;
      frameRef.current = -1;
    },
    []
  );

  /* ------------------------------------------------------ canvas sizing */

  useEffect(() => {
    if (reduceMotion) return undefined;

    const stage = stageRef.current;
    if (!stage) return undefined;

    const measure = () => {
      const rect = stage.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      sizeRef.current = { w, h };

      // Re-paint the frame in hand at the new size. The canvas backing store is
      // only reassigned inside `draw`, so this cannot cause a flash. The frame
      // index is cleared first so a failed repaint (nothing decoded yet) leaves
      // the next request free to paint instead of being treated as drawn.
      const current = frameRef.current >= 0 ? frameRef.current : pendingRef.current;
      frameRef.current = -1;
      draw(current);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    window.addEventListener("orientationchange", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("orientationchange", measure);
    };
  }, [reduceMotion, draw]);

  /* --------------------------------------------------- scroll -> frames */

  useEffect(() => {
    if (reduceMotion || !eagerReady) return undefined;

    const track = scrollTrackRef?.current ?? trackRef.current;
    if (!track) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const proxy = { frame: 0 };
    const last = frameCountRef.current - 1;

    // Drives the frame and the progress rule without touching React state.
    const sync = () => {
      const frame = Math.round(proxy.frame);
      requestFrame(frame);

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${last > 0 ? frame / last : 0})`;
      }
    };

    const tween = gsap.to(proxy, {
      frame: last,
      ease: "none",
      scrollTrigger: {
        trigger: track,
        start: () => {
          const stickyStage = track.querySelector(".sticky");
          const stickyTop = stickyStage
            ? window.getComputedStyle(stickyStage).top
            : "0px";

          return `top ${stickyTop}`;
        },
        end: () => {
          const stickyStage = track.querySelector(".sticky");
          if (!stickyStage) return "bottom bottom";

          const stickyTop = Number.parseFloat(
            window.getComputedStyle(stickyStage).top
          );
          const stickyBottom =
            (Number.isFinite(stickyTop) ? stickyTop : 0) +
            stickyStage.getBoundingClientRect().height;

          return `bottom ${stickyBottom}px`;
        },
        // `true` rather than a duration: the frame tracks the scrollbar
        // exactly and settles the instant scrolling stops, with no easing tail.
        scrub: true,
        invalidateOnRefresh: true,
      },
      onUpdate: sync,
    });

    // The visitor may already be partway down the track, so the opening frame
    // is taken from the real scroll position.
    const trigger = tween.scrollTrigger;
    if (trigger) {
      proxy.frame = trigger.progress * last;
      sync();
    }

    // Recalculate boundaries once the surrounding imagery has settled.
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(id);
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, [reduceMotion, eagerReady, requestFrame, scrollTrackRef]);

  /* ------------------------------------------------------------ cleanup */

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    },
    []
  );

  /* ------------------------------------------------------------- reveal */

  const reveal = (delay = 0) =>
    reduceMotion
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  const posterWidth = CFG.sourceWidth;
  const posterHeight = CFG.sourceHeight;
  const percent = frameCount > 0 ? Math.round((loaded / frameCount) * 100) : 0;

  /* -------------------------------------------------------------- views */

  /*
   * Reduced motion, or assets that never arrived: a single still of the stall
   * work, in the same frame, with a note explaining what is shown. The section
   * stays complete and usable either way.
   */
  if (reduceMotion || failed) {
    const still = failed
      ? stallSequenceUi.fallbackImage
      : {
          src: stallFrameSrc(0, frameCount),
          alt: stallSequenceUi.posterAlt,
          w: posterWidth,
          h: posterHeight,
        };

    return (
      <div ref={sectionRef} className="relative w-full">
        <motion.figure
          {...reveal(0)}
          className={`relative m-0 w-full overflow-hidden bg-[var(--color-black)] ${
            embedded ? `h-full ${className}` : `${stageHeightClass} ${className}`
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={still.src}
            alt={still.alt}
            width={still.w}
            height={still.h}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="absolute inset-0 h-full w-full object-contain max-md:object-contain"
          />
        </motion.figure>

        <p className="mx-auto mt-6 w-full max-w-7xl px-6 text-center text-xs text-[var(--color-medium-grey)]">
          {failed ? stallSequenceUi.fallbackNote : stallSequenceUi.staticNote}
        </p>
      </div>
    );
  }

  if (embedded) {
    return (
      <div ref={sectionRef} className="relative h-full w-full">
        <div ref={stageRef} className={`relative h-full w-full ${className}`}>
          {/* Poster frame: first paint, and the only visual without JS. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={stallFrameSrc(0, frameCount)}
            alt={stallSequenceUi.posterAlt}
            width={posterWidth}
            height={posterHeight}
            draggable={false}
            className="absolute inset-0 h-full w-full object-contain max-md:object-contain"
          />

          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
          />

          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-[var(--color-black)] transition-opacity duration-700 ${
              eagerReady ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex w-40 flex-col items-center gap-4">
              <Loader2
                size={20}
                strokeWidth={1.6}
                className="animate-spin text-[var(--color-silver)]"
              />
              <span className="text-xs tracking-[0.4em] text-[var(--color-silver)] uppercase">
                {stallSequenceUi.loadingLabel}
              </span>
              <span className="block h-px w-full overflow-hidden bg-white/15">
                <span
                  className="block h-full bg-[var(--color-silver)] transition-[width] duration-300 ease-out"
                  style={{ width: `${percent}%` }}
                />
              </span>
              <span className="text-xs tabular-nums text-[var(--color-silver)]">
                {percent}%
              </span>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-6 pt-24 pb-8 sm:px-10 sm:pb-10">
            <div>
              <div className="flex items-center gap-3 text-[var(--color-silver)]">
                <span className="text-xs font-medium tracking-[0.4em] uppercase">
                  {stallSequenceUi.scrollHint}
                </span>
                <motion.span
                  aria-hidden="true"
                  animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
                  transition={{
                    duration: 1.9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowDown size={14} />
                </motion.span>
              </div>

              <span
                aria-hidden="true"
                className="mt-3 block h-px w-28 overflow-hidden bg-white/15 sm:mt-4 sm:w-44"
              >
                <span
                  ref={progressRef}
                  className="block h-full w-full origin-left scale-x-0 bg-[var(--color-silver)]"
                />
              </span>
            </div>
          </div>
        </div>

        <p className="sr-only">
          {stallSequenceUi.posterAlt}. The walkthrough is controlled by scrolling:
          scrolling down plays it forward and scrolling up plays it back.
        </p>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="relative w-full">
      {/*
       * The tall track supplies the scroll length; the stage inside sticks for
       * the whole sequence and releases naturally at the final frame.
       */}
      <div
        ref={trackRef}
        className={`relative ${trackHeightClass}`}
      >
        {/*
         * Full-screen stage: one viewport tall and edge to edge, so the
         * sequence is the only thing on screen while it plays. A definite
         * height also means the section reserves its space up front, so
         * nothing shifts when the canvas arrives.
         */}
        <div
          className={`sticky w-full overflow-hidden bg-[var(--color-black)] ${stickyTopClass} ${stageHeightClass}`}
        >
          <div ref={stageRef} className={`relative h-full w-full ${className}`}>
            {/*
             * The frames are 16:9 and drawn with a single uniform scale, so the
             * artwork is never stretched. How much of the frame is shown is
             * decided in `draw`, which fills a wide viewport and letterboxes a
             * tall, narrow one over the black stage.
             */}
            {/* Poster frame: first paint, and the only visual without JS. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={stallFrameSrc(0, frameCount)}
              alt={stallSequenceUi.posterAlt}
              width={posterWidth}
              height={posterHeight}
              draggable={false}
              className="absolute inset-0 h-full w-full object-contain max-md:object-contain"
            />

            <canvas
              ref={canvasRef}
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
            />

            {/* Opaque veil until the opening frames are decoded. */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-[var(--color-black)] transition-opacity duration-700 ${
                eagerReady ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="flex w-40 flex-col items-center gap-4">
                <Loader2
                  size={20}
                  strokeWidth={1.6}
                  className="animate-spin text-[var(--color-silver)]"
                />
                <span className="text-xs tracking-[0.4em] text-[var(--color-silver)] uppercase">
                  {stallSequenceUi.loadingLabel}
                </span>
                {/* Real-time load percentage while the assets arrive. */}
                <span className="block h-px w-full overflow-hidden bg-white/15">
                  <span
                    className="block h-full bg-[var(--color-silver)] transition-[width] duration-300 ease-out"
                    style={{ width: `${percent}%` }}
                  />
                </span>
                <span className="text-xs tabular-nums text-[var(--color-silver)]">
                  {percent}%
                </span>
              </div>
            </div>

            {/*
             * Supporting UI, held inside the stage so it stays with the
             * sequence for its whole length. `pointer-events-none` and the
             * soft scrim keep it from competing with the stalls.
             */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-6 pt-24 pb-8 sm:px-10 sm:pb-10">
              <div>
                <div className="flex items-center gap-3 text-[var(--color-silver)]">
                  <span className="text-xs font-medium tracking-[0.4em] uppercase">
                    {stallSequenceUi.scrollHint}
                  </span>
                  <motion.span
                    aria-hidden="true"
                    animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
                    transition={{
                      duration: 1.9,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowDown size={14} />
                  </motion.span>
                </div>

                <span
                  aria-hidden="true"
                  className="mt-3 block h-px w-28 overflow-hidden bg-white/15 sm:mt-4 sm:w-44"
                >
                  {/* Filled imperatively from the ScrollTrigger progress. */}
                  <span
                    ref={progressRef}
                    className="block h-full w-full origin-left scale-x-0 bg-[var(--color-silver)]"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="sr-only">
        {stallSequenceUi.posterAlt}. The walkthrough is controlled by scrolling:
        scrolling down plays it forward and scrolling up plays it back.
      </p>
    </div>
  );
}
