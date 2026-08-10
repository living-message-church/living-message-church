import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { stagedPages } from "@/content";
import { EventCollection } from "@/components/events/event-collection";
import { SiteHead } from "@/components/seo/site-head";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";
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
            <Heading as="h1" size="display">Events</Heading>
          </div>
          <p>{stagedPages.events.intro}</p>
        </Container>
      </header>
      <Section className="events-page-list" tone="paper" containerClassName="feed-section" containerSize="editorial" labelledBy="upcoming-events-title">
        <h2 className="sr-only" id="upcoming-events-title">Upcoming events</h2>
        <EventCollection feed={feed} layout="grid" />
      </Section>
    </>
  );
}
