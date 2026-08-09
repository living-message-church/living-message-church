import type { CallToAction, ContentImage, SeoContent } from "@/types/content";

export interface ConnectPathway {
  id: string;
  number: string;
  title: string;
  summary: string;
  href: string;
  linkLabel: string;
  image: ContentImage;
  layout: "wide" | "standard";
}

export interface ConnectPageContent {
  seo: SeoContent;
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    titleEnd: string;
    body: string;
    image: ContentImage;
    actions: CallToAction[];
  };
  introduction: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    body: string;
  };
  pathwaysEyebrow: string;
  pathwaysTitle: string;
  pathways: ConnectPathway[];
  final: {
    eyebrow: string;
    title: string;
    body: string;
    actions: CallToAction[];
  };
}

const oldSite = "https://www.livingmessagechurch.com";

export const connectPageContent: ConnectPageContent = {
  seo: {
    path: "/connect",
    title: "Connect | Living Message Church",
    description:
      "Explore ways to connect with Living Message Church through kids, youth, young adults, groups, and Next Steps.",
    // Ministry schedules, leaders, and audience details remain under verification.
    noIndex: true,
  },
  hero: {
    eyebrow: "Connect at Living Message",
    titleLead: "Find your ",
    titleAccent: "people.",
    titleEnd: " Take your next step.",
    body:
      "Church is more than a service. Explore pathways toward community, growth, and life together.",
    image: {
      src: "/images/connect/living-message-connect-hero.webp",
      alt: "Two women sharing a conversation at Living Message Church.",
      status: "approved-temporary",
      credit: `${oldSite}/wp-content/uploads/2024/12/Screenshot-2024-12-17-140420.png`,
    },
    actions: [
      { label: "Explore ways to connect", href: "#connect-pathways", style: "primary" },
      { label: "Plan your visit", href: "/plan-your-visit", style: "secondary" },
    ],
  },
  introduction: {
    eyebrow: "Find your next step",
    title: "Connection for every season of life.",
    titleAccent: "season",
    body:
      "Discover ministry pathways evidenced on the current site while schedules, leaders, and program details are being confirmed.",
  },
  pathwaysEyebrow: "Ways to connect",
  pathwaysTitle: "There is a place to begin.",
  pathways: [
    {
      id: "kids",
      number: "01",
      title: "LMC Kids",
      summary:
        "Prepare for a first visit and explore the church’s dedicated pathway for children and families.",
      href: "/lmkids",
      linkLabel: "Explore LMC Kids",
      image: {
        src: "/images/connect/living-message-kids-community.webp",
        alt: "Children gathering in the Living Message Church kids room.",
        status: "approved-temporary",
        credit: `${oldSite}/wp-content/uploads/2024/12/Kids-Min-2.png`,
      },
      layout: "wide",
    },
    {
      id: "youth",
      number: "02",
      title: "Youth",
      summary:
        "Explore the current youth ministry pathway and the information available for students and families.",
      href: "/connect/youth",
      linkLabel: "Explore Youth",
      image: {
        src: "/images/connect/living-message-youth-gathering.webp",
        alt: "Students gathered for youth ministry at Living Message Church.",
        status: "approved-temporary",
        credit: `${oldSite}/wp-content/uploads/2024/12/VideoCapture_20230404-063930.jpg`,
      },
      layout: "standard",
    },
    {
      id: "young-adults",
      number: "03",
      title: "Young Adults",
      summary:
        "Discover the connection pathway created with young adults and life together in mind.",
      href: "/connect/young-adults",
      linkLabel: "Explore Young Adults",
      image: {
        src: "/images/connect/living-message-young-adults-connection.webp",
        alt: "Young adults talking together at Living Message Church.",
        status: "approved-temporary",
        credit: `${oldSite}/wp-content/uploads/2024/12/Screenshot-2024-12-17-140746-1.png`,
      },
      layout: "standard",
    },
    {
      id: "groups",
      number: "04",
      title: "Groups",
      summary:
        "Explore community beyond Sunday through the church’s group connection pathway.",
      href: "/connect/groups",
      linkLabel: "Explore Groups",
      image: {
        src: "/images/connect/living-message-small-group-circle.webp",
        alt: "A small group gathered in a circle at Living Message Church.",
        status: "approved-temporary",
        credit: `${oldSite}/wp-content/uploads/2023/04/VideoCapture_20230404-064148.jpg`,
      },
      layout: "standard",
    },
    {
      id: "next-steps",
      number: "05",
      title: "Next Steps Class",
      summary:
        "Learn about the class designed to help people connect, discover ways to serve, and keep growing.",
      href: "/connect/next-steps",
      linkLabel: "Explore Next Steps",
      image: {
        src: "/images/connect/living-message-next-step-worship.webp",
        alt: "The Living Message Church congregation gathered for worship.",
        status: "approved-temporary",
        credit: `${oldSite}/wp-content/uploads/2025/03/Church-Pics.png`,
      },
      layout: "wide",
    },
  ],
  final: {
    eyebrow: "Your first Sunday",
    title: "Not sure where to begin? Begin with a visit.",
    body:
      "See what to expect, find service information, and arrive with a simple plan for your first Sunday.",
    actions: [
      { label: "Plan your visit", href: "/plan-your-visit", style: "primary" },
      { label: "Contact us", href: "/contact", style: "secondary" },
    ],
  },
};
