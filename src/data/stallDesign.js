/**
 * Content for the Exhibition Stall Design & Fabrication service page.
 *
 * Same convention as the other service pages: every string lives here so the
 * page components stay presentational and copy can be edited without touching
 * layout or animation code.
 *
 * Asset note
 * ----------
 * `w` / `h` are the true decoded pixel dimensions of each stall image, so
 * panels and cards reserve the correct aspect ratio and the supplied artwork is
 * never stretched or cropped. Every path below points at a real file in
 * `public/images/stall-design/`.
 *
 * Integrity note
 * --------------
 * No client names, testimonials, statistics, or before-and-after project pairs
 * are invented anywhere in this file. The only achievement recorded is the one
 * supplied by VedhEra  , and the client logos are the supplied logo assets
 * (see `src/data/clients.js`).
 */

export const stallDesignHero = {
  eyebrow: "Exhibition Stall Design & Fabrication",
  heading: "We Build Experiences. Not Just Exhibition Stalls.",
  body: "Create impactful exhibition spaces that showcase your brand, attract visitors, and make your presence memorable.",
  primaryCta: { label: "Explore Our Work", href: "#stall-gallery" },
  secondaryCta: { label: "Get a Stall Quote", href: "#stall-enquiry" },
  visual: {
    src: "/images/stall-design/stall10.webp",
    alt: "Exhibition stall design visualisation in a neutral palette",
    w: 1600,
    h: 900,
  },
  detail: {
    src: "/images/stall-design/stall8.webp",
    alt: "Exhibition stall design visualisation supplied by VedhEra  ",
    w: 1280,
    h: 960,
  },
  caption: "Concept visualisation",
};

export const stallPortfolioIntro = {
  heading: "Exhibition Stall Portfolio",
  body: "Explore exhibition spaces designed to make brands stand out.",
};

/** Six supplied stall renders used by the 3D portfolio carousel. */
export const stallPortfolioItems = [
  {
    id: "stall-1",
    src: "/images/stall-design/1.png",
    alt: "Exhibition stall design portfolio image 1",
    w: 1536,
    h: 1024,
  },
  {
    id: "stall-2",
    src: "/images/stall-design/2.png",
    alt: "Exhibition stall design portfolio image 2",
    w: 1536,
    h: 1024,
  },
  {
    id: "stall-3",
    src: "/images/stall-design/3.png",
    alt: "Exhibition stall design portfolio image 3",
    w: 1536,
    h: 1024,
  },
  {
    id: "stall-4",
    src: "/images/stall-design/4.png",
    alt: "Exhibition stall design portfolio image 4",
    w: 1536,
    h: 1024,
  },
  {
    id: "stall-5",
    src: "/images/stall-design/5.png",
    alt: "Exhibition stall design portfolio image 5",
    w: 1536,
    h: 1024,
  },
  {
    id: "stall-6",
    src: "/images/stall-design/6.png",
    alt: "Exhibition stall design portfolio image 6",
    w: 1536,
    h: 1024,
  },
];

export const stallTypesIntro = {
  eyebrow: "Stall Types",
  heading: "A Format For Every Hall, Brief And Budget.",
  body: "The stall format is chosen around the space you have, the footfall you expect, and what you want a visitor to do once they step in. These are the formats we design and fabricate.",
};

