"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import IntroScreen from "./IntroScreen";

const STORAGE_KEY = "vedh-intro-completed";

const IntroContext = createContext({
  replayIntro: () => {},
  introCompleted: false,
});

export function useIntro() {
  return useContext(IntroContext);
}

/**
 * IntroController wraps the application and decides whether the cinematic
 * intro should be shown.
 *
 * Behaviour:
 *  - Intro plays only on the homepage ("/") during the first visit of a tab
 *    session.
 *  - sessionStorage remembers completion so route changes, refreshes, and
 *    navigations never replay it within the same session.
 *  - A new tab session is allowed to play the intro again.
 *  - Browser storage is only read on the client to avoid hydration mismatches.
 */
export default function IntroController({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // Single state object so the post-hydration sync is one setState call.
  const [state, setState] = useState({
    isClient: false,
    showIntro: false,
    introCompleted: false,
  });

  const { isClient, showIntro, introCompleted } = state;

  // Resolve intro state from sessionStorage after hydration.
  useEffect(() => {
    let completed = false;
    try {
      completed = sessionStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      /* sessionStorage unavailable — fall back to no intro. */
    }
    // Reading sessionStorage is client-only; this setState is the
    // standard hydration-safe pattern for external store sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({
      isClient: true,
      introCompleted: completed,
      showIntro: !completed && pathname === "/",
    });
  }, [pathname]);

  const handleComplete = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* ignore */
    }
    setState((prev) => ({ ...prev, introCompleted: true, showIntro: false }));
  }, []);

  const replayIntro = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setState((prev) => ({ ...prev, introCompleted: false, showIntro: true }));
    if (pathname !== "/") {
      router.push("/");
    }
  }, [pathname, router]);

  return (
    <IntroContext.Provider value={{ replayIntro, introCompleted }}>
      {children}
      {isClient && showIntro && <IntroScreen onComplete={handleComplete} />}
    </IntroContext.Provider>
  );
}
