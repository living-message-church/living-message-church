import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { primaryNavigation, siteIdentity } from "@/content";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  const { pathname } = useRouter();
  const [newMenuOpen, setNewMenuOpen] = useState(false);
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
            const current = isCurrent(item.href) || item.children?.some((child) => isCurrent(child.href));
            if (item.children) {
              return (
                <div
                  className={`desktop-nav-group${newMenuOpen ? " is-open" : ""}`}
                  key={item.label}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setNewMenuOpen(false);
                  }}
                  onFocus={() => setNewMenuOpen(true)}
                  onMouseEnter={() => setNewMenuOpen(true)}
                  onMouseLeave={() => setNewMenuOpen(false)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setNewMenuOpen(false);
                      event.currentTarget.querySelector("button")?.focus();
                    }
                  }}
                >
                  <button
                    aria-controls="desktop-im-new-menu"
                    aria-current={current ? "page" : undefined}
                    aria-expanded={newMenuOpen}
                    aria-haspopup="true"
                    onClick={() => setNewMenuOpen((open) => !open)}
                    type="button"
                  >
                    {item.label}<span className="nav-chevron" aria-hidden="true" />
                  </button>
                  <div className="desktop-nav-dropdown" id="desktop-im-new-menu">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} aria-current={isCurrent(child.href) ? "page" : undefined}>{child.label}</Link>
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
                {item.children.map((child) => (
                  <Link key={child.href} href={child.href} aria-current={isCurrent(child.href) ? "page" : undefined}>{child.label}</Link>
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
