/**
 * Central content for the Career page.
 *
 * Keeping the copy here keeps the Career components presentational, so text
 * can be edited without touching layout or animation code.
 */

/**
 * Applications are handed to the visitor's own email client (mailto), so this
 * is the single destination inbox for every submission.
 */
export const APPLICATION_EMAIL = "vedhindia@gmail.com";

export const careerHero = {
  label: "Careers at VedhEra  ",
  heading: "Build Your Future With Us",
  body: "Join a creative team where ideas become impactful digital experiences.",
  primaryCta: { label: "View Open Roles", href: "#openings" },
  secondaryCta: { label: "Send Your Application", href: "#apply" },
  scrollCue: "Explore Careers",
};

export const whyWork = {
  eyebrow: "Why Work With VedhEra  ?",
  heading: "A Place to Create, Learn and Grow.",
  body: "We are a focused team where your work is seen, your ideas are heard, and your growth is part of the plan.",
  points: [
    {
      icon: "Palette",
      title: "Creative Work",
      text: "Brand identities, campaigns, brochures, websites and exhibition stalls for real client brands — the kind of portfolio you build by shipping work, not by practising it.",
    },
    {
      icon: "GraduationCap",
      title: "Learning Opportunities",
      text: "Mentorship, honest feedback and visibility across every stage of a project, from the first brief to final delivery.",
    },
    {
      icon: "Users",
      title: "Teamwork",
      text: "Small teams, direct communication and shared ownership. You work alongside the people who make the decisions.",
    },
    {
      icon: "TrendingUp",
      title: "Professional Growth",
      text: "Clear responsibilities, expanding scope and a focus on skills that stay valuable as your career moves forward.",
    },
  ],
};

export const openings = {
  eyebrow: "Open Roles",
  heading: "Current Openings.",
  body: "We hire as projects grow. The profiles below reflect the kind of people we regularly look for.",
  // These are standing profiles rather than guaranteed vacancies.
  note: "These roles are indicative profiles, not confirmed vacancies. Send an application and we will reach out when a suitable position opens.",
  applyLabel: "Apply For This Role",
  roles: [
    {
      id: "graphic-designer",
      icon: "Palette",
      title: "Graphic Designer",
      team: "Design Team",
      type: "Full Time",
      experience: "1–3 Years",
      summary:
        "Create brand identities, marketing collateral, brochures and campaign creatives for client brands.",
      skills: ["Brand Identity", "Typography", "Adobe Suite", "Print & Digital"],
    },
    {
      id: "web-developer",
      icon: "CodeXml",
      title: "Web Developer",
      team: "Development Team",
      type: "Full Time",
      experience: "1–4 Years",
      summary:
        "Build responsive, fast and accessible websites from approved designs, and maintain the ones already live.",
      skills: ["HTML & CSS", "React / Next.js", "Responsive UI", "Performance"],
    },
    {
      id: "digital-marketing-executive",
      icon: "Megaphone",
      title: "Digital Marketing Executive",
      team: "Marketing Team",
      type: "Full Time",
      experience: "1–3 Years",
      summary:
        "Plan and run search, social and paid campaigns, then report clearly on what is actually working.",
      skills: ["SEO", "Social Media", "Paid Campaigns", "Analytics"],
    },
    {
      id: "marketing-executive",
      icon: "Megaphone",
      title: "Marketing Executive",
      team: "Marketing Team",
      summary:
        "Support marketing campaigns and help communicate client brands across relevant channels.",
      skills: ["Campaign Support", "Content", "Coordination", "Communication"],
    },
    {
      id: "3d-designer",
      icon: "Layers",
      title: "3D Designer",
      team: "Design Team",
      summary:
        "Create polished 3D visuals and designs that bring ideas and client concepts to life.",
      skills: ["3D Modeling", "Texturing", "Lighting", "Rendering"],
    },
    {
      id: "video-editor",
      icon: "Video",
      title: "Video Editor",
      team: "Creative Team",
      summary:
        "Edit engaging video content, shaping footage into clear and compelling stories.",
      skills: ["Video Editing", "Storytelling", "Motion Graphics", "Audio"],
    },
  ],
};

export const lifeAtVedh = {
  eyebrow: "Life at VedhEra  ",
  heading: "Where the Work Gets Made.",
  body: "A focused studio environment built around craft, collaboration and getting good ideas finished.",
  /**
   * No office or team photographs exist in the project yet. Add them to
   * `public/images/career/` and list them here — the gallery then replaces the
   * culture cards automatically. Nothing is invented while this stays empty.
   */
  images: [],
  pillars: [
    {
      icon: "Sparkles",
      title: "Studio Craft",
      text: "Work is judged on the quality of the thinking and the finish, not on how many rounds it took.",
    },
    {
      icon: "Handshake",
      title: "Close Collaboration",
      text: "Design, development and marketing sit together, so feedback travels in hours rather than weeks.",
    },
    {
      icon: "Target",
      title: "Ownership",
      text: "You get real responsibility over real deliverables, with support close by when you need it.",
    },
  ],
};

export const applicationForm = {
  eyebrow: "Apply Now",
  heading: "Send Us Your Application.",
  body: "Tell us who you are and what you would like to work on. Your application is sent from your own email app, so you stay in control of what you share.",
  resumeHint:
    "PDF, DOC or DOCX — up to 5 MB. Email apps cannot attach files automatically, so you will be asked to attach your resume once your draft opens.",
  submitLabel: "Send Application",
  successMessage:
    "Your application is ready. Your email app will now open with the details filled in — please attach your resume, then press send.",
  fallbackNote: "Prefer to write to us directly?",
};
