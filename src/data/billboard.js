/**
 * Branding & Outdoor Advertising section copy and frame-sequence config.
 *
 * The frame files were extracted from the supplied source footage at 5 FPS
 * and ship as `frame_001.jpg` … `frame_090.jpg` (three-digit padding) inside
 * `public/images/billboard-sequence`. Every frame is 1280x720 with no
 * letterbox bars, so the camera movement can be presented edge to edge.
 */

export const BILLBOARD_FRAME_COUNT = 90;

/** Absolute public path of a frame, addressed by its zero-based index. */
export function billboardFrameSrc(index) {
  const clamped = Math.max(0, Math.min(BILLBOARD_FRAME_COUNT - 1, index));
  return `/images/billboard-sequence/frame_${String(clamped + 1).padStart(3, "0")}.jpg`;
}

export const outdoorSection = {
  eyebrow: "Branding & Outdoor Advertising",
  heading: "Your Brand. Out There. Impossible to Ignore.",
  body: "From powerful billboard concepts to high-impact outdoor campaigns, we create brand experiences designed to command attention in the real world.",
  scrollHint: "Scroll to Explore",
  /** Describes the sequence for assistive tech and the no-JS poster frame. */
  posterAlt:
    "Camera travelling down a commercial street in Pune, passing and focusing on outdoor advertising billboards",
  loadingLabel: "Loading campaign",
  staticNote: "Static preview shown because motion is reduced in your system settings.",
};