export const stallTypes = [
  {
    id: "custom-built",
    title: "Custom-Built Stalls",
    description:
      "A one-off structure designed around your brand story, product mix, and the visitors you want to pull in. Best when the stall itself is the statement.",
    image: {
      src: "/images/stall-design/stall2.webp",
      alt: "Custom exhibition stall design visualisation",
      w: 1280,
      h: 960,
    },
  },
  {
    id: "modular",
    title: "Modular Stalls",
    description:
      "Reusable system-based structures that can be reconfigured for a different hall or stand size without being rebuilt from scratch.",
    image: {
      src: "/images/stall-design/stall4.webp",
      alt: "Modular exhibition stall design visualisation",
      w: 1280,
      h: 960,
    },
  },
  {
    id: "corner-peninsula",
    title: "Corner & Peninsula Booths",
    description:
      "Open on two or three sides, these formats give you visibility from more than one aisle and more than one way in.",
    image: {
      src: "/images/stall-design/stall6.webp",
      alt: "Corner and peninsula exhibition booth visualisation",
      w: 1280,
      h: 960,
    },
  },
  {
    id: "island",
    title: "Island Booths",
    description:
      "Open on all four sides, with the structure and branding carried overhead so the stall reads from across the hall.",
    image: {
      src: "/images/stall-design/sall15.webp",
      alt: "Island exhibition booth design visualisation",
      w: 1280,
      h: 960,
    },
  },
  {
    id: "shell-scheme",
    title: "Shell Scheme Branding & Upgrades",
    description:
      "Work with the organiser's shell scheme and lift it with fascia branding, graphics, flooring, and lighting upgrades.",
    image: {
      src: "/images/stall-design/stall7.webp",
      alt: "Shell scheme exhibition stall branding visualisation",
      w: 1280,
      h: 960,
    },
  },
  {
    id: "double-decker",
    title: "Two Side Open Stalls",
    description:
      "Open on two sides, these formats give you visibility from more than one aisle and more than one way in.",
    image: {
      src: "/images/stall-design/stall8.webp",
      alt: "Two-level exhibition stall design visualisation",
      w: 1280,
      h: 960,
    },
  },
];

export const stallServicesIntro = {
  eyebrow: "Our Services",
  heading: "One Partner From Sketch To Stand.",
  body: "Design, production, and on-site execution handled by the same team, so what is approved on screen is what gets built on the floor.",
};

export const stallServices = [
  {
    icon: "PenTool",
    title: "Exhibition Stall Concept & 3D Design",
    text: "Stall concepts and 3D visualisations, so you can see the space and approve the direction before anything is built.",
  },
  {
    icon: "Ruler",
    title: "Space Planning & Layout",
    text: "Layout planned around your stall dimensions, the aisle direction, and the points where you want visitors to pause.",
  },
  {
    icon: "Palette",
    title: "Branding & Graphic Production",
    text: "Panels, signage, and collateral produced in the same visual language as the rest of your brand.",
  },
  {
    icon: "Warehouse",
    title: "Stall Fabrication",
    text: "The approved design built to size, finished, and prepared for the show floor.",
  },
  {
    icon: "Armchair",
    title: "Lighting, Furniture & Display Setup",
    text: "Lighting, seating, counters, and product display set up so the stall works the way it was designed to.",
  },
  {
    icon: "Truck",
    title: "Installation & Dismantling",
    text: "On-site assembly before the show opens and removal afterwards, within the venue's build-up and teardown windows.",
  },
];

export const stallProcessIntro = {
  eyebrow: "From Concept To Completion",
  heading: "Four Steps. No Surprises.",
  body: "A stall moves through the same four stages every time, from the first conversation to the finished stand.",
};

export const stallProcess = [
  {
    number: "01",
    title: "Brief & Planning",
    text: "We start with the exhibition, the hall, your stall size, the event date, and what the stall needs to achieve. That becomes the brief everything else is measured against.",
  },
  {
    number: "02",
    title: "3D Design",
    text: "The layout and structure are developed into a 3D visualisation, with branding and graphics placed in context, so the stall can be reviewed and refined before production.",
  },
  {
    number: "03",
    title: "Fabrication",
    text: "Once the design is approved, the structure, finishes, and graphics are produced to size and prepared for transport to the venue.",
  },
  {
    number: "04",
    title: "Installation",
    text: "The stall is assembled on site within the venue's build-up window, checked over, and handed back ready for the show to open. Dismantling happens the same way after it closes.",
  },
];

export const stallIndustriesIntro = {
  eyebrow: "Industries We Serve",
  heading: "Built Around Different Kinds Of Buyer.",
  body: "An exhibition audience in every sector arrives with different questions. These are the sector categories covered across our design and digital work.",
};

