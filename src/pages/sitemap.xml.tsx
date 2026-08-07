import type { GetServerSideProps } from "next";

const canonical = "https://livingmessagechurch.com";
const publishedRoutes = ["/", "/plan-your-visit", "/about-living-message-church-clermont", "/about/beliefs", "/about/pastor", "/about/leadership", "/connect/next-steps", "/messages", "/messages/live", "/contact"];

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const urls = publishedRoutes.map((route) => `<url><loc>${canonical}${route}</loc></url>`).join("");
  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
  res.write(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
  res.end();
  return { props: {} };
};

export default function Sitemap() { return null; }
