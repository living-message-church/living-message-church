import type { PageContent } from "@/types/content";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/typography";

export function PageHero({ content }: { content: PageContent }) {
  return (
    <header className="page-hero">
      <Container>
        {content.eyebrow ? <Eyebrow>{content.eyebrow}</Eyebrow> : null}
        <Heading as="h1" size="page">{content.title}</Heading>
        <p className="lede">{content.intro}</p>
      </Container>
    </header>
  );
}
