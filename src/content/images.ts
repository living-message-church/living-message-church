import type { ContentImage } from "@/types/content";

const approved = (src: string, alt: string): ContentImage => ({
  src,
  alt,
  status: "approved-temporary",
  credit: "Living Message Church legacy website",
});

export const homePhotography: {
  visit: ContentImage;
  message: ContentImage;
  outreach: ContentImage;
  ministries: Record<string, ContentImage>;
} = {
  visit: approved(
    "/images/general/living-message-worship-gathering.jpg",
    "The Living Message Church congregation gathered for worship.",
  ),
  message: approved(
    "/images/general/living-message-bible-teaching.jpg",
    "Bible teaching from the stage at Living Message Church.",
  ),
  outreach: approved(
    "/images/outreach/living-message-community-meal.jpg",
    "Living Message Church volunteers serving neighbors at a community meal.",
  ),
  ministries: {
    kids: approved(
      "/images/kids/living-message-kids-room.jpg",
      "Children taking part in an activity in the Living Message Church kids room.",
    ),
    groups: approved(
      "/images/groups/living-message-community-table.jpg",
      "People sharing conversation around tables at Living Message Church.",
    ),
    "next-steps": approved(
      "/images/ministries/living-message-prayer-and-connection.jpg",
      "Two people sharing an encouraging moment during a Living Message Church gathering.",
    ),
  },
};

export const pagePhotography: Record<string, ContentImage> = {
  "/new-here": approved(
    "/images/general/living-message-community-welcome.jpg",
    "People welcoming one another at a Living Message Church gathering.",
  ),
  "/plan-your-visit": approved(
    "/images/general/living-message-community-welcome.jpg",
    "People welcoming one another at a Living Message Church gathering.",
  ),
  "/contact": approved(
    "/images/general/living-message-lobby-community.jpg",
    "People connecting in the lobby at Living Message Church.",
  ),
  "/about": approved(
    "/images/general/living-message-worship-gathering.jpg",
    "The Living Message Church congregation gathered for worship.",
  ),
  "/about/beliefs": approved(
    "/images/general/living-message-bible-study.jpg",
    "Men gathered around open Bibles during a Living Message Church study.",
  ),
  "/about/leadership": approved(
    "/images/leadership/living-message-broadway-family.jpg",
    "A family portrait published on the Living Message Church leadership page.",
  ),
  "/about/gallery": approved(
    "/images/general/living-message-lobby-community.jpg",
    "People connecting in the lobby at Living Message Church.",
  ),
  "/connect": approved(
    "/images/groups/living-message-community-table.jpg",
    "People sharing conversation around tables at Living Message Church.",
  ),
  "/connect/kids": homePhotography.ministries.kids,
  "/connect/groups": homePhotography.ministries.groups,
  "/connect/next-steps": approved(
    "/images/general/living-message-lobby-community.jpg",
    "People connecting in the lobby at Living Message Church.",
  ),
  "/messages": homePhotography.message,
  "/messages/live": homePhotography.message,
  "/outreach": approved(
    "/images/outreach/living-message-serving-families.jpg",
    "Living Message Church volunteers preparing food for local families.",
  ),
};
