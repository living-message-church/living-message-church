import Head from "next/head";
import type { SeoContent } from "@/types/content";
import { siteIdentity } from "@/content";

interface SiteHeadProps extends SeoContent {
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export function SiteHead({ title, description, path, noIndex = false, structuredData }: SiteHeadProps) {
  const canonical = new URL(path, siteIdentity.canonicalUrl).toString();
  const data = structuredData ? JSON.stringify(structuredData).replace(/</g, "\\u003c") : null;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteIdentity.name.value} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : null}
      {data ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} /> : null}
    </Head>
  );
}

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteIdentity.name.value,
  url: siteIdentity.canonicalUrl,
};
