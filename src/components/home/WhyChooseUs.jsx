"use client";

import { motion, useReducedMotion } from "motion/react";
import { CalendarDays, FolderCheck, Tags, UsersRound } from "lucide-react";
import { whyChooseUs } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";

const ICONS = { CalendarDays, FolderCheck, Tags, UsersRound };

/**
 * Why Choose VedhEra  — a compact, editorial stats row.
 */
export default function WhyChooseUs() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Why choose VedhEra"
      className="w-full bg-[var(--color-graphite)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Why VedhEra "

          title={whyChooseUs.heading}
          body={whyChooseUs.intro}
          tone="dark"
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.stats.map((stat, index) => {
            const Icon = ICONS[stat.icon] ?? FolderCheck;
            return (
              <motion.div
                key={stat.label}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex items-center gap-5 px-5 py-7 sm:px-7 sm:py-8"
              >
                <span className="shrink-0 text-[var(--color-light-silver)]">
                  <Icon size={44} strokeWidth={1.3} />
                </span>
                <div className="min-w-0">
                  <p className="text-3xl font-light leading-none tracking-tight text-[var(--color-silver)] sm:text-4xl">
                    {stat.value}
                  </p>
                  <h3 className="mt-3 text-xs font-medium tracking-[0.22em] text-white uppercase sm:text-sm">
                    {stat.label}
                  </h3>
                </div>
                {index < whyChooseUs.stats.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-5 right-5 h-px bg-white/15 sm:left-7 sm:right-7 lg:hidden ${
                      index < 2 ? "sm:block" : "sm:hidden"
                    }`}
                  />
                )}
                {index % 2 === 0 && index < whyChooseUs.stats.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`absolute right-0 top-5 bottom-5 hidden w-px bg-white/15 sm:block ${
                      index < 3 ? "lg:block" : "lg:hidden"
                    }`}
                  />
                )}
                {index % 2 === 1 && index < whyChooseUs.stats.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute right-0 top-5 bottom-5 hidden w-px bg-white/15 lg:block"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}