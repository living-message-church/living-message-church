import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
  res.write("User-agent: *\nAllow: /\nSitemap: https://livingmessagechurch.com/sitemap.xml\n");
  res.end();
  return { props: {} };
};

export default function Robots() { return null; }
