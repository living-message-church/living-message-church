import type { HomepageSection } from "@/types/content";

export const homeSections: Record<string, HomepageSection> = {
  hero: {
    id: "hero",
    eyebrow: "Living Message Church · Clermont, Florida",
    title: "Come as you are. Grow in truth. Find your church family.",
    body: "A welcoming church community centered on genuine connection, meaningful discipleship, and line-by-line Bible teaching.",
    tone: "ink",
    actions: [
      { label: "Plan your visit", href: "/new-here", style: "primary" },
      { label: "Get directions", href: "/contact#directions", style: "secondary" },
    ],
  },
  identity: {
    id: "identity",
    eyebrow: "Church is more than a service",
    title: "A community shaped by Scripture and life together.",
    body: "Living Message describes its community through intentional fellowship, passionate service, equal love, and a consistent welcome into church family.",
    tone: "paper",
  },
  visit: {
    id: "visit",
    eyebrow: "Your first Sunday",
    title: "A simple, welcoming first step.",
    body: "Find practical details about parking, children’s check-in, worship, teaching, and ways to connect before you arrive.",
    tone: "sun",
    actions: [{ label: "Start planning", href: "/new-here", style: "primary" }],
  },
  messages: {
    id: "messages",
    eyebrow: "Messages",
    title: "Teaching rooted in the text.",
    body: "Explore teaching intended to help people understand the Bible in context and grow in their walk with Christ.",
    tone: "ink",
    actions: [{ label: "Explore messages", href: "/messages", style: "secondary" }],
  },
  events: {
    id: "events",
    eyebrow: "What’s happening",
    title: "Gather, connect, and grow.",
    body: "Current events will appear here after the church confirms the authoritative calendar and registration source.",
    tone: "paper",
    actions: [{ label: "View events", href: "/events", style: "text" }],
  },
  ministries: {
    id: "ministries",
    eyebrow: "Find your next step",
    title: "Connection for every season of life.",
    body: "Discover ministry pathways evidenced on the current site while schedules, leaders, and program details are being confirmed.",
    tone: "sage",
  },
  outreach: {
    id: "outreach",
    eyebrow: "Impactful outreach",
    title: "From homeless to hopeful.",
    body: "Learn about Living Message’s work alongside Find, Feed & Restore to support families with children moving toward stable housing.",
    tone: "sun",
    actions: [{ label: "Learn about outreach", href: "/outreach", style: "primary" }],
  },
  invitation: {
    id: "invitation",
    eyebrow: "You’re invited",
    title: "There’s room for you this Sunday.",
    body: "Plan your visit, get directions, or reach out with a question before you come.",
    tone: "ink",
    actions: [
      { label: "Plan your visit", href: "/new-here", style: "primary" },
      { label: "Contact us", href: "/contact", style: "secondary" },
    ],
  },
};

export const homeDisplayLabels = {
  outreachMark: ["Hope", "in", "action"],
};
