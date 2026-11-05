"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import useHydratedReducedMotion from "@/components/animations/useHydratedReducedMotion";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import StallScrollSequence from "@/components/services/StallScrollSequence";
import {
  stallGalleryClosing,
  stallGalleryIntro,
} from "@/data/stallGallery";

const EASE = [0.22, 1, 0.36, 1];

/** The heading doubles as the section's accessible name. */
const GALLERY_SECTION_ID = "stall-gallery-heading";

/**
 * Exhibition stall showcase.
 *
 * The section keeps its original heading and description, and the slot beneath
 * them now holds a scroll-controlled cinematic frame sequence (see
 * `StallScrollSequence`) in place of the earlier orbit gallery. The frames are
 * drawn exactly as supplied — nothing in this section recolours, redraws, or
 * composites over the stall footage.
 */
export default function ExhibitionGallerySection() {
  const reduceMotion = useHydratedReducedMotion();
  const trackRef = useRef(null);

  const reveal = (delay = 0) =>
    reduceMotion
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.75, delay, ease: EASE },
        };

  return (
    <section
      id="stall-gallery"
      aria-labelledby={GALLERY_SECTION_ID}
      className="relative isolate bg-[var(--color-black)] py-24 scroll-mt-28 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_60%_at_50%_0%,rgba(192,196,201,0.1),transparent_62%)]"
      />

      <div
        ref={trackRef}
        className="relative h-[170svh] sm:h-[185svh] lg:h-[200svh]"
      >
        <div className="sticky top-24 flex w-full justify-center">
          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-6 lg:grid-cols-12 lg:gap-12">
            <motion.div {...reveal(0)} className="lg:col-span-5">
              <div className="max-w-2xl">
                <SectionHeading
                  as="h2"
                  id={GALLERY_SECTION_ID}
                  eyebrow={stallGalleryIntro.eyebrow}
                  title={stallGalleryIntro.heading}
                  body={stallGalleryIntro.body}
                />
              </div>
            </motion.div>

            <motion.div {...reveal(0.08)} className="lg:col-span-7">
              <div className="relative mx-auto w-full max-w-3xl">
                <div className="overflow-hidden rounded-[1.8rem] rgba(255,255,255,0.015))] p-3 shadow-[0_50px_100px_-55px_rgba(0,0,0,0.95)] sm:p-4">
                  <div className="h-[16rem] sm:h-[21rem] lg:h-[26rem]">
                    <StallScrollSequence
                      embedded
                      fit="contain"
                      scrollTrackRef={trackRef}
                      className="overflow-hidden rounded-[1.3rem]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-20 w-full max-w-7xl px-6 sm:mt-24">
        <motion.div
          {...reveal(0)}
          className="flex flex-col items-start gap-7 border-t border-white/8 pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-[11px] font-medium tracking-[0.45em] text-[var(--color-silver)] uppercase">
            {stallGalleryClosing.eyebrow}
          </p>
          <Button href={stallGalleryClosing.cta.href} variant="light">
            {stallGalleryClosing.cta.label}
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
