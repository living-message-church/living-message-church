import Image from "next/image";
import { aboutChurchContent } from "@/content";
import { SiteHead } from "@/components/seo/site-head";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";

export function AboutChurchPage() {
  const { hero, family, nameStory, community, final } = aboutChurchContent;

  return (
    <>
      <SiteHead {...aboutChurchContent.seo} />

      <section className="about-church-hero" aria-labelledby="about-church-title">
        <Image
          alt={hero.image.alt}
          className="about-church-hero-image"
          fill
          preload
          sizes="100vw"
          src={hero.image.src}
        />
        <div className="about-church-hero-scrim" />
        <Container className="about-church-hero-inner" size="hero">
          <div className="about-church-hero-copy">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 id="about-church-title">{hero.title}</h1>
            <p>{hero.body}</p>
          </div>
        </Container>
      </section>

      <Section className="about-family-section" tone="paper" labelledBy="about-family-title" containerClassName="about-family-layout" containerSize="editorial">
        <div className="about-family-copy">
          <Eyebrow>{family.eyebrow}</Eyebrow>
          <Heading as="h2" id="about-family-title">{family.title}</Heading>
          {family.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <ActionLink external href={family.videoUrl} label={family.videoLabel} style="text" />
        </div>
        <div className="about-family-visual">
          <div className="about-family-image">
            <Image alt={family.image.alt} fill sizes="(max-width: 56rem) 100vw, 45vw" src={family.image.src} />
          </div>
          <blockquote>{family.statement}</blockquote>
        </div>
      </Section>

      <Section className="about-name-section" tone="ink" labelledBy="about-name-title" containerClassName="about-name-layout" containerSize="editorial">
        <div>
          <Eyebrow>{nameStory.eyebrow}</Eyebrow>
          <Heading as="h2" id="about-name-title">{nameStory.title}</Heading>
        </div>
        <div className="about-name-copy">
          {nameStory.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <ul aria-label="Scripture references">
            {nameStory.references.map((reference) => <li key={reference}>{reference}</li>)}
          </ul>
        </div>
      </Section>

      <Section className="about-community-section" tone="paper" labelledBy="about-community-title" containerClassName="about-community-layout" containerSize="editorial">
        <div className="about-community-image">
          <Image alt={community.image.alt} fill sizes="(max-width: 56rem) 100vw, 52vw" src={community.image.src} />
        </div>
        <div className="about-community-copy">
          <Eyebrow>{community.eyebrow}</Eyebrow>
          <Heading as="h2" id="about-community-title">{community.title}</Heading>
          <p>{community.body}</p>
          <ActionLink href={community.actionHref} label={community.actionLabel} style="primary" />
        </div>
      </Section>

      <Section className="about-church-final" tone="sun" labelledBy="about-church-final-title" containerClassName="about-church-final-layout" containerSize="editorial">
        <div>
          <Eyebrow>{final.eyebrow}</Eyebrow>
          <Heading as="h2" id="about-church-final-title">{final.title}</Heading>
        </div>
        <div>
          <p className="lede">{final.body}</p>
          <div className="action-group">
            <ActionLink href="/plan-your-visit" label={final.primaryLabel} style="primary" />
            <ActionLink href="/connect/next-steps" label={final.secondaryLabel} style="secondary" />
          </div>
        </div>
      </Section>
    </>
  );
}
