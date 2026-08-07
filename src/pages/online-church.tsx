import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { onlineChurchContent, stagedPages } from "@/content";
import { YouTubeLiveEmbed } from "@/components/messages/youtube-live-embed";
import { SiteHead } from "@/components/seo/site-head";
import { ActionGroup } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";
import { getMessageFeed, youtubeChannel } from "@/lib/messages/message-source";

function formatServiceDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    timeZone: "America/New_York",
    weekday: "long",
  }).format(new Date(value));
}

function formatServiceTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
    timeZoneName: "short",
  }).format(new Date(value));
}

export const getStaticProps: GetStaticProps = async () => {
  const [feed, nextService] = await Promise.all([
    getMessageFeed(),
    import("@/lib/planning-center/events")
      .then(({ getNextScheduledOnlineService }) => getNextScheduledOnlineService())
      .catch(() => null),
  ]);

  return {
    props: {
      feed,
      nextService: nextService
        ? {
            date: formatServiceDate(nextService.startAt),
            time: formatServiceTime(nextService.startAt),
            url: nextService.publicUrl,
          }
        : null,
    },
    revalidate: 3600,
  };
};

export default function OnlineChurchPage({ feed, nextService }: InferGetStaticPropsType<typeof getStaticProps>) {
  const newestMessage = feed.items[0];

  return (
    <>
      <SiteHead {...stagedPages.live.seo} />

      <header className="online-hero">
        <Container className="online-hero-layout" size="editorial">
          <div>
            <p className="eyebrow">{onlineChurchContent.hero.eyebrow}</p>
            <h1>{onlineChurchContent.hero.title}</h1>
          </div>
          <div className="online-hero-intro">
            <p>{onlineChurchContent.hero.intro}</p>
            <nav className="online-hero-nav" aria-label="Church Online page sections">
              <a href="#watch-live">{onlineChurchContent.hero.liveAction}<span aria-hidden="true">↓</span></a>
              <Link href="/messages">{onlineChurchContent.hero.archiveAction}<span aria-hidden="true">→</span></Link>
            </nav>
          </div>
        </Container>
      </header>

      <Section
        id="watch-live"
        className="online-live-section"
        tone="ink"
        labelledBy="online-live-title"
        containerClassName="online-live-layout"
        containerSize="editorial"
      >
        <div className="online-live-copy">
          <p className="eyebrow">{onlineChurchContent.live.eyebrow}</p>
          <Heading as="h2" id="online-live-title" size="section">{onlineChurchContent.live.title}</Heading>
          <p>{onlineChurchContent.live.body}</p>
          {nextService ? (
            <aside className="online-next-service" aria-label="Next scheduled live service">
              <div>
                <p>{onlineChurchContent.live.nextServiceEyebrow}</p>
                <strong>{nextService.date}</strong>
                <span>{onlineChurchContent.live.nextServiceLabel} {nextService.time}</span>
              </div>
              <a href={nextService.url} target="_blank" rel="noreferrer">
                {onlineChurchContent.live.nextServiceAction}<span aria-hidden="true">↗</span>
              </a>
            </aside>
          ) : null}
          <ActionGroup actions={[
            { label: onlineChurchContent.live.channelAction, href: youtubeChannel.streamsUrl, style: "primary", external: true },
            { label: onlineChurchContent.live.archiveAction, href: "/messages", style: "secondary" },
          ]} />
          <p className="online-live-note">{onlineChurchContent.live.note}</p>
        </div>
        <YouTubeLiveEmbed
          channelId={youtubeChannel.id}
          thumbnailUrl={newestMessage?.thumbnailUrl?.value}
        />
      </Section>

      <Section
        className="online-connection-section"
        tone="sun"
        labelledBy="online-connection-title"
        containerClassName="online-connection-layout"
        containerSize="content"
      >
        <div>
          <p className="eyebrow">{onlineChurchContent.connection.eyebrow}</p>
          <Heading as="h2" id="online-connection-title" size="section">{onlineChurchContent.connection.title}</Heading>
        </div>
        <div>
          <p>{onlineChurchContent.connection.body}</p>
          <ActionGroup actions={[
            { label: onlineChurchContent.connection.visitAction, href: "/plan-your-visit", style: "primary" },
            { label: onlineChurchContent.connection.contactAction, href: "/contact", style: "secondary" },
          ]} />
        </div>
      </Section>
    </>
  );
}
