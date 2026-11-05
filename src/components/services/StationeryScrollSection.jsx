"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { stationeryItems, stationerySection } from "@/data/stationery";

const EASE = [0.22, 1, 0.36, 1];
const AUTOPLAY_MS = 3600;
const SWIPE_THRESHOLD = 46;

function wrapIndex(index, length) {
  return ((index % length) + length) % length;
}

function shortestRelative(index, activeIndex, length) {
  let diff = index - activeIndex;
  const half = length / 2;

  if (diff > half) diff -= length;
  if (diff < -half) diff += length;

  return diff;
}

function getMetrics(width) {
  if (width < 640) {
    return {
      visibleRange: 2.1,
      xBase: 46,
      xCurve: 6,
      yLift: 2,
      yBase: 8,
      zFront: 188,
      zStep: 56,
      zCurve: 6,
      rotateZBase: 5.2,
      rotateZStep: 3.1,
      rotateYBase: 7,
      rotateYStep: 2.8,
      featureScale: 1.1,
      scaleStep: 0.1,
      scaleMin: 0.72,
      opacityFloor: 0.2,
      opacityStep: 0.16,
      cardWidth: "clamp(158px, 48vw, 248px)",
      cardTop: "55%",
      cardAspectRatio: "0.92 / 1",
    };
  }

  if (width < 1024) {
    return {
      visibleRange: 2.7,
      xBase: 58,
      xCurve: 8,
      yLift: 4,
      yBase: 11,
      zFront: 224,
      zStep: 64,
      zCurve: 8,
      rotateZBase: 6.1,
      rotateZStep: 3.6,
      rotateYBase: 8.5,
      rotateYStep: 3.2,
      featureScale: 1.15,
      scaleStep: 0.09,
      scaleMin: 0.73,
      opacityFloor: 0.18,
      opacityStep: 0.135,
      cardWidth: "clamp(205px, 29vw, 320px)",
      cardTop: "54%",
      cardAspectRatio: "0.92 / 1",
    };
  }

  return {
    visibleRange: 3.15,
    xBase: 72,
    xCurve: 10,
    yLift: 5,
    yBase: 12,
    zFront: 252,
    zStep: 72,
    zCurve: 8,
    rotateZBase: 6.6,
    rotateZStep: 3.8,
    rotateYBase: 8.5,
    rotateYStep: 3.4,
    featureScale: 1.18,
    scaleStep: 0.085,
    scaleMin: 0.74,
    opacityFloor: 0.17,
    opacityStep: 0.115,
    cardWidth: "clamp(220px, 22vw, 340px)",
    cardTop: "54%",
    cardAspectRatio: "0.92 / 1",
  };
}

function getCardState(relative, metrics) {
  const abs = Math.abs(relative);
  const dir = relative < 0 ? -1 : relative > 0 ? 1 : 0;

  const x = dir * (abs * metrics.xBase + abs * abs * metrics.xCurve);
  const y = -metrics.yLift + abs * metrics.yBase;
  const z = metrics.zFront - abs * metrics.zStep - abs * abs * metrics.zCurve;
  const rotateZ = dir * (metrics.rotateZBase + abs * metrics.rotateZStep);
  const rotateY = dir * (metrics.rotateYBase + abs * metrics.rotateYStep);
  const scale = Math.max(
    metrics.scaleMin,
    metrics.featureScale - abs * metrics.scaleStep
  );
  const opacity =
    abs > metrics.visibleRange
      ? 0
      : Math.max(metrics.opacityFloor, 1 - abs * metrics.opacityStep);

  return {
    x,
    y,
    z,
    rotateZ,
    rotateY,
    scale,
    opacity,
    zIndex: 600 - Math.round(abs * 60),
    visible: abs <= metrics.visibleRange,
  };
}

function getMediaState(relative) {
  const abs = Math.abs(relative);

  return {
    blur: Math.min(10, abs * 3.2),
    imageOpacity: Math.max(0.22, 1 - abs * 0.24),
    imageScale: Math.max(0.9, 1 - abs * 0.03),
  };
}

