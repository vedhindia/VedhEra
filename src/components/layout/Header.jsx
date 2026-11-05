"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import useHydratedReducedMotion from "@/components/animations/useHydratedReducedMotion";
import { mainLinks } from "@/lib/navigation";
import { useIntro } from "@/components/intro/IntroController";

/**
 * Site header shown on every page once the intro has completed.
 *
 * - Desktop: primary links with a hover/click Services dropdown.
 * - Mobile: a touch-friendly toggle that reveals the full navigation.
 * - Includes the Replay Intro control.
 */
export default function Header() {
  const pathname = usePathname();
  const { replayIntro, introCompleted } = useIntro();
  const reduceMotion = useHydratedReducedMotion();

  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const servicesRef = useRef(null);

  const closeMenus = () => {
    setServicesOpen(false);
    setMobileOpen(false);
  };

  // Close the Services dropdown on outside click or Escape.
  useEffect(() => {
    if (!servicesOpen) return;

    const onClick = (event) => {
      if (!servicesRef.current?.contains(event.target)) setServicesOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setServicesOpen(false);
    };

    document.addEventListener("pointerdown", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const isActive = (href) =>
    Boolean(href) && (pathname === href || (href !== "/" && pathname.startsWith(href)));

  const menuTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-silver)]/15 bg-[var(--color-graphite)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" aria-label="VedhEra  home" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/vedh_logo.png"
            alt="VedhEra  "
            className="h-11 w-auto sm:h-14"
          />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {mainLinks.map((link) =>
            link.children ? (
              <div key={link.href ?? link.label} ref={servicesRef} className="relative">
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen((v) => !v)}
                  onMouseEnter={() => setServicesOpen(true)}
                  className={`flex items-center gap-1 text-sm tracking-wide transition-colors ${
                    isActive(link.href)
                      ? "text-white"
                      : "text-[var(--color-silver)] hover:text-white"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      role="menu"
                      aria-label="Services"
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                      transition={menuTransition}
                      onMouseLeave={() => setServicesOpen(false)}
                      className="absolute left-1/2 top-full z-50 mt-4 w-64 -translate-x-1/2 overflow-hidden rounded-xl border border-[var(--color-silver)]/20 bg-[var(--color-deep-charcoal)]/98 p-2 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.85)] backdrop-blur-md"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          onClick={closeMenus}
                          className="block rounded-lg px-4 py-2.5 text-sm text-[var(--color-silver)] transition-colors hover:bg-[var(--color-graphite)] hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href ?? link.label}
                href={link.href}
                onClick={closeMenus}
                className={`text-sm tracking-wide transition-colors ${
                  isActive(link.href)
                    ? "text-white"
                    : "text-[var(--color-silver)] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          {introCompleted && (
            <button
              type="button"
              onClick={replayIntro}
              className="hidden rounded-full border border-[var(--color-silver)]/40 px-4 py-1.5 text-xs font-medium tracking-wide text-[var(--color-silver)] transition-colors hover:border-[var(--color-silver)] hover:text-white sm:inline-flex"
            >
              Replay Intro
            </button>
          )}

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-silver)]/40 p-2 text-[var(--color-silver)] transition-colors hover:border-[var(--color-silver)] hover:text-white md:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={menuTransition}
            className="overflow-hidden border-t border-[var(--color-silver)]/15 bg-[var(--color-deep-charcoal)]/98 md:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {mainLinks.map((link) => (
                <li
                  key={link.href ?? link.label}
                  className="border-b border-white/5 last:border-0"
                >
                  {link.href ? (
                    <Link
                      href={link.href}
                      onClick={closeMenus}
                      className={`block py-3 text-sm font-medium tracking-wide transition-colors ${
                        isActive(link.href)
                          ? "text-white"
                          : "text-[var(--color-silver)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <p className="py-3 text-sm font-medium tracking-wide text-[var(--color-silver)]">
                      {link.label}
                    </p>
                  )}
                  {link.children && (
                    <ul className="pb-2 pl-4">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={closeMenus}
                            className="block py-2 text-sm text-[var(--color-medium-grey)] transition-colors hover:text-white"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              {introCompleted && (
                <li className="pt-3">
                  <button
                    type="button"
                    onClick={replayIntro}
                    className="rounded-full border border-[var(--color-silver)]/40 px-4 py-2 text-xs font-medium tracking-wide text-[var(--color-silver)] transition-colors hover:border-[var(--color-silver)] hover:text-white"
                  >
                    Replay Intro
                  </button>
                </li>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
