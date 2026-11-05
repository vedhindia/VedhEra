"use client";

import { motion, useReducedMotion } from "motion/react";
import { Sparkles, Handshake, Target, Layers } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { lifeAtVedh } from "@/data/career";

const ICONS = { Sparkles, Handshake, Target, Layers };
const EASE = [0.22, 1, 0.36, 1];

/**
 * Life at VedhEra  .
 *
 * No office or team photographs exist in the project, so this presents the
 * studio culture instead of inventing people or borrowing stock imagery. As
 * soon as `lifeAtVedh.images` is populated the gallery replaces the cards.
 */
export default function LifeAtVedhSection() {
  const reduceMotion = useReducedMotion();
  const hasImages = lifeAtVedh.images.length > 0;

  return (
    <section
      aria-labelledby="life-at-vedh-heading"
      className="w-full bg-[var(--color-section-light)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          tone="light"
          eyebrow={lifeAtVedh.eyebrow}
          title={lifeAtVedh.heading}
          body={lifeAtVedh.body}
        />

        {hasImages ? (
          <ul className="mt-16 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lifeAtVedh.images.map((image, index) => (
              <motion.li
                key={image.src}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.07, ease: EASE }}
                className="group relative overflow-hidden rounded-3xl border border-[var(--color-graphite)]/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.w}
                  height={image.h}
                  loading="lazy"
                  decoding="async"
                  className={`aspect-[4/3] w-full object-cover ${
                    reduceMotion
                      ? ""
                      : "transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  }`}
                />
                {image.caption && (
                  <p className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.75),transparent)] px-5 pt-10 pb-4 text-sm text-white">
                    {image.caption}
                  </p>
                )}
              </motion.li>
            ))}
          </ul>
        ) : (
          <ul className="mt-16 grid list-none gap-6 md:grid-cols-3">
            {lifeAtVedh.pillars.map((pillar, index) => {
              const Icon = ICONS[pillar.icon] ?? Layers;
              return (
                <motion.li
                  key={pillar.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
                  className={`flex h-full flex-col rounded-3xl border border-[var(--color-graphite)]/10 bg-[var(--color-soft-white)] p-7 ${
                    reduceMotion
                      ? ""
                      : "transition-[transform,border-color] duration-[420ms] ease-out hover:-translate-y-1.5 hover:border-[var(--color-graphite)]/25"
                  }`}
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-graphite)]/15 bg-white text-[var(--color-graphite)]">
                    <Icon size={22} strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-[var(--color-graphite)]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-charcoal)]">
                    {pillar.text}
                  </p>
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
