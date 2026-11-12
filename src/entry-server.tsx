// Renders one URL to HTML. Used at build time by scripts/prerender.mjs and by the dev server (plugins/devSsr.js).
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import config from "@/config/config.json";
import { PageContext, type PageState } from "@/lib/page";
import { renderHead } from "@/lib/seo";
import { allPaths, matchRoute, prerenderPaths } from "@/routes";

export { prerenderPaths };

export interface RenderResult {
  status: number;
  head: string;
  html: string;
}

export function render(url: string): RenderResult {
  const pathname = new URL(url, "http://localhost").pathname;
  const state: PageState = { pathname };
  const { element, status } = matchRoute(pathname);

  const html = renderToString(
    <StrictMode>
      <PageContext.Provider value={state}>{element}</PageContext.Provider>
    </StrictMode>,
  );

  return { status, head: renderHead(state.seo, pathname), html };
}

const xmlEscape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** sitemap-0.xml (same priorities as the old @astrojs/sitemap config). */
export function sitemap(): string {
  const root = config.site.base_url.replace(/\/$/, "");
  const lastmod = new Date().toISOString();
  const urls = allPaths().map((path) => {
    let priority = 0.7;
    let changefreq = "weekly";
    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (/^\/(services|hrms|crm)(\/|$)/.test(path)) {
      priority = 0.9;
    } else if (/^\/blog\//.test(path)) {
      priority = 0.6;
      changefreq = "monthly";
    }
    const loc = path === "/" ? `${root}/` : `${root}${path}`;
    return `<url><loc>${xmlEscape(loc)}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority.toFixed(1)}</priority></url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`;
}

export function sitemapIndex(): string {
  const root = config.site.base_url.replace(/\/$/, "");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${root}/sitemap-0.xml</loc></sitemap></sitemapindex>`;
}
