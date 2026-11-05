"use client";

import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { mainLinks } from "@/lib/navigation";
import ServicesSubmenu from "@/components/navigation/ServicesSubmenu";

/**
 * Navigation menu rendered beneath the intro menu button.
 *
 * - Motion entrance/exit with a refined fade + slide.
 * - Clicking a link closes the menu and completes the intro.
 * - Escape closes the menu.
 * - Click outside (button + menu container) closes the menu.
 * - Arrow keys move focus between links.
 */
export default function NavigationMenu({
  id,
  onNavigate,
  onClose,
  containerRef,
}) {
  const menuRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Close on Escape.
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Click-outside dismissal (outside the button+menu container).
  useEffect(() => {
    function onPointerDown(e) {
      const node = containerRef?.current;
      if (node && !node.contains(e.target)) {
        onClose();
      }
    }
    // Defer so the opening click doesn't immediately close it.
    const t = setTimeout(() => {
      window.addEventListener("pointerdown", onPointerDown);
    }, 0);
    return () => {
      clearTimeout(t);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [containerRef, onClose]);

  const handleKeyDown = useCallback((e) => {
    const items = Array.from(
      menuRef.current?.querySelectorAll("a, button") || []
    ).filter((el) => !el.disabled);
    const index = items.indexOf(e.currentTarget);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(index + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(index - 1 + items.length) % items.length]?.focus();
    }
  }, []);

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: [0.22, 1, 0.36, 1] };

  return (
    <AnimatePresence>
      <motion.nav
        id={id}
        ref={menuRef}
        role="menu"
        aria-label="Site navigation"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={transition}
        className="mt-3 max-h-[calc(100dvh-6rem)] w-[min(18rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-[var(--color-silver)]/30 bg-[var(--color-charcoal)]/95 shadow-2xl backdrop-blur-sm sm:mt-4 sm:w-72"
      >
        <ul className="flex flex-col">
          {mainLinks.map((link) => (
            <li key={link.href ?? link.label} role="none">
              {link.children ? (
                <ServicesSubmenu
                  label={link.label}
                  href={link.href}
                  items={link.children}
                  onNavigate={onNavigate}
                  onKeyDown={handleKeyDown}
                />
              ) : (
                <Link
                  href={link.href}
                  role="menuitem"
                  onClick={onNavigate}
                  onKeyDown={handleKeyDown}
                  className="block px-5 py-3 text-sm font-medium tracking-wide text-[var(--color-soft-white)] transition-colors hover:bg-[var(--color-graphite)] hover:text-white focus:outline-none focus-visible:bg-[var(--color-graphite)]"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </motion.nav>
    </AnimatePresence>
  );
}
