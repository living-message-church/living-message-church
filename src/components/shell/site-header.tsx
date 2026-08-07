import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { primaryNavigation, siteIdentity } from "@/content";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  const { pathname } = useRouter();
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
                <details className="desktop-nav-group" key={item.label}>
                  <summary aria-current={current ? "page" : undefined}>
                    {item.label}<span className="nav-chevron" aria-hidden="true" />
                  </summary>
                  <div className="desktop-nav-dropdown">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} aria-current={isCurrent(child.href) ? "page" : undefined}>{child.label}</Link>
                    ))}
                  </div>
                </details>
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
