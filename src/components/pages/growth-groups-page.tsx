import { growthGroupsContent as content } from "@/content";
import { PageHero } from "@/components/pages/page-hero";
import { SiteHead } from "@/components/seo/site-head";
import { ActionLink } from "@/components/ui/action-link";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";

export function GrowthGroupsPage() {
  return (
    <>
      <SiteHead {...content.page.seo} />
      <PageHero content={content.page} />

      <Section className="growth-overview" containerSize="editorial" labelledBy="growth-overview-title">
        <div className="growth-overview-copy">
          <Eyebrow>{content.overview.eyebrow}</Eyebrow>
          <Heading as="h2" id="growth-overview-title" size="page">{content.overview.title}</Heading>
          <p className="lede">{content.overview.body}</p>
        </div>
        <dl className="growth-facts">
          {content.overview.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="curriculum" className="growth-curriculum" tone="ink" containerSize="editorial" labelledBy="growth-curriculum-title">
        <div className="growth-section-heading">
          <Eyebrow>{content.curriculum.eyebrow}</Eyebrow>
          <div>
            <Heading as="h2" id="growth-curriculum-title" size="page">{content.curriculum.title}</Heading>
            <p className="lede">{content.curriculum.intro}</p>
          </div>
        </div>
        <div className="growth-semesters">
          {content.curriculum.semesters.map((semester) => (
            <article id={semester.id} key={semester.id}>
              <span>{semester.number}</span>
              <div>
                <p>{semester.season}</p>
                <h3>{semester.title}</h3>
              </div>
              <div>
                <time>{semester.dates}</time>
                <small>{semester.status}</small>
                <p>{semester.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="winter-classes" className="growth-options" containerSize="editorial" labelledBy="growth-options-title">
        <div className="growth-section-heading">
          <Eyebrow>{content.winterOptions.eyebrow}</Eyebrow>
          <div>
            <Heading as="h2" id="growth-options-title" size="section">{content.winterOptions.title}</Heading>
            <p className="lede">{content.winterOptions.intro}</p>
          </div>
        </div>
        <ol className="growth-class-list">
          {content.winterOptions.classes.map((className, index) => (
            <li key={className}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{className}</strong>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="growth-closing" tone="sun" containerSize="editorial" labelledBy="growth-closing-title">
        <Eyebrow>{content.closing.eyebrow}</Eyebrow>
        <Heading as="h2" id="growth-closing-title" size="page">{content.closing.title}</Heading>
        <p className="lede">{content.closing.body}</p>
        <div className="action-group">
          <ActionLink label="Ask about Growth Groups" href="/contact" style="primary" />
        </div>
      </Section>
    </>
  );
}
