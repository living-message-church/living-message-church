import Image from "next/image";
import { kidsPageContent as content } from "@/content";
import { SiteHead } from "@/components/seo/site-head";
import { ActionGroup } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/typography";

function KidsValueIcon({ icon }: { icon: "book" | "cross" | "bulb" | "heart" }) {
  if (icon === "book") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M7.5 12.5c6.3-2 11.8-.7 16.5 3.8v23c-4.7-4.5-10.2-5.8-16.5-3.8v-23Z" />
        <path d="M40.5 12.5c-6.3-2-11.8-.7-16.5 3.8v23c4.7-4.5 10.2-5.8 16.5-3.8v-23Z" />
        <path d="M12 8.5V5.8M24 8V4M36 8.5V5.8" />
      </svg>
    );
  }

  if (icon === "cross") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="19" />
        <path d="M21 12h6v9h8v6h-8v10h-6V27h-8v-6h8v-9Z" />
      </svg>
    );
  }

  if (icon === "bulb") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M35.5 20.5c0 5.1-2.6 8.2-6 11.2-1.5 1.3-2 2.8-2 4.3h-7c0-1.5-.5-3-2-4.3-3.4-3-6-6.1-6-11.2C12.5 14 17.6 9 24 9s11.5 5 11.5 11.5Z" />
        <path d="M20.5 41h7M8 20.5H4.5M43.5 20.5H40M12.5 9 10 6.5M35.5 9 38 6.5M24 5V1.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 39S8 31 8 18.8C8 12.4 12.8 9 17.5 9c3 0 5.4 1.5 6.5 4 1.1-2.5 3.5-4 6.5-4 4.7 0 9.5 3.4 9.5 9.8C40 31 24 39 24 39Z" />
      <path d="M8 8 5.5 5.5M40 8l2.5-2.5M24 5V1.5" />
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
