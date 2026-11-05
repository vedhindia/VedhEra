"use client";

import { motion, useReducedMotion } from "motion/react";
import { Palette, CodeXml, Megaphone, Layers, Video, Info, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { openings } from "@/data/career";

const ICONS = { Palette, CodeXml, Megaphone, Layers, Video };
const EASE = [0.22, 1, 0.36, 1];

/**
 * Open roles.
 *
 * The roles are standing profiles rather than confirmed vacancies, so the
 * section says so plainly and every card routes into the application form.
 *
 * @param {object} props
 * @param {(roleId: string) => void} props.onApply
 */
export default function OpeningsSection({ onApply }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="openings"
      aria-labelledby="openings-heading"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[var(--color-deep-charcoal)] py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_80%_0%,rgba(192,196,201,0.1),transparent_60%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <SectionHeading
          tone="dark"
          eyebrow={openings.eyebrow}
          title={openings.heading}
          body={openings.body}
        />

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-[var(--color-silver)]/18 bg-[var(--color-graphite)]/60 px-5 py-4 text-sm leading-relaxed text-[var(--color-silver)]"
        >
          <Info
            size={16}
            strokeWidth={1.7}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-[var(--color-light-silver)]"
          />
          <span>{openings.note}</span>
        </motion.p>

        <ul className="mt-12 grid list-none gap-6 lg:grid-cols-3">
          {openings.roles.map((role, index) => {
            const Icon = ICONS[role.icon] ?? Layers;
            return (
              <motion.li
                key={role.id}
                initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
                className={`group flex h-full flex-col rounded-3xl border border-white/10  p-7 ${
                  reduceMotion
                    ? ""
                    : "transition-[transform,border-color,box-shadow] duration-[420ms] ease-out hover:-translate-y-2 hover:border-[var(--color-silver)]/35 hover:shadow-[0_40px_70px_-40px_rgba(0,0,0,0.95)]"
                }`}
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-silver)]/20 bg-[var(--color-graphite)] text-[var(--color-light-silver)] transition-colors duration-300 group-hover:border-[var(--color-silver)]/45">
                  <Icon size={22} strokeWidth={1.5} />
                </span>

                <h3 className="mt-6 text-xl font-semibold tracking-tight text-white">
                  {role.title}
                </h3>

                <ul className="mt-4 flex list-none flex-wrap gap-2">
                  {[role.team, role.type, role.experience].filter(Boolean).map((meta) => (
                    <li
                      key={meta}
                      className="rounded-full border border-white/12 px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-[var(--color-silver)] uppercase"
                    >
                      {meta}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-sm leading-relaxed text-[var(--color-silver)]">
                  {role.summary}
                </p>

                <ul className="mt-6 flex list-none flex-wrap gap-x-4 gap-y-2">
                  {role.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2 text-xs text-[var(--color-light-silver)]"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 rounded-full bg-[var(--color-silver)]/70"
                      />
                      {skill}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => onApply?.(role.id)}
                  className="mt-8 inline-flex cursor-pointer items-center gap-2 self-start rounded-full border border-[var(--color-silver)]/35 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 group-hover:border-[var(--color-silver)] hover:bg-[var(--color-charcoal)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-silver)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  {openings.applyLabel}
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className={reduceMotion ? "" : "transition-transform duration-300 group-hover:translate-x-1"}
                  />
                </button>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
