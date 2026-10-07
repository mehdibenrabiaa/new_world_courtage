const BASE = "https://www.newworldcourtage.fr";

const PAGES = [
  { path: "/",                      changefreq: "weekly",  priority: "1.0" },
  { path: "/nos-assurances/",       changefreq: "weekly",  priority: "0.9" },
  { path: "/assurance-auto/",                     changefreq: "weekly",  priority: "0.9" },
  { path: "/assurance-moto/",                     changefreq: "weekly",  priority: "0.9" },
  { path: "/assurance-risques-aggraves/",         changefreq: "weekly",  priority: "0.8" },
  { path: "/assurance-transport/",                changefreq: "weekly",  priority: "0.9" },
  { path: "/assurance-transport/taxi/",           changefreq: "weekly",  priority: "0.9" },
  { path: "/assurance-transport/chauffeur-vtc/",  changefreq: "weekly",  priority: "0.9" },
  { path: "/assurance-pro-auto/garagiste/",       changefreq: "weekly",  priority: "0.9" },
  { path: "/devis/",                              changefreq: "monthly", priority: "0.7" },
  { path: "/a-propos/",                           changefreq: "monthly", priority: "0.5" },
  { path: "/a-propos/nos-partenaires/",           changefreq: "monthly", priority: "0.5" },
  { path: "/a-propos/avis-clients/",              changefreq: "monthly", priority: "0.5" },
  { path: "/contact/",                            changefreq: "monthly", priority: "0.5" },
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

