import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { stagedPages } from "@/content";
import { EventCollection } from "@/components/events/event-collection";
import { SiteHead } from "@/components/seo/site-head";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { getEventFeed } from "@/lib/events/event-source";

export const getStaticProps: GetStaticProps = async () => ({
  props: { feed: await getEventFeed() },
  revalidate: 300,
});

export default function EventsPage({ feed }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SiteHead {...stagedPages.events.seo} />
      <header className="events-page-hero">
        <Container className="events-page-hero-layout" size="editorial">
          <div>
            <Eyebrow>{stagedPages.events.eyebrow}</Eyebrow>
            <Heading as="h1" size="display">Events</Heading>
          </div>
          <p>{stagedPages.events.intro}</p>
        </Container>
      </header>
      <Section className="events-page-list" tone="paper" containerClassName="feed-section" containerSize="editorial" labelledBy="upcoming-events-title">
        <div className="event-section-heading">
          <Heading id="upcoming-events-title" className="event-heading">
            <span>Upcoming</span> <em>events</em>
          </Heading>
        </div>
        <EventCollection feed={feed} layout="grid" />
      </Section>
    </>
  );
}
