import Link from "next/link";
import type { CallToAction } from "@/types/content";

type ActionLinkProps = CallToAction & { className?: string };

export function ActionLink({
  label,
  href,
  style,
  external = false,
  className = "",
}: ActionLinkProps) {
  const classes = `action-link action-${style} ${className}`;
  if (external) {
    return (
      <a className={classes} href={href} target="_blank" rel="noreferrer">
        <span>{label}</span>
        <span aria-hidden="true">↗</span>
      </a>
    );
  }
  return (
    <Link className={classes} href={href}>
      <span>{label}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}

export function ActionGroup({ actions }: { actions: CallToAction[] }) {
  return (
    <div className="action-group">
      {actions.map((action) => (
        <ActionLink key={`${action.label}-${action.href}`} {...action} />
      ))}
    </div>
  );
}
