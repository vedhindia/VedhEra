"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import {
  BILLBOARD_FRAME_COUNT,
  billboardFrameSrc,
  outdoorSection,
} from "@/data/billboard";

const TOTAL = BILLBOARD_FRAME_COUNT;
/** Frames decoded before the scene is revealed. */
const EAGER_FRAMES = 6;
/** Remaining frames stream in small batches so they never block the main thread. */
const BATCH_SIZE = 4;
const BATCH_GAP = 70;
/** Cap the backing-store resolution for performance on high-DPI screens. */
const MAX_DPR = 1.5;
const EASE = [0.22, 1, 0.36, 1];

/** Only the first, third and last frame ever fail in practice; keep a small guard. */
const isUsable = (img) => Boolean(img && img.complete && img.naturalWidth > 0);

/**
 * Scroll-controlled cinematic image sequence.
 *
 * The 90 supplied frames are drawn into a single canvas (`cover` fit, no
 * stretching). A GSAP ScrollTrigger timeline ties the frame index to scroll
 * progress, so the camera journey advances and reverses with the visitor's
 * scroll and never autoplays on its own.
 *
 * Performance notes: images are created once per mount and cached, the canvas
 * context is reused, draw requests are coalesced into a single
 * requestAnimationFrame, and no React state changes while scrolling.
 */
