"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import {
  portfolioCategories,
  portfolioItems,
} from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import PortfolioLightbox from "@/components/home/PortfolioLightbox";

/**
 * Featured portfolio.
 *
 * A conventional, browsable grid (light section) that follows the cinematic
 * journey. Supports category filtering and an accessible lightbox.
 * Only categories that actually have supplied artwork are shown as filters.
 * Images are shown with `object-contain` to keep the supplied artwork intact.
 */
export default function FeaturedPortfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const reduceMotion = useReducedMotion();

  // Only expose categories that have at least one real portfolio item.
  const availableCategories = useMemo(() => {
    const withContent = new Set(portfolioItems.map((item) => item.category));
    return portfolioCategories.filter(
      (cat) => cat.id === "all" || withContent.has(cat.id)
    );
  }, []);

  const visibleItems = useMemo(() => {
    if (activeCategory === "all") return portfolioItems;
    return portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleFilter = (categoryId) => {
    setActiveCategory(categoryId);
    setLightboxIndex(null);
  };

  const layoutTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.22, 1, 0.36, 1] };

  return (
    <section
      id="portfolio"
      aria-label="Featured portfolio"
      className="w-full bg-[var(--color-soft-white)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Selected Work"
          title="Featured Portfolio"
          body="A selection of design, digital, and exhibition work created for brands across industries."
          tone="light"
          as="h2"
        />

        {/* Filters */}
        <div
          role="tablist"
          aria-label="Filter portfolio by category"
          className="mt-12 flex flex-wrap gap-3"
        >
          {availableCategories.map((category) => {
            const active = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleFilter(category.id)}
                className={`rounded-full border px-5 py-2 text-sm font-medium tracking-wide transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-graphite)]/60 ${
                  active
                    ? "border-[var(--color-graphite)] bg-[var(--color-graphite)] text-white"
                    : "border-[var(--color-graphite)]/20 text-[var(--color-charcoal)] hover:border-[var(--color-graphite)]/60"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleItems.map((item) => (
              <motion.button
                key={`${activeCategory}-${item.id}`}
                type="button"
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={layoutTransition}
                onClick={() => setLightboxIndex(visibleItems.indexOf(item))}
                aria-label={`Open ${item.title}`}
                className="group relative overflow-hidden rounded-xl border border-[var(--color-graphite)]/10 bg-white text-left shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)] transition-shadow duration-300 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-graphite)]/60"
              >
                <div
                  className={`flex items-center justify-center overflow-hidden bg-[var(--color-light-grey)] ${
                    item.orientation === "portrait"
                      ? "aspect-[4/5]"
                      : "aspect-[16/11]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex items-start justify-between gap-4 p-5">
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-[var(--color-graphite)]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm capitalize text-[var(--color-medium-grey)]">
                      {item.category.replace("-", " ")}
                    </p>
                  </div>
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-graphite)]/15 text-[var(--color-graphite)] transition-colors duration-300 group-hover:border-[var(--color-graphite)] group-hover:bg-[var(--color-graphite)] group-hover:text-white">
                    <Plus size={15} />
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {visibleItems.length === 0 && (
          <p className="mt-12 text-center text-sm text-[var(--color-medium-grey)]">
            Artwork for this category will be added soon.
          </p>
        )}
      </div>

      <PortfolioLightbox
        items={visibleItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}