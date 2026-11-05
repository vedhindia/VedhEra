"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Factory,
  Gauge,
  HeartPulse,
  Hotel,
  LayoutGrid,
  MonitorSmartphone,
  MousePointerClick,
  Scissors,
  Search,
  ShoppingBag,
  Smartphone,
  UtensilsCrossed,
} from "lucide-react";
import useHydratedReducedMotion from "@/components/animations/useHydratedReducedMotion";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  websiteCategories,
  websiteCategoryIntro,
  websiteDesignCta,
  websiteDesignHero,
  websiteProcess,
  websiteWhyChoose,
} from "@/data/websiteDesign";

const EASE = [0.22, 1, 0.36, 1];
const AUTOPLAY_MS = 3600;

const CATEGORY_ICONS = {
  ecommerce: ShoppingBag,
  industrial: Factory,
  healthcare: HeartPulse,
  "real-estate": Building2,
  "hotel-hospitality": Hotel,
  corporate: BriefcaseBusiness,
  restaurant: UtensilsCrossed,
  Salon: Scissors,
  "other-business": LayoutGrid,
};

const WHY_ICONS = {
  Smartphone,
  MousePointerClick,
  Gauge,
  Search,
  BriefcaseBusiness,
};

function PlaceholderScreen({ title, compact = false }) {
  const basePadding = compact ? "p-4" : "p-5 sm:p-6";
  const titleSize = "text-xs";

  return (
    <div className={`relative h-full w-full overflow-hidden bg-[linear-gradient(180deg,#14181c_0%,#0b0d0f_100%)] ${basePadding}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(80%_70%_at_80%_0%,rgba(192,196,201,0.16),transparent_55%)]"
      />
      <div className="relative z-10 h-full">
        <span className={`inline-flex rounded-full border border-white/10 bg-white/6 px-3 py-1 font-medium tracking-[0.18em] text-[var(--color-light-silver)] uppercase ${titleSize}`}>
          Placeholder Preview
        </span>
        <div className="mt-4 flex items-center justify-between gap-3 text-xs">
          <div className="h-2 w-20 rounded-full bg-white/12" />
          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-white/18" />
            <div className="h-2 w-2 rounded-full bg-white/12" />
            <div className="h-2 w-2 rounded-full bg-white/12" />
          </div>
        </div>
        <div className="mt-5 grid h-[calc(100%-3.5rem)] gap-3">
          <div className="rounded-[1.2rem] border border-white/8 bg-white/6 p-4">
            <div className="h-3 w-28 rounded-full bg-white/20" />
            <div className="mt-3 h-2 w-full rounded-full bg-white/10" />
            <div className="mt-2 h-2 w-4/5 rounded-full bg-white/10" />
            <div className="mt-2 h-2 w-3/5 rounded-full bg-white/10" />
            <div className="mt-4 flex gap-2">
              <div className="h-8 w-24 rounded-full bg-[var(--color-light-silver)]/90" />
              <div className="h-8 w-20 rounded-full border border-white/12 bg-transparent" />
            </div>
          </div>
          {!mobile && (
            <div className="grid flex-1 gap-3 sm:grid-cols-2">
              <div className="rounded-[1.1rem] border border-white/8 bg-white/6 p-4">
                <div className="h-20 rounded-2xl bg-[linear-gradient(145deg,rgba(192,196,201,0.14),rgba(255,255,255,0.04))]" />
                <div className="mt-4 h-2 w-2/3 rounded-full bg-white/12" />
                <div className="mt-2 h-2 w-1/2 rounded-full bg-white/10" />
              </div>
              <div className="rounded-[1.1rem] border border-white/8 bg-white/6 p-4">
                <div className="grid gap-2">
                  <div className="h-8 rounded-xl bg-white/10" />
                  <div className="h-8 rounded-xl bg-white/10" />
                  <div className="h-8 rounded-xl bg-white/10" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="pointer-events-none absolute right-4 bottom-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs tracking-[0.18em] text-[var(--color-light-silver)] uppercase">
          {title}
        </div>
      </div>
    </div>
  );
}

function BrowserFrame({ title, availability, compact = false, children }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="relative h-[calc(100%-3rem)] ">
        {children}
      </div>
    </div>
  );
}

function RealImage({ src, alt, className = "" }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover object-top ${className}`}
      />
    </>
  );
}

function WebsiteShowcase({ item, compact = false, hero = false }) {
  const desktopHeight = compact
    ? "aspect-[4/3]"
    : hero
      ? "aspect-[16/11]"
      : "aspect-[16/10]";

  return (
    <div className="relative h-full w-full">
      <div className={`relative ${desktopHeight}`}>
        <BrowserFrame
          title={item.title}
          availability={item.availability}
          compact={compact}
        >
          {item.availability === "real" ? (
            <RealImage
              src={item.desktop.src}
              alt={item.desktop.alt}
              className={compact ? "p-3" : "p-4 sm:p-5"}
            />
          ) : (
            <PlaceholderScreen title={item.title} compact={compact} />
          )}
        </BrowserFrame>

       
      </div>
    </div>
  );
}

