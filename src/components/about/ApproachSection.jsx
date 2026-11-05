"use client";

import { motion } from "motion/react";
import useHydratedReducedMotion from "@/components/animations/useHydratedReducedMotion";
import SectionHeading from "@/components/ui/SectionHeading";
import { approach } from "@/data/about";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Our Approach — a four-step process shown as a horizontal timeline on
 * desktop that stacks into a vertical timeline on mobile. Each step reveals
 * as it scrolls into view.
 */
export default function ApproachSection() {
  const reduceMotion = useHydratedReducedMotion();

  return (
    <section
      aria-labelledby="approach-heading"
      className="relative isolate w-full overflow-hidden bg-[var(--color-graphite)] py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_-10%,rgba(192,196,201,0.1),transparent_60%)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading
          tone="dark"
          eyebrow={approach.eyebrow}
          title={approach.heading}
          body={approach.body}
        />

        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {approach.steps.map((step, index) => (
            <motion.li
              key={step.number}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
              className="relative"
            >
              {/* Timeline rail — horizontal on desktop, vertical on mobile */}
              <div
                aria-hidden="true"
                className="absolute left-[7px] top-2 h-full w-px bg-gradient-to-b from-[var(--color-silver)]/30 to-transparent sm:hidden"
              />
              <div
                aria-hidden="true"
                className="mb-6 hidden h-px w-full bg-gradient-to-r from-[var(--color-silver)]/40 via-[var(--color-silver)]/15 to-transparent sm:block"
              />

              <div className="relative flex items-start gap-5">
                <span className="sm:hidden">
                  <span className="block h-[15px] w-[15px] rounded-full border border-[var(--color-silver)]/50 bg-[var(--color-graphite)]" />
                </span>

                <div className="flex-1">
                  <span className="text-sm font-semibold tracking-[0.35em] text-[var(--color-silver)]">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--color-silver)]">
                    {step.text}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
