"use client";

import { motion } from "motion/react";
import { Compass, Eye } from "lucide-react";
import useHydratedReducedMotion from "@/components/animations/useHydratedReducedMotion";
import { missionVision } from "@/data/about";

const EASE = [0.22, 1, 0.36, 1];

const PANELS = [
  { key: "mission", icon: Compass, ...missionVision.mission },
  { key: "vision", icon: Eye, ...missionVision.vision },
];

/**
 * Mission and Vision — two elegant side-by-side panels with understated
 * silver accents.
 */
export default function MissionVisionSection() {
  const reduceMotion = useHydratedReducedMotion();

  return (
    <section
      aria-label="Mission and vision"
      className="relative isolate w-full overflow-hidden bg-[var(--color-deep-charcoal)] py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_80%_at_50%_-20%,rgba(192,196,201,0.12),transparent_60%)]"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2 lg:gap-10">
        {PANELS.map((panel, index) => {
          const Icon = panel.icon;
          return (
            <motion.article
              key={panel.key}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: EASE }}
              className="relative overflow-hidden rounded-2xl border border-[var(--color-silver)]/15 bg-[var(--color-graphite)]/60 p-9 sm:p-12"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-9 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-silver)]/50 to-transparent sm:inset-x-12"
              />

              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-silver)]/25 text-[var(--color-silver)]">
                <Icon size={22} strokeWidth={1.5} />
              </span>

              <p className="mt-7 text-[11px] font-medium tracking-[0.4em] text-[var(--color-silver)] uppercase">
                {panel.label}
              </p>
              <p className="mt-5 text-lg leading-relaxed text-[var(--color-light-silver)] sm:text-xl">
                {panel.text}
              </p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
