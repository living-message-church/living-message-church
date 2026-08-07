import Image from "next/image";
import { pastorContent } from "@/content";
import { SiteHead } from "@/components/seo/site-head";
import { SundayInvitation } from "@/components/sections/sunday-invitation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";

export function PastorPage() {
  const { hero, profile, story, focus } = pastorContent;

  return (
    <>
      <SiteHead {...pastorContent.seo} />

      <section className="pastor-hero" aria-labelledby="pastor-page-title">
        <Image
          alt={hero.image.alt}
          className="pastor-hero-image"
          fill
          preload
          sizes="100vw"
          src={hero.image.src}
        />
        <div className="pastor-hero-scrim" />
        <Container className="pastor-hero-inner" size="hero">
          <div className="pastor-hero-copy">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 id="pastor-page-title">{hero.title}</h1>
            <p>{hero.body}</p>
          </div>
        </Container>
      </section>

      <Section
        className="pastor-profile-section"
        tone="paper"
        labelledBy="pastor-profile-title"
        containerClassName="pastor-profile-layout"
        containerSize="editorial"
      >
        <div className="pastor-profile-image">
          <Image alt={profile.image.alt} fill sizes="(max-width: 56rem) 100vw, 42vw" src={profile.image.src} />
        </div>
        <div className="pastor-profile-copy">
          <Eyebrow>{profile.eyebrow}</Eyebrow>
          <Heading as="h2" id="pastor-profile-title">{profile.title}</Heading>
          {profile.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p className="pastor-profile-closing">{profile.closing}</p>
        </div>
      </Section>

      <Section
        className="pastor-story-section"
        tone="paper"
        labelledBy="pastor-story-title"
        containerClassName="pastor-story-layout"
        containerSize="editorial"
      >
        <div className="pastor-story-heading">
          <Eyebrow>{story.eyebrow}</Eyebrow>
          <Heading as="h2" id="pastor-story-title">{story.title}</Heading>
        </div>
        <div className="pastor-timeline">
          {story.milestones.map((milestone) => (
            <article key={milestone.marker}>
              <p>{milestone.marker}</p>
              <div>
                <h3>{milestone.title}</h3>
                <p>{milestone.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        className="pastor-focus-section"
        tone="ink"
        labelledBy="pastor-focus-title"
        containerClassName="pastor-focus-layout"
        containerSize="editorial"
      >
        <div>
          <Eyebrow>{focus.eyebrow}</Eyebrow>
          <Heading as="h2" id="pastor-focus-title">{focus.title}</Heading>
        </div>
        <ol>
          {focus.items.map((item, index) => (
            <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>
          ))}
        </ol>
      </Section>

      <SundayInvitation />
    </>
  );
}
