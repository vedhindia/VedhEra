/**
 * Central content for the Contact page.
 *
 * Keeping the copy here keeps the Contact components presentational, so text
 * can be edited without touching layout or animation code.
 */

/**
 * Enquiry submissions are handed to the visitor's own email client (mailto),
 * so this is the single destination inbox for the contact form.
 */
export const ENQUIRY_EMAIL = "vedhindia@gmail.com";

/**
 * Verified contact information.
 *
 * NOTHING here is invented. Every block is optional: fill a value in and the
 * matching card appears; leave it blank and the card is simply not rendered.
 * The location map only appears once `address.mapQuery` holds a complete,
 * verified address.
 */
export const contactDetails = {
  eyebrow: "Contact Information",
  heading: "Reach Us Directly.",
  body: "Prefer to talk it through first? Use the details below, or send an enquiry and we will come back to you.",
  emptyNote:
    "Our direct contact details are being finalised. Send an enquiry using the form and we will reply to you by email.",

  phone: {
    label: "Phone",
    numbers: [
      { value: "+91 99239 56363", dial: "+919923956363" },
      { value: "+91 91122 97779", dial: "+919112297779" },
    ],
  },
  email: {
    label: "Email",
    value: "vedhindia@gmail.com",
  },
  address: {
    label: "Office Address",
    lines: [
      "Sagar Complex, Nashik phata, Pune, Maharashtra 411034, India",
    ],
    // The address exactly as supplied — used for the location map.
    mapQuery:
      "Office No. 16, A wing, First Floor, Sagar Complex, Near Bhosari Metro Station, Nashik phata, Kasarwadi",
  },
  hours: {
    label: "Business Hours",
    // Not supplied yet — add entries here and the card appears automatically.
    // e.g. { days: "Monday – Friday", time: "10:00 AM – 7:00 PM" }
    entries: [],
  },
};

export const contactHero = {
  label: "Contact VedhEra  ",
  heading: "Let’s Create Something Exceptional",
  body: "Have a project in mind? Let’s discuss how VedhEra  can help your brand grow.",
  primaryCta: { label: "Start Your Enquiry", href: "#enquiry" },
  secondaryCta: { label: "Explore Our Services", href: "/#services-overview" },
  scrollCue: "Start a Conversation",
};

export const enquiryForm = {
  eyebrow: "Project Enquiry",
  heading: "Tell Us About Your Project.",
  body: "Share a few details about what you are building. We will get back to you with the right questions and the next steps.",
  submitLabel: "Send Enquiry",
  submittingLabel: "Preparing Your Enquiry",
  successMessage:
    "Your enquiry is ready. Your email app will now open with the details filled in — please press send.",
  errorSummary: "Some details need your attention. Please review the highlighted fields.",
  budgetHint: "Optional — a rough range is fine.",
  footerNote: "Enquiries open in your own email app, so you keep a copy of everything you send.",
  fallbackNote: "Prefer to email us directly?",
};

// Service options offered in the enquiry dropdown.
export const enquiryServices = [
  "Graphic Design",
  "Website Development",
  "Digital Marketing",
  "Branding",
  "Exhibition Stall Design",
];

export const contactClosingCta = {
  eyebrow: "Next Step",
  heading: "Ready to Start Your Project?",
  body: "Tell us what you have in mind and we will help you shape it into something your audience remembers.",
  primary: { label: "Send Your Enquiry", href: "#enquiry" },
  secondary: { label: "See Our Services", href: "/#services-overview" },
};
