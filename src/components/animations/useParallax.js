"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Gentle scroll-linked parallax for elements marked `[data-parallax]`.
 *
 * - The attribute value is the travel distance in percent (default 12).
 * - Disabled entirely when the user prefers reduced motion.
 * - Fully cleaned up on unmount via `gsap.context()`.
 * - No scroll hijacking and no pinning.
 */
export default function useParallax(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        const strength = parseFloat(el.dataset.parallax) || 12;

        gsap.fromTo(
          el,
          { yPercent: -strength },
          {
            yPercent: strength,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    });

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
