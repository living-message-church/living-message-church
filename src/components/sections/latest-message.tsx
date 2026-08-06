import { featuredMessage, homeSections } from "@/content";
import { ActionGroup } from "@/components/ui/action-link";
import { YouTubeEmbed } from "@/components/messages/youtube-embed";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";

export function LatestMessage() {
  const content = homeSections.messages;
  return (
    <Section tone={content.tone} labelledBy="message-title" containerClassName="message-feature">
      <div>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading id="message-title">{content.title}</Heading>
        <p className="lede">{content.body}</p>
        <div className="pending-record">
          <strong>{featuredMessage.title.value}</strong>
          {featuredMessage.speaker ? <span>{featuredMessage.speaker.value}</span> : null}
        </div>
        {content.actions ? <ActionGroup actions={content.actions} /> : null}
      </div>
      <YouTubeEmbed message={featuredMessage} />
    </Section>
  );
}
