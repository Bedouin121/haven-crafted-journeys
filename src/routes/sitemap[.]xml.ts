import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { destinations, packages, articles } from "../lib/data";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/destinations", "/packages", "/about", "/blog", "/testimonials", "/contact", "/faq", "/book"];
        const entries = [
          ...staticPaths.map((p) => ({ path: p, changefreq: "weekly" as const, priority: p === "/" ? "1.0" : "0.8" })),
          ...destinations.map((d) => ({ path: `/destinations/${d.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
          ...packages.map((p) => ({ path: `/packages/${p.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
          ...articles.map((a) => ({ path: `/blog/${a.slug}`, changefreq: "monthly" as const, priority: "0.6" })),
        ];

        const urls = entries.map((e) =>
          `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
