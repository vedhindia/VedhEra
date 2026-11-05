"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const SLIDE_INTERVAL = 2000;

/**
 * Cinematic service showcase scene.
 *
 * A full-bleed gallery environment: artwork rotates on one side while copy
 * lives on the opposite side. Animation is driven centrally by
 * `useHomeScrollAnimation`, which targets `[data-scene]`, `.scene-copy-item`,
 * `.scene-panel` and `.scene-label`.
 *
 * Artwork uses `object-cover` to fill each slide.
 */
export default function ServiceScene({ scene, images = [], reverse = false }) {
  const hasLoop = images.length > 1;
  const slides = hasLoop
    ? [images[images.length - 1], ...images, images[0]]
    : images;
  const [activeIndex, setActiveIndex] = useState(hasLoop ? 1 : 0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (transitionEnabled) return undefined;

    const frame = window.requestAnimationFrame(() => {
      setTransitionEnabled(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [transitionEnabled]);

  useEffect(() => {
    if (reduceMotion || isPaused || images.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => current + 1);
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(timer);
  }, [images.length, isPaused, reduceMotion]);

  useEffect(() => {
    const syncPause = () => setIsPaused(document.hidden);
    document.addEventListener("visibilitychange", syncPause);
    return () => document.removeEventListener("visibilitychange", syncPause);
  }, []);

  return (
    <section
      data-scene
      aria-labelledby={`scene-${scene.id}`}
      className="relative isolate min-h-svh w-full overflow-hidden bg-deep-charcoal"
    >
      {/* Atmospheric depth — top radial glow + vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(140%_100%_at_50%_-20%,rgba(192,196,201,0.14),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_110%,rgba(192,196,201,0.08),transparent_60%)]"
      />
      {/* Subtle floor line for architectural grounding */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-silver/20 to-transparent"
      />

      <div
        className={`relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col items-center gap-10 px-6 py-20 lg:gap-16 lg:py-28 ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <div className="w-full lg:w-5/12">
          <p className="scene-copy-item mb-5 text-[11px] font-medium tracking-[0.4em] text-silver uppercase sm:text-xs">
            {scene.eyebrow}
          </p>
          <h2
            id={`scene-${scene.id}`}
            className="scene-copy-item max-w-xl text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[3.25rem] lg:leading-[1.05]"
          >
            {scene.heading}
          </h2>
          <p className="scene-copy-item mt-6 max-w-lg text-sm leading-relaxed text-silver sm:text-base">
            {scene.body}
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:max-w-md">
            {scene.labels.slice(0, 4).map((label) => (
              <li
                key={label}
                className="scene-label flex items-center gap-3 border-b border-white/25 py-3 text-sm font-semibold tracking-wide text-white sm:text-base"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-light-silver" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Gallery column — autoplaying artwork slider */}
        <div className="relative w-full perspective-[1800px] lg:w-7/12">
          {images.length > 0 ? (
            <figure
              className="scene-panel relative overflow-hidden"
              aria-label={`${scene.heading} image gallery`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => {
                if (!document.hidden) setIsPaused(false);
              }}
              onFocus={() => setIsPaused(true)}
              onBlur={(event) => {
                if (
                  !event.currentTarget.contains(event.relatedTarget) &&
                  !document.hidden
                ) {
                  setIsPaused(false);
                }
              }}
            >
              <div
                className="relative aspect-16/11 overflow-hidden rounded-xl shadow-[0_28px_36px_-18px_rgba(0,0,0,0.9)]"
                role="group"
                aria-roledescription="carousel"
                aria-label={`${scene.heading} artwork`}
              >
                {slides.map((image, index) => {
                  const imageIndex = hasLoop
                    ? (index - 1 + images.length) % images.length
                    : index;

                  return (
                    <div
                      key={`${image.id ?? image.src}-${index}`}
                      className={`absolute inset-0  ${
                        reduceMotion || !transitionEnabled
                          ? "transition-none"
                          : "transition-transform duration-700 ease-in-out"
                      }`}
                      style={{
                        transform: `translateX(${(index - activeIndex) * 100}%)`,
                      }}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${imageIndex + 1} of ${images.length}`}
                      aria-hidden={index !== activeIndex}
                      onTransitionEnd={(event) => {
                        if (
                          event.propertyName === "transform" &&
                          index === activeIndex &&
                          activeIndex === images.length + 1
                        ) {
                          setActiveIndex(1);
                          setTransitionEnabled(false);
                        }
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.src}
                        alt={image.alt ?? ""}
                        loading={imageIndex === 0 ? "eager" : "lazy"}
                        decoding="async"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  );
                })}
              </div>
            </figure>
          ) : (
            <div className="scene-panel flex min-h-130 flex-col items-center justify-center rounded-2xl border border-dashed border-silver/25 bg-graphite/50 p-10 text-center">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-silver/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-silver"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>
              <p className="text-sm font-semibold tracking-[0.3em] text-light-silver uppercase">
                Campaign Artwork
              </p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-medium-grey">
                Social media creatives, ad creatives, and campaign artwork will
                be added here once supplied. This layout is ready to receive
                them.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}