"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  Palette,
  MonitorSmartphone,
  Megaphone,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { services } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";

const ICONS = { Palette, MonitorSmartphone, Megaphone, Building2 };

/** Services overview — an editorial, open-list showcase linking to each service. */
export default function ServicesOverview() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="services-overview"
      aria-label="Services overview"
      className="w-full bg-[var(--color-deep-charcoal)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="What We Do"
          title="Services Built Around Your Brand"
          body="One partner across design, digital, and exhibition experiences."
          tone="dark"
        />

        <ul className="mt-14 border-t border-white/15">
          {services.map((service, index) => {
            const Icon = ICONS[service.icon] ?? Palette;
            return (
              <motion.li
                key={service.id}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="list-none border-b border-white/15"
              >
                <Link
                  href={service.href}
                  className="group grid grid-cols-[3.5rem_minmax(0,1fr)_2rem] items-center gap-x-4 gap-y-3 py-7 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-silver)]/70 sm:grid-cols-[5rem_minmax(0,1fr)_minmax(15rem,0.8fr)_2.5rem] sm:gap-x-6 sm:py-8 lg:grid-cols-[7rem_minmax(0,1.1fr)_minmax(18rem,0.9fr)_3rem] lg:gap-x-8 lg:py-9"
                >
                  <span className="row-span-2 text-2xl font-light tracking-tight text-silver/45 tabular-nums transition-colors duration-300 group-hover:text-silver sm:row-span-1 sm:text-3xl">
                    0{index + 1}
                  </span>

                  <span className="flex min-w-0 items-center gap-3 text-white">
                    <Icon
                      size={19}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="shrink-0 text-silver transition-transform duration-300 group-hover:scale-110"
                    />
                    <h3 className="text-base font-medium leading-snug tracking-tight sm:text-lg lg:text-xl">
                      {service.title}
                    </h3>
                  </span>

                  <p className="col-start-2 text-sm leading-relaxed text-silver sm:col-start-auto">
                    {service.description}
                  </p>

                  <span className="col-start-3 row-start-1 row-span-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-silver transition-[color,border-color,transform] duration-300 group-hover:translate-x-1 group-hover:border-silver/50 group-hover:text-white sm:row-span-1 sm:h-10 sm:w-10">
                    <ArrowUpRight size={18} aria-hidden="true" />
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
