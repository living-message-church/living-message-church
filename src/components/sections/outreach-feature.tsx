import { featuredOutreach, homePhotography, homeSections } from "@/content";
import { ActionGroup } from "@/components/ui/action-link";
import { MediaFrame } from "@/components/ui/media-frame";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";

export function OutreachFeature() {
  const content = homeSections.outreach;
  return (
    <Section tone={content.tone} labelledBy="outreach-title" containerClassName="outreach-grid" containerSize="editorial">
      <MediaFrame image={homePhotography.outreach} label="Living Message Church outreach photography" ratio="landscape" tone="coral" />
      <div>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading id="outreach-title">{content.title}</Heading>
        <p className="lede">{content.body}</p>
        <p>{featuredOutreach.summary.value}</p>
        {content.actions ? <ActionGroup actions={content.actions} /> : null}
      </div>
    </Section>
  );
}
