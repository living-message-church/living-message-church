import type { NextConfig } from "next";
import inventory from "./docs/old-site-inventory.json";

type InventoryEntry = {
  old_route: string;
  new_route: string;
};

function withoutTrailingSlash(path: string) {
  return path === "/" ? path : path.replace(/\/$/, "");
}

function buildRedirects() {
  return (inventory.entries as InventoryEntry[]).flatMap((entry) => {
    const parsed = new URL(entry.old_route, "https://livingmessagechurch.com");
    const source = withoutTrailingSlash(parsed.pathname);
    const destination = withoutTrailingSlash(entry.new_route);
    const query = [...parsed.searchParams.entries()];

    if (source === destination && query.length === 0) return [];

    return [
      {
        source,
        destination,
        statusCode: 301 as const,
        ...(query.length > 0
          ? {
              has: query.map(([key, value]) => ({
                type: "query" as const,
                key,
                value,
              })),
            }
          : {}),
      },
    ];
  });
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Legacy WordPress URLs include trailing slashes. Disable Next's automatic
  // 308 normalization so audited content redirects can respond in one 301 hop.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: "/messages/live",
        destination: "/online-church",
        statusCode: 301,
      },
      ...buildRedirects(),
    ];
  },
};

export default nextConfig;
