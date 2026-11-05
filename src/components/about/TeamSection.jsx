"use client";

import { motion } from "motion/react";
import { PenTool, Palette, CodeXml, Megaphone } from "lucide-react";
import useHydratedReducedMotion from "@/components/animations/useHydratedReducedMotion";
import SectionHeading from "@/components/ui/SectionHeading";
import { team } from "@/data/about";

const ICONS = { PenTool, Palette, CodeXml, Megaphone };
const EASE = [0.22, 1, 0.36, 1];

/**
 * Team section.
 *
 * No team photographs or verified profiles exist in the project, so this
 * presents the capabilities behind the work rather than inventing people.
 */
export default function TeamSection() {
  const reduceMotion = useHydratedReducedMotion();

  return (
    <section
      aria-labelledby="team-heading"
      className="w-full bg-[var(--color-section-light)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          tone="light"
          align="center"
          eyebrow={team.eyebrow}
          title={team.heading}
          body={team.body}
          className="mx-auto items-center text-center"
        />

        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {team.capabilities.map((item, index) => {
            const Icon = ICONS[item.icon] ?? Palette;
            return (
              <motion.li
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
                className="relative"
              >
                <div
                  aria-hidden="true"
                  className="absolute left-[7px] top-2 h-full w-px bg-gradient-to-b from-[var(--color-graphite)]/25 to-transparent sm:hidden"
                />
                <div
                  aria-hidden="true"
                  className="mb-6 hidden h-px w-full bg-gradient-to-r from-[var(--color-graphite)]/30 via-[var(--color-graphite)]/10 to-transparent sm:block"
                />

                <div className="relative flex items-start gap-5">
                  <span className="sm:hidden">
                    <span className="block h-[15px] w-[15px] rounded-full border border-[var(--color-graphite)]/35 bg-white" />
                  </span>

                  <div className="flex-1">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-graphite)]/15 text-[var(--color-graphite)]">
                      <Icon size={22} strokeWidth={1.5} />
                    </span>
                    <h3 className="mt-4 text-base font-semibold tracking-tight text-[var(--color-graphite)]">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
