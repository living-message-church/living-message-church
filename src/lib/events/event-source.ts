import type { ChurchEvent, ContentFeedResult } from "@/types/content";
import { getEventArtwork } from "@/lib/creative/artwork";
import { getPlanningCenterEventAggregation } from "@/lib/planning-center/event-aggregation";
import type { NormalizedEvent } from "@/lib/planning-center/types";

export interface EventSourceAdapter {
  getEvents(): Promise<ContentFeedResult<ChurchEvent>>;
}

const SOURCE_URL = "https://livingmessagechurch.churchcenter.com/calendar";

function sourced<T>(value: T, source = SOURCE_URL) {
  return { value, source, status: "verified" as const };
}

function plainText(value: string | null) {
  if (!value) return "";
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function concise(value: string, limit = 210) {
  if (value.length <= limit) return value;
  const slice = value.slice(0, limit + 1);
  return `${slice.slice(0, Math.max(slice.lastIndexOf(" "), limit - 28)).trim()}…`;
}

function nextOccurrence(event: NormalizedEvent) {
  const now = Date.now();
  return event.occurrences.find((occurrence) => new Date(occurrence.startAt).getTime() >= now)
    ?? event.occurrences[0]
    ?? null;
}

function eventDate(event: NormalizedEvent) {
  const occurrence = nextOccurrence(event);
  if (!occurrence) return "Date available in Church Center";
  const date = new Date(occurrence.startAt);
  const formatted = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    ...(occurrence.allDay ? {} : { timeStyle: "short" as const }),
    timeZone: "America/New_York",
  }).format(date);
  return event.recurrence ? `${event.recurrence} · Next ${formatted}` : formatted;
}

class PlanningCenterEventSource implements EventSourceAdapter {
  async getEvents(): Promise<ContentFeedResult<ChurchEvent>> {
    const aggregation = await getPlanningCenterEventAggregation();
    const diagnostics = new Map(aggregation.candidates.map((candidate) => [candidate.canonicalId, candidate]));
    const strictPublicEvents = aggregation.events.filter((event) => diagnostics.get(event.id)?.eligibility === "public");
    const items: ChurchEvent[] = [];

    for (const event of strictPublicEvents) {
      const artwork = await getEventArtwork(event);
      const occurrence = nextOccurrence(event);
      const destination = event.registration?.available && event.registration.url
        ? event.registration.url
        : event.publicUrl;
      items.push({
        actionLabel: event.registration?.available && event.registration.url ? "Register" : "View event",
        allDay: occurrence?.allDay ?? false,
        availability: "published",
        description: sourced(plainText(event.description), event.publicUrl),
        ...(occurrence?.endAt ? { endAt: sourced(occurrence.endAt, event.publicUrl) } : {}),
        id: event.id,
        image: {
          alt: artwork.alt,
          src: artwork.url,
          status: artwork.source === "planning-center" ? "verified" : "approved-temporary",
        },
        ...(occurrence?.location ? { location: sourced(occurrence.location, event.publicUrl) } : {}),
        publicUrl: sourced(event.publicUrl, event.publicUrl),
        registrationUrl: sourced(destination, event.publicUrl),
        slug: event.slug,
        start: sourced(eventDate(event), event.publicUrl),
        ...(occurrence?.startAt ? { startAt: sourced(occurrence.startAt, event.publicUrl) } : {}),
        summary: sourced(concise(plainText(event.description)), event.publicUrl),
        title: sourced(event.title, event.publicUrl),
      });
    }

    return {
      status: "available",
      provider: "church-center",
      items,
      message: items.length ? "Upcoming public events from Planning Center." : "No public upcoming events are currently listed.",
      checkedAt: new Date().toISOString(),
    };
  }
}

// Historical WordPress events are explicitly excluded from this adapter.
export const eventSource: EventSourceAdapter = new PlanningCenterEventSource();

export async function getEventFeed() {
  try {
    return await eventSource.getEvents();
  } catch {
    return {
      status: "unavailable",
      provider: "church-center",
      items: [],
      message: "Upcoming events are temporarily unavailable.",
      checkedAt: new Date().toISOString(),
    } satisfies ContentFeedResult<ChurchEvent>;
  }
}
