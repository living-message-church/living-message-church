import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { primaryNavigation, siteIdentity } from "@/content";
import { Container } from "@/components/ui/container";

function ExternalLinkIcon() {
  return (
    <svg className="nav-external-icon" aria-hidden="true" viewBox="0 0 16 16">
      <path d="M6 3H3.75A1.75 1.75 0 0 0 2 4.75v7.5C2 13.216 2.784 14 3.75 14h7.5A1.75 1.75 0 0 0 13 12.25V10M9 2h5v5M14 2 7.5 8.5" />
    </svg>
  );
}

export function SiteHeader() {
  const { pathname } = useRouter();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const isCurrent = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <header className="site-header">
      <Container className="header-inner" size="editorial">
        <Link href="/" className="wordmark" aria-label={`${siteIdentity.name.value} home`}>
          <Image
            className="site-logo"
            src="/images/brand/living-message-church-logo.svg"
            alt={siteIdentity.name.value}
            width={288}
            height={92}
            preload
          />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryNavigation.map((item) => {
            const current = isCurrent(item.href) || item.children?.some((child) => child.availability === "implemented" && isCurrent(child.href));
            if (item.children) {
              const menuOpen = openMenu === item.href;
              const menuId = `desktop-${item.label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}-menu`;
              return (
                <div
                  className={`desktop-nav-group${menuOpen ? " is-open" : ""}`}
                  key={item.label}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setOpenMenu(null);
                  }}
                  onFocus={() => setOpenMenu(item.href)}
                  onMouseEnter={() => setOpenMenu(item.href)}
                  onMouseLeave={() => setOpenMenu(null)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setOpenMenu(null);
                      event.currentTarget.querySelector("button")?.focus();
                    }
                  }}
                >
                  <button
                    aria-controls={menuId}
                    aria-current={current ? "page" : undefined}
                    aria-expanded={menuOpen}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu((active) => active === item.href ? null : item.href)}
                    type="button"
                  >
                    {item.label}<span className="nav-chevron" aria-hidden="true" />
                  </button>
                  <div className={`desktop-nav-dropdown${item.children.length > 4 ? " desktop-nav-dropdown-wide" : ""}`} id={menuId}>
                    {item.children.map((child) => child.availability === "external" ? (
                      <a
                        key={`${child.label}-${child.href}`}
                        href={child.href}
                        onClick={() => setOpenMenu(null)}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <span>{child.label}</span><ExternalLinkIcon />
                      </a>
                    ) : (
                      <Link
                        key={`${child.label}-${child.href}`}
                        href={child.href}
                        aria-current={child.availability === "implemented" && isCurrent(child.href) ? "page" : undefined}
                        onClick={() => setOpenMenu(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return <Link key={item.href} href={item.href} aria-current={current ? "page" : undefined}>{item.label}</Link>;
          })}
        </nav>

        <details className="mobile-menu">
          <summary>
            <span className="sr-only menu-label-open">Open navigation</span>
            <span className="sr-only menu-label-close">Close navigation</span>
            <span aria-hidden="true" className="menu-icon">
              <span />
              <span />
              <span />
            </span>
          </summary>
          <nav aria-label="Mobile navigation">
            {primaryNavigation.map((item) => item.children ? (
              <div className="mobile-nav-group" key={item.label}>
                <p>{item.label}</p>
                {item.children.map((child) => child.availability === "external" ? (
                  <a key={`${child.label}-${child.href}`} href={child.href} rel="noreferrer" target="_blank">
                    <span>{child.label}</span><ExternalLinkIcon />
                  </a>
                ) : (
                  <Link key={`${child.label}-${child.href}`} href={child.href} aria-current={child.availability === "implemented" && isCurrent(child.href) ? "page" : undefined}>{child.label}</Link>
                ))}
              </div>
            ) : (
              <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>{item.label}</Link>
            ))}
          </nav>
        </details>
      </Container>
    </header>
  );
}
