import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export type ContainerSize = "reading" | "content" | "standard" | "editorial" | "hero" | "full";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  children,
  className = "",
  size = "standard",
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={`container-shell container-${size} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
