"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single, coordinated scroll-animation setup for the homepage.
 *
 * Aims to satisfy the project's animation requirements:
 *  - one central place that registers ScrollTrigger
 *  - clear scene boundaries via the `[data-scene]` attribute
 *  - full cleanup on unmount (gsap.context + revert)
 *  - no scroll hijacking and no scroll lock
 *  - disabled entirely when the user prefers reduced motion
 *
 * Markup contract:
 *  - `[data-hero]`                 the hero section
 *    - `[data-hero-content]`       content that fades/parallaxes on scroll
 *  - `[data-scene]`                a cinematic scene section (tall + sticky child)
 *    - `.scene-copy-item`          copy that fades up
 *    - `.scene-panel`              image panels that move in 3D
 *    - `.scene-label`              small chips/labels that stagger in
 */
export default function useHomeScrollAnimation(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ------------------------------------------------ Hero parallax
      const hero = document.querySelector("[data-hero]");
      const heroContent = hero?.querySelector("[data-hero-content]");
      if (hero && heroContent) {
        gsap.to(heroContent, {
          yPercent: -10,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // ------------------------------------------------ Cinematic scenes
      gsap.utils.toArray("[data-scene]").forEach((section) => {
        const copy = section.querySelectorAll(".scene-copy-item");
        const panels = section.querySelectorAll(".scene-panel");
        const labels = section.querySelectorAll(".scene-label");

        if (!copy.length && !panels.length && !labels.length) return;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        if (copy.length) {
          tl.from(
            copy,
            { opacity: 0, y: 80, duration: 1, stagger: 0.18 },
            0
          );
        }
        if (panels.length) {
          tl.from(
            panels,
            {
              yPercent: 28,
              rotateY: -18,
              scale: 0.92,
              transformOrigin: "center center",
              duration: 1.6,
              stagger: 0.14,
            },
            0.08
          );
        }
        if (labels.length) {
          tl.from(
            labels,
            { opacity: 0.1, y: 30, duration: 0.9, stagger: 0.1 },
            0.5
          );
        }
      });
    });

    // Recalculate once images/fonts have settled, so scene boundaries are right.
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh, { once: true });
    }

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [enabled]);
}