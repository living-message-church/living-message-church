import type { ChurchEvent, ContentFeedResult } from "@/types/content";
import { homeSections } from "@/content";
import { ActionGroup } from "@/components/ui/action-link";
import { EventCollection } from "@/components/events/event-collection";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";

export function UpcomingEvents({ feed }: { feed: ContentFeedResult<ChurchEvent> }) {
  const content = homeSections.events;
  return (
    <Section tone={content.tone} labelledBy="events-title">
      <div className="section-heading-row">
        <div><Eyebrow>{content.eyebrow}</Eyebrow><Heading id="events-title">{content.title}</Heading></div>
        {content.actions ? <ActionGroup actions={content.actions} /> : null}
      </div>
      <EventCollection feed={feed} headingLevel="h3" />
    </Section>
  );
}
