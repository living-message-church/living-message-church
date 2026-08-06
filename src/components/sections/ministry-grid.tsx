import Link from "next/link";
import { homeSections, ministries } from "@/content";
import { Card } from "@/components/ui/card";
import { MediaFrame } from "@/components/ui/media-frame";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";

export function MinistryGrid() {
  const content = homeSections.ministries;
  return (
    <Section tone={content.tone} labelledBy="ministries-title">
      <div className="section-intro"><Eyebrow>{content.eyebrow}</Eyebrow><Heading id="ministries-title">{content.title}</Heading><p>{content.body}</p></div>
      <div className="card-grid">
        {ministries.map((ministry, index) => (
          <Card key={ministry.id} className="ministry-card">
            <MediaFrame label={`Reserved for approved ${ministry.name.value} photography`} ratio="landscape" tone={(["coral", "cobalt", "gold"] as const)[index % 3]} />
            <div className="card-copy"><span className="card-index">0{index + 1}</span><h3>{ministry.name.value}</h3><p>{ministry.summary.value}</p><Link href={ministry.href}>Learn more <span aria-hidden="true">→</span></Link></div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
