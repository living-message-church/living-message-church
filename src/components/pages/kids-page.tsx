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
        <Image
          className="kids-hero-image"
          src={content.hero.image.src}
          alt={content.hero.image.alt}
          fill
          preload
          sizes="100vw"
        />
        <div className="kids-hero-scrim" aria-hidden="true" />
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
            <h1 id="kids-hero-title">
              <span>{content.hero.title.lead}</span>
              <em>{content.hero.title.accent}</em>
              <span>{content.hero.title.end}</span>
            </h1>
            <p>{content.hero.body}</p>
            <ActionGroup actions={content.hero.actions} />
          </div>
        </Container>
      </section>

      <section className="kids-touchpoints" aria-labelledby="kids-touchpoints-title">
        <Container size="editorial">
          <header className="kids-section-intro">
            <Eyebrow>{content.touchpoints.eyebrow}</Eyebrow>
            <h2 id="kids-touchpoints-title">{content.touchpoints.title}</h2>
            <p>{content.touchpoints.body}</p>
          </header>

          <div className="kids-touchpoint-grid">
            {content.touchpoints.items.map((item) => (
              <article key={item.mark}>
                <span aria-hidden="true">{item.mark}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="kids-ages" aria-labelledby="kids-ages-title">
        <Container className="kids-ages-layout" size="editorial">
          <div className="kids-ages-art">
            <Image
              src={content.ages.image.src}
              alt={content.ages.image.alt}
              fill
              sizes="(max-width: 768px) calc(100vw - 3rem), 48vw"
            />
            <div className="kids-grade-badge" aria-label="LM Kids serves children through fifth grade">
              <span>Through</span>
              <strong>5th</strong>
              <span>Grade</span>
            </div>
          </div>

          <div className="kids-ages-copy">
            <Eyebrow>{content.ages.eyebrow}</Eyebrow>
            <h2 id="kids-ages-title">{content.ages.title}</h2>
            <p>{content.ages.body}</p>
            <aside>{content.ages.note}</aside>
            <ActionGroup actions={content.ages.actions} />
          </div>
        </Container>
      </section>

      <section className="kids-imagination" aria-labelledby="kids-imagination-title">
        <Container size="hero">
          <div className="kids-imagination-art">
            <Image
              src={content.experience.image.src}
              alt={content.experience.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 62vw"
            />
          </div>
          <div className="kids-imagination-copy">
            <Eyebrow>{content.experience.eyebrow}</Eyebrow>
            <h2 id="kids-imagination-title">{content.experience.title}</h2>
            <p>{content.experience.body}</p>
            <ul>
              {content.experience.bullets.map((bullet, index) => (
                <li key={bullet}>
                  <span aria-hidden="true">0{index + 1}</span>
                  {bullet}
                </li>
              ))}
            </ul>
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

          <ol className="kids-arrival-steps">
            {content.arrival.steps.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
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
