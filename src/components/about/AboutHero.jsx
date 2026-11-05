"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import useHydratedReducedMotion from "@/components/animations/useHydratedReducedMotion";
import Button from "@/components/ui/Button";
import { aboutHero } from "@/data/about";

const EASE = [0.22, 1, 0.36, 1];
const ORBIT_POINTS = [
  { cx: 340, cy: 60 },
  { cx: 396, cy: 200 },
  { cx: 340, cy: 340 },
  { cx: 200, cy: 396 },
  { cx: 60, cy: 340 },
  { cx: 4, cy: 200 },
  { cx: 60, cy: 60 },
  { cx: 200, cy: 4 },
  { cx: 340, cy: 60 },
];

/**
 * About hero — cinematic graphite opening with abstract silver geometry.
 * No stock photography is used; the visual interest comes from restrained
 * geometric line-work that matches the brand identity.
 */
export default function AboutHero() {
  const reduceMotion = useHydratedReducedMotion();

  const reveal = (delay = 0) =>
    reduceMotion
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative isolate overflow-hidden bg-[var(--color-graphite)] pt-16 pb-24 sm:pt-24 sm:pb-22"
    >
      {/* Atmospheric lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_90%_at_85%_-10%,rgba(192,196,201,0.16),transparent_58%)]"
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
        {/* Copy */}
        <div className="lg:col-span-7">
          <motion.p
            {...reveal(0)}
            className="mb-6 text-[11px] font-medium tracking-[0.5em] text-[var(--color-silver)] uppercase sm:text-xs"
          >
            {aboutHero.label}
          </motion.p>

          <motion.h1
            {...reveal(0.08)}
            id="about-hero-heading"
            className="max-w-3xl text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {aboutHero.heading}
          </motion.h1>

          <motion.p
            {...reveal(0.16)}
            className="mt-7 max-w-xl text-base leading-relaxed text-[var(--color-silver)] sm:text-lg"
          >
            {aboutHero.body}
          </motion.p>

          <motion.div
            {...reveal(0.26)}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button href={aboutHero.primaryCta.href} variant="light">
              {aboutHero.primaryCta.label}
              <ArrowRight size={16} />
            </Button>
            <Button href={aboutHero.secondaryCta.href} variant="secondary">
              {aboutHero.secondaryCta.label}
            </Button>
          </motion.div>
        </div>

        {/* Abstract geometry */}
        <motion.div
          {...reveal(0.3)}
          aria-hidden="true"
          className="relative hidden items-center justify-center lg:col-span-5 lg:flex"
        >
          <div className="relative h-[26rem] w-[26rem] [perspective:1200px]">
            <svg
              viewBox="0 0 400 400"
              className="absolute inset-0 h-full w-full"
              style={{ transform: "rotateY(-14deg) rotateX(8deg)" }}
            >
              <circle
                cx="200"
                cy="200"
                r="196"
                fill="none"
                stroke="rgba(192,196,201,0.22)"
                strokeWidth="1"
              />
              <circle
                cx="200"
                cy="200"
                r="150"
                fill="none"
                stroke="rgba(192,196,201,0.16)"
                strokeWidth="1"
              />
              <circle
                cx="200"
                cy="200"
                r="104"
                fill="none"
                stroke="rgba(192,196,201,0.12)"
                strokeWidth="1"
              />
              <path
                d="M200 4 V396 M4 200 H396"
                stroke="rgba(192,196,201,0.12)"
                strokeWidth="1"
              />
              <path
                d="M60 340 A196 196 0 0 1 340 60"
                fill="none"
                stroke="rgba(192,196,201,0.5)"
                strokeWidth="1.5"
              />
              
            </svg>

            {/* Monogram */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="motion-safe:animate-[vedh-icon-rotate-horizontal_8s_linear_infinite] [transform-style:preserve-3d]">
                <Image
                  src="/images/vedh_silver.png"
                  alt="VedhEra  icon"
                  width={240}
                  height={180}
                  className="h-auto w-[14rem] select-none opacity-95 [filter:drop-shadow(0_0_20px_rgba(192,196,201,0.18))]"
                  priority={false}
                />
              </div>
            </div>

            <div
              className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,rgba(192,196,201,0.16),transparent_62%)] blur-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        {...reveal(0.4)}
        className="relative z-10 mx-auto mt-16 flex max-w-7xl items-center gap-3 px-6"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-silver)]/35">
          <ArrowDown size={16} className="text-[var(--color-silver)]" />
        </span>
        <span className="text-xs font-medium tracking-[0.35em] text-[var(--color-silver)] uppercase">
          Discover More
        </span>
      </motion.div>
    </section>
  );
}
