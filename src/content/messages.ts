import type { Message } from "@/types/content";

const sermonPage = "https://www.livingmessagechurch.com/sermons-living-message-church-clermont/";

const youtubeMessage = ({
  id,
  slug,
  title,
  sourceTitle,
  categories,
  featured = false,
}: {
  id: string;
  slug: string;
  title: string;
  sourceTitle: string;
  categories: string[];
  featured?: boolean;
}): Message => ({
  id,
  slug,
  title: {
    value: title,
    status: "approved-temporary",
    source: sermonPage,
    note: `Editorially normalized from the YouTube oEmbed title: “${sourceTitle}”.`,
  },
  speaker: {
    value: "Pastor Brian K Broadway",
    status: "approved-temporary",
    source: `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`,
  },
  summary: {
    value: "Listen to a sermon from Pastor Brian in the Living Message Church media archive.",
    status: "approved-temporary",
    source: sermonPage,
  },
  mediaUrl: {
    value: `https://www.youtube.com/watch?v=${id}`,
    status: "approved-temporary",
    source: sermonPage,
  },
  youtubeVideoId: {
    value: id,
    status: "approved-temporary",
    source: sermonPage,
  },
  thumbnailUrl: {
    value: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    status: "approved-temporary",
    source: "YouTube thumbnail endpoint for the production-site video ID",
  },
  categories: {
    value: categories,
    status: "approved-temporary",
    source: sermonPage,
    note: "Temporary local taxonomy for the interface prototype; replace with admin-managed categories.",
  },
  meta: {
    title: `${title} | Living Message Church Messages`,
    description: `Watch ${title} from the Living Message Church sermon archive.`,
    keywords: ["Living Message Church", "sermon", ...categories],
  },
  featured,
  availability: "published",
});

export const localMessages: Message[] = [
  youtubeMessage({
    id: "BFGOKJx3KDI",
    slug: "hebrews-lesson-1",
    title: "Hebrews: Lesson 1",
    sourceTitle: "Hebrews Lesson 1 9 23 18",
    categories: ["Hebrews", "Archive"],
    featured: true,
  }),
  youtubeMessage({
    id: "rHPTve0MYkQ",
    slug: "living-message-july-23-2017",
    title: "Living Message Church — July 23, 2017",
    sourceTitle: "072317 LMCFL Pastor Brian Broadway VIDEO",
    categories: ["Archive"],
  }),
  youtubeMessage({
    id: "BY2GSlbN1qA",
    slug: "living-message-july-16-2017",
    title: "Living Message Church — July 16, 2017",
    sourceTitle: "071617 LMCFL Pastor Brian Broadway VIDEO",
    categories: ["Archive"],
  }),
  youtubeMessage({
    id: "zPLS9tL04XU",
    slug: "living-message-november-6-2016",
    title: "Living Message Church — November 6, 2016",
    sourceTitle: "110616 LMCFL Pastor Brian Broadway VIDEO",
    categories: ["Archive"],
  }),
];

export const featuredMessage = localMessages.find((message) => message.featured) ?? localMessages[0];
