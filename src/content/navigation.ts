import type { FooterGroup, NavigationItem } from "@/types/content";

export const primaryNavigation: NavigationItem[] = [
  { label: "Home", href: "/", availability: "implemented" },
  {
    label: "I’m New",
    href: "/plan-your-visit",
    availability: "implemented",
    children: [
      { label: "Plan Your Visit", href: "/plan-your-visit", availability: "implemented" },
      { label: "Next Steps Class", href: "/connect/next-steps", availability: "implemented" },
    ],
  },
  {
    label: "About",
    href: "/about-living-message-church-clermont",
    availability: "implemented",
    children: [
      { label: "Our Church", href: "/about-living-message-church-clermont", availability: "implemented" },
      { label: "Our Beliefs", href: "/about/beliefs", availability: "staged" },
      { label: "Our Pastor", href: "/about/leadership", availability: "staged" },
      { label: "Our Team", href: "/about/leadership", availability: "staged" },
      { label: "Our Outreach", href: "/outreach", availability: "staged" },
      { label: "Our Missions", href: "/outreach", availability: "staged" },
    ],
  },
  { label: "Connect", href: "/connect", availability: "staged" },
  { label: "Messages", href: "/messages", availability: "implemented" },
  { label: "Events", href: "/events", availability: "staged" },
  { label: "Outreach", href: "/outreach", availability: "staged" },
  { label: "Give", href: "/give", availability: "staged" },
  { label: "Contact", href: "/contact", availability: "implemented" },
];

export const footerGroups: FooterGroup[] = [
  {
    title: "Visit",
    links: [
      { label: "Plan Your Visit", href: "/plan-your-visit", availability: "implemented" },
      { label: "Contact", href: "/contact", availability: "implemented" },
      { label: "Events", href: "/events", availability: "staged" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "About", href: "/about-living-message-church-clermont", availability: "implemented" },
      { label: "Connect", href: "/connect", availability: "staged" },
      { label: "Messages", href: "/messages", availability: "implemented" },
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