export default function BillboardScrollSequence() {
  const reduceMotion = useReducedMotion();

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const canvasRef = useRef(null);
  const progressRef = useRef(null);

  const imagesRef = useRef([]);
  const ctxRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const frameRef = useRef(-1);
  const pendingRef = useRef(0);
  const rafRef = useRef(null);
  const disposedRef = useRef(false);

  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  /* ------------------------------------------------------------- canvas */

  const draw = useCallback((index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];

    // A frame that has not arrived yet is skipped on purpose: the previous
    // valid frame stays on screen instead of flashing blank.
    if (!canvas || !isUsable(img)) return false;

    const { w, h } = sizeRef.current;
    if (!w || !h) return false;

    if (!ctxRef.current) ctxRef.current = canvas.getContext("2d");
    const ctx = ctxRef.current;
    if (!ctx) return false;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const bw = Math.round(w * dpr);
    const bh = Math.round(h * dpr);
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw;
      canvas.height = bh;
    }

    // Resizing resets the transform, so it is re-applied on every draw.
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    // Cover fit: fill the viewport, crop the overflow, never distort.
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);

    frameRef.current = index;
    return true;
  }, []);

  const requestFrame = useCallback(
    (index) => {
      pendingRef.current = Math.max(0, Math.min(TOTAL - 1, index));
      if (rafRef.current != null) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (disposedRef.current) return;
        if (pendingRef.current === frameRef.current) return;
        draw(pendingRef.current);
      });
    },
    [draw]
  );

  /* ------------------------------------- defer loading until it is near */

  useEffect(() => {
    if (reduceMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(id);
    }

    // Roughly 1.5 viewports of lead time: the sequence is warm before the
    // scene is actually in front of the visitor, without downloading it on
    // first paint.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "150% 0px 150% 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reduceMotion]);

  /* ------------------------------------------------------------ preload */

  useEffect(() => {
    if (reduceMotion || !inView) return;

    disposedRef.current = false;
    let cancelled = false;
    const timers = [];

    const images = new Array(TOTAL);
    imagesRef.current = images;

    const loadFrame = (index) =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        images[index] = img;

        const settle = () => {
          if (!cancelled && index === pendingRef.current) requestFrame(index);
          resolve();
        };

        img.onload = settle;
        // A failed frame is simply skipped; the last valid frame stays up.
        img.onerror = settle;
        img.src = billboardFrameSrc(index);
      });

    const run = async () => {
      const eager = [];
      for (let i = 0; i < Math.min(EAGER_FRAMES, TOTAL); i += 1) {
        eager.push(loadFrame(i));
      }
      await Promise.all(eager);
      if (cancelled) return;

      requestFrame(pendingRef.current);
      setReady(true);

      for (let i = EAGER_FRAMES; i < TOTAL; i += BATCH_SIZE) {
        if (cancelled) return;

        const batch = [];
        for (let k = 0; k < BATCH_SIZE && i + k < TOTAL; k += 1) {
          batch.push(loadFrame(i + k));
        }
        await Promise.all(batch);
        if (cancelled) return;

        await new Promise((resolve) => {
          timers.push(window.setTimeout(resolve, BATCH_GAP));
        });
      }
    };

    run();

    return () => {
      cancelled = true;
      disposedRef.current = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      images.forEach((img) => {
        if (!img) return;
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [reduceMotion, inView, requestFrame]);

  /* ------------------------------------------------------ canvas sizing */

  useEffect(() => {
    if (reduceMotion) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    const measure = () => {
      const rect = viewport.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      sizeRef.current = { w, h };

      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const bw = Math.round(w * dpr);
      const bh = Math.round(h * dpr);
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }

      // Force a repaint of the current frame at the new size.
      const current = frameRef.current;
      if (current < 0) return;
      frameRef.current = -1;
      if (!draw(current)) frameRef.current = current;
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    window.addEventListener("orientationchange", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("orientationchange", measure);
    };
  }, [reduceMotion, draw]);

  /* --------------------------------------------------- scroll -> frames */

  useEffect(() => {
    if (reduceMotion || !ready) return;

    const track = trackRef.current;
    if (!track) return;

    gsap.registerPlugin(ScrollTrigger);

    const proxy = { frame: 0 };

    // Drives both the frame and the slim scroll-progress rule, without ever
    // touching React state.
    const sync = () => {
      const progress = TOTAL > 1 ? proxy.frame / (TOTAL - 1) : 0;
      requestFrame(Math.round(proxy.frame));
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const tween = gsap.to(proxy, {
      frame: TOTAL - 1,
      ease: "none",
      scrollTrigger: {
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        // Scrubbed, so the sequence tracks the scrollbar in both directions.
        scrub: 0.4,
        invalidateOnRefresh: true,
      },
      onUpdate: sync,
    });

    // The visitor may already be partway through the track (a deep link, a
    // reload, or a very fast scroll while frames were still arriving), so the
    // first frame shown is taken from the real scroll position.
    const trigger = tween.scrollTrigger;
    if (trigger) {
      proxy.frame = trigger.progress * (TOTAL - 1);
      sync();
    }

    // Recalculate boundaries once the surrounding imagery has settled.
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 150);

    return () => {
      window.clearTimeout(id);
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, [reduceMotion, ready, requestFrame]);

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
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  /* -------------------------------------------------------------- view */

  // Copy column, shared by the animated and reduced-motion layouts.
  const copyColumn = (
    <>
      <p className="text-[11px] font-medium tracking-[0.35em] text-[var(--color-silver)] uppercase sm:text-xs">
        {outdoorSection.eyebrow}
      </p>
      <h2 className="mt-4 text-2xl font-semibold leading-[1.14] tracking-tight text-white sm:text-3xl lg:text-4xl xl:text-[2.75rem]">
        {outdoorSection.heading}
      </h2>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--color-silver)] sm:mt-6 sm:text-base">
        {outdoorSection.body}
      </p>

      <div className="mt-9">
        <div className="flex items-center gap-3 text-[var(--color-silver)]">
          <span className="text-xs font-medium tracking-[0.4em] uppercase">
            {outdoorSection.scrollHint}
          </span>
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={14} />
          </motion.span>
        </div>

        {!reduceMotion && (
          <span
            aria-hidden="true"
            className="mt-4 block h-px w-full max-w-[220px] overflow-hidden bg-white/12"
          >
            {/* Filled imperatively from the ScrollTrigger progress. */}
            <span
              ref={progressRef}
              className="block h-full w-full origin-left scale-x-0 bg-[var(--color-silver)]"
            />
          </span>
        )}
      </div>
    </>
  );

  return (
    <section
      ref={sectionRef}
      id="outdoor-advertising"
      className="relative isolate bg-[var(--color-deep-charcoal)]"
    >
      {reduceMotion ? (
        /*
         * Reduced motion: the same two-column composition, with a single
         * representative still instead of the scroll-driven sequence.
         */
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16 lg:py-32">
          <motion.div {...reveal(0)}>{copyColumn}</motion.div>

          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-black)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={billboardFrameSrc(0)}
              alt={outdoorSection.posterAlt}
              loading="lazy"
              decoding="async"
              className="aspect-video w-full object-contain"
            />
          </figure>

          <p className="text-xs text-[var(--color-medium-grey)] lg:col-span-2">
            {outdoorSection.staticNote}
          </p>
        </div>
      ) : (
        /*
         * Scroll-controlled scene, laid out as two columns: copy on the left,
         * the frame canvas on the right. The tall track supplies the scroll
         * length; the stage inside sticks for the whole sequence, so both
         * columns stay in view while the camera journey advances and reverses,
         * then releases naturally after the final frame. Wheel and touch
         * events are never intercepted.
         */
        <div
          ref={trackRef}
          className="relative h-[240svh] sm:h-[300svh] lg:h-[340svh]"
        >
          <div className="sticky top-0 flex h-[100svh] min-h-[560px] w-full items-center pt-[72px] sm:pt-[88px]">
            <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
              <motion.div {...reveal(0)} className="max-w-xl">
                {copyColumn}
              </motion.div>

              <motion.figure
                {...reveal(0.12)}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-black)] shadow-[0_50px_110px_-45px_rgba(0,0,0,0.95)]"
              >
                {/*
                 * The measured viewport for the canvas. It has no border or
                 * padding of its own so the canvas box and the measured box
                 * match exactly. The frames are 16:9, so a 16:9 stage shows
                 * the full frame with no crop at any width.
                 */}
                <div ref={viewportRef} className="relative aspect-video w-full">
                  {/*
                   * Poster frame. It carries the accessible description of the
                   * sequence, fills the first paint, and is the only thing
                   * visible when JavaScript is unavailable.
                   */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={billboardFrameSrc(0)}
                    alt={outdoorSection.posterAlt}
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-contain"
                  />

                  <canvas
                    ref={canvasRef}
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full"
                  />

                  {/* Loading veil, faded out once the first frames are ready. */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-[var(--color-black)] transition-opacity duration-700 ${
                      ready ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <span className="h-px w-36 overflow-hidden bg-white/15">
                        <span className="block h-full w-1/3 animate-pulse bg-[var(--color-silver)]" />
                      </span>
                      <span className="text-xs tracking-[0.4em] text-[var(--color-silver)] uppercase">
                        {outdoorSection.loadingLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.figure>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
