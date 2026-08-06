import Link from "next/link";
import { useRouter } from "next/router";
import { primaryNavigation, siteIdentity } from "@/content";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  const { pathname } = useRouter();
  return (
    <header className="site-header">
      <Container className="header-inner">
        <Link href="/" className="wordmark" aria-label={`${siteIdentity.name.value} home`}>
          <span className="wordmark-monogram" aria-hidden="true">LM</span>
          <span className="wordmark-text">Living Message<span>Church</span></span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryNavigation.map((item) => {
            const current = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return <Link key={item.href} href={item.href} aria-current={current ? "page" : undefined}>{item.label}</Link>;
          })}
        </nav>

        <details className="mobile-menu">
          <summary><span>Menu</span><span aria-hidden="true" className="menu-icon">☰</span></summary>
          <nav aria-label="Mobile navigation">
            {primaryNavigation.map((item) => (
              <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>
            ))}
          </nav>
        </details>
      </Container>
    </header>
  );
}
