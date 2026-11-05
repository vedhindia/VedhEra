"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import IntroMenuButton from "./IntroMenuButton";

const VIDEO_SRC = "/videos/intro/vedh-logo-reveal.mp4";

/**
 * Full-screen cinematic intro.
 *
 * - Black background, video fills the full screen with object-fit: cover.
 * - Original aspect ratio preserved while allowing cinematic edge crop.
 * - Autoplay attempted; on failure a "Play Intro" fallback is shown.
 * - If the video fails to load, a "Continue to Website" option is shown.
 * - The final frame stays visible after playback (native video behaviour).
 * - The navigation menu button is only revealed after the video ends.
 */
export default function IntroScreen({ onComplete }) {
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  // Attempt autoplay on mount.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const p = video.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => setAutoplayFailed(true));
    }
  }, []);

  const handleEnded = useCallback(() => {
    setVideoEnded(true);
  }, []);

  const handleError = useCallback(() => {
    setLoadFailed(true);
  }, []);

  const handleRetryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setAutoplayFailed(false);
    const p = video.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => setAutoplayFailed(true));
    }
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black"
      role="dialog"
      aria-modal="true"
      aria-label="VedhEra  intro"
    >
      {!loadFailed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            className="h-full w-full object-contain lg:object-cover"
            playsInline
            preload="auto"
            autoPlay
            muted
            onEnded={handleEnded}
            onError={handleError}
            aria-hidden={videoEnded ? "false" : "true"}
          />
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/85 via-black/35 to-transparent sm:h-52"
      />

      {videoEnded && (
        <div className="absolute right-4 top-4 z-10 flex justify-end sm:right-6 sm:top-6">
          <IntroMenuButton onComplete={onComplete} />
        </div>
      )}

      {(loadFailed || (autoplayFailed && !videoEnded)) && (
        <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center px-6 sm:bottom-12">
          {loadFailed ? (
            <button
              type="button"
              onClick={onComplete}
              className="rounded-full border border-[var(--color-silver)] bg-[var(--color-graphite)] px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[var(--color-charcoal)]"
            >
              Continue to Website
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRetryPlay}
              className="rounded-full border border-[var(--color-silver)] bg-[var(--color-graphite)] px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[var(--color-charcoal)]"
            >
              Play Intro
            </button>
          )}
        </div>
      )}
    </div>
  );
}
