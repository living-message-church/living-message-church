import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { primaryNavigation, siteIdentity } from "@/content";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  const { pathname } = useRouter();
  return (
    <header className="site-header">
      <Container className="header-inner" size="editorial">
        <Link href="/" className="wordmark" aria-label={`${siteIdentity.name.value} home`}>
          <Image
            className="site-logo"
            src="/images/brand/living-message-church-logo.png"
            alt={siteIdentity.name.value}
            width={250}
            height={69}
            preload
          />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryNavigation.map((item) => {
            const current = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
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
            {primaryNavigation.map((item) => (
              <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>
            ))}
          </nav>
        </details>
      </Container>
    </header>
  );
}
