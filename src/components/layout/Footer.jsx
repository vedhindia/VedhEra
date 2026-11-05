"use client";

import Link from "next/link";
import { mainLinks } from "@/lib/navigation";

// The copyright year is intentionally a static literal. It changes only once
// per year, so a dynamic value would add unnecessary client state.
const CURRENT_YEAR = 2026;

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-silver)]/15 bg-[var(--color-graphite)]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row">
          <div>
            <Link
              href="/"
              className="text-base font-semibold tracking-[0.25em] text-white "
            >
              <img
                src="/images/vedh_logo.png"
                alt="VedhEra Logo"
                className="h-10 w-auto"
              /> 
            </Link>
            <p className="mt-2 max-w-xs text-sm text-[var(--color-silver)]">
              Creative design and digital services studio.
            </p>
          </div>

          <div>
            <p className="mt-8 text-xs text-[var(--color-silver)]/60">
             © {CURRENT_YEAR} VedhEra  . All rights reserved.
            </p>
          </div>
          
          
        </div>

        
      </div>
    </footer>
  );
}
