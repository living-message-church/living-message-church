import Image from "next/image";
import { beliefsContent } from "@/content";
import { SiteHead } from "@/components/seo/site-head";
import { SundayInvitation } from "@/components/sections/sunday-invitation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";

export function BeliefsPage() {
  const { hero, introduction, statements } = beliefsContent;

  return (
    <>
      <SiteHead {...beliefsContent.seo} />

      <section className="beliefs-hero" aria-labelledby="beliefs-page-title">
        <Image
          alt={hero.image.alt}
          className="beliefs-hero-image"
          fill
          preload
          sizes="100vw"
          src={hero.image.src}
        />
        <div className="beliefs-hero-scrim" />
        <Container className="beliefs-hero-inner" size="hero">
          <div className="beliefs-hero-copy">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 id="beliefs-page-title">{hero.title}</h1>
            <p>{hero.body}</p>
          </div>
        </Container>
      </section>

      <Section
        className="beliefs-intro-section"
        tone="paper"
        labelledBy="beliefs-intro-title"
        containerClassName="beliefs-intro-layout"
        containerSize="editorial"
      >
        <div className="beliefs-intro-visual">
          <Image
            alt={introduction.image.alt}
            className="beliefs-intro-image"
            fill
            sizes="(max-width: 896px) calc(100vw - 2.5rem), 38vw"
            src={introduction.image.src}
          />
          <div className="beliefs-intro-scrim" />
          <div className="beliefs-intro-heading">
            <Eyebrow>{introduction.eyebrow}</Eyebrow>
            <Heading as="h2" id="beliefs-intro-title">{introduction.title}</Heading>
          </div>
        </div>
        <div className="beliefs-intro-copy">
          {introduction.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p className="beliefs-references">{introduction.references}</p>
          <aside className="beliefs-confession-note">
            <span>Historic confessions</span>
            <p>{introduction.confession}</p>
          </aside>
        </div>
      </Section>

      <Section
        className="beliefs-statements-section"
        tone="paper"
        labelledBy="beliefs-statements-title"
        containerClassName="beliefs-statements-layout"
        containerSize="editorial"
      >
        <div className="beliefs-statements-intro">
          <Eyebrow>Statement of faith</Eyebrow>
          <Heading as="h2" id="beliefs-statements-title">What we believe.</Heading>
          <p>Select a belief to read the complete statement and its Scripture references.</p>
        </div>
        <div className="beliefs-accordion">
          {statements.map((statement, index) => (
            <details className="belief-item" key={statement.id} open={index === 0}>
              <summary>
                <span className="belief-number">{String(index + 1).padStart(2, "0")}</span>
                <span>{statement.title}</span>
                <span className="belief-toggle" aria-hidden="true" />
              </summary>
              <div className="belief-content">
                {statement.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </details>
          ))}
        </div>
      </Section>

      <SundayInvitation />
    </>
  );
}
