import type { NormalizedEvent } from "@/lib/planning-center/types";
import { getApprovedCreativeArtwork } from "./repository";
import type { ResolvedEventArtwork } from "./types";

const GENERIC_EVENT_ARTWORK = [
  { alt: "Living Message Church community gathered for worship", url: "/images/general/living-message-worship-gathering.webp" },
  { alt: "People connecting at Living Message Church", url: "/images/general/living-message-lobby-community.webp" },
] as const;

function fallbackFor(event: NormalizedEvent): ResolvedEventArtwork {
  const index = [...event.id].reduce((sum, character) => sum + character.charCodeAt(0), 0) % GENERIC_EVENT_ARTWORK.length;
  return { ...GENERIC_EVENT_ARTWORK[index], height: 900, source: "fallback", width: 1600 };
}

export async function getEventArtwork(event: NormalizedEvent): Promise<ResolvedEventArtwork> {
  const approved = await getApprovedCreativeArtwork(event.id);
  if (approved) return { ...approved, alt: `${event.title} event artwork` };
  if (event.imageUrl) {
    return { alt: `${event.title} event artwork`, height: 900, source: "planning-center", url: event.imageUrl, width: 1600 };
  }
  return fallbackFor(event);
}
