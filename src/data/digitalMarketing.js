/**
 * Digital Marketing page content.
 *
 * Supplied illustrations are used in the page hero and matching campaign
 * showcase cards. They remain labeled as concepts rather than client work.
 *
 * No client results, campaign statistics, testimonials, or performance claims
 * are invented anywhere in this file. Service descriptions describe the work we
 * do, not an outcome we guarantee.
 */

export const digitalMarketingHero = {
  eyebrow: "Digital Marketing",
  heading: "Turn Your Digital Presence Into Business Growth.",
  body: "We plan and manage digital marketing activity around your audience and your business goals — connecting search, social, paid campaigns, and content into one considered direction.",
  image: {
    src: "/images/digital-marketing/marketing.png",
    alt: "Illustration of a digital marketing dashboard with social platforms, campaign analytics, and growth charts",
  },
  primaryCta: { label: "Explore Our Services", href: "#marketing-services" },
  secondaryCta: { label: "Get a Marketing Strategy", href: "/contact" },
};

export const marketingServicesIntro = {
  eyebrow: "Digital Marketing Services",
  heading: "Channels and Capabilities We Work Across.",
  body: "Each service below describes a capability we plan and execute around a business goal — not a promise of a specific result.",
};

export const marketingServices = [
  {
    id: "seo",
    icon: "Search",
    title: "Search Engine Optimisation",
    description:
      "Structured on-page work, technical housekeeping, and content direction that help search engines understand your site.",
    href: "/contact",
  },
  {
    id: "social-media",
    icon: "Share2",
    title: "Social Media Marketing",
    description:
      "Content calendars, creative direction, and channel management shaped around how your audience actually uses each platform.",
    href: "/contact",
  },
  {
    id: "meta-ads",
    icon: "Megaphone",
    title: "Meta Ads",
    description:
      "Campaign structure, audience setup, and creative variations for Facebook and Instagram placements.",
    href: "/contact",
  },
  {
    id: "google-ads",
    icon: "MousePointerClick",
    title: "Google Ads",
    description:
      "Search and display campaign setup built around intent, relevance, and clear ad messaging.",
    href: "/contact",
  },
  {
    id: "content-marketing",
    icon: "FileText",
    title: "Content Marketing",
    description:
      "Written and visual content planned around the questions your audience is already asking.",
    href: "/contact",
  },
  {
    id: "lead-generation",
    icon: "Users",
    title: "Lead Generation",
    description:
      "Enquiry-focused landing experiences and forms designed to make the next step obvious for the visitor.",
    href: "/contact",
  },
  {
    id: "orm",
    icon: "ShieldCheck",
    title: "Online Reputation Management",
    description:
      "Monitoring and response direction that help you stay aware of how the brand is being discussed online.",
    href: "/contact",
  },
];

export const campaignShowcaseIntro = {
  eyebrow: "Creative Campaign Showcase",
  heading: "Campaign Creative Across Formats.",
  body: "Explore supplied concept visuals for social media, Meta ads, campaign artwork, and content marketing. These illustrations show creative direction and are not presented as client campaign work.",
};

export const campaignCreatives = [
  {
    id: "social-01",
    title: "Social Media Creative 01",
    type: "Social Media Creative",
    kind: "social",
    src: "/images/digital-marketing/creative.png",
    alt: "Social media campaign concept featuring product posts and platform icons",
    description:
      "Square social post direction with a bold headline hierarchy and a clear call to action.",
  },
  {
    id: "meta-ad-01",
    title: "Meta Ad Design 01",
    type: "Meta Ad Design",
    kind: "ad",
    src: "/images/digital-marketing/meta-ad.png",
    alt: "Meta advertising concept with a featured product post and engagement graphics",
    description:
      "Portrait ad layout intended for feed placements, with room for offer and action messaging.",
  },
  {
    id: "google-ad-01",
    title: "Google Ad Design 01",
    type: "Google Ad Design",
    src: "/images/digital-marketing/google-ads.png",
    kind: "banner",
    description:
      "Wide display banner direction for responsive search and display placements.",
  },
  {
    id: "campaign-01",
    title: "Campaign Visual 01",
    type: "Campaign Visual",
    kind: "story",
    src: "/images/digital-marketing/campaign.png",
    alt: "Vertical campaign concept showing social media and advertising placements",
    description:
      "Vertical campaign visual intended for story-format placements and mobile-first viewing.",
  },
  {
    id: "content-01",
    title: "Content Series Visual 01",
    type: "Content Marketing Visual",
    kind: "social",
    src: "/images/digital-marketing/content.png",
    alt: "Content marketing concept showing social posts, video, and a content planning dashboard",
    description:
      "Series-ready visual direction that can be repeated across a multi-part content plan.",
  },
  {
    id: "video-01",
    title: "Thumbnail 01",
    type: "Thumbnail",
    src: "/images/digital-marketing/google-ads.png",
    kind: "video",
    description:
      "Landscape video thumbnail direction designed to stay legible at small sizes in a feed.",
  },
];

export const marketingWhyChoose = {
  eyebrow: "Why Choose VedhEra Media",
  heading: "Planned, Measured, and Reviewed Continuously.",
  body: "We approach digital marketing as an ongoing process rather than a one-time push. The focus is on clear planning, consistent creative, and regular review of what is actually happening.",
  points: [
    {
      icon: "Compass",
      title: "Strategic Planning",
      text: "Activity starts from objectives, audience, and channel fit rather than from a template campaign.",
    },
    {
      icon: "Sparkles",
      title: "Creative Campaigns",
      text: "Creative is developed to fit the platform and the message, not simply resized across channels.",
    },
    {
      icon: "Crosshair",
      title: "Audience Targeting",
      text: "Audience groups and messaging are structured so the right people see a relevant offer.",
    },
    {
      icon: "LineChart",
      title: "Performance Tracking",
      text: "Campaigns are set up with the tracking and reporting measurements needed to review them.",
    },
    {
      icon: "RefreshCw",
      title: "Continuous Optimisation",
      text: "Findings are reviewed over time and used to refine creative, targeting, and structure.",
    },
  ],
};

export const marketingProcess = {
  eyebrow: "Our Marketing Process",
  heading: "A Repeatable Cycle, Not a One-Off Push.",
  body: "The work moves through a clear sequence so strategy, execution, and reporting stay connected.",
  steps: [
    {
      number: "01",
      title: "Research & Strategy",
      text: "We look at the business, the audience, the competitive landscape, and the channels that make sense to pursue.",
    },
    {
      number: "02",
      title: "Campaign Planning",
      text: "Objectives, messaging, creative direction, channel mix, and timelines are defined before anything goes live.",
    },
    {
      number: "03",
      title: "Execution & Optimisation",
      text: "Campaigns are launched, monitored, and adjusted as the first results and audience responses come in.",
    },
    {
      number: "04",
      title: "Reporting & Insights",
      text: "Performance is reviewed against the original objectives and used to shape the next round of activity.",
    },
  ],
};

export const digitalMarketingCta = {
  eyebrow: "Ready To Start",
  heading: "Let's Build Your Next Growth Story.",
  body: "Tell us about your business and what you want to achieve, and we will help shape a marketing direction around it.",
  primary: { label: "Start Your Project", href: "/contact" },
};
