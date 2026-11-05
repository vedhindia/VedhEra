"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { careerHero } from "@/data/career";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Career hero — the same graphite opening used across the site, with abstract
 * silver geometry instead of stock photography.
 */
export default function CareerHero() {
  const reduceMotion = useReducedMotion();

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
      aria-labelledby="career-hero-heading"
      className="relative isolate overflow-hidden bg-[var(--color-graphite)] pt-36 pb-24 sm:pt-24 sm:pb-22"
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
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-[var(--color-silver)]/25 to-transparent"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <div className="lg:col-span-7">
          <motion.p
            {...reveal(0)}
            className="mb-6 text-[11px] font-medium tracking-[0.5em] text-[var(--color-silver)] uppercase sm:text-xs"
          >
            {careerHero.label}
          </motion.p>

          <motion.h1
            {...reveal(0.08)}
            id="career-hero-heading"
            className="max-w-3xl text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {careerHero.heading}
          </motion.h1>

          <motion.p
            {...reveal(0.16)}
            className="mt-7 max-w-xl text-base leading-relaxed text-[var(--color-silver)] sm:text-lg"
          >
            {careerHero.body}
          </motion.p>

          <motion.div
            {...reveal(0.26)}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button href={careerHero.primaryCta.href} variant="light">
              {careerHero.primaryCta.label}
              <ArrowRight size={16} />
            </Button>
            <Button href={careerHero.secondaryCta.href} variant="secondary">
              {careerHero.secondaryCta.label}
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
                r="148"
                fill="none"
                stroke="rgba(192,196,201,0.14)"
                strokeWidth="1"
              />
              <path
                d="M200 4 V396 M4 200 H396"
                stroke="rgba(192,196,201,0.1)"
                strokeWidth="1"
              />
              {/* Ascending path — a career moving upward */}
              <path
                d="M40 330 L140 250 L240 290 L360 90"
                fill="none"
                stroke="rgba(192,196,201,0.55)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="40" cy="330" r="4" fill="rgba(192,196,201,0.5)" />
              <circle cx="140" cy="250" r="4" fill="rgba(192,196,201,0.65)" />
              <circle cx="240" cy="290" r="4" fill="rgba(192,196,201,0.8)" />
              <circle cx="360" cy="90" r="6" fill="rgba(192,196,201,0.95)" />
              <path
                d="M320 90 H360 V130"
                fill="none"
                stroke="rgba(192,196,201,0.45)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

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
          {careerHero.scrollCue}
        </span>
      </motion.div>
    </section>
  );
}
