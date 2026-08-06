import type { ReactNode } from "react";
import { Container, type ContainerSize } from "./container";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  containerSize?: ContainerSize;
  id?: string;
  tone?: "paper" | "ink" | "sun" | "sage";
  labelledBy?: string;
}

export function Section({
  children,
  className = "",
  containerClassName = "",
  containerSize = "standard",
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
      <Container className={containerClassName} size={containerSize}>{children}</Container>
    </section>
  );
}
