"use client";

import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-silver)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary:
    "bg-[var(--color-graphite)] text-white border border-[var(--color-silver)] hover:bg-[var(--color-charcoal)] hover:border-[var(--color-light-silver)]",
  secondary:
    "bg-transparent text-[var(--color-soft-white)] border border-[var(--color-silver)]/50 hover:border-[var(--color-silver)] hover:bg-[var(--color-charcoal)]/50",
  light:
    "bg-[var(--color-white)] text-[var(--color-graphite)] border border-transparent hover:bg-[var(--color-light-silver)]",
  outlineLight:
    "bg-transparent text-[var(--color-graphite)] border border-[var(--color-graphite)]/25 hover:border-[var(--color-graphite)]/70",
};

/**
 * Reusable button. Renders a Next.js <Link> when `href` is provided,
 * otherwise a semantic <button>.
 */
export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...rest
}) {
  const classes = `${base} ${variants[variant] ?? variants.primary} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}