/**
 * Central content for the About page.
 *
 * Keeping the copy here keeps the About components presentational, so text
 * can be edited without touching layout or animation code.
 */

export const aboutHero = {
  label: "About VedhEra",
  heading: "We Turn Ideas Into Digital Success.",
  body: "We bring creativity, strategy, design, and technology together to help businesses build stronger brands and meaningful digital experiences.",
  primaryCta: { label: "Explore Our Expertise", href: "/#services-overview" },
  secondaryCta: { label: "Discuss Your Project", href: "/contact" },
};

export const companyIntro = {
  eyebrow: "Who We Are",
  heading: "Creative Thinking. Strategic Execution.",
  paragraphs: [
    "VedhEra is a creative advertising and digital marketing agency focused on helping businesses communicate effectively, strengthen their identity, and grow their digital presence.",
    "From branding and graphic design to website development, digital marketing, and exhibition stall design, we bring multiple creative capabilities together to deliver cohesive brand experiences.",
    "Our approach combines thoughtful design, practical technology, and business-focused execution to help brands move forward with confidence.",
  ],
  // A real, supplied piece of VedhEra  creative work — not a stock photo.
  image: {
    src: "/images/graphic-design/stationary/stationary2.webp",
    alt: "Brand identity and stationery design created by VedhEra  ",
  },
};

export const expertise = {
  eyebrow: "Our Expertise",
  heading: "Capabilities That Move Brands Forward.",
  items: [
    {
      id: "graphic-design",
      icon: "Palette",
      title: "Graphic Design & Branding",
      description:
        "Building distinctive visual identities, marketing creatives, brochures, and brand communication.",
      href: "/services/graphic-design",
    },
    {
      id: "website-design",
      icon: "MonitorSmartphone",
      title: "Website Design & Development",
      description:
        "Creating responsive corporate websites, e-commerce experiences, and custom digital solutions.",
      href: "/services/website-design",
    },
    {
      id: "digital-marketing",
      icon: "Megaphone",
      title: "Digital Marketing",
      description:
        "Helping brands improve their online presence through SEO, social media marketing, paid campaigns, and content strategy.",
      href: "/services/digital-marketing",
    },
    {
      id: "stall-design",
      icon: "Building2",
      title: "Exhibition Stall Design & Fabrication",
      description:
        "Creating engaging exhibition spaces through design, visualization, branding, and fabrication.",
      href: "/services/stall-design",
    },
  ],
};

export const approach = {
  eyebrow: "Our Approach",
  heading: "How We Work.",
  body: "A clear, collaborative process that runs from the first conversation to final delivery.",
  steps: [
    {
      number: "01",
      title: "Understand",
      text: "Understand the client’s business, audience, requirements, and goals.",
    },
    {
      number: "02",
      title: "Strategize",
      text: "Develop a clear creative and execution strategy.",
    },
    {
      number: "03",
      title: "Create",
      text: "Design, develop, and produce the required brand or digital experience.",
    },
    {
      number: "04",
      title: "Deliver & Improve",
      text: "Launch the work, review the outcome, and identify opportunities for improvement.",
    },
  ],
};

export const strengths = {
  eyebrow: "Why VEDH ",
  heading: "One Creative Partner. Multiple Capabilities.",
  points: [
    {
      icon: "Layers",
      title: "Integrated Creative & Digital Services",
      text: "Design, digital, and exhibition work delivered as one connected system.",
    },
    {
      icon: "Target",
      title: "Business-Focused Thinking",
      text: "Every decision is framed around the client’s goals and audience.",
    },
    {
      icon: "Sparkles",
      title: "Consistent Brand Communication",
      text: "A coherent visual and verbal identity across every touchpoint.",
    },
    {
      icon: "CodeXml",
      title: "Design and Technology Together",
      text: "Craft and engineering working in the same direction.",
    },
    {
      icon: "Handshake",
      title: "Practical, Collaborative Execution",
      text: "Clear communication and work designed to be built and used.",
    },
  ],
};

export const missionVision = {
  mission: {
    label: "Our Mission",
    text: "To help businesses communicate their value through thoughtful design, creative solutions, and effective digital experiences.",
  },
  vision: {
    label: "Our Vision",
    text: "To become a trusted creative and digital partner for businesses seeking meaningful brand experiences and sustainable growth.",
  },
};

export const team = {
  eyebrow: "Our Team",
  heading: "The People Behind the Ideas.",
  body: "Our work brings together creative thinking, design, development, marketing, and execution.",
  // No team photographs or verified profiles exist in the project, so this
  // section presents the capabilities behind the work instead.
  capabilities: [
    { icon: "PenTool", title: "Creative Thinking" },
    { icon: "Palette", title: "Design" },
    { icon: "CodeXml", title: "Development" },
    { icon: "Megaphone", title: "Marketing & Execution" },
  ],
};

export const aboutClosingCta = {
  heading: "Let’s Create Something Meaningful.",
  body: "Have a business idea, a brand to build, or a digital experience to improve? Let’s discuss how VedhEra can help.",
  primary: { label: "Discuss Your Project", href: "/contact" },
  secondary: { label: "Contact VedhEra", href: "/contact" },
};
