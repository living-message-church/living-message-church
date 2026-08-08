import type { NormalizedEvent } from "@/lib/planning-center/types";
import { getApprovedCreativeArtwork } from "./repository";
import type { ResolvedEventArtwork } from "./types";

const GENERIC_EVENT_ARTWORK: ResolvedEventArtwork = {
  alt: "Living Message Church community gathered for worship",
  height: 900,
  source: "fallback",
  url: "/images/general/living-message-worship-gathering.jpg",
  width: 1600,
};

export async function getEventArtwork(event: NormalizedEvent): Promise<ResolvedEventArtwork> {
  const approved = await getApprovedCreativeArtwork(event.id);
  if (approved) return { ...approved, alt: `${event.title} event artwork` };
  if (event.imageUrl) {
    return { alt: `${event.title} event artwork`, height: 900, source: "planning-center", url: event.imageUrl, width: 1600 };
  }
  return GENERIC_EVENT_ARTWORK;
}
