"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Hydration-safe reduced-motion preference.
 *
 * Client Components still render on the server in the App Router. Returning a
 * stable `false` until hydration keeps the server HTML and the first client
 * render identical, then the real media-query preference is applied.
 */
export default function useHydratedReducedMotion() {
  const prefersReducedMotion = useReducedMotion();

  const subscribe = useCallback(() => () => {}, []);
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  return hydrated ? prefersReducedMotion : false;
}
