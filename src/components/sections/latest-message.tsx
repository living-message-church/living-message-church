import { featuredMessage, homePhotography, homeSections } from "@/content";
import { ActionGroup } from "@/components/ui/action-link";
import { MediaFrame } from "@/components/ui/media-frame";
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
          <span>{featuredMessage.summary.value}</span>
        </div>
        {content.actions ? <ActionGroup actions={content.actions} /> : null}
      </div>
      <MediaFrame image={homePhotography.message} label="Living Message Church message photography" ratio="wide" tone="cobalt" />
    </Section>
  );
}
