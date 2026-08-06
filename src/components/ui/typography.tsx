import type { HTMLAttributes, ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3";
  size?: "display" | "page" | "section" | "card";
}

interface AccentHeadingProps extends Omit<HeadingProps, "children"> {
  title: string;
  accent?: string;
}

export function Heading({
  as: Component = "h2",
  size = "section",
  className = "",
  children,
  ...props
}: HeadingProps) {
  return (
    <Component className={`heading heading-${size} ${className}`} {...props}>
      {children}
    </Component>
  );
}

export function AccentHeading({ title, accent = "", ...props }: AccentHeadingProps) {
  const accentStart = accent ? title.indexOf(accent) : -1;

  if (accentStart < 0) return <Heading {...props}>{title}</Heading>;

  return (
    <Heading {...props}>
      <span>{title.slice(0, accentStart)}</span>
      <em>{accent}</em>
      <span>{title.slice(accentStart + accent.length)}</span>
    </Heading>
  );
}
