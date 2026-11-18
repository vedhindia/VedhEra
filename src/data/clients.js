/**
 * Client logo assets for the "Brands We’ve Worked With" slider.
 *
 * These are the real logo assets supplied in
 * `public/images/graphic-design/logos`. No verified client names ship with
 * the project, so entries intentionally carry no invented brand name — the
 * logos are rendered as decorative marks and the section is labelled by its
 * heading.
 *
 * To attach a real, verified client name later, set `name` on an entry and
 * it will be used as the image alt text.
 */
const LOGO_NUMBERS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 36, 37, 38
];

export const clientLogos = LOGO_NUMBERS.map((n) => ({
  id: `client-logo-${n}`,
  name: null,
  src: `/images/graphic-design/logos/logo${n}.webp`,
}));

export const stallClientLogos = Array.from({ length: 15 }, (_, index) => {
  const number = index + 1;

  return {
    id: `stall-client-logo-${number}`,
    name: null,
    src: `/images/Stall_Client_Logo/${number}.webp`,
    scale: number >= 9 ? 0.55 : 1,
  };
});
