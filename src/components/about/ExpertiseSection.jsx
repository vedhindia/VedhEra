"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Palette,
  MonitorSmartphone,
  Megaphone,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import useHydratedReducedMotion from "@/components/animations/useHydratedReducedMotion";
import SectionHeading from "@/components/ui/SectionHeading";
import { expertise } from "@/data/about";

const ICONS = { Palette, MonitorSmartphone, Megaphone, Building2 };
const EASE = [0.22, 1, 0.36, 1];

/**
 * Our Expertise — an open, editorial service list linking to the existing
 * service routes.
 */
export default function ExpertiseSection() {
  const reduceMotion = useHydratedReducedMotion();

  return (
    <section
      id="expertise"
      aria-label="Our expertise"
      className="w-full scroll-mt-24 bg-[var(--color-section-light)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          tone="light"
          eyebrow={expertise.eyebrow}
          title={expertise.heading}
        />

        <ul className="mt-14 grid border-t border-[var(--color-graphite)]/15 sm:grid-cols-2 sm:gap-x-10">
          {expertise.items.map((item, index) => {
            const Icon = ICONS[item.icon] ?? Palette;
            return (
              <motion.li
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
                className="list-none border-b border-[var(--color-graphite)]/15"
              >
                <Link
                  href={item.href}
                  className="group grid min-h-40 grid-cols-[2.5rem_minmax(0,1fr)_2rem] items-center gap-x-4 gap-y-3 py-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-graphite)]/60 sm:min-h-44 sm:grid-cols-[3rem_minmax(0,1fr)_2rem] sm:gap-x-5 sm:py-8"
                >
                  <span className="row-span-2 self-start pt-1 text-xs font-medium tracking-[0.22em] text-[var(--color-medium-grey)] tabular-nums">
                    0{index + 1}
                  </span>
                  <span className="flex items-start gap-3 text-[var(--color-graphite)]">
                    <Icon
                      size={21}
                      strokeWidth={1.6}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-[var(--color-medium-grey)] transition-colors duration-300 group-hover:text-[var(--color-graphite)]"
                    />
                    <h3 className="text-base font-semibold leading-snug tracking-tight sm:text-lg">
                      {item.title}
                    </h3>
                  </span>
                  <p className="col-start-2 text-sm leading-relaxed text-[var(--color-charcoal)]">
                    {item.description}
                  </p>
                  <span className="col-start-3 row-start-1 row-span-2 flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-graphite)] transition-[background-color,transform] duration-300 group-hover:translate-x-1 group-hover:bg-[var(--color-graphite)]/5 sm:h-9 sm:w-9">
                    <ArrowUpRight
                      size={18}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
