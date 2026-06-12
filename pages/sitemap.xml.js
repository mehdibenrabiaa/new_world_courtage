const BASE = "https://www.newworldcourtage.fr";

const PAGES = [
  { path: "/",                      changefreq: "weekly",  priority: "1.0" },
  { path: "/assurance-auto/",       changefreq: "weekly",  priority: "0.9" },
  { path: "/assurance-habitation/", changefreq: "weekly",  priority: "0.9" },
  { path: "/assurance-sante/",      changefreq: "weekly",  priority: "0.9" },
  { path: "/assurance-decennale/",  changefreq: "weekly",  priority: "0.9" },
  { path: "/about/",                changefreq: "monthly", priority: "0.5" },
  { path: "/contact/",              changefreq: "monthly", priority: "0.5" },
];

function sitemap(pages) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${BASE}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;
}

export default function SitemapXml() {}

export function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");
  res.write(sitemap(PAGES));
  res.end();
  return { props: {} };
}
