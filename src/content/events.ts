import type { ChurchEvent } from "@/types/content";

// No current event record was verified during the audit. Never infer upcoming
// events from the 415 historical WordPress event URLs.
export const upcomingEvents: ChurchEvent[] = [];

export const eventsEmptyState = {
  title: "Upcoming events are being confirmed",
  body: "The new events experience will publish only current, verified gatherings and registration links.",
};
