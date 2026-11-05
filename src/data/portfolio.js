/**
 * Central portfolio data.
 *
 * Curation note
 * -------------
 * Every entry references a real file inside `public/images`. Images were
 * selected from the supplied folders using measurable quality signals
 * (resolution, orientation, colour neutrality against the silver/grey/black
 * identity) and, where Windows OCR could read the artwork, its verified
 * on-image content.
 *
 * Titles are deliberately neutral and category-based. No client names,
 * project names, results, or statistics are invented.
 *
 * `orientation` drives layout only. `w`/`h` are the true decoded pixel
 * dimensions, used to reserve space and avoid layout shift.
 */

export const portfolioCategories = [
  { id: "all", label: "All Projects" },
  { id: "graphic-design", label: "Graphic Design" },
  { id: "website-design", label: "Website Design" },
  { id: "digital-marketing", label: "Digital Marketing" },
  { id: "stall-design", label: "Exhibition Stalls" },
];

export const portfolioItems = [
  // ---------------------------------------------------------------- Graphic
  {
    id: "gd-01",
    category: "graphic-design",
    title: "Brand Identity Design 01",
    description: "Brand identity artwork supplied by VedhEra  .",
    src: "/images/graphic-design/branding/1.jpg",
    alt: "Brand identity design artwork in a neutral grey palette",
    orientation: "landscape",
    w: 4000,
    h: 2666,
  },
  {
    id: "gd-02",
    category: "graphic-design",
    title: "Brand Identity Design 02",
    description: "Brand identity artwork supplied by VedhEra  .",
    src: "/images/graphic-design/branding/branding16.webp",
    alt: "Large brand identity composition in deep neutral tones",
    orientation: "landscape",
    w: 4500,
    h: 3000,
  },
  {
    id: "gd-03",
    category: "graphic-design",
    title: "Luxury Real Estate Brochure",
    description:
      "Brochure spread for a residential property project, featuring bold editorial typography.",
    src: "/images/graphic-design/brochures/broucher3.webp",
    alt: "Grey luxury real estate brochure spread with bold typography",
    orientation: "landscape",
    w: 4500,
    h: 3400,
  },
  {
    id: "gd-04",
    category: "graphic-design",
    title: "Corporate Brochure Design",
    description:
      "High-contrast corporate brochure page promoting commercial and retail space.",
    src: "/images/graphic-design/brochures/broucher2.webp",
    alt: "Dark high contrast corporate brochure page with a bold headline",
    orientation: "landscape",
    w: 3000,
    h: 2250,
  },
  {
    id: "gd-05",
    category: "graphic-design",
    title: "Brochure Layout",
    description: "Editorial brochure layout with a bright neutral background.",
    src: "/images/graphic-design/branding/branding12.webp",
    alt: "Bright brochure layout with a detailed diagonal composition",
    orientation: "landscape",
    w: 4500,
    h: 3000,
  },
  {
    id: "gd-06",
    category: "graphic-design",
    title: "Corporate Stationery Suite",
    description:
      "Monochrome stationery set including letterhead and enquiry form.",
    src: "/images/graphic-design/stationary/stationary4.webp",
    alt: "Monochrome stationery set with enquiry form and letterhead",
    orientation: "landscape",
    w: 4000,
    h: 3000,
  },
  {
    id: "gd-07",
    category: "graphic-design",
    title: "Corporate Enquiry Form Set",
    description:
      "Corporate stationery and enquiry form design with contact details.",
    src: "/images/graphic-design/stationary/stationary3.webp",
    alt: "Corporate enquiry form and stationery design set",
    orientation: "landscape",
    w: 4000,
    h: 3000,
  },

  // ---------------------------------------------------------------- Website
  {
    id: "wd-01",
    category: "website-design",
    title: "Industrial Website — Desktop",
    description:
      "Desktop layout for an industrial hydraulic equipment manufacturer.",
    src: "/images/website-design/ecommerce/nirvikar1.png",
    alt: "Dark grey industrial website hero with hydraulic equipment",
    orientation: "landscape",
    w: 1536,
    h: 1024,
  },
  {
    id: "wd-05",
    category: "website-design",
    title: "Hotel Booking Platform — Desktop",
    description: "Search and listing interface for a hotel booking platform.",
    src: "/images/website-design/hotel_booking/hotel1.png",
    alt: "Desktop hotel booking page with search form and hotel listings",
    orientation: "landscape",
    w: 1536,
    h: 1024,
  },
  {
    id: "wd-07",
    category: "website-design",
    title: "E-Commerce Storefront — Desktop",
    description: "Product-category storefront with cart interaction.",
    src: "/images/website-design/ecommerce/olakh2.png",
    alt: "Food e-commerce desktop storefront with product grid and prices",
    orientation: "landscape",
    w: 1536,
    h: 1024,
  },

  // ----------------------------------------------------------- Stall design

  {
    id: "sd-02",
    category: "stall-design",
    title: "Exhibition Stall Design 02",
    description: "Exhibition stall design visualisation by VedhEra  .",
    src: "/images/stall-design/stall9.webp",
    alt: "Exhibition stall render with controlled lighting and depth",
    orientation: "landscape",
    w: 1280,
    h: 960,
  },
  {
    id: "sd-03",
    category: "stall-design",
    title: "Exhibition Stall Design 03",
    description: "Exhibition stall design visualisation by VedhEra  .",
    src: "/images/stall-design/stall13.webp",
    alt: "Wide exhibition stall visualisation in neutral tones",
    orientation: "landscape",
    w: 1280,
    h: 719,
  },
  {
    id: "sd-04",
    category: "stall-design",
    title: "Exhibition Stall Design 04",
    description: "Exhibition stall design visualisation by VedhEra  .",
    src: "/images/stall-design/stall3.webp",
    alt: "Monochrome exhibition stall design visualisation",
    orientation: "landscape",
    w: 1280,
    h: 960,
  },
  {
    id: "sd-05",
    category: "stall-design",
    title: "Exhibition Stall Design 05",
    description: "Exhibition stall design visualisation by VedhEra  .",
    src: "/images/stall-design/stall14.webp",
    alt: "Exhibition stall interior visualisation with display panels",
    orientation: "landscape",
    w: 1280,
    h: 960,
  },
  {
    id: "sd-06",
    category: "stall-design",
    title: "Exhibition Stall Design 06",
    description: "Exhibition stall design visualisation by VedhEra  .",
    src: "/images/stall-design/sall15.webp",
    alt: "Portrait exhibition stall design visualisation",
    orientation: "portrait",
    w: 1214,
    h: 1280,
  },
];

/** Featured items used inside the cinematic service scenes. */
export function itemsByCategory(category) {
  return portfolioItems.filter((item) => item.category === category);
}

/** Categories with no supplied portfolio project artwork. */
export const categoriesAwaitingAssets = ["digital-marketing"];