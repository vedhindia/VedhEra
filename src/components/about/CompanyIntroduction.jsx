"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import useHydratedReducedMotion from "@/components/animations/useHydratedReducedMotion";
import useParallax from "@/components/animations/useParallax";
import { companyIntro } from "@/data/about";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Company introduction — two columns with the story on the left and a real
 * piece of VedhEra  work on the right, drifting gently on scroll.
 */
export default function CompanyIntroduction() {
  const reduceMotion = useHydratedReducedMotion();
  useParallax(!reduceMotion);

  return (
    <section
      aria-labelledby="company-intro-heading"
      className="w-full bg-[var(--color-soft-white)] py-24 sm:py-10"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        {/* Text */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionHeading
            as="h2"
            tone="light"
            eyebrow={companyIntro.eyebrow}
            title={companyIntro.heading}
            className="[&>h2]:max-w-xl"
          />
          <div className="mt-6 space-y-5">
            {companyIntro.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="max-w-xl text-sm leading-relaxed text-[var(--color-charcoal)] sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Visual */}
        <motion.figure
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="relative aspect-[5/5] overflow-hidden sm:aspect-[4/4] lg:aspect-[5/5]">
            <div
              data-parallax="7"
              className="absolute inset-x-0 -top-[8%] h-[116%] w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={companyIntro.image.src}
                alt={companyIntro.image.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain p-6"
              />
            </div>
          </div>

          {/* Accent frame */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px "
          />
        </motion.figure>
      </div>
    </section>
  );
}
