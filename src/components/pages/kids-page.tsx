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
        <Container className="kids-hero-layout" size="hero">
          <div className="kids-hero-copy">
            <Eyebrow>{content.hero.eyebrow}</Eyebrow>
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

      <section className="kids-neighborhood-intro" aria-labelledby="kids-neighborhood-title">
        <Container size="editorial">
          <div className="kids-neighborhood-heading">
            <Eyebrow>{content.neighborhood.eyebrow}</Eyebrow>
            <h2 id="kids-neighborhood-title">{content.neighborhood.title}</h2>
            <div>
              <p>{content.neighborhood.body}</p>
              <small>{content.neighborhood.note}</small>
            </div>
          </div>

          <ul className="kids-neighborhood-facts" aria-label="LM Kids at a glance">
            {content.neighborhood.facts.map((fact) => (
              <li key={fact.label}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <div className="kids-districts">
        {content.districts.map((district, index) => (
          <section
            className={`kids-district kids-district-${district.tone}`}
            aria-labelledby={`kids-district-${district.id}`}
            key={district.id}
          >
            <Container className={`kids-district-layout${index % 2 ? " kids-district-layout-reverse" : ""}`} size="hero">
              <div className="kids-district-image">
                <Image
                  src={district.image.src}
                  alt={district.image.alt}
                  fill
                  sizes="(max-width: 768px) calc(100vw - 2.5rem), 56vw"
                />
              </div>

              <div className="kids-district-copy">
                <p className="kids-district-label">
                  <span>{district.number}</span>
                  {district.label}
                </p>
                <h2 id={`kids-district-${district.id}`}>{district.title}</h2>
                <p>{district.body}</p>
                <ul>
                  {district.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </Container>
          </section>
        ))}
      </div>

      <section className="kids-visit" aria-labelledby="kids-visit-title">
        <Container size="editorial">
          <header className="kids-visit-heading">
            <Eyebrow>{content.visit.eyebrow}</Eyebrow>
            <h2 id="kids-visit-title">{content.visit.title}</h2>
            <p>{content.visit.body}</p>
          </header>

          <ol className="kids-visit-steps">
            {content.visit.steps.map((step) => (
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
