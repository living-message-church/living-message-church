import Image from "next/image";
import { kidsPageContent as content } from "@/content";
import { SiteHead } from "@/components/seo/site-head";
import { ActionGroup } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/typography";

function KidsValueIcon({ icon }: { icon: "book" | "cross" | "spark" | "heart" }) {
  if (icon === "book") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M7 10.5c6.5-2 12.2-.8 17 3.7v25c-4.8-4.5-10.5-5.7-17-3.7v-25Z" />
        <path d="M41 10.5c-6.5-2-12.2-.8-17 3.7v25c4.8-4.5 10.5-5.7 17-3.7v-25Z" />
      </svg>
    );
  }

  if (icon === "cross") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M20 6h8v13h11v8H28v15h-8V27H9v-8h11V6Z" />
      </svg>
    );
  }

  if (icon === "spark") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 5c1.5 10.8 7.4 16.7 18 18-10.6 1.3-16.5 7.2-18 18-1.5-10.8-7.4-16.7-18-18 10.6-1.3 16.5-7.2 18-18Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 40S7 31.4 7 18.3C7 11.4 12.2 8 17.2 8c3.1 0 5.6 1.5 6.8 4 1.2-2.5 3.7-4 6.8-4C35.8 8 41 11.4 41 18.3 41 31.4 24 40 24 40Z" />
    </svg>
  );
}

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

      <section className="kids-introduction" aria-labelledby="kids-introduction-title">
        <Container size="editorial">
          <div className="kids-values" aria-label="LMC Kids ministry values">
            {content.introduction.values.map((value) => (
              <article key={value.title}>
                <span className="kids-value-icon">
                  <KidsValueIcon icon={value.icon} />
                </span>
                <h2>{value.title}</h2>
                <p>{value.body}</p>
              </article>
            ))}
          </div>

          <div className="kids-introduction-layout">
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
                sizes="(max-width: 768px) calc(100vw - 3rem), 52vw"
              />
            </div>
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
