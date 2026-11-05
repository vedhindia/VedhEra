
"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { brochureItems, brochureSection } from "@/data/brochures";
import { stationeryItems } from "@/data/stationery";

const EASE = [0.22, 1, 0.36, 1];
const CYCLE_MS = 2000;
const TRANSITION_MS = 450;

export default function BrochureShowcase() {
  const reduceMotion = useReducedMotion();
  const items = [...brochureItems, ...stationeryItems];
  const count = items.length;
  const loopItems = [...items, ...items, ...items];

  const trackRef = useRef(null);
  const firstCardRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const strideRef = useRef(0);
  const resetRef = useRef(false);

  const [index, setIndex] = useState(count);
  const [paused, setPaused] = useState(false);

  const measureStride = useCallback(() => {
    const first = firstCardRef.current;
    const second = trackRef.current?.children[1];

    if (first && second) {
      strideRef.current =
        second.getBoundingClientRect().left - first.getBoundingClientRect().left;
    }
  }, []);

  useLayoutEffect(() => {
    const update = () => {
      measureStride();

      const track = trackRef.current;

      if (track && strideRef.current && !isDraggingRef.current) {
        track.style.transform = `translate3d(${-index * strideRef.current}px, 0, 0)`;
      }
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, [index, measureStride]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || !strideRef.current) return;

    if (resetRef.current) {
      track.style.transition = "none";
      track.style.transform = `translate3d(${-index * strideRef.current}px, 0, 0)`;
      track.getBoundingClientRect();
      resetRef.current = false;
    }

    track.style.transition = reduceMotion
      ? "none"
      : `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;

    track.style.transform = `translate3d(${-index * strideRef.current}px, 0, 0)`;
  }, [index, reduceMotion]);

  // Seamlessly reposition the track after reaching a duplicated copy.
  const handleTransitionEnd = () => {
    if (index >= count * 2) {
      resetRef.current = true;
      setIndex(count);
    } else if (index < count) {
      resetRef.current = true;
      setIndex(count * 2 - 1);
    }
  };

  // Move exactly one image per interval.
  useEffect(() => {
    if (reduceMotion || paused || count < 2) return;

    const timer = window.setInterval(() => {
      setIndex((current) => current + 1);
    }, CYCLE_MS);

    return () => window.clearInterval(timer);
  }, [count, paused, reduceMotion]);

  const goToDesign = (itemIndex) => {
    setIndex(count + ((itemIndex % count) + count) % count);
  };

  const onPointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const track = trackRef.current;
    if (!track) return;

    isDraggingRef.current = true;
    dragStartXRef.current = event.clientX;
    dragStartOffsetRef.current = -index * strideRef.current;

    track.style.transition = "none";
    track.setPointerCapture?.(event.pointerId);
    setPaused(true);
  };

  const onPointerMove = (event) => {
    if (!isDraggingRef.current) return;

    const track = trackRef.current;
    if (!track) return;

    const offset =
      dragStartOffsetRef.current + event.clientX - dragStartXRef.current;

    track.style.transform = `translate3d(${offset}px, 0, 0)`;
  };

  const onPointerUp = (event) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;

    const track = trackRef.current;
    const delta = event.clientX - dragStartXRef.current;
    const threshold = Math.min(70, strideRef.current * 0.18);

    if (Math.abs(delta) > threshold) {
      setIndex((current) => current + (delta < 0 ? 1 : -1));
    } else if (track) {
      track.style.transition = reduceMotion
        ? "none"
        : `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;

      track.style.transform = `translate3d(${-index * strideRef.current}px, 0, 0)`;
    }

    setPaused(false);
  };

  const reveal = (delay = 0) =>
    reduceMotion
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  if (!count) return null;

  const activeIndex = ((index % count) + count) % count;

  return (
    <section
      id="brochure-design"
      className="relative isolate overflow-hidden bg-[var(--color-deep-charcoal)] py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_70%_at_50%_0%,rgba(192,196,201,0.13),transparent_60%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(70%_70%_at_50%_100%,rgba(0,0,0,0.7),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <motion.div {...reveal(0)} className="lg:col-span-6">
            <p className="text-[11px] font-medium tracking-[0.35em] text-[var(--color-silver)] uppercase sm:text-xs">
              {brochureSection.eyebrow}
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {brochureSection.heading}
            </h2>
          </motion.div>

          <motion.div {...reveal(0.1)} className="lg:col-span-5 lg:col-start-8">
            <p className="text-sm leading-relaxed text-[var(--color-silver)] sm:text-base">
              {brochureSection.body}
            </p>

            <Button
              href={brochureSection.cta.href}
              variant="light"
              className="mt-8"
            >
              {brochureSection.cta.label}
              <ArrowRight size={16} />
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        {...reveal(0.18)}
        className="relative mx-auto mt-16 w-full max-w-7xl overflow-hidden px-6 sm:mt-20 sm:px-8 lg:px-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="overflow-hidden"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={(event) => {
            if (isDraggingRef.current && event.buttons === 0) {
              onPointerUp(event);
            }
          }}
          style={{ touchAction: "pan-y" }}
        >
          <ul
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            className="flex w-full list-none items-center gap-3 py-6 xl:gap-6"
            style={{ willChange: "transform" }}
          >
            {loopItems.map((item, itemIndex) => {
              const originalIndex = itemIndex % count;
              const isActive = originalIndex === activeIndex;

              return (
                <li
                  key={`${item.id}-${itemIndex}`}
                  ref={itemIndex === 0 ? firstCardRef : null}
                  className="w-full shrink-0 sm:basis-[calc(50%_-_0.375rem)] lg:w-auto lg:basis-[calc(33.333333%_-_0.5rem)] lg:max-w-none xl:basis-[calc(33.333333%_-_1rem)]"
                >
                  <button
                    type="button"
                    onClick={() => goToDesign(originalIndex)}
                    aria-label={`Select design ${originalIndex + 1}`}
                    aria-current={isActive ? "true" : undefined}
                    className="group block w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    <div
                      className={`relative aspect-[3/2] overflow-hidden rounded-[18px] border bg-[linear-gradient(158deg,#f7f8f9_0%,#d5d9de_100%)] transition-shadow duration-300 group-hover:shadow-[0_46px_80px_-36px_rgba(0,0,0,0.98)] ${
                        isActive
                          ? "border-[rgba(226,228,231,0.65)] shadow-[0_44px_76px_-36px_rgba(0,0,0,0.98)]"
                          : "border-white/12 shadow-[0_30px_60px_-34px_rgba(0,0,0,0.95)]"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src}
                        alt={item.alt}
                        width={item.w}
                        height={item.h}
                        loading="lazy"
                        decoding="async"
                        draggable="false"
                        className="h-full w-full select-none object-conver"
                      />

                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-[22%] top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
                      />
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          className="mt-10 flex items-center justify-center gap-2.5 sm:mt-12"
          role="group"
          aria-label="Design selection"
        >
          {items.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToDesign(itemIndex)}
              aria-label={`Go to design ${itemIndex + 1}`}
              aria-current={itemIndex === activeIndex ? "true" : undefined}
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                itemIndex === activeIndex
                  ? "w-8 bg-[var(--color-light-silver)]"
                  : "w-1.5 bg-white/20 hover:bg-white/35"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
