"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import NavigationMenu from "./NavigationMenu";

/**
 * Menu button revealed after the intro video ends.
 *
 * - Motion entrance: fade + move up + scale, refined easing.
 * - Clicking the button toggles the navigation menu.
 * - Selecting a link completes the intro; dismissing the menu does not.
 */
export default function IntroMenuButton({ onComplete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => !open);
  }, []);

  const handleNavigate = useCallback(() => {
    setMenuOpen(false);
    onComplete();
  }, [onComplete]);

  const handleClose = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const entrance = reduceMotion
    ? { initial: false, animate: false }
    : {
        initial: { opacity: 0, y: 16, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <div
      ref={containerRef}
      className="relative z-10 flex flex-col items-end"
    >
      <motion.button
        type="button"
        {...entrance}
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-controls="intro-navigation"
        className="inline-flex size-12 items-center justify-center rounded-full border border-[var(--color-silver)] bg-[var(--color-graphite)] text-white transition-colors duration-300 hover:border-[var(--color-light-silver)] hover:bg-[var(--color-charcoal)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-light-silver)] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:size-14"
      >
        {menuOpen ? (
          <X size={24} aria-hidden="true" />
        ) : (
          <Menu size={24} aria-hidden="true" />
        )}
      </motion.button>

      {menuOpen && (
        <NavigationMenu
          id="intro-navigation"
          onNavigate={handleNavigate}
          onClose={handleClose}
          containerRef={containerRef}
        />
      )}
    </div>
  );
}
