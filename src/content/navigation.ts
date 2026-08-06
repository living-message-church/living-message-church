import type { FooterGroup, NavigationItem } from "@/types/content";

export const primaryNavigation: NavigationItem[] = [
  { label: "Home", href: "/", availability: "implemented" },
  { label: "New Here", href: "/new-here", availability: "implemented" },
  { label: "About", href: "/about", availability: "staged" },
  { label: "Connect", href: "/connect", availability: "staged" },
  { label: "Messages", href: "/messages", availability: "staged" },
  { label: "Events", href: "/events", availability: "staged" },
  { label: "Outreach", href: "/outreach", availability: "staged" },
  { label: "Give", href: "/give", availability: "staged" },
  { label: "Contact", href: "/contact", availability: "implemented" },
];

export const footerGroups: FooterGroup[] = [
  {
    title: "Visit",
    links: [
      { label: "New Here", href: "/new-here", availability: "implemented" },
      { label: "Contact", href: "/contact", availability: "implemented" },
      { label: "Events", href: "/events", availability: "staged" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "About", href: "/about", availability: "staged" },
      { label: "Connect", href: "/connect", availability: "staged" },
      { label: "Messages", href: "/messages", availability: "staged" },
      { label: "Outreach", href: "/outreach", availability: "staged" },
      { label: "Give", href: "/give", availability: "staged" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy", availability: "implemented" },
      { label: "Photo Release", href: "/photo-release", availability: "implemented" },
    ],
  },
];

export const footerContent = {
  eyebrow: "Come worship with us",
  invitation: "A church family in Clermont, Florida.",
};
