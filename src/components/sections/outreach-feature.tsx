import { featuredOutreach, homeDisplayLabels, homeSections } from "@/content";
import { ActionGroup } from "@/components/ui/action-link";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";

export function OutreachFeature() {
  const content = homeSections.outreach;
  return (
    <Section tone={content.tone} labelledBy="outreach-title" containerClassName="outreach-grid">
      <div className="outreach-mark" aria-hidden="true">{homeDisplayLabels.outreachMark.map((line) => <span key={line}>{line}<br /></span>)}</div>
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
