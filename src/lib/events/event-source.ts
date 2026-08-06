import type { ChurchEvent, ContentFeedResult } from "@/types/content";

export interface EventSourceAdapter {
  getEvents(): Promise<ContentFeedResult<ChurchEvent>>;
}

class UnconfiguredEventSource implements EventSourceAdapter {
  async getEvents(): Promise<ContentFeedResult<ChurchEvent>> {
    return {
      status: "unavailable",
      provider: "unconfigured",
      items: [],
      message:
        "Upcoming events are unavailable until the church approves an authoritative event and registration source.",
      checkedAt: "2026-08-06",
    };
  }
}

// Historical WordPress events are explicitly excluded from this adapter.
export const eventSource: EventSourceAdapter = new UnconfiguredEventSource();

export async function getEventFeed() {
  try {
    return await eventSource.getEvents();
  } catch {
    return {
      status: "unavailable",
      provider: "unconfigured",
      items: [],
      message: "Upcoming events are temporarily unavailable.",
      checkedAt: "2026-08-06",
    } satisfies ContentFeedResult<ChurchEvent>;
  }
}
