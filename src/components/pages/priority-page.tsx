import Link from "next/link";
import type { PriorityRouteContent } from "@/types/content";
import { ActionLink } from "@/components/ui/action-link";
import { PageHero } from "./page-hero";
import { SiteHead } from "@/components/seo/site-head";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";

export function PriorityPage({ content }: { content: PriorityRouteContent }) {
  return (
    <>
      <SiteHead {...content.seo} />
      <PageHero content={content} />
      <Section tone="paper" labelledBy="route-purpose-title">
        <div className="route-purpose">
          <div className="route-status">
            <Eyebrow>{content.statusLabel}</Eyebrow>
            <p>{content.statusBody}</p>
          </div>
          <div>
            <Heading as="h2" id="route-purpose-title">A complete structure. Carefully gated facts.</Heading>
            <div className="editorial-panel-grid">
              {content.panels.map((panel) => (
                <article className="editorial-panel" key={`${panel.number}-${panel.title}`}>
                  <span>{panel.number}</span>
                  <h3>{panel.title}</h3>
                  <p>{panel.body}</p>
                  {panel.href && panel.linkLabel ? <Link href={panel.href}>{panel.linkLabel} <span aria-hidden="true">→</span></Link> : null}
                </article>
              ))}
            </div>
            {content.nextAction ? <div className="action-group"><ActionLink {...content.nextAction} /></div> : null}
          </div>
        </div>
      </Section>
    </>
  );
}
