/**
 * Logo portfolio artwork supplied in `public/images/graphic-design/logos`.
 * No verified client or project names are available, so neutral sequential
 * labels are used without implying specific client relationships.
 */
const LOGO_NUMBERS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
];

export const logoPortfolioItems = LOGO_NUMBERS.map((number, index) => ({
  id: `logo-${number}`,
  src: `/images/graphic-design/logos/logo${number}.webp`,
  title: `Logo Design ${String(index + 1).padStart(2, "0")}`,
  category: "Brand Identity",
}));
