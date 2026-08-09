import Image from "next/image";
import { kidsPageContent as content } from "@/content";
import { SiteHead } from "@/components/seo/site-head";
import { ActionGroup } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/typography";

export function KidsPage() {
  return (
    <>
      <SiteHead {...content.seo} />

      <section className="kids-hero" aria-labelledby="kids-hero-title">
        <Container className="kids-hero-layout" size="editorial">
          <div className="kids-hero-copy">
            <div className="kids-hero-brand">
              <Image
                src={content.hero.logo.src}
                alt={content.hero.logo.alt}
                width={288}
                height={288}
                loading="eager"
                unoptimized
              />
            </div>
            <Eyebrow>{content.hero.eyebrow}</Eyebrow>
            <h1 id="kids-hero-title">
              <span>{content.hero.title.lead}</span>
              <em>{content.hero.title.accent}</em>
              <span>{content.hero.title.end}</span>
            </h1>
            <p>{content.hero.body}</p>
            <ActionGroup actions={content.hero.actions} />
          </div>

          <div className="kids-hero-visual">
            <div className="kids-hero-photo">
              <Image
                src={content.hero.image.src}
                alt={content.hero.image.alt}
                fill
                preload
                sizes="(max-width: 768px) 100vw, 52vw"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="kids-introduction" aria-labelledby="kids-introduction-title">
        <Container className="kids-introduction-layout" size="editorial">
          <div className="kids-introduction-copy">
            <Eyebrow>{content.introduction.eyebrow}</Eyebrow>
            <h2 id="kids-introduction-title">{content.introduction.title}</h2>
            <p>{content.introduction.body}</p>
          </div>
          <div className="kids-introduction-visual">
            <Image
              src={content.introduction.image.src}
              alt={content.introduction.image.alt}
              fill
              sizes="(max-width: 768px) calc(100vw - 2.5rem), 52vw"
            />
          </div>
        </Container>
      </section>

      <section className="kids-experience" aria-labelledby="kids-experience-title">
        <Container className="kids-experience-layout" size="editorial">
          <div className="kids-experience-image">
            <Image
              src={content.experience.image.src}
              alt={content.experience.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 56vw"
            />
          </div>

          <div className="kids-experience-copy">
            <Eyebrow>{content.experience.eyebrow}</Eyebrow>
            <h2 id="kids-experience-title">{content.experience.title}</h2>
            <p>{content.experience.body}</p>
          </div>

          <div className="kids-principles">
            {content.experience.principles.map((principle) => (
              <article key={principle.number}>
                <span>{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="kids-arrival" aria-labelledby="kids-arrival-title">
        <Container size="editorial">
          <header className="kids-arrival-heading">
            <Eyebrow>{content.arrival.eyebrow}</Eyebrow>
            <h2 id="kids-arrival-title">{content.arrival.title}</h2>
            <p>{content.arrival.body}</p>
          </header>

          <div className="kids-arrival-steps">
            {content.arrival.steps.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="kids-final" aria-labelledby="kids-final-title">
        <Container className="kids-final-layout" size="editorial">
          <Eyebrow>{content.final.eyebrow}</Eyebrow>
          <div>
            <h2 id="kids-final-title">{content.final.title}</h2>
            <p>{content.final.body}</p>
            <ActionGroup actions={content.final.actions} />
          </div>
        </Container>
      </section>
    </>
  );
}
