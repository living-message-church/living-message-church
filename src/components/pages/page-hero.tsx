import { pagePhotography } from "@/content";
import type { PageContent } from "@/types/content";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/typography";

export function PageHero({ content }: { content: PageContent }) {
  const image = pagePhotography[content.seo.path];

  return (
    <header
      className={`page-hero${image ? " page-hero-photo" : ""}`}
      style={image ? { backgroundImage: `linear-gradient(90deg, rgb(18 19 17 / 0.9), rgb(18 19 17 / 0.52)), url(${image.src})` } : undefined}
    >
      <Container size="hero">
        {content.eyebrow ? <Eyebrow>{content.eyebrow}</Eyebrow> : null}
        <Heading as="h1" size="page">{content.title}</Heading>
        <p className="lede">{content.intro}</p>
      </Container>
    </header>
  );
}
