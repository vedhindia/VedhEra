"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowRight,
  ChevronDown,
  FileText,
  Megaphone,
  MousePointerClick,
  Search,
  Share2,
  ShieldCheck,
  Users,
} from "lucide-react";
import useHydratedReducedMotion from "@/components/animations/useHydratedReducedMotion";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  digitalMarketingCta,
  digitalMarketingHero,
  marketingProcess,
  marketingServices,
  marketingServicesIntro,
} from "@/data/digitalMarketing";

const EASE = [0.22, 1, 0.36, 1];

const SERVICE_ICONS = {
  Search,
  Share2,
  Megaphone,
  MousePointerClick,
  FileText,
  Users,
  ShieldCheck,
};

const SERVICE_ICON_STYLES = {
  seo: "bg-emerald-100 text-emerald-800",
  "social-media": "bg-violet-100 text-violet-800",
  "meta-ads": "bg-blue-100 text-blue-800",
  "google-ads": "bg-amber-100 text-amber-800",
  "content-marketing": "bg-rose-100 text-rose-800",
  "lead-generation": "bg-cyan-100 text-cyan-800",
  orm: "bg-orange-100 text-orange-800",
};

function HeroSection({ reduceMotion }) {
  const floating = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          animate: { y: [0, -12, 0] },
          transition: {
            duration: 6.5,
            delay,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          },
        };

  const reveal = (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section
      aria-labelledby="digital-marketing-hero-heading"
      className="relative isolate overflow-hidden bg-graphite pt-32 pb-24 sm:pt-25 sm:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_80%_at_85%_-10%,rgba(192,196,201,0.16),transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_8%_110%,rgba(192,196,201,0.09),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-silver/25 to-transparent"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <motion.p
            {...reveal(0)}
            className="mb-6 text-[11px] font-medium tracking-[0.5em] text-silver uppercase sm:text-xs"
          >
            {digitalMarketingHero.eyebrow}
          </motion.p>

          <motion.h1
            {...reveal(0.06)}
            id="digital-marketing-hero-heading"
            className="max-w-4xl text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {digitalMarketingHero.heading}
          </motion.h1>

          <motion.p
            {...reveal(0.12)}
            className="mt-7 max-w-2xl text-base leading-relaxed text-silver sm:text-lg"
          >
            {digitalMarketingHero.body}
          </motion.p>

          <motion.div
            {...reveal(0.18)}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button href={digitalMarketingHero.primaryCta.href} variant="light">
              {digitalMarketingHero.primaryCta.label}
              <ArrowRight size={16} />
            </Button>
            <Button
              href={digitalMarketingHero.secondaryCta.href}
              variant="secondary"
            >
              {digitalMarketingHero.secondaryCta.label}
            </Button>
          </motion.div>
        </div>

        <motion.div
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 28 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.9, delay: 0.16, ease: EASE },
              })}
              className="lg:col-span-6"
        >
              <div className="mx-auto w-full max-w-xl lg:max-w-none">
                <motion.div {...floating(0)}>
                  <Image
                    src={digitalMarketingHero.image.src}
                    alt={digitalMarketingHero.image.alt}
                    width={1448}
                    height={1086}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="h-auto w-full"
                  />
                </motion.div>
              </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection({ reduceMotion }) {
  const [openServiceId, setOpenServiceId] = useState(null);

  return (
    <section
      id="marketing-services"
      aria-labelledby="marketing-services-heading"
      className="scroll-mt-28 bg-soft-white pt-28 pb-24 sm:scroll-mt-32 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          tone="light"
          id="marketing-services-heading"
          eyebrow={marketingServicesIntro.eyebrow}
          title={marketingServicesIntro.heading}
          body={marketingServicesIntro.body}
        />

        <div className="mt-16 grid items-start gap-x-16 lg:grid-cols-2">
          {marketingServices.map((service, index) => {
            const Icon = SERVICE_ICONS[service.icon] ?? Megaphone;
            const isOpen = openServiceId === service.id;
            const triggerId = `marketing-service-${service.id}-trigger`;
            const panelId = `marketing-service-${service.id}-panel`;

            return (
              <motion.article
                key={service.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={
                  reduceMotion ? undefined : { once: true, margin: "-60px" }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 0.55, delay: index * 0.05, ease: EASE }
                }
                className="border-b border-graphite/10"
              >
                <div className="py-6">
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenServiceId(isOpen ? null : service.id)
                    }
                    className="flex w-full cursor-pointer items-center gap-4 rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-graphite/35 focus-visible:ring-offset-4"
                  >
                    <span
                      className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${SERVICE_ICON_STYLES[service.id] ?? "bg-graphite/8 text-graphite"}`}
                    >
                      <Icon size={24} strokeWidth={1.6} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xl font-semibold tracking-tight text-graphite sm:text-2xl">
                        {service.title}
                      </span>
                      <span className="mt-1 block text-xs font-medium tracking-[0.12em] text-medium-grey uppercase">
                        What is this service?
                      </span>
                    </span>
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className={`shrink-0 text-graphite/60 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    hidden={!isOpen}
                    className="pb-2 pl-[4.5rem] pr-2 sm:pl-[4.75rem]"
                  >
                    <p className="text-sm leading-relaxed text-charcoal">
                      {service.description}
                    </p>
                    <a
                      href={service.href}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-graphite transition-colors hover:text-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-graphite/35"
                    >
                      Discuss this service
                      <ArrowRight size={15} />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ reduceMotion }) {
  return (
    <section
      aria-labelledby="marketing-process-heading"
      className="relative isolate overflow-hidden bg-graphite py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_-15%,rgba(192,196,201,0.12),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          tone="dark"
          id="marketing-process-heading"
          eyebrow={marketingProcess.eyebrow}
          title={marketingProcess.heading}
          body={marketingProcess.body}
        />

        <ol className="mt-16 grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
          {marketingProcess.steps.map((step, index) => (
            <motion.li
              key={step.number}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={
                reduceMotion ? undefined : { once: true, margin: "-70px" }
              }
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 0.55, delay: index * 0.08, ease: EASE }
              }
              className="relative list-none"
            >
              <div
                aria-hidden="true"
                className="mb-6 h-px w-full bg-linear-to-r from-silver/45 via-silver/18 to-transparent"
              />
              <span className="text-sm font-semibold tracking-[0.35em] text-silver">
                {step.number}
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-silver">
                {step.text}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ClosingCtaSection({ reduceMotion }) {
  const reveal = (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <section className="relative isolate overflow-hidden bg-black py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_82%_100%,rgba(192,196,201,0.16),transparent_58%)]"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.p
          {...reveal(0)}
          className="mb-6 text-[11px] font-medium tracking-[0.45em] text-silver uppercase"
        >
          {digitalMarketingCta.eyebrow}
        </motion.p>

        <motion.h2
          {...reveal(0.05)}
          className="text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {digitalMarketingCta.heading}
        </motion.h2>

        <motion.p
          {...reveal(0.1)}
          className="mt-6 text-base leading-relaxed text-silver sm:text-lg"
        >
          {digitalMarketingCta.body}
        </motion.p>

        <motion.div {...reveal(0.15)} className="mt-10">
          <Button href={digitalMarketingCta.primary.href} variant="light">
            {digitalMarketingCta.primary.label}
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default function DigitalMarketingContent() {
  const reduceMotion = useHydratedReducedMotion();

  return (
    <>
      <HeroSection reduceMotion={reduceMotion} />
      <ServicesSection reduceMotion={reduceMotion} />
      <ProcessSection reduceMotion={reduceMotion} />
      <ClosingCtaSection reduceMotion={reduceMotion} />
    </>
  );
}