export default function StationeryScrollSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const autoplayRef = useRef(null);
  const suppressClickRef = useRef(false);
  const suppressTimerRef = useRef(null);
  const dragRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    moved: false,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [stageWidth, setStageWidth] = useState(1280);
  const [isPaused, setIsPaused] = useState(false);

  const items = useMemo(() => stationeryItems, []);
  const featured = items[activeIndex] ?? items[0];
  const metrics = getMetrics(stageWidth);

  const goTo = (nextIndex) => {
    setActiveIndex(wrapIndex(nextIndex, items.length));
  };

  const goNext = () => goTo(activeIndex + 1);
  const goPrev = () => goTo(activeIndex - 1);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const measure = () => {
      setStageWidth(stage.clientWidth || window.innerWidth);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    window.addEventListener("orientationchange", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  useEffect(() => {
    if (!items.length) return;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const relative = shortestRelative(index, activeIndex, items.length);
      const state = getCardState(relative, metrics);
      const mediaState = getMediaState(relative);
      const media = card.querySelector("[data-card-media]");
      const image = card.querySelector("[data-card-image]");

      card.style.pointerEvents = state.visible ? "auto" : "none";
      card.style.zIndex = String(state.zIndex);

      gsap.to(card, {
        x: state.x,
        y: state.y,
        z: state.z,
        rotationZ: state.rotateZ,
        rotationY: state.rotateY,
        scale: state.scale,
        opacity: state.opacity,
        duration: reduceMotion ? 0 : 0.85,
        ease: reduceMotion ? "none" : "power3.inOut",
        overwrite: true,
      });

      if (media) {
        gsap.to(media, {
          filter: `blur(${reduceMotion ? 0 : mediaState.blur}px)`,
          duration: reduceMotion ? 0 : 0.85,
          ease: reduceMotion ? "none" : "power3.inOut",
          overwrite: true,
        });
      }

      if (image) {
        gsap.to(image, {
          opacity: mediaState.imageOpacity,
          scale: mediaState.imageScale,
          duration: reduceMotion ? 0 : 0.85,
          ease: reduceMotion ? "none" : "power3.inOut",
          overwrite: true,
        });
      }
    });
  }, [activeIndex, items, metrics, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || isPaused || items.length <= 1) return;

    autoplayRef.current = window.setInterval(() => {
      setActiveIndex((current) => wrapIndex(current + 1, items.length));
    }, AUTOPLAY_MS);

    return () => {
      if (autoplayRef.current) {
        window.clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [isPaused, items.length, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;

    const handleVisibility = () => {
      setIsPaused(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [reduceMotion]);

  useEffect(
    () => () => {
      if (suppressTimerRef.current) {
        window.clearTimeout(suppressTimerRef.current);
      }
    },
    []
  );

  const reveal = (delay = 0) =>
    reduceMotion
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.35 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  const onPointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    };

    setIsPaused(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;

    if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) {
      drag.moved = true;
    }
  };

  const onPointerEnd = (event) => {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    const didSwipe =
      Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy);

    event.currentTarget.releasePointerCapture?.(event.pointerId);

    if (didSwipe) {
      suppressClickRef.current = true;
      if (suppressTimerRef.current) {
        window.clearTimeout(suppressTimerRef.current);
      }
      suppressTimerRef.current = window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 400);
      if (dx < 0) goTo(activeIndex + 1);
      else goTo(activeIndex - 1);
    }

    dragRef.current = {
      active: false,
      pointerId: null,
      startX: 0,
      startY: 0,
      moved: false,
    };

    if (!document.hidden) setIsPaused(false);
  };

  const onCardClick = (index) => {
    if (suppressClickRef.current) return;
    if (dragRef.current.moved) return;
    goTo(index);
  };

  return (
    <section
      ref={sectionRef}
      id="stationery"
      className="relative isolate overflow-hidden bg-[var(--color-deep-charcoal)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_50%_18%,rgba(192,196,201,0.16),transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_100%,rgba(192,196,201,0.08),transparent_70%)]"
      />

      <div className="mx-auto max-w-7xl px-6 pt-24 pb-14 sm:pt-32">
        <motion.div {...reveal(0)} className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-medium tracking-[0.35em] text-[var(--color-silver)] uppercase sm:text-xs">
            {stationerySection.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {stationerySection.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[var(--color-silver)] sm:text-base">
            {stationerySection.body}
          </p>
        </motion.div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 pb-24 sm:pb-32">
        <div className="mb-10 flex items-center justify-between gap-6 px-12">
          <motion.div {...reveal(0.08)} className="max-w-xl">
            <p className="text-[11px] font-medium tracking-[0.4em] text-[var(--color-silver)] uppercase">
              Automatic Showcase
            </p>
            <p className="mt-3 text-sm text-[var(--color-medium-grey)]">
              Swipe or use the arrows to explore the collection.
            </p>
          </motion.div>

          <motion.div
            {...reveal(0.12)}
            className="hidden items-center gap-3 sm:flex"
          >
            <button
              type="button"
              onClick={goPrev}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => !document.hidden && setIsPaused(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-[var(--color-light-silver)] transition-colors hover:border-white/20 hover:bg-white/10"
              aria-label="Show previous stationery design"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={goNext}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => !document.hidden && setIsPaused(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-[var(--color-light-silver)] transition-colors hover:border-white/20 hover:bg-white/10"
              aria-label="Show next stationery design"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>

        <div className="mx-auto w-full  px-2 sm:px-6 lg:px-10">
          <div
            ref={stageRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerEnd}
            onPointerCancel={onPointerEnd}
            onPointerLeave={(event) => {
              if (dragRef.current.active) onPointerEnd(event);
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              if (!dragRef.current.active && !document.hidden) setIsPaused(false);
            }}
            className="relative min-h-[56svh] w-full touch-pan-y select-none overflow-hidden rounded-[34px] bg-[radial-gradient(90%_90%_at_50%_12%,rgba(255,255,255,0.04),transparent_38%),linear-gradient(180deg,#050505_0%,#090b0d_100%)] [perspective:1900px] shadow-[0_70px_160px_-80px_rgba(0,0,0,0.95)] sm:min-h-[60svh] lg:min-h-[64svh]"
          >
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_70%,rgba(255,255,255,0.04),transparent_42%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[radial-gradient(80%_80%_at_50%_100%,rgba(0,0,0,0.92),transparent_72%)]" />
          <div
            aria-hidden="true"
            className="absolute inset-x-[20%] top-[14%] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
          />

          <div className="absolute inset-0 [transform-style:preserve-3d]">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onCardClick(index)}
                className="absolute left-1/2 overflow-hidden rounded-[38px] border border-white/8 text-left shadow-[0_55px_120px_-60px_rgba(0,0,0,0.95)] [backface-visibility:hidden] [transform-style:preserve-3d]"
                aria-label={`Show ${item.label}`}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                style={{
                  width: metrics.cardWidth,
                  top: metrics.cardTop,
                  aspectRatio: metrics.cardAspectRatio,
                  transform:
                    "translate(-50%, -50%) translate3d(0px, 0px, 0px) scale(0.8)",
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[38px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
                  <div className="absolute inset-0 bg-[radial-gradient(90%_80%_at_50%_8%,rgba(255,255,255,0.14),transparent_34%)]" />
                  <div className="absolute inset-x-[18%] top-0 h-px bg-gradient-to-r from-transparent via-white/22 to-transparent" />

                  <div
                    data-card-media
                    className="absolute inset-3 overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.01))]"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_18%,rgba(255,255,255,0.06),transparent_42%)]" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      data-card-image
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                      className="relative z-[1] h-full w-full object-contain p-4 sm:p-5"
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-6 sm:inset-x-8 sm:bottom-8">
            <div>
              <p className="text-[10px] font-medium tracking-[0.36em] text-[var(--color-medium-grey)] uppercase">
                Featured
              </p>
              <p className="mt-3 text-sm font-medium tracking-[0.18em] text-[var(--color-light-silver)] uppercase sm:text-base">
                {featured?.label}
              </p>
            </div>

            <div className="flex flex-col items-end gap-4">
              <div className="flex gap-2">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === activeIndex
                        ? "w-8 bg-[var(--color-light-silver)]"
                        : "w-1.5 bg-white/18 hover:bg-white/28"
                    }`}
                    aria-label={`Go to ${item.label}`}
                  />
                ))}
              </div>
              <p className="text-[11px] text-[var(--color-medium-grey)]">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
          <button
            type="button"
            onClick={goPrev}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-[var(--color-light-silver)]"
            aria-label="Show previous stationery design"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-[var(--color-light-silver)]"
            aria-label="Show next stationery design"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
