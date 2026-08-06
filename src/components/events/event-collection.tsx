import type { ChurchEvent, ContentFeedResult } from "@/types/content";
import { Card } from "@/components/ui/card";

export function EventCollection({ feed, headingLevel = "h2" }: { feed: ContentFeedResult<ChurchEvent>; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  if (feed.status === "unavailable" || feed.items.length === 0) {
    return (
      <Card className="feed-empty-state">
        <span className="card-index">00</span>
        <div>
          <Heading>Event source pending</Heading>
          <p>{feed.message}</p>
          <p className="feed-meta">Historical WordPress events are not treated as upcoming.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="event-card-grid">
      {feed.items.map((event) => (
        <Card className="event-card" key={event.id}>
          <div className="card-copy">
            <Heading>{event.title.value}</Heading>
            <p>{event.summary.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
