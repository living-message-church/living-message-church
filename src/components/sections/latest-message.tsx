import { homeSections } from "@/content";
import { ActionGroup } from "@/components/ui/action-link";
import { YouTubeEmbed } from "@/components/messages/youtube-embed";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { formatMessageDate } from "@/lib/messages/message-format";
import type { ContentFeedResult, Message } from "@/types/content";

export function LatestMessage({ feed }: { feed: ContentFeedResult<Message> }) {
  const content = homeSections.messages;
  const latestMessage = feed.items.find((message) => message.featured) ?? feed.items[0];
  const publishedDate = formatMessageDate(latestMessage?.date?.value);
  return (
    <Section
      className="latest-message-section"
      tone={content.tone}
      labelledBy="message-title"
      containerClassName="message-feature"
      containerSize="editorial"
    >
      <div>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading id="message-title">{content.title}</Heading>
        <p className="lede">{content.body}</p>
        <div className="pending-record">
          <strong>{latestMessage?.title.value ?? "Latest message temporarily unavailable"}</strong>
          {publishedDate ? <span>{publishedDate}</span> : null}
          {latestMessage?.speaker ? <span>{latestMessage.speaker.value}</span> : null}
        </div>
        {content.actions ? <ActionGroup actions={content.actions} /> : null}
      </div>
      {latestMessage ? <YouTubeEmbed message={latestMessage} /> : <div className="youtube-player youtube-player-empty" role="status">{feed.message}</div>}
    </Section>
  );
}
