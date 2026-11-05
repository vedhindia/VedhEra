"use client";

import { useCallback, useEffect, useRef } from "react";

/** Existing hero asset already present in the repository. */
export const HERO_VIDEO_SRC = "/videos/home/EagleHeroVideo.mp4";

/**
 * Cinematic eagle hero video.
 *
 * The video is a background layer only. It attempts muted autoplay and, on
 * mount, starts a safety timer so the tagline is always revealed even if the
 * asset is missing, autoplay is blocked, or playback stalls.
 *
 * @param {object} props
 * @param {() => void} props.onReveal Called once, when the tagline should enter.
 */
export default function EagleHeroVideo({ onReveal, className = "" }) {
  const videoRef = useRef(null);
  const revealedRef = useRef(false);
  const timerRef = useRef(null);

  const reveal = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    onReveal?.();
  }, [onReveal]);

  // Attempt playback and arm the safety timer.
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(reveal, 3000);

    const video = videoRef.current;
    if (video && typeof video.play === "function") {
      const promise = video.play();
      if (promise && typeof promise.catch === "function") {
        promise.catch(() => {
          /* Autoplay blocked — the safety timer still reveals the tagline. */
        });
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [reveal]);

  // Reveal part-way through so the tagline lands as the eagle lifts its head.
  const handleLoadedMetadata = (event) => {
    const video = event.currentTarget;
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;
    const delay = Math.min(video.duration * 0.45, 6) * 1000;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(reveal, delay);
  };

  return (
    <video
      ref={videoRef}
      className={`absolute inset-0 h-full w-full object-cover object-[20%_center] ${className}`}
      src={HERO_VIDEO_SRC}
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      onLoadedMetadata={handleLoadedMetadata}
      onError={reveal}
    />
  );
}