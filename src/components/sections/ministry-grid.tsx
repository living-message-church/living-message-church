import Link from "next/link";
import { homePhotography, homeSections, ministries } from "@/content";
import { Card } from "@/components/ui/card";
import { MediaFrame } from "@/components/ui/media-frame";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";

export function MinistryGrid() {
  const content = homeSections.ministries;
  return (
    <Section tone={content.tone} labelledBy="ministries-title" containerSize="editorial">
      <div className="section-intro"><Eyebrow>{content.eyebrow}</Eyebrow><Heading id="ministries-title">{content.title}</Heading><p>{content.body}</p></div>
      <div className="card-grid ministry-story-grid">
        {ministries.map((ministry) => (
          <Card key={ministry.id} className="ministry-card">
            <MediaFrame image={homePhotography.ministries[ministry.id]} label={`${ministry.name.value} photography`} ratio="landscape" tone="sage" sizes="(max-width: 48rem) 100vw, (max-width: 70rem) 50vw, (max-width: 100rem) 50vw, 42rem" />
            <div className="card-copy"><h3>{ministry.name.value}</h3><p>{ministry.summary.value}</p><Link href={ministry.href}>Learn more <span aria-hidden="true">→</span></Link></div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
