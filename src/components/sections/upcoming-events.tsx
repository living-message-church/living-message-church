import type { ChurchEvent, ContentFeedResult } from "@/types/content";
import { homeSections } from "@/content";
import { ActionGroup } from "@/components/ui/action-link";
import { EventCollection } from "@/components/events/event-collection";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";

export function UpcomingEvents({ feed }: { feed: ContentFeedResult<ChurchEvent> }) {
  const content = homeSections.events;
  const [titleLead, ...titleAccent] = content.title.split(" ");
  const homepageFeed = { ...feed, items: feed.items.slice(0, 3) };
  return (
    <Section className="event-section" tone={content.tone} labelledBy="events-title" containerSize="editorial">
      <div className="event-section-heading">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading id="events-title" className="event-heading">
          <span>{titleLead}</span> <em>{titleAccent.join(" ")}</em>
        </Heading>
      </div>
      <EventCollection feed={homepageFeed} headingLevel="h3" />
      {content.actions ? <div className="event-section-actions"><ActionGroup actions={content.actions} /></div> : null}
    </Section>
  );
}
