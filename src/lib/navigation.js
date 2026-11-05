// Central navigation data used by the header, intro menu, and footer.

export const serviceLinks = [
  { href: "/services/stall-design", label: "Exhibition Stall Design" },
  { href: "/services/graphic-design", label: "Graphic Design" },
  { href: "/services/website-design", label: "Website Design" },
  { href: "/services/digital-marketing", label: "Digital Marketing" },
];

export const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    href: null,
    label: "Services",
    children: serviceLinks,
  },
  { href: "/career", label: "Career" },
  { href: "/contact", label: "Contact" },
];