function HeroSection({ reduceMotion }) {
  const floating = reduceMotion
    ? {}
    : {
        animate: { y: [0, -12, 0] },
        transition: {
          duration: 6.5,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        },
      };

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-graphite)] pt-32 pb-24 sm:pt-25 sm:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_80%_at_85%_-10%,rgba(192,196,201,0.16),transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_10%_110%,rgba(192,196,201,0.09),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-silver)]/25 to-transparent"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.7, ease: EASE }}
            className="mb-6 text-[11px] font-medium tracking-[0.5em] text-[var(--color-silver)] uppercase sm:text-xs"
          >
            {websiteDesignHero.eyebrow}
          </motion.p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 0.8, delay: 0.06, ease: EASE }
            }
            className="max-w-4xl text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {websiteDesignHero.heading}
          </motion.h1>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 0.8, delay: 0.12, ease: EASE }
            }
            className="mt-7 max-w-2xl text-base leading-relaxed text-[var(--color-silver)] sm:text-lg"
          >
            {websiteDesignHero.body}
          </motion.p>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 0.8, delay: 0.18, ease: EASE }
            }
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button href={websiteDesignHero.primaryCta.href} variant="light">
              {websiteDesignHero.primaryCta.label}
              <ArrowRight size={16} />
            </Button>
            <Button href={websiteDesignHero.secondaryCta.href} variant="secondary">
              {websiteDesignHero.secondaryCta.label}
            </Button>
          </motion.div>
          <motion.ul
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 0.8, delay: 0.24, ease: EASE }
            }
            className="mt-10 flex flex-wrap gap-3"
          >
          </motion.ul>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 0.9, delay: 0.16, ease: EASE }
          }
          className="lg:col-span-6"
        >
          <motion.div {...floating} className="relative mx-auto w-full max-w-3xl">
            <WebsiteShowcase
              hero
              item={{
                id: "hero-showcase",
                title: "Website Showcase",
                availability: "real",
                desktop: websiteDesignHero.mockupDesktop,
                mobile: websiteDesignHero.mockupMobile,
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CategorySection({ reduceMotion, activeIndex, onSelect }) {
  return (
    <section
      id="website-categories"
      aria-labelledby="website-categories-heading"
      className="scroll-mt-28 bg-[var(--color-soft-white)] pt-28 pb-24 sm:scroll-mt-32 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          tone="light"
          eyebrow={websiteCategoryIntro.eyebrow}
          title={websiteCategoryIntro.heading}
          body={websiteCategoryIntro.body}
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {websiteCategories.map((item, index) => {
            const Icon = CATEGORY_ICONS[item.id] ?? LayoutGrid;
            const isActive = index === activeIndex;

            return (
              <motion.article
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={reduceMotion ? undefined : { once: true, margin: "-60px" }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 0.55, delay: index * 0.05, ease: EASE }
                }
                className={`group flex h-full flex-col p-5 ${
                  isActive
                    ? " shadow-[0_35px_70px_-48px_rgba(0,0,0,0.35)]"
                    : "border-[var(--color-graphite)]/10 "
                } ${
                  reduceMotion
                    ? ""
                    : "transition-[transform,border-color,box-shadow] duration-[420ms] ease-out hover:-translate-y-1.5 hover:border-[var(--color-graphite)]/25 hover:shadow-[0_35px_70px_-48px_rgba(0,0,0,0.35)]"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--color-graphite)]/12 bg-[var(--color-soft-white)] text-[var(--color-graphite)]">
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <span className="rounded-full border border-[var(--color-graphite)]/10 bg-[var(--color-soft-white)] px-3 py-1 text-xs font-medium tracking-[0.18em] text-[var(--color-medium-grey)] uppercase">
                    {item.availability === "real" ? "Real Asset" : "Concept Preview"}
                  </span>
                </div>

                <div className="mt-5 overflow-hidden text-black ">
                  <WebsiteShowcase item={item} compact />
                </div>

                <h3 className=" text-xl font-semibold tracking-tight text-[var(--color-graphite)]">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-medium-grey)]">
                  {item.description}
                </p>

                <a
                  href={item.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onSelect(item.id)}
                  className="mt-6 inline-flex items-center gap-2 self-start text-sm font-medium text-[var(--color-graphite)] transition-colors duration-300 hover:text-[var(--color-charcoal)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-graphite)]/35"
                >
                  View Designs
                  <ArrowRight size={15} />
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection({ reduceMotion }) {
  return (
    <section className="bg-[var(--color-section-light)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          tone="light"
          eyebrow={websiteWhyChoose.eyebrow}
          title={websiteWhyChoose.heading}
          body={websiteWhyChoose.body}
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {websiteWhyChoose.points.map((point, index) => {
            const Icon = WHY_ICONS[point.icon] ?? MonitorSmartphone;
            const hasNext = index < websiteWhyChoose.points.length - 1;
            const hasNextInMediumRow =
              index % 2 === 0 && index + 1 < websiteWhyChoose.points.length;

            return (
              <motion.article
                key={point.title}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={reduceMotion ? undefined : { once: true, margin: "-70px" }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 0.5, delay: index * 0.07, ease: EASE }
                }
                className="relative"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center text-[var(--color-graphite)]">
                  <Icon size={21} strokeWidth={1.6} />
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-[var(--color-graphite)]">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-charcoal)]">
                  {point.text}
                </p>
                {hasNext && (
                  <span
                    aria-hidden="true"
                    className={`absolute -right-3 top-0 hidden h-full w-px bg-gradient-to-b from-[var(--color-graphite)]/30 via-[var(--color-graphite)]/10 to-transparent ${
                      hasNextInMediumRow ? "md:block" : ""
                    } xl:block`}
                  />
                )}
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
    <section className="relative isolate overflow-hidden bg-[var(--color-graphite)] py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_-15%,rgba(192,196,201,0.12),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          tone="dark"
          eyebrow={websiteProcess.eyebrow}
          title={websiteProcess.heading}
          body={websiteProcess.body}
        />

        <ol className="mt-16 grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
          {websiteProcess.steps.map((step, index) => (
            <motion.li
              key={step.number}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={reduceMotion ? undefined : { once: true, margin: "-70px" }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 0.55, delay: index * 0.08, ease: EASE }
              }
              className="relative list-none"
            >
              <div
                aria-hidden="true"
                className="mb-6 h-px w-full bg-gradient-to-r from-[var(--color-silver)]/45 via-[var(--color-silver)]/18 to-transparent"
              />
              <span className="text-sm font-semibold tracking-[0.35em] text-[var(--color-silver)]">
                {step.number}
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-silver)]">
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
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-black)] py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_82%_100%,rgba(192,196,201,0.16),transparent_58%)]"
      />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={reduceMotion ? undefined : { once: true, margin: "-60px" }}
          transition={reduceMotion ? undefined : { duration: 0.55, ease: EASE }}
          className="mb-6 text-[11px] font-medium tracking-[0.45em] text-[var(--color-silver)] uppercase"
        >
          {websiteDesignCta.eyebrow}
        </motion.p>
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={reduceMotion ? undefined : { once: true, margin: "-60px" }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 0.6, delay: 0.05, ease: EASE }
          }
          className="text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {websiteDesignCta.heading}
        </motion.h2>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={reduceMotion ? undefined : { once: true, margin: "-60px" }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 0.6, delay: 0.1, ease: EASE }
          }
          className="mt-6 text-base leading-relaxed text-[var(--color-silver)] sm:text-lg"
        >
          {websiteDesignCta.body}
        </motion.p>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={reduceMotion ? undefined : { once: true, margin: "-60px" }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 0.6, delay: 0.15, ease: EASE }
          }
          className="mt-10"
        >
          <Button href={websiteDesignCta.primary.href} variant="light">
            {websiteDesignCta.primary.label}
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default function WebsiteDesignContent() {
  const reduceMotion = useHydratedReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideCount = websiteCategories.length;

  const handleCategorySelect = useCallback((categoryId) => {
    const nextIndex = websiteCategories.findIndex((item) => item.id === categoryId);
    if (nextIndex === -1) return;
    setActiveIndex(nextIndex);
  }, []);

  useEffect(() => {
    if (reduceMotion || isPaused || slideCount <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideCount);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [reduceMotion, isPaused, slideCount]);

  useEffect(() => {
    if (reduceMotion) return undefined;

    const syncPause = () => setIsPaused(document.hidden);
    document.addEventListener("visibilitychange", syncPause);

    return () => document.removeEventListener("visibilitychange", syncPause);
  }, [reduceMotion]);

  return (
    <>
      <HeroSection reduceMotion={reduceMotion} />
      <CategorySection
        reduceMotion={reduceMotion}
        activeIndex={activeIndex}
        onSelect={handleCategorySelect}
      />
      <WhyChooseSection reduceMotion={reduceMotion} />
      <ProcessSection reduceMotion={reduceMotion} />
      <ClosingCtaSection reduceMotion={reduceMotion} />
    </>
  );
}
