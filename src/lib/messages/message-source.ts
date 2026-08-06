import type { ContentFeedResult, Message } from "@/types/content";
import { localMessages } from "@/content/messages";

export const youtubeChannel = {
  id: "UC-YctizZq1wTbhgn3tQOJqA",
  streamsUrl: "https://www.youtube.com/@livingmessagechurch/streams",
  feedUrl: "https://www.youtube.com/feeds/videos.xml?channel_id=UC-YctizZq1wTbhgn3tQOJqA",
} as const;

export interface MessageSourceAdapter {
  getMessages(): Promise<ContentFeedResult<Message>>;
}

class LocalMessageSource implements MessageSourceAdapter {
  async getMessages(): Promise<ContentFeedResult<Message>> {
    return {
      status: "available",
      provider: "local",
      items: localMessages,
      message:
        "Temporary local records sourced from the current Living Message Church sermon page. Supabase is not connected.",
      checkedAt: "2026-08-06",
    };
  }
}

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function readTag(source: string, tag: string) {
  const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp(`<${escapedTag}>([\\s\\S]*?)<\\/${escapedTag}>`));
  return match ? decodeXml(match[1].trim()) : "";
}

function readThumbnailUrl(source: string) {
  const match = source.match(/<media:thumbnail[^>]+url="([^"]+)"/);
  return match ? decodeXml(match[1]) : "";
}

function firstDescriptionParagraph(description: string) {
  return description
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith("#") && !/^(?:https?:\/\/|www\.)/i.test(line))
    ?? "Watch this service from the verified Living Message Church YouTube channel.";
}

function messageCategories(title: string, description: string, published: string) {
  const categories = new Set<string>();
  if (/online service|live(?:stream)?/i.test(title)) categories.add("Livestream");
  if (/online service/i.test(title)) categories.add("Online Service");
  if (!categories.size) categories.add("YouTube");

  const book = description.match(/\bBook of ([1-3]?\s?[A-Za-z]+)\b/i)?.[1]?.trim();
  if (book) categories.add(book.replace(/\b\w/g, (letter) => letter.toUpperCase()));

  const year = new Date(published).getUTCFullYear();
  if (Number.isFinite(year)) categories.add(String(year));
  return Array.from(categories);
}

export function parseYouTubeFeed(xml: string): Message[] {
  const entries = Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g), (match) => match[1]);
  const messages: Message[] = [];

  for (const entry of entries) {
    const id = readTag(entry, "yt:videoId");
    const title = readTag(entry, "title");
    const published = readTag(entry, "published");
    const description = readTag(entry, "media:description");
    if (!id || !title || !published) continue;

    const thumbnail = readThumbnailUrl(entry) || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    const watchUrl = `https://www.youtube.com/watch?v=${id}`;
    const categories = messageCategories(title, description, published);
    const summary = firstDescriptionParagraph(description);
    messages.push({
      id,
      slug: `${published.slice(0, 10)}-${id.toLowerCase()}`,
      title: { value: title, status: "verified", source: watchUrl },
      date: { value: published, status: "verified", source: youtubeChannel.feedUrl },
      summary: { value: summary, status: "verified", source: watchUrl },
      mediaUrl: { value: watchUrl, status: "verified", source: youtubeChannel.feedUrl },
      youtubeVideoId: { value: id, status: "verified", source: youtubeChannel.feedUrl },
      thumbnailUrl: { value: thumbnail, status: "verified", source: youtubeChannel.feedUrl },
      categories: {
        value: categories,
        status: "verified",
        source: youtubeChannel.feedUrl,
        note: "Derived only from the verified Streams source, explicit title/description metadata, and publication year.",
      },
      meta: {
        title: `${title} | Living Message Church Messages`,
        description: summary.slice(0, 160),
        keywords: ["Living Message Church", "message", ...categories],
      },
      availability: "published",
    });
  }

  return messages
    .sort((a, b) => (b.date?.value ?? "").localeCompare(a.date?.value ?? ""))
    .map((message, index) => ({ ...message, featured: index === 0 }));
}

class YouTubeMessageSource implements MessageSourceAdapter {
  async getMessages(): Promise<ContentFeedResult<Message>> {
    const response = await fetch(youtubeChannel.feedUrl, {
      headers: { Accept: "application/atom+xml, application/xml;q=0.9" },
    });
    if (!response.ok) throw new Error(`YouTube feed returned ${response.status}`);

    const items = parseYouTubeFeed(await response.text());
    if (!items.length) throw new Error("YouTube feed contained no usable message records");

    return {
      status: "available",
      provider: "youtube",
      items,
      message: "Recent livestreams from the verified Living Message Church YouTube channel.",
      checkedAt: new Date().toISOString(),
    };
  }
}

// Keep this provider-neutral boundary when Supabase becomes the editorial metadata source.
export const messageSource: MessageSourceAdapter = new YouTubeMessageSource();

export async function getMessageFeed() {
  try {
    return await messageSource.getMessages();
  } catch {
    const fallback = await new LocalMessageSource().getMessages();
    return {
      ...fallback,
      message: "The live YouTube feed is temporarily unavailable. Showing the approved local archive fallback.",
      checkedAt: new Date().toISOString(),
    };
  }
}
