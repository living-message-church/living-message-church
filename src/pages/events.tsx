import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { stagedPages } from "@/content";
import { EventCollection } from "@/components/events/event-collection";
import { PageHero } from "@/components/pages/page-hero";
import { SiteHead } from "@/components/seo/site-head";
import { Section } from "@/components/ui/section";
import { getEventFeed } from "@/lib/events/event-source";

export const getStaticProps: GetStaticProps = async () => ({
  props: { feed: await getEventFeed() },
});

export default function EventsPage({ feed }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SiteHead {...stagedPages.events.seo} noIndex />
      <PageHero content={stagedPages.events} />
      <Section tone="paper" containerClassName="feed-section">
        <EventCollection feed={feed} />
      </Section>
    </>
  );
}
