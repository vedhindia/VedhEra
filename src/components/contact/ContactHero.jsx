"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { contactHero } from "@/data/contact";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Contact hero — the same graphite opening used across the site, with abstract
 * silver geometry instead of stock photography.
 */
export default function ContactHero() {
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
      aria-labelledby="contact-hero-heading"
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
        <div className="lg:col-span-7">
          <motion.p
            {...reveal(0)}
            className="mb-6 text-[11px] font-medium tracking-[0.5em] text-[var(--color-silver)] uppercase sm:text-xs"
          >
            {contactHero.label}
          </motion.p>

          <motion.h1
            {...reveal(0.08)}
            id="contact-hero-heading"
            className="max-w-3xl text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {contactHero.heading}
          </motion.h1>

          <motion.p
            {...reveal(0.16)}
            className="mt-7 max-w-xl text-base leading-relaxed text-[var(--color-silver)] sm:text-lg"
          >
            {contactHero.body}
          </motion.p>

          <motion.div
            {...reveal(0.26)}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button href={contactHero.primaryCta.href} variant="light">
              {contactHero.primaryCta.label}
              <ArrowRight size={16} />
            </Button>
            <Button href={contactHero.secondaryCta.href} variant="secondary">
              {contactHero.secondaryCta.label}
            </Button>
          </motion.div>
        </div>

        {/* Abstract geometry — connected nodes, a conversation */}
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
                r="146"
                fill="none"
                stroke="rgba(192,196,201,0.14)"
                strokeWidth="1"
              />
              <path
                d="M200 4 V396 M4 200 H396"
                stroke="rgba(192,196,201,0.1)"
                strokeWidth="1"
              />
              {/* Connection lines */}
              <path
                d="M104 132 L296 268 M296 132 L104 268 M200 200 L104 132 M200 200 L296 132 M200 200 L104 268 M200 200 L296 268"
                stroke="rgba(192,196,201,0.28)"
                strokeWidth="1"
              />
              <circle cx="104" cy="132" r="6" fill="rgba(192,196,201,0.7)" />
              <circle cx="296" cy="132" r="6" fill="rgba(192,196,201,0.55)" />
              <circle cx="104" cy="268" r="6" fill="rgba(192,196,201,0.55)" />
              <circle cx="296" cy="268" r="6" fill="rgba(192,196,201,0.7)" />
              <circle cx="200" cy="200" r="9" fill="rgba(192,196,201,0.95)" />
              <circle
                cx="200"
                cy="200"
                r="34"
                fill="none"
                stroke="rgba(192,196,201,0.35)"
                strokeWidth="1"
              />
            </svg>

            <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,rgba(192,196,201,0.16),transparent_62%)] blur-2xl" />
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
          {contactHero.scrollCue}
        </span>
      </motion.div>
    </section>
  );
}
