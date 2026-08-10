import Image from "next/image";
import Link from "next/link";
import type { ChurchEvent, ContentFeedResult } from "@/types/content";

export function EventCollection({
  feed,
  headingLevel = "h2",
  actionLabel,
  layout = "list",
}: {
  feed: ContentFeedResult<ChurchEvent>;
  headingLevel?: "h2" | "h3";
  actionLabel?: string;
  layout?: "list" | "grid";
}) {
  const Heading = headingLevel;
  if (feed.status === "unavailable" || feed.items.length === 0) {
    return (
      <div className="event-list event-list-empty">
        <article className="event-list-item">
          <div className="event-list-placeholder" aria-hidden="true"><span>Events</span></div>
          <div className="event-list-copy">
            <p className="event-date">Calendar update</p>
            <Heading>Upcoming events are being confirmed</Heading>
            <p>{feed.message}</p>
            <p className="feed-meta">Historical WordPress events are not treated as upcoming.</p>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className={`event-list${layout === "grid" ? " event-list-grid" : ""}`}>
      {feed.items.map((event) => (
        <article className="event-list-item" key={event.id}>
          <div className={`event-list-media${event.image ? " event-list-media-image" : ""}`}>
            {event.image ? (
              <Image src={event.image.src} alt={event.image.alt} fill sizes="(max-width: 48rem) 100vw, (max-width: 70rem) 32vw, 28rem" />
            ) : (
              <span aria-hidden="true">{event.title.value}</span>
            )}
          </div>
          <div className="event-list-copy">
            {event.start ? <p className="event-date">{layout === "grid" ? event.start.value.replace(/^.* · Next /, "") : event.start.value}</p> : null}
            <Heading>{event.title.value}</Heading>
            {event.summary.value ? <p>{event.summary.value}</p> : null}
            {layout === "grid" ? <p className="event-location">Living Message Church</p> : event.location ? <p className="event-location">{event.location.value}</p> : null}
          </div>
          <Link className="event-row-action" href={`/events/${event.slug}`}>{actionLabel ?? "View event"}<span aria-hidden="true">→</span></Link>
        </article>
      ))}
    </div>
  );
}
