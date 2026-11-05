"use client";

import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import EagleHeroVideo from "./EagleHeroVideo";
import { heroTagline } from "@/data/services";

/**
 * Full-screen cinematic hero.
 *
 * The eagle video occupies the full background; the tagline is real HTML
 * text that enters from the right once the video signals it (or after a
 * short fallback delay).
 */
export default function HomeHero() {
  const [revealed, setRevealed] = useState(false);
  const reduceMotion = useReducedMotion();
  const handleReveal = useCallback(() => setRevealed(true), []);

  const taglineLines = heroTagline.split(". ").map((part, i, arr) =>
    i < arr.length - 1 ? part + "." : part
  );

  const fadeProps = reduceMotion
    ? { initial: false, animate: { opacity: 1, x: 0 } }
    : {
        initial: { opacity: 0, x: 100 },
        animate: revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 },
      };

  return (
    <section
      data-hero
      aria-label="VedhEra  introduction"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[var(--color-black)]"
    >
      <EagleHeroVideo onReveal={handleReveal} />

      {/* Readability overlays — darker on the right for tagline contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.35)_0%,rgba(5,5,5,0.55)_45%,rgba(5,5,5,0.85)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.4)_0%,transparent_30%,rgba(5,5,5,0.6)_100%)]"
      />

      <div
        data-hero-content
        className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-center px-6 pb-16 pt-32 sm:pb-20"
      >
        <div className="w-full lg:w-1/2 lg:ml-auto lg:pl-8">
          <motion.p
            {...fadeProps}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-[11px] font-medium tracking-[0.5em] text-[var(--color-silver)] uppercase sm:text-xs"
          >
            Creative · Strategic · Digital
          </motion.p>

          <motion.h1
            {...fadeProps}
            transition={{
              duration: 1.15,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.08,
            }}
            className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            {taglineLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          {/* Scroll to explore */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: revealed || reduceMotion ? 1 : 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mt-12 flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-silver)]/40">
              <ChevronDown
                size={18}
                className="text-[var(--color-silver)]"
                aria-hidden="true"
              />
            </span>
            <span className="text-xs font-medium tracking-[0.35em] text-[var(--color-silver)] uppercase">
              Scroll to Explore
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}