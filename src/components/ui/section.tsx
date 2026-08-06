import type { ReactNode } from "react";
import { Container } from "./container";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  tone?: "paper" | "ink" | "sun" | "sage";
  labelledBy?: string;
}

export function Section({
  children,
  className = "",
  containerClassName = "",
  id,
  tone = "paper",
  labelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`section section-${tone} ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
