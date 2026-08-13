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
      { label: "Our Beliefs", href: "/about/beliefs", availability: "implemented" },
      { label: "Our Pastor", href: "/about/pastor", availability: "implemented" },
      { label: "Our Team", href: "/about/leadership", availability: "implemented" },
      { label: "Our Outreach", href: "https://www.findfeedrestore.com/", availability: "external" },
      {
        label: "Our Missions",
        href: "#our-missions",
        availability: "group",
        children: [
          { label: "Radius International", href: "https://radiusinternational.org/", availability: "external" },
          { label: "Life’s Choices", href: "https://lifeschoices.net/", availability: "external" },
          { label: "SLPFCC", href: "https://slpfcc.com/", availability: "external" },
          { label: "Ligonier Ministries", href: "https://www.ligonier.org/", availability: "external" },
          { label: "Radical", href: "https://radical.net/", availability: "external" },
          { label: "Campus Outreach Central Florida", href: "https://www.cocentralflorida.org/", availability: "external" },
        ],
      },
    ],
  },
  {
    label: "Growth",
    href: "/connect/groups",
    availability: "implemented",
    children: [
      { label: "Growth Groups", href: "/connect/groups", availability: "implemented" },
      { label: "2027 Curriculum", href: "/connect/groups#curriculum", availability: "implemented" },
      { label: "Winter · Foundations", href: "/connect/groups#foundations", availability: "implemented" },
      { label: "Additional Winter Classes", href: "/connect/groups#winter-classes", availability: "implemented" },
      { label: "Spring Semester", href: "/connect/groups#spring", availability: "implemented" },
      { label: "Summer / Fall Semester", href: "/connect/groups#summer-fall", availability: "implemented" },
    ],
  },
  {
    label: "Ministries",
    href: "#ministries",
    availability: "group",
    children: [
      { label: "Men’s", href: "#", availability: "planned" },
      { label: "Women’s", href: "#", availability: "planned" },
      { label: "Young Adults", href: "/connect/young-adults", availability: "implemented" },
      { label: "Seniors", href: "#", availability: "planned" },
      { label: "LM Kids", href: "/lmkids", availability: "implemented" },
    ],
  },
  {
    label: "Messages",
    href: "/messages",
    availability: "implemented",
    children: [
      { label: "Church Online", href: "/online-church", availability: "implemented" },
      { label: "Message Archive", href: "/messages", availability: "implemented" },
    ],
  },
  { label: "Events", href: "/events", availability: "staged" },
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
      { label: "Church Online", href: "/online-church", availability: "implemented" },
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