export const stallIndustries = [
  {
    icon: "Factory",
    title: "Industrial Machinery & Manufacturing",
    text: "Product-led displays and specification panels, arranged so a stall still reads well from the far side of the aisle.",
  },
  {
    icon: "HardHat",
    title: "Construction & Infrastructure",
    text: "Large-format project imagery and material samples, laid out so a visitor can understand scale at a glance.",
  },
  {
    icon: "HeartPulse",
    title: "Healthcare & Medical Equipment",
    text: "Calm, uncluttered layouts where equipment can be demonstrated and conversations can happen without the crowd.",
  },
  {
    icon: "Building2",
    title: "Real Estate & Building Materials",
    text: "Project storytelling, floor plans, and material displays organised for walk-in visitors who are comparing options.",
  },
  {
    icon: "ShoppingBag",
    title: "Consumer Products & Retail",
    text: "Product-forward layouts built for handling, sampling, and quick conversations, with the brand visible from the aisle.",
  },
];

export const stallTrustIntro = {
  eyebrow: "Achievements & Client Trust",
  heading: "Recognition, And The Brands Behind The Work.",
  body: "Recognition and client logos presented exactly as they were supplied to us. Nothing on this page is an invented client name, testimonial, or performance statistic.",
};

/**
 * The award below is the only recognition supplied by VedhEra  . No supporting
 * photograph of the award exists in the project yet, so the card carries the
 * supplied wording only — add `image` here later and the card picks it up.
 */
export const stallRecognition = [
  {
    id: "mahatech-2025",
    icon: "Trophy",
    title: "Best Display Award",
    event: "MAHATECH Expo, Pune",
    year: "2025",
    text: "Awarded for an exhibition stall display at MAHATECH Expo, Pune in 2025.",
    image: null,
  },
];

export const stallFaqIntro = {
  eyebrow: "Frequently Asked Questions",
  heading: "Answers Before You Enquire.",
  body: "The questions that come up most often when a team starts planning an exhibition stall.",
};

export const stallFaqs = [
  {
    id: "quotation",
    question: "What information is needed to get a stall design quotation?",
    answer:
      "The exhibition name and location, your stall size or stall number, the event date and build-up window, whether the space is a shell scheme or open floor, and what you want the stall to do — display products, host meetings, or simply pull in footfall. Brand guidelines or reference material help, but they are not required to start.",
  },
  {
    id: "customised",
    question: "Can you design and fabricate a customised exhibition stall?",
    answer:
      "Yes. We handle the concept and 3D visualisation, branding and graphic production, fabrication, and on-site installation and dismantling. Custom-built, modular, and shell scheme upgrade formats are all covered.",
  },
  {
    id: "space",
    question: "Can the stall design be customised to the available space?",
    answer:
      "That is the starting point. The layout is planned around the space you actually have — inline, corner, peninsula, or island — so the design follows your dimensions rather than a fixed template. Share the floor plan or stall number and we will plan the layout and visitor movement around it.",
  },
  {
    id: "installation",
    question: "Do you provide installation services?",
    answer:
      "Yes. Assembly at the venue is part of the service, scheduled inside the venue's build-up window and checked over before the show opens. Dismantling is handled the same way once the exhibition closes.",
  },
  {
    id: "timeline",
    question: "How early should we start planning our exhibition stall?",
    answer:
      "As early as the event date allows. The design needs an approval round, fabrication needs production time, and the venue only opens for build-up in a fixed window. Share your event date and we will plan the schedule backwards from it.",
  },
];

export const stallEnquiry = {
  eyebrow: "Stall Enquiry",
  heading: "Planning Your Next Exhibition? Let’s Build Something Remarkable.",
  body: "Share the details below and we will come back with the right questions, a design direction, and a quotation.",
  submitLabel: "Request a Stall Quote",
  submittingLabel: "Preparing Your Enquiry",
  successMessage:
    "Your stall enquiry is ready. Your email app will now open with the details filled in — please press send.",
  errorSummary:
    "Some details need your attention. Please review the highlighted fields.",
  footerNote:
    "Enquiries open in your own email app, so you keep a copy of everything you send.",
  fallbackNote: "Prefer to email us directly?",
};

/** Options offered in the "Required Services" group of the stall enquiry form. */
export const stallServiceOptions = [
  "Exhibition stall concept and 3D design",
  "Space planning and layout",
  "Branding and graphic production",
  "Stall fabrication",
  "Lighting, furniture and display setup",
  "Installation and dismantling",
];
