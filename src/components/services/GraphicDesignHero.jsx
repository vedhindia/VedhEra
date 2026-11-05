"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

const EASE = [0.22, 1, 0.36, 1];

/** Real supplied graphic-design work, used as supporting hero visuals. */
const HERO_VISUALS = [
  {
    src: "/images/graphic-design/branding/branding13.webp",
    alt: "Brand identity design artwork by VedhEra  ",
    className:
      "absolute inset-0 h-full w-full  object-conver p-3",
  },
  {
    src: "/images/graphic-design/brochures/broucher3.webp",
    alt: "Editorial brochure spread by VedhEra  ",
    className:
      "absolute -bottom-8 -left-8 hidden h-40 w-56 bg-[var(--color-deep-charcoal)] object-cover p-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.95)] sm:block lg:h-44 lg:w-64",
  },
];

/**
 * Graphic Design hero.
 *
 * Matches the site-wide graphite/silver identity with large editorial
 * typography, real supplied artwork, and a refined entrance animation.
 */
export default function GraphicDesignHero() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    reduceMotion
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  const scrollToLogos = (event) => {
    event.preventDefault();
    const target = document.getElementById("logo-design");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      aria-labelledby="gd-hero-heading"
      className="relative isolate overflow-hidden bg-[var(--color-graphite)] pt-36 pb-20 sm:pt-24 sm:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_90%_at_80%_-10%,rgba(192,196,201,0.16),transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_5%_110%,rgba(192,196,201,0.07),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-silver)]/25 to-transparent"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.p
            {...reveal(0)}
            className="mb-6 text-[11px] font-medium tracking-[0.5em] text-[var(--color-silver)] uppercase sm:text-xs"
          >
            Services / Graphic Design
          </motion.p>

          <motion.h1
            {...reveal(0.08)}
            id="gd-hero-heading"
            className="max-w-3xl text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Design That Makes Brands Unforgettable.
          </motion.h1>

          <motion.p
            {...reveal(0.16)}
            className="mt-7 max-w-xl text-base leading-relaxed text-[var(--color-silver)] sm:text-lg"
          >
            From distinctive logos to powerful brand identities, we create
            visuals that help businesses stand out and stay memorable.
          </motion.p>

          <motion.div
            {...reveal(0.26)}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button
              href="#logo-design"
              variant="light"
              onClick={scrollToLogos}
            >
              Explore Our Work
              <ArrowRight size={16} />
            </Button>
            <Button href="/contact" variant="secondary">
              Start Your Project
            </Button>
          </motion.div>
        </div>

        {/* Real graphic-design visuals */}
        <motion.div
          {...reveal(0.3)}
          className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none"
        >
          <div className="relative aspect-[4/3] [perspective:1200px]">
            <div
              className="relative h-full w-full"
              style={{ transform: "rotateY(-10deg) rotateX(4deg)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={HERO_VISUALS[0].src}
                alt={HERO_VISUALS[0].alt}
                className={HERO_VISUALS[0].className}
                draggable={false}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={HERO_VISUALS[1].src}
                alt={HERO_VISUALS[1].alt}
                className={HERO_VISUALS[1].className}
                draggable={false}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
