"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  Armchair,
  Palette,
  PenTool,
  Ruler,
  Truck,
  Warehouse,
} from "lucide-react";
import useHydratedReducedMotion from "@/components/animations/useHydratedReducedMotion";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import ExhibitionGallerySection from "@/components/services/ExhibitionGallerySection";
import StallPortfolioCarousel from "@/components/services/StallPortfolioCarousel";
import StallEnquiryForm from "@/components/services/StallEnquiryForm";
import { stallClientLogos } from "@/data/clients";
import {
  stallDesignHero,
  stallProcess,
  stallProcessIntro,
  stallServices,
  stallServicesIntro,
  stallTypes,
  stallTypesIntro,
} from "@/data/stallDesign";

const EASE = [0.22, 1, 0.36, 1];

const SERVICE_ICONS = {
  PenTool,
  Ruler,
  Palette,
  Warehouse,
  Armchair,
  Truck,
};

/** Shared entrance: fade-up once, respecting reduced motion. */
function reveal(reduceMotion, delay = 0) {
  if (reduceMotion) {
    return { initial: false, animate: { opacity: 1, y: 0 } };
  }

  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: 0.6, delay, ease: EASE },
  };
}

function HeroSection({ reduceMotion }) {
  return (
    <section className="relative isolate overflow-hidden bg-graphite pt-32 pb-24 sm:pt-25 sm:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_80%_at_85%_-10%,rgba(192,196,201,0.16),transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_10%_110%,rgba(192,196,201,0.08),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-silver/25 to-transparent"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.7, ease: EASE }}
            className="mb-6 text-[11px] font-medium tracking-[0.4em] text-silver uppercase sm:text-xs"
          >
            {stallDesignHero.eyebrow}
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={
              reduceMotion ? undefined : { duration: 0.8, delay: 0.06, ease: EASE }
            }
            className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {stallDesignHero.heading}
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={
              reduceMotion ? undefined : { duration: 0.8, delay: 0.12, ease: EASE }
            }
            className="mt-7 max-w-2xl text-base leading-relaxed text-silver sm:text-lg"
          >
            {stallDesignHero.body}
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={
              reduceMotion ? undefined : { duration: 0.8, delay: 0.18, ease: EASE }
            }
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button href={stallDesignHero.primaryCta.href} variant="light">
              {stallDesignHero.primaryCta.label}
              <ArrowRight size={16} />
            </Button>
            <Button href={stallDesignHero.secondaryCta.href} variant="secondary">
              {stallDesignHero.secondaryCta.label}
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, clipPath: "inset(0% 0% 100% 0%)", scale: 1.04 }
          }
          animate={
            reduceMotion
              ? undefined
              : { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1 }
          }
          transition={
            reduceMotion ? undefined : { duration: 1.1, delay: 0.16, ease: EASE }
          }
          className="lg:col-span-6"
        >
          <div className="relative mx-auto w-full max-w-3xl">
            <div className="relative overflow-hidden  p-3 shadow-[0_50px_100px_-55px_rgba(0,0,0,0.95)]">
              <div className="overflow-hidden rounded-[1.3rem] bg-deep-charcoal">
                <video
                  aria-label={stallDesignHero.visual.alt}
                  width={stallDesignHero.visual.w}
                  height={stallDesignHero.visual.h}
                  autoPlay={!reduceMotion}
                  loop={!reduceMotion}
                  muted
                  playsInline
                  preload="metadata"
                  className="h-auto w-full object-contain"
                >
                  <source src="/images/stall-design/stall.mp4" type="video/mp4" />
                </video>
              </div>

              <div className="flex items-center justify-between gap-4 px-2 pt-3 pb-1">
                <span className="text-xs font-medium tracking-[0.28em] text-medium-grey uppercase">
                  {stallDesignHero.caption}
                </span>
                <span className="h-px flex-1 bg-linear-to-r from-silver/35 to-transparent" />
              </div>
            </div>

            
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StallTypesSection({ reduceMotion }) {
  return (
    <section
      id="stall-types"
      aria-labelledby="stall-types-heading"
      className="scroll-mt-28 bg-soft-white py-24 sm:py-12"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          id="stall-types-heading"
          tone="light"
          eyebrow={stallTypesIntro.eyebrow}
          title={stallTypesIntro.heading}
          body={stallTypesIntro.body}
        />

        <div className="mt-16 grid gap-6 perspective-[1400px] md:grid-cols-2 xl:grid-cols-3">
          {stallTypes.map((item, index) => (
            <motion.article
              key={item.id}
              {...reveal(reduceMotion, index * 0.06)}
              className={`group flex h-full flex-col p-5 ${
                reduceMotion
                  ? ""
                  : "transition-[transform,border-color,box-shadow] duration-420 ease-out hover:border-graphite/25 hover:shadow-[0_45px_80px_-52px_rgba(0,0,0,0.45)] motion-safe:hover:[transform:translateY(-8px)_rotateX(1.5deg)]"
              }`}
            >
              <div className="overflow-hidden bg-deep-charcoal">
                <div className="aspect-4/3 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.w}
                    height={item.image.h}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    className={`h-full w-full object-contain ${
                      reduceMotion
                        ? ""
                        : "transition-transform duration-600 ease-out group-hover:scale-[1.04]"
                    }`}
                  />
                </div>
              </div>

              <h3 className="mt-6 text-xl font-semibold tracking-tight text-graphite">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StallClientLogosSection() {
  return (
    <section
      aria-labelledby="stall-client-logos-heading"
      className="bg-soft-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          id="stall-client-logos-heading"
          tone="light"
          align="center"
          eyebrow="Exhibition Stall Clients"
          title="Brands We’ve Built Exhibition Experiences For."
          body="A selection of the brands whose exhibition presence we have helped bring to life."
          className="mx-auto items-center text-center"
        />

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:mt-14 sm:grid-cols-4 sm:gap-6">
          {stallClientLogos.map((logo) => (
            <li
              key={logo.id}
              className="group flex h-32 items-center justify-center rounded-md border border-graphite/10 bg-white p-5 sm:h-40 sm:p-8"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.name ?? ""}
                width="640"
                height="576"
                loading="eager"
                decoding="async"
                style={{ transform: `scale(${logo.scale})` }}
                className="h-full w-full object-contain opacity-60 grayscale transition-[filter,opacity] duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StallServicesSection({ reduceMotion }) {
  return (
    <section
      id="stall-services"
      aria-labelledby="stall-services-heading"
      className="relative isolate overflow-hidden bg-deep-charcoal py-24 scroll-mt-28 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_70%_at_15%_0%,rgba(192,196,201,0.1),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          id="stall-services-heading"
          tone="dark"
          eyebrow={stallServicesIntro.eyebrow}
          title={stallServicesIntro.heading}
          body={stallServicesIntro.body}
        />

        <ol className="mt-16 border-t border-white/15">
          {stallServices.map((service, index) => {
            const Icon = SERVICE_ICONS[service.icon] ?? PenTool;

            return (
              <motion.li
                key={service.title}
                {...reveal(reduceMotion, index * 0.06)}
                className={`group grid list-none grid-cols-[3rem_minmax(0,1fr)] gap-x-4 gap-y-2 border-b border-white/15 py-7 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-6 lg:grid-cols-[4rem_minmax(15rem,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-x-8 lg:py-8 ${
                  reduceMotion
                    ? ""
                    : "transition-colors duration-300 hover:border-silver/45"
                }`}
              >
                <span className="row-start-1 pt-0.5 text-xs font-medium tracking-[0.25em] text-silver/65 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="col-start-1 row-start-2 pt-0.5 text-light-silver transition-colors duration-300 group-hover:text-white">
                  <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="col-start-2 row-start-1 text-lg font-medium leading-snug tracking-tight text-white lg:col-start-2">
                  {service.title}
                </h3>
                <p className="col-start-2 row-start-2 text-sm leading-relaxed text-silver lg:col-start-3 lg:row-start-1">
                  {service.text}
                </p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function StallProcessSection({ reduceMotion }) {
  return (
    <section
      id="stall-process"
      aria-labelledby="stall-process-heading"
      className="bg-[var(--color-section-light)] py-24 scroll-mt-28 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          id="stall-process-heading"
          tone="light"
          eyebrow={stallProcessIntro.eyebrow}
          title={stallProcessIntro.heading}
          body={stallProcessIntro.body}
        />

        <ol className="mt-16 grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
          {stallProcess.map((step, index) => (
            <motion.li
              key={step.number}
              {...reveal(reduceMotion, index * 0.08)}
              className="relative list-none"
            >
              <div
                aria-hidden="true"
                className="mb-6 h-px w-full bg-linear-to-r from-graphite/35 via-graphite/12 to-transparent"
              />
              <span className="text-sm font-semibold tracking-[0.35em] text-medium-grey">
                {step.number}
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-graphite">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-charcoal">
                {step.text}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function StallDesignContent() {
  const reduceMotion = useHydratedReducedMotion();

  return (
    <>
      <HeroSection reduceMotion={reduceMotion} />
      <ExhibitionGallerySection />
      <StallPortfolioCarousel />
      <StallTypesSection reduceMotion={reduceMotion} />
      <StallClientLogosSection />
      <StallServicesSection reduceMotion={reduceMotion} />
      <StallProcessSection reduceMotion={reduceMotion} />
      <StallEnquiryForm />
    </>
  );
}
