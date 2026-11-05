import { contactCta } from "@/data/services";
import Button from "@/components/ui/Button";

/**
 * Closing contact call-to-action — cinematic atmospheric background with
 * silver/grey tonal depth, matching the premium closing aesthetic.
 */
export default function ContactCTA() {
  return (
    <section
      aria-label="Contact VedhEra  "
      className="relative isolate w-full overflow-hidden bg-[var(--color-black)] py-28 sm:py-36"
    >
      {/* Atmospheric depth layers */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_80%_at_80%_120%,rgba(192,196,201,0.18),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_15%_0%,rgba(192,196,201,0.08),transparent_55%)]"
      />
      {/* Subtle horizon line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-silver)]/25 to-transparent"
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <p className="mb-6 text-[11px] font-medium tracking-[0.5em] text-[var(--color-silver)] uppercase sm:text-xs">
          Let&apos;s Work Together
        </p>
        <h2 className="text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {contactCta.heading}
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--color-silver)] sm:text-base">
          {contactCta.body}
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button href={contactCta.primary.href} variant="light">
            {contactCta.primary.label}
          </Button>
          <Button href={contactCta.secondary.href} variant="secondary">
            {contactCta.secondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}