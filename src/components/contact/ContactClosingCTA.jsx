import Button from "@/components/ui/Button";
import { contactClosingCta } from "@/data/contact";

/**
 * Closing call to action — the same dark black closing aesthetic used site-wide.
 */
export default function ContactClosingCTA() {
  return (
    <section
      aria-labelledby="contact-closing-heading"
      className="relative isolate w-full overflow-hidden bg-[var(--color-black)] py-28 sm:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_80%_at_80%_120%,rgba(192,196,201,0.18),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_15%_0%,rgba(192,196,201,0.08),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-[var(--color-silver)]/25 to-transparent"
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <p className="mb-6 text-[11px] font-medium tracking-[0.5em] text-[var(--color-silver)] uppercase sm:text-xs">
          {contactClosingCta.eyebrow}
        </p>
        <h2
          id="contact-closing-heading"
          className="text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {contactClosingCta.heading}
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--color-silver)] sm:text-base">
          {contactClosingCta.body}
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button href={contactClosingCta.primary.href} variant="light">
            {contactClosingCta.primary.label}
          </Button>
          <Button href={contactClosingCta.secondary.href} variant="secondary">
            {contactClosingCta.secondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
