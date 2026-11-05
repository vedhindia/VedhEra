"use client";

import { motion, useReducedMotion } from "motion/react";
import { Phone, Mail, MapPin, Clock, Info } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { contactDetails } from "@/data/contact";

const EASE = [0.22, 1, 0.36, 1];

const CARD_CLASS = (reduceMotion) =>
  `group p-5 ${
    reduceMotion
      ? ""
      : "transition-[transform,border-color,box-shadow] duration-[420ms] ease-out hover:-translate-y-1 hover:border-[var(--color-graphite)]/30 hover:shadow-[0_26px_46px_-32px_rgba(0,0,0,0.45)]"
  }`;

function IconChip({ Icon }) {
  return (
    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-graphite)]/15 bg-[var(--color-soft-white)] text-[var(--color-graphite)] transition-colors duration-300 group-hover:border-[var(--color-graphite)]/40">
      <Icon size={19} strokeWidth={1.6} />
    </span>
  );
}

function CardTitle({ children }) {
  return (
    <p className="text-[11px] font-medium tracking-[0.2em] text-[var(--color-medium-grey)] uppercase">
      {children}
    </p>
  );
}

const LINK_CLASS =
  "underline decoration-[var(--color-graphite)]/25 underline-offset-4 transition-colors duration-200 hover:text-[var(--color-charcoal)] hover:decoration-[var(--color-graphite)]/70";

/**
 * Contact information column.
 *
 * Every block is optional and driven by `contactDetails` in `src/data/contact.js`.
 * Nothing is invented: a block renders only when a verified value exists.
 */
export default function ContactDetails() {
  const reduceMotion = useReducedMotion();
  const { phone, email, address, hours } = contactDetails;

  const hasPhone = phone.numbers.length > 0;
  const hasEmail = Boolean(email.value);
  const hasAddress = address.lines.length > 0;
  const hasHours = hours.entries.length > 0;
  const isEmpty = !hasPhone && !hasEmail && !hasAddress && !hasHours;

  const reveal = (index) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.5, delay: index * 0.08, ease: EASE },
        };

  const blocks = [
    hasPhone && {
      key: "phone",
      label: phone.label,
      Icon: Phone,
      content: (
        <span className="block space-y-1">
          {phone.numbers.map((number) => (
            <a key={number.dial} href={`tel:${number.dial}`} className={`block ${LINK_CLASS}`}>
              {number.value}
            </a>
          ))}
        </span>
      ),
    },
    hasEmail && {
      key: "email",
      label: email.label,
      Icon: Mail,
      content: (
        <a href={`mailto:${email.value}`} className={LINK_CLASS}>
          {email.value}
        </a>
      ),
    },
    hasAddress && {
      key: "address",
      label: address.label,
      Icon: MapPin,
      content: (
        <address className="not-italic">
          {address.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      ),
    },
    hasHours && {
      key: "hours",
      label: hours.label,
      Icon: Clock,
      content: (
        <span className="block space-y-1">
          {hours.entries.map((entry) => (
            <span key={entry.days} className="flex flex-wrap justify-between gap-x-4">
              <span>{entry.days}</span>
              <span className="text-[var(--color-charcoal)]">{entry.time}</span>
            </span>
          ))}
        </span>
      ),
    },
  ].filter(Boolean);

  return (
    <div className="lg:col-span-5">
      <div className="lg:sticky lg:top-28">
        <SectionHeading
          tone="light"
          eyebrow={contactDetails.eyebrow}
          title={contactDetails.heading}
          body={contactDetails.body}
        />

        {blocks.length > 0 && (
          <ul className="mt-10 space-y-4">
            {blocks.map((block, index) => (
              <motion.li key={block.key} {...reveal(index)} className={CARD_CLASS(reduceMotion)}>
                <div className="flex items-start gap-4">
                  <IconChip Icon={block.Icon} />
                  <div className="min-w-0">
                    <CardTitle>{block.label}</CardTitle>
                    <div className="mt-2 text-sm leading-relaxed text-[var(--color-graphite)]">
                      {block.content}
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        )}

        {isEmpty && (
          <motion.p
            {...reveal(0)}
            className="mt-10 flex items-start gap-3 rounded-2xl border border-[var(--color-graphite)]/12 bg-white px-5 py-4 text-sm leading-relaxed text-[var(--color-charcoal)]"
          >
            <Info
              size={16}
              strokeWidth={1.7}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-[var(--color-medium-grey)]"
            />
            <span>{contactDetails.emptyNote}</span>
          </motion.p>
        )}
      </div>
    </div>
  );
}
