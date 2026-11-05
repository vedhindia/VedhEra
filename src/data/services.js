/**
 * Central service data: used by the homepage service scenes, the services
 * overview cards, and the contact CTA.
 */

export const services = [
  {
    id: "graphic-design",
    icon: "Palette",
    title: "Graphic Design & Branding",
    description:
      "Visual identity, brand assets, brochures, and creative communication.",
    href: "/services/graphic-design",
  },
  {
    id: "website-design",
    icon: "MonitorSmartphone",
    title: "Website Design & Development",
    description:
      "Corporate websites, e-commerce websites, responsive design, and web development.",
    href: "/services/website-design",
  },
  {
    id: "digital-marketing",
    icon: "Megaphone",
    title: "Digital Marketing",
    description:
      "Search engine optimization, social media marketing, paid advertising, and content strategy.",
    href: "/services/digital-marketing",
  },
  {
    id: "stall-design",
    icon: "Building2",
    title: "Exhibition Stall Design & Fabrication",
    description:
      "Exhibition stall concepts, visualization, branding, and fabrication.",
    href: "/services/stall-design",
  },
];

/**
 * Cinematic scene content.
 *
 * `labels` are service offerings, not portfolio claims. `images` reference
 * real files from `public/images` (see src/data/portfolio.js).
 */
export const serviceScenes = [
  {
    id: "graphic-design",
    eyebrow: "01 — Graphic Design",
    heading: "Design That Makes Brands Unforgettable.",
    body: "From visual identities to campaign creatives, we create thoughtful designs that help brands communicate with clarity and confidence.",
    labels: [
      "Logo Design",
      "Brand Identity",
      "Brochure Design",
      "Corporate Identity",
      "Print Design",
    ],
    accent: "#c0c4c9",
  },
  {
    id: "website-design",
    eyebrow: "02 — Website Design",
    heading: "Digital Experiences Built to Perform.",
    body: "We design and develop responsive digital experiences that combine thoughtful user interfaces, functionality, and a seamless user journey.",
    labels: [
      "Corporate Websites",
      "E-commerce Websites",
      "Website Development",
      "UI/UX Design",
      "Responsive Web Design",
    ],
    accent: "#c0c4c9",
  },
  {
    id: "digital-marketing",
    eyebrow: "03 — Digital Marketing",
    heading: "Make Every Digital Interaction Count.",
    body: "We help businesses strengthen their online presence through creative campaigns, digital marketing strategies, and thoughtful execution.",
    labels: [
      "Social Media Marketing",
      "Search Engine Optimization",
      "Meta Advertising",
      "Google Advertising",
      "Content Strategy",
      "Digital Campaigns",
    ],
    accent: "#c0c4c9",
  },
  {
    id: "stall-design",
    eyebrow: "04 — Exhibition Stalls",
    heading: "Spaces Designed to Stand Out.",
    body: "We create exhibition spaces that bring brands to life through thoughtful design, engaging experiences, and practical fabrication solutions.",
    labels: [
      "Exhibition Stall Design",
      "3D Stall Visualization",
      "Stall Fabrication",
      "Exhibition Branding",
      "Display Solutions",
    ],
    accent: "#c0c4c9",
  },
];

export const aboutPreview = {
  heading: "Ideas That Move Businesses Forward.",
  body: "VedhEra Media helps brands build meaningful identities, powerful digital experiences, and stronger connections with their audiences through creative design and digital solutions.",
  labels: [
    "Graphic Design & Branding",
    "Website Design & Development",
    "Digital Marketing",
    "Exhibition Stall Design & Fabrication",
  ],
};

export const whyChooseUs = {
  heading: "Why Choose VedhEra",
  intro:
    "A single creative partner across design, digital, and exhibition experiences.",
  stats: [
    {
      icon: "CalendarDays",
      value: "15+",
      label: "Years of Experience",
    },
    {
      icon: "Tags",
      value: "50+",
      label: "Brands",
    },
    {
      icon: "UsersRound",
      value: "15+",
      label: "Creative Minds",
    },
    {
      icon: "FolderCheck",
      value: "200+",
      label: "Projects Delivered",
    },
  ],
};

export const contactCta = {
  heading: "Have an Idea? Let’s Build What’s Next.",
  body: "Tell us about your business, your goals, and the experience you want to create.",
  primary: { label: "Discuss Your Project", href: "/contact" },
  secondary: { label: "Contact VedhEra  ", href: "/contact" },
};

export const heroTagline = "See Beyond. Think Ahead. Lead Forward.";