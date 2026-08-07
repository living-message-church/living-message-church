import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { onlineChurchContent, stagedPages } from "@/content";
import { YouTubeLiveEmbed } from "@/components/messages/youtube-live-embed";
import { SiteHead } from "@/components/seo/site-head";
import { ActionGroup } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";
import { youtubeChannel } from "@/lib/messages/message-source";
import type { YouTubeLiveResolution } from "@/lib/youtube/types";

const easternTimeZone = "America/New_York";
const sundayBroadcastTime = "10:45 AM EST";

function getNextSundayBroadcast(now = new Date()) {
  const easternParts = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    hour: "numeric",
    hourCycle: "h23",
    minute: "numeric",
    month: "numeric",
    timeZone: easternTimeZone,
    weekday: "long",
    year: "numeric",
  }).formatToParts(now).reduce<Record<string, string>>((parts, part) => {
    if (part.type !== "literal") parts[part.type] = part.value;
    return parts;
  }, {});
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weekdayIndex = weekdays.indexOf(easternParts.weekday);
  const currentMinutes = Number(easternParts.hour) * 60 + Number(easternParts.minute);
  let daysUntilSunday = (7 - weekdayIndex) % 7;

  if (daysUntilSunday === 0 && currentMinutes > (12 * 60 + 30)) daysUntilSunday = 7;

  const serviceDate = new Date(Date.UTC(
    Number(easternParts.year),
    Number(easternParts.month) - 1,
    Number(easternParts.day) + daysUntilSunday,
    12,
  ));

  return {
    date: new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      timeZone: "UTC",
      weekday: "long",
    }).format(serviceDate),
    time: sundayBroadcastTime,
    url: youtubeChannel.liveUrl,
  };
}

export const getStaticProps: GetStaticProps = async () => {
  const liveResolution = await import("@/lib/youtube/live")
      .then(({ getCurrentLiveVideo }) => getCurrentLiveVideo())
      .catch(() => ({
        apiReachable: false,
        checkedAt: new Date().toISOString(),
        status: "unavailable",
        video: null,
      } satisfies YouTubeLiveResolution));
  const nextService = getNextSundayBroadcast();

  return {
    props: {
      liveResolution,
      nextService,
    },
    revalidate: 60,
  };
};

export default function OnlineChurchPage({ liveResolution, nextService }: InferGetStaticPropsType<typeof getStaticProps>) {
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
            <p>
              {onlineChurchContent.hero.intro}{" "}
              <Link href="/messages">{onlineChurchContent.hero.archiveReference}</Link>.
            </p>
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
          <ActionGroup actions={[
            { label: onlineChurchContent.live.channelAction, href: youtubeChannel.liveUrl, style: "primary", external: true },
            { label: onlineChurchContent.live.archiveAction, href: "/messages", style: "secondary" },
          ]} />
          <p className="online-live-note">{onlineChurchContent.live.note}</p>
        </div>
        <YouTubeLiveEmbed
          nextService={{
            date: nextService.date,
            eyebrow: onlineChurchContent.live.nextServiceEyebrow,
            label: onlineChurchContent.live.nextServiceLabel,
            time: nextService.time,
          }}
          resolutionStatus={liveResolution.status}
          video={liveResolution.video}
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
