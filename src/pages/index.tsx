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
import { getMessageFeed } from "@/lib/messages/message-source";

export const getStaticProps: GetStaticProps = async () => {
  const [eventFeed, messageFeed] = await Promise.all([getEventFeed(), getMessageFeed()]);
  return { props: { eventFeed, messageFeed }, revalidate: 3600 };
};

export default function HomePage({ eventFeed, messageFeed }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SiteHead {...pageContent.home} structuredData={organizationStructuredData} />
      <Hero />
      <IdentityStatement />
      <VisitEditorial />
      <LatestMessage feed={messageFeed} />
      <UpcomingEvents feed={eventFeed} />
      <MinistryGrid />
      <OutreachFeature />
      <SundayInvitation />
    </>
  );
}
