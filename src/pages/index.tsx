import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { pageContent } from "@/content";
import { SiteHead, organizationStructuredData } from "@/components/seo/site-head";
import {
  Hero,
  IdentityStatement,
  LatestMessage,
  MinistryGrid,
  OutreachFeature,
  SundayInvitation,
  UpcomingEvents,
  VisitEditorial,
} from "@/components/sections";
import { getEventFeed } from "@/lib/events/event-source";

export const getStaticProps: GetStaticProps = async () => ({
  props: { eventFeed: await getEventFeed() },
});

export default function HomePage({ eventFeed }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SiteHead {...pageContent.home} structuredData={organizationStructuredData} />
      <Hero />
      <IdentityStatement />
      <VisitEditorial />
      <LatestMessage />
      <UpcomingEvents feed={eventFeed} />
      <MinistryGrid />
      <OutreachFeature />
      <SundayInvitation />
    </>
  );
}
