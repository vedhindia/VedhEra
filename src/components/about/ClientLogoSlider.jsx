import SectionHeading from "@/components/ui/SectionHeading";
import { clientLogos as defaultLogos } from "@/data/clients";

/**
 * One copy of the logo row. Two of these sit side by side inside the track;
 * the track is translated by -50% so the second copy seamlessly replaces the
 * first with no visible jump or blank gap. The trailing padding matches the
 * inter-item gap so spacing stays even across the seam.
 */
function LogoGroup({ logos, ariaHidden = false }) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-14 pr-14 sm:gap-20 sm:pr-20"
    >
      {logos.map((logo) => (
        <li
          key={logo.id}
          className="flex h-60 w-54 shrink-0 items-center justify-center sm:h-12 sm:w-32 lg:h-34 lg:w-56"
        >
          {/* Logos are decorative marks; the section heading carries meaning. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo.src}
            alt={logo.name ?? ""}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain opacity-55 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * Continuous client-logo slider.
 *
 * Pure CSS keyframe marquee (no carousel library): seamless infinite loop,
 * pauses on hover for pointer devices, and falls back to a horizontally
 * scrollable row when the user prefers reduced motion.
 */
export default function ClientLogoSlider({
  ariaLabel = "Brands we have worked with",
  eyebrow = "Our Clients",
  title = "Brands We’ve Worked With.",
  body = "Building connections and creating meaningful brand experiences across industries.",
  logos = defaultLogos,
}) {
  return (
    <section
      aria-label={ariaLabel}
      className="w-full overflow-hidden bg-soft-white py-24 sm:py-18"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          tone="light"
          align="center"
          eyebrow={eyebrow}
          title={title}
          body={body}
          className="mx-auto items-center text-center"
        />
      </div>

      <div
        className="marquee relative mt-14 overflow-hidden"
        style={{ "--marquee-duration": "80s" }}
      >
        <div className="marquee-track flex w-max">
          <LogoGroup logos={logos} />
          <LogoGroup logos={logos} ariaHidden />
        </div>

        {/* Edge fades so logos dissolve rather than clip at the sides. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-soft-white to-transparent sm:w-28"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-soft-white to-transparent sm:w-28"
        />
      </div>
    </section>
  );
}
