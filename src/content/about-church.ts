import type { ContentImage, Message, SeoContent } from "@/types/content";

const source = "https://www.livingmessagechurch.com/about-living-message-church-clermont/";

const approvedImage = (src: string, alt: string): ContentImage => ({
  src,
  alt,
  status: "approved-temporary",
  credit: "Living Message Church legacy website",
});

export const aboutChurchContent = {
  seo: {
    title: "About Living Message Church | Clermont, Florida",
    description:
      "Learn about Living Message Church, its church-family philosophy, its name, and its commitment to serving people in Clermont, Florida.",
    path: "/about-living-message-church-clermont",
  } satisfies SeoContent,
  source,
  status: "approved-temporary" as const,
  hero: {
    eyebrow: "About our church",
    title: "A church that calls people family.",
    body: "Living Message Church describes belonging as a relationship—not simply a membership status or a place someone attends.",
    image: approvedImage(
      "/images/general/living-message-worship-prayer.jpg",
      "Living Message Church attendees worshipping together during a service.",
    ),
  },
  family: {
    eyebrow: "More than membership",
    title: "Relationships that reach beyond a Sunday.",
    paragraphs: [
      "The current church story contrasts memberships, which can end when circumstances change, with family relationships that remain meaningful across seasons and locations.",
      "Living Message wants people to find a church home where they can grow. If Living Message is not the right fit, the church’s stated desire is still to help people connect with another local church.",
    ],
    statement: "At Living Message Church, you are family.",
    video: {
      id: "living-message-this-is-us",
      title: {
        value: "Living Message Church. This Is Us!",
        status: "approved-temporary",
        source: "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=MnBGBUYZ0hI&format=json",
      },
      summary: {
        value: "A video introduction to the people and story of Living Message Church.",
        status: "approved-temporary",
        source,
      },
      mediaUrl: {
        value: "https://www.youtube.com/watch?v=MnBGBUYZ0hI",
        status: "approved-temporary",
        source,
      },
      youtubeVideoId: {
        value: "MnBGBUYZ0hI",
        status: "approved-temporary",
        source,
      },
      thumbnailUrl: {
        value: "https://i.ytimg.com/vi/MnBGBUYZ0hI/maxresdefault.jpg",
        status: "approved-temporary",
        source: "YouTube thumbnail endpoint for the user-supplied video ID",
      },
      availability: "published",
    } satisfies Message,
    videoUrl: "https://www.youtube.com/watch?v=MnBGBUYZ0hI",
    videoLabel: "Watch our church video",
  },
  nameStory: {
    eyebrow: "Why Living Message?",
    title: "A name shaped by lives that tell a story.",
    paragraphs: [
      "The church’s name story draws on stones used in Scripture as reminders of God’s work and on the description of God’s people as living stones.",
      "Living Message expresses a simple conviction: a life that serves and impacts another person can communicate the work of God beyond words spoken from a pulpit.",
    ],
    references: ["Joshua 4", "1 Peter 2:5"],
  },
  community: {
    eyebrow: "Serving our community",
    title: "Faith becomes visible through care for people.",
    body: "The current church story presents serving people in need as a central responsibility. Living Message describes faith in action as a message people can see—one life caring for and impacting another.",
    image: approvedImage(
      "/images/outreach/living-message-community-meal.jpg",
      "Living Message Church volunteers serving neighbors at a community meal.",
    ),
    actionLabel: "Explore outreach",
    actionHref: "/outreach",
  },
  final: {
    eyebrow: "Meet the family",
    title: "The best way to know a church is to experience a Sunday.",
    body: "Plan your first visit, find the current service details, and know what to expect before you arrive.",
    primaryLabel: "Plan your visit",
    secondaryLabel: "Take your next step",
  },
};
