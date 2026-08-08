import type { NormalizedEvent } from "@/lib/planning-center/types";
import type { CreativeStylePreset, EventArtworkPrompt } from "./types";

export const EVENT_ART_PROMPT_VERSION = "lmc-event-art-v1";

function seasonFor(date: Date) {
  const month = date.getUTCMonth();
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
}

export function buildEventArtworkPrompt(event: NormalizedEvent, preset: CreativeStylePreset): EventArtworkPrompt {
  const firstOccurrence = event.occurrences[0];
  const season = firstOccurrence ? seasonFor(new Date(firstOccurrence.startAt)) : "unspecified season";
  const publicContext = [
    `Public event title for creative context only: ${event.title}.`,
    event.description ? `Public description: ${event.description.slice(0, 600)}.` : null,
    event.category ? `Verified category: ${event.category}.` : null,
    `Season: ${season}.`,
    event.registration?.available ? "A verified public registration is available." : null,
    event.group ? "The event has a verified public group relationship." : null,
  ].filter(Boolean).join(" ");
  const rules = preset.promptRules;
  const prompt = [
    "Create premium 16:9 editorial event artwork for Living Message Church.",
    publicContext,
    `Creative direction: ${preset.description}`,
    `Mood: ${rules.mood.join(", ")}.`,
    rules.palette?.length ? `Palette direction: ${rules.palette.join(", ")}.` : null,
    rules.photography ? `Photography direction: ${rules.photography}.` : null,
    rules.negativeSpace ? "Reserve intentional negative space for separate HTML typography." : null,
    rules.avoid?.length ? `Avoid: ${rules.avoid.join(", ")}.` : null,
    "Generate artwork, background photography, or illustration only. Do not render the event title or any readable text into the image.",
    "Do not create logos, readable Bible verses, fake Living Message Church members, generic church stock-photo clichés, or imagery derived from Motivation Church.",
    "The result must feel modern, editorial, authentic, minimal, youth-friendly, and brand-consistent.",
  ].filter(Boolean).join(" ");

  return {
    prompt,
    publicSummary: `${preset.name} · ${season} · ${event.registration?.available ? "registration linked" : "no registration enrichment"}`,
    version: EVENT_ART_PROMPT_VERSION,
  };
}
