"use client";

import { motion, useReducedMotion } from "motion/react";
import { Palette, GraduationCap, Users, TrendingUp, Layers } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { whyWork } from "@/data/career";

const ICONS = { Palette, GraduationCap, Users, TrendingUp, Layers };
const EASE = [0.22, 1, 0.36, 1];

/**
 * Why Work With VedhEra  ? — heading pinned on the left, animated rows on the
 * right. No fabricated benefits or statistics.
 */
export default function WhyWorkSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="why-work-heading"
      className="w-full bg-[var(--color-soft-white)] py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              tone="light"
              eyebrow={whyWork.eyebrow}
              title={whyWork.heading}
              body={whyWork.body}
            />
          </div>
        </div>

        <ul className="lg:col-span-7">
          {whyWork.points.map((point, index) => {
            const Icon = ICONS[point.icon] ?? Layers;
            return (
              <motion.li
                key={point.title}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }}
                className="group flex items-start gap-5 border-t border-[var(--color-graphite)]/10 py-7 last:border-b"
              >
                <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--color-graphite)]/15 bg-white text-[var(--color-graphite)] transition-colors duration-300 group-hover:border-[var(--color-graphite)]/40">
                  <Icon size={20} strokeWidth={1.6} />
                </span>

                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-[var(--color-graphite)]">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-charcoal)]">
                    {point.text}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
