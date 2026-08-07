import type { ContentImage, SeoContent, VerificationStatus } from "@/types/content";

interface PastorMilestone {
  marker: string;
  title: string;
  body: string;
}

const source = "https://www.livingmessagechurch.com/meet-our-pastor/";

const approvedImage = (src: string, alt: string): ContentImage => ({
  src,
  alt,
  status: "approved-temporary",
  credit: "Living Message Church legacy website",
});

export const pastorContent = {
  seo: {
    title: "Meet Pastor Brian Broadway | Living Message Church",
    description:
      "Meet Pastor Brian and Allison Broadway and learn about their journey to Living Message Church in Clermont, Florida.",
    path: "/about/pastor",
  } satisfies SeoContent,
  source,
  sourceModified: "2026-05-23",
  status: "approved-temporary" as VerificationStatus,
  hero: {
    eyebrow: "Living Message leadership",
    title: "Meet our lead pastor.",
    body: "Pastor Brian Broadway serves Living Message Church with a focus on expository teaching, discipleship, church family, and community outreach.",
    image: approvedImage(
      "/images/leadership/living-message-pastor-header.jpg",
      "Pastor Brian Broadway teaching from the Living Message Church stage.",
    ),
  },
  profile: {
    eyebrow: "Meet the Broadways",
    title: "Pastor Brian & Allison Broadway.",
    paragraphs: [
      "Brian and Allison are native New Yorkers. Brian serves as the Lead Pastor and Founder of Living Message Church. Allison helps with children’s ministry and church administrative tasks.",
      "They met at a church in Long Island, New York, where Brian served as a youth pastor and Allison as a youth leader. They married in 2001, and their family grew with daughters Grace and Hannah.",
      "Brian has traveled and ministered on mission trips in Africa, the Dominican Republic, and Jamaica. In 2004, the couple relocated to Clermont, Florida, where Brian served as an associate pastor at a local church.",
      "Led by the Holy Spirit, Brian started Living Message Church in 2009. Their hope is that every believer in Christ grows in faith through a deeper understanding of God’s Word, prayer, discipleship, and genuine connection in a local body of believers.",
    ],
    closing: "We look forward to meeting you soon.",
    image: approvedImage(
      "/images/leadership/living-message-broadway-family.jpg",
      "Pastor Brian and Allison Broadway with their family.",
    ),
  },
  story: {
    eyebrow: "Their story",
    title: "From New York to Clermont.",
    milestones: [
      {
        marker: "Long Island",
        title: "Serving together",
        body: "Brian and Allison met while serving young people at a church in Long Island, New York.",
      },
      {
        marker: "2004",
        title: "A move to Clermont",
        body: "The Broadways relocated to Clermont, where Brian served as an associate pastor at a local church.",
      },
      {
        marker: "2009",
        title: "Living Message begins",
        body: "Brian started Living Message Church with a focus on biblical teaching, discipleship, church family, and outreach.",
      },
    ] satisfies PastorMilestone[],
  },
  focus: {
    eyebrow: "Ministry focus",
    title: "Growing through God’s Word and genuine connection.",
    items: ["Expository teaching", "Discipleship", "Church family", "Community outreach"],
  },
};
