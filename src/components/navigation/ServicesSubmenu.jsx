"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import useHydratedReducedMotion from "@/components/animations/useHydratedReducedMotion";

/**
 * Services submenu.
 *
 * - Desktop: hover the Services item to reveal child links.
 * - Mobile / touch: tap Services to toggle the child links.
 * - The parent Services item only opens the submenu.
 */
export default function ServicesSubmenu({
  label,
  href,
  items,
  onNavigate,
  onKeyDown,
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useHydratedReducedMotion();

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: [0.22, 1, 0.36, 1] };

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center">
        {href ? (
          <Link
            href={href}
            role="menuitem"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={onNavigate}
            onKeyDown={onKeyDown}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            className="flex flex-1 items-center justify-between px-5 py-3 text-sm font-medium tracking-wide text-[var(--color-soft-white)] transition-colors hover:bg-[var(--color-graphite)] hover:text-white focus:outline-none focus-visible:bg-[var(--color-graphite)]"
          >
            {label}
            <ChevronRight size={14} className="opacity-70" />
          </Link>
        ) : (
          <button
            type="button"
            role="menuitem"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            onKeyDown={onKeyDown}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            className="flex flex-1 items-center justify-between px-5 py-3 text-left text-sm font-medium tracking-wide text-[var(--color-soft-white)] transition-colors hover:bg-[var(--color-graphite)] hover:text-white focus:outline-none focus-visible:bg-[var(--color-graphite)]"
          >
            {label}
            <ChevronRight size={14} className={`opacity-70 transition-transform ${open ? "rotate-90" : ""}`} />
          </button>
        )}
        {/* Touch-only toggle for mobile */}
        <button
          type="button"
          aria-label={open ? "Close services submenu" : "Open services submenu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="px-3 py-3 text-[var(--color-silver)] hover:text-white sm:hidden"
        >
          <ChevronRight
            size={14}
            className={`transition-transform ${open ? "rotate-90" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu"
            aria-label="Services"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={transition}
            className="overflow-hidden bg-[var(--color-graphite)]"
          >
            {items.map((item) => (
              <li key={item.href} role="none">
                <Link
                  href={item.href}
                  role="menuitem"
                  onClick={onNavigate}
                  onKeyDown={onKeyDown}
                  className="block py-2.5 pl-8 pr-5 text-sm text-[var(--color-silver)] transition-colors hover:bg-[var(--color-charcoal)] hover:text-white focus:outline-none focus-visible:bg-[var(--color-charcoal)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
