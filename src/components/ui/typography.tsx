import type { HTMLAttributes, ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3";
  size?: "display" | "page" | "section" | "card";
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
