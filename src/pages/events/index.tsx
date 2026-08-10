import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { stagedPages } from "@/content";
import { EventCollection } from "@/components/events/event-collection";
import { PageHero } from "@/components/pages/page-hero";
import { SiteHead } from "@/components/seo/site-head";
import { Section } from "@/components/ui/section";
import { getEventFeed } from "@/lib/events/event-source";

export const getStaticProps: GetStaticProps = async () => ({
  props: { feed: await getEventFeed() },
  revalidate: 300,
});

export default function EventsPage({ feed }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SiteHead {...stagedPages.events.seo} />
      <PageHero content={stagedPages.events} />
      <Section className="events-page-list" tone="paper" containerClassName="feed-section" containerSize="editorial" labelledBy="upcoming-events-title">
        <div className="event-section-heading events-page-heading">
          <h2 className="event-heading" id="upcoming-events-title">
            <span>Upcoming</span> <em>Events</em>
          </h2>
          <p>Find upcoming gatherings, classes, and ways to connect.</p>
        </div>
        <EventCollection feed={feed} layout="grid" />
      </Section>
    </>
  );
}
