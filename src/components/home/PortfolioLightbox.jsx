"use client";

import { useCallback, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Accessible portfolio lightbox.
 *
 * - Full keyboard support: Escape closes, ArrowLeft/ArrowRight navigate.
 * - Locks body scroll while open and restores it on close.
 * - Focus is moved into the dialog so keyboard users stay inside it.
 */
export default function PortfolioLightbox({ items, index, onClose, onNavigate }) {
  const reduceMotion = useReducedMotion();
  const isOpen = index !== null && index >= 0;
  const item = isOpen ? items[index] : null;

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") goPrev();
      else if (event.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose, goPrev, goNext]);

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: [0.22, 1, 0.36, 1] };

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          key="portfolio-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title}, image ${index + 1} of ${items.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className="fixed inset-0 z-[100] flex flex-col bg-[var(--color-black)]/95 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between px-6 py-5">
            <p className="text-sm tracking-wide text-[var(--color-silver)]">
              <span className="text-white">{item.title}</span>
              <span className="mx-3 opacity-40">/</span>
              {index + 1} of {items.length}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              className="rounded-full border border-[var(--color-silver)]/40 p-2 text-[var(--color-silver)] transition-colors hover:border-[var(--color-silver)] hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center gap-3 px-3 pb-8 sm:gap-6 sm:px-8">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="shrink-0 rounded-full border border-[var(--color-silver)]/30 p-2.5 text-[var(--color-silver)] transition-colors hover:border-[var(--color-silver)] hover:text-white"
            >
              <ChevronLeft size={20} />
            </button>

            <motion.figure
              key={item.id}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={transition}
              className="flex min-h-0 max-h-full flex-1 items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="max-h-[78svh] w-auto max-w-full rounded-lg object-contain shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]"
              />
            </motion.figure>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="shrink-0 rounded-full border border-[var(--color-silver)]/30 p-2.5 text-[var(--color-silver)] transition-colors hover:border-[var(--color-silver)] hover:text-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}