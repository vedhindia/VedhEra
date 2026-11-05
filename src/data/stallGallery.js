/**
 * Exhibition stall gallery — section copy and scroll-sequence configuration.
 *
 * Frame sequence
 * --------------
 * The 120 frames were extracted from the supplied 24-second source footage at
 * 5 FPS and live in `public/images/stall-sequence/`. They are 1920x1080
 * (16:9) with no letterbox bars, so the sequence can be presented edge to edge
 * without cropping or scaling the artwork.
 *
 * The filenames on disk are `ezgif-frame-001.jpg` … `ezgif-frame-120.jpg`.
 * They are addressed through `stallFrameSrc()` rather than by literal path, so
 * changing any part of the filename scheme — or the frame count — is a
 * one-line edit here and nothing in the component needs to change.
 *
 * Asset integrity
 * ---------------
 * The frames are drawn into a canvas exactly as supplied. Nothing recolours,
 * redraws, retouches, or composites over them.
 */

/**
 * Single adjustable parameter for the whole sequence: total frame count.
 * Raise or lower this together with the `pad`/`prefix` below when the footage
 * is re-extracted at a different length.
 */
export const STALL_SEQUENCE_FRAME_COUNT = 120;

/** Source frame rate, which sets how much scroll the sequence deserves. */
export const STALL_SEQUENCE_FPS = 5;

const SEQUENCE = {
  directory: "/images/stall-sequence",
  prefix: "ezgif-frame-",
  pad: 3,
  extension: "jpg",
};

/**
 * Absolute public path of a frame, addressed by its zero-based index.
 *
 * `count` defaults to `STALL_SEQUENCE_FRAME_COUNT`, and is only passed when a
 * caller overrides the frame count through the component's `frameCount` prop.
 */
export function stallFrameSrc(index, count = STALL_SEQUENCE_FRAME_COUNT) {
  const clamped = Math.max(0, Math.min(count - 1, index));
  const frame = String(clamped + 1).padStart(SEQUENCE.pad, "0");

  return `${SEQUENCE.directory}/${SEQUENCE.prefix}${frame}.${SEQUENCE.extension}`;
}

/**
 * Canvas rendering and memory budget.
 *
 * Holding all 120 frames decoded at source resolution would cost roughly
 * 120 x 1920 x 1080 x 4 bytes, about 1 GB, which no ordinary device should be
 * asked for. Two tiers avoid that:
 *
 *  - `base`  — every frame, downscaled to `BASE_MAX_WIDTH`. Always resident, so
 *              any scroll position can draw a correct frame instantly. Around
 *              100 MB for the whole sequence.
 *  - `sharp` — only the frames inside a moving window around the playhead, at
 *              up to `SHARP_MAX_WIDTH`. Around 140 MB at the window size below.
 *
 * The canvas draws the sharp frame when it is ready and the base frame
 * otherwise, so there is never a blank, black, or out-of-order frame while a
 * sharp copy is still decoding. Devices that report themselves as constrained
 * skip the sharp tier entirely and keep only the base tier.
 */
export const stallSequenceConfig = {
  /** Backing-store cap. Beyond this the extra pixels are not worth the cost. */
  maxDpr: 1.5,
  /** Resolution of the always-resident tier. */
  baseMaxWidth: 620,
  /** Resolution cap of the near-playhead tier (the source is 1920 wide). */
  sharpMaxWidth: 1920,
  /** Frames kept sharp either side of the playhead. */
  sharpWindowRadius: 8,
  /** Sharp copies decoded at once, to leave the main thread room to breathe. */
  sharpConcurrency: 2,
  /** Base frames requested per batch while preparing the sequence. */
  baseBatchSize: 8,
  /** Pause between base batches, in milliseconds. */
  baseBatchGap: 60,
  /** Base frames decoded before the sequence is revealed. */
  eagerFrames: 10,
  /** How far to look for a loaded neighbour before holding the current frame. */
  nearestSearchRadius: 14,
  /** Source frame dimensions, used to reserve layout space before loading. */
  sourceWidth: 1920,
  sourceHeight: 1080,
};

/**
 * Copy for the section. The heading and description are unchanged from the
 * page's original brief and remain the section's identity.
 */
export const stallGalleryIntro = {
  eyebrow: "Exhibition Stall Design",
  heading: "Spaces That Make Your Brand Stand Out.",
  body: "Explore our exhibition stall designs, created to showcase brands, attract attention, and create memorable experiences at trade shows and exhibitions.",
};

/** Supporting UI around the sequence: deliberately minimal. */
export const stallSequenceUi = {
  scrollHint: "Scroll to Explore",
  /** Accessible description of the whole sequence, for assistive tech. */
  posterAlt:
    "Guided walkthrough of VedhEra  exhibition stall designs, moving between branded stalls inside an exhibition hall",
  loadingLabel: "Preparing Stalls",
  loadingComplete: "Sequence Ready",
  staticNote:
    "A still preview is shown because motion is reduced in your system settings.",
  fallbackNote:
    "The animated walkthrough could not be prepared, so a still of the stall work is shown instead.",
  /** Shown if the sequence cannot run at all, so the section never goes empty. */
  fallbackImage: {
    src: "/images/stall-design/stall10.webp",
    alt: "Exhibition stall design visualisation in a neutral palette",
    w: 1600,
    h: 900,
  },
};

/**
 * Closing line of the gallery. The full "Planning Your Next Exhibition?"
 * heading belongs to the stall enquiry section further down the page, so this
 * stays a single call to action that hands the visitor straight to the form.
 */
export const stallGalleryClosing = {
  eyebrow: "Start A Conversation",
  cta: { label: "Discuss Your Exhibition Stall", href: "#stall-enquiry" },
};
