// Builds everything that goes into <head>: title, meta, canonical, Open Graph,
// fonts and JSON-LD structured data.
//   • renderHead()   — full <head> content, written into every pre-rendered page.
//   • applyPageHead() — swaps the page-specific tags after client-side navigation.
import config from "@/config/config.json";
import social from "@/config/social.json";
import theme from "@/config/theme.json";
import { plainify } from "@/lib/utils/textConverter";
import type { SeoProps } from "@/types";

const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** JSON for <script type="application/ld+json">, safe against "</script>". */
export const jsonLd = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");

const meta = (attr: "name" | "property", key: string, content?: string) =>
  content ? `<meta ${attr}="${esc(key)}" content="${esc(content)}" />` : "";

function googleFontsUrl() {
  const families = Object.entries(theme.fonts.font_family)
    .filter(([key]) => !key.includes("_type"))
    .map(([, value]) => `family=${value}`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

const toIso = (d?: Date | string) => (d ? new Date(d).toISOString() : undefined);

function pageHeadTags(seo: SeoProps = {}, pathname = "/"): string[] {
  const {
    title,
    meta_title,
    description,
    image,
    noindex,
    canonical,
    type = "website",
    date,
    updated,
    author,
    schema,
    breadcrumbs,
  } = seo;

  const siteUrl = config.site.base_url.replace(/\/$/, "");
  const brand = config.site.title;
  const path = pathname.replace(/\/$/, "") || "/";
  const canonicalUrl = canonical ?? `${siteUrl}${path === "/" ? "/" : path}`;
  const rawTitle = plainify(meta_title ? meta_title : title ? title : brand).trim();
  // Append brand once, keep titles readable in SERPs.
  const pageTitle =
    path === "/" || rawTitle.toLowerCase().includes(brand.toLowerCase())
      ? rawTitle
      : `${rawTitle} | ${brand}`;
  const pageDescription = plainify(
    description ? description : config.metadata.meta_description,
  ).trim();
  const imagePath = image ? image : config.metadata.meta_image;
  const ogImage = imagePath.startsWith("http") ? imagePath : `${siteUrl}${imagePath}`;
  const org: Record<string, any> = (config as any).organization ?? {};
  const sameAs = (social.main as { link: string }[])
    .map((s) => s.link)
    .filter((l) => l && l.trim() !== "")
    .concat(org.same_as ?? []);

  const orgId = `${siteUrl}/#organization`;
  const organization: Record<string, any> = {
    "@type": "Organization",
    "@id": orgId,
    name: brand,
    legalName: org.legal_name ?? brand,
    alternateName: org.alternate_names ?? [],
    url: `${siteUrl}/`,
    logo: { "@type": "ImageObject", url: `${siteUrl}/images/slingshot-logo.png` },
    image: `${siteUrl}${config.metadata.meta_image}`,
    description: config.metadata.meta_description,
    email: config.params.footer_email,
    telephone: config.params.footer_phone,
    foundingDate: org.founding_date,
    founder: org.founder
      ? {
          "@type": "Person",
          "@id": `${siteUrl}/about#founder`,
          name: org.founder,
          jobTitle: org.founder_title,
          ...(org.founder_linkedin && !org.founder_linkedin.includes("REPLACE")
            ? { sameAs: [org.founder_linkedin] }
            : {}),
        }
      : undefined,
    address: org.address
      ? {
          "@type": "PostalAddress",
          ...(org.address.street ? { streetAddress: org.address.street } : {}),
          addressLocality: org.address.locality,
          addressRegion: org.address.region,
          ...(org.address.postal_code ? { postalCode: org.address.postal_code } : {}),
          addressCountry: org.address.country,
        }
      : undefined,
    areaServed: (org.area_served ?? []).map((a: string) =>
      a === "Worldwide"
        ? { "@type": "Place", name: "Worldwide" }
        : { "@type": "Country", name: a },
    ),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: config.params.footer_email,
        telephone: config.params.footer_phone,
        availableLanguage: ["English", "Urdu"],
        areaServed: ["GB", "US", "PK"],
      },
    ],
    knowsAbout: [
      "Custom software development",
      "SaaS development",
      "ERP development",
      "HRMS software",
      "CRM software",
      "Managed IT services",
      "Network security",
      "Firewall configuration",
      "Penetration testing",
      "Cloud migration",
      "AWS",
      "Microsoft Azure",
      "IT consulting",
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: brand,
    alternateName: org.alternate_names ?? [],
    publisher: { "@id": orgId },
    inLanguage: "en",
  };

  const webpage: Record<string, any> = {
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: pageTitle,
    description: pageDescription,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": orgId },
    primaryImageOfPage: { "@type": "ImageObject", url: ogImage },
    inLanguage: "en",
  };

  // Breadcrumbs: explicit list, or derived from the URL path.
  let crumbs = breadcrumbs;
  if (!crumbs && path !== "/") {
    const parts = path.split("/").filter(Boolean);
    crumbs = parts.map((part, i) => ({
      name:
        i === parts.length - 1
          ? plainify(title ?? part)
          : part.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      url: `/${parts.slice(0, i + 1).join("/")}`,
    }));
  }
  const breadcrumbSchema =
    crumbs && crumbs.length
      ? {
          "@type": "BreadcrumbList",
          "@id": `${canonicalUrl}#breadcrumb`,
          itemListElement: [{ name: "Home", url: "/" }, ...crumbs].map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: `${siteUrl}${c.url === "/" ? "/" : c.url}`,
          })),
        }
      : null;
  if (breadcrumbSchema) webpage.breadcrumb = { "@id": breadcrumbSchema["@id"] };

  const extra = schema ? (Array.isArray(schema) ? schema : [schema]) : [];
  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website, webpage, breadcrumbSchema, ...extra].filter(Boolean),
  };

  const published = type === "article" ? toIso(date) : undefined;
  const modified = type === "article" ? toIso(updated ?? date) : undefined;

  return [
    `<title>${esc(pageTitle)}</title>`,
    meta("name", "description", pageDescription),
    `<link rel="canonical" href="${esc(canonicalUrl)}" />`,
    meta(
      "name",
      "robots",
      noindex
        ? "noindex,follow"
        : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    ),
    meta("name", "author", author ?? config.metadata.meta_author),
    // Open Graph / social
    meta("property", "og:type", type),
    meta("property", "og:site_name", brand),
    meta("property", "og:locale", "en_GB"),
    meta("property", "og:title", pageTitle),
    meta("property", "og:description", pageDescription),
    meta("property", "og:url", canonicalUrl),
    meta("property", "og:image", ogImage),
    meta("property", "og:image:alt", pageTitle),
    meta("property", "article:published_time", published),
    meta("property", "article:modified_time", modified),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", pageTitle),
    meta("name", "twitter:description", pageDescription),
    meta("name", "twitter:image", ogImage),
    // Structured data (Organization, WebSite, WebPage, Breadcrumbs + page schema)
    `<script type="application/ld+json">${jsonLd(graph)}</script>`,
  ].filter(Boolean);
}

/** Tags that are the same on every page. */
function siteHeadTags(): string[] {
  const gtm = config.google_tag_manager;
  return [
    gtm.enable
      ? `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${esc(gtm.gtm_id)}');</script>`
      : "",
    `<link rel="icon" href="/favicon.ico" sizes="any" />`,
    `<link rel="icon" type="image/png" href="${esc(config.site.favicon)}" />`,
    `<link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />`,
    `<link rel="sitemap" type="application/xml" href="/sitemap-index.xml" />`,
    `<link rel="alternate" type="text/plain" title="LLM summary" href="/llms.txt" />`,
    meta("name", "theme-color", "#000000"),
    `<link rel="preconnect" href="https://fonts.googleapis.com" />`,
    `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`,
    `<link rel="stylesheet" href="${esc(googleFontsUrl())}" />`,
  ].filter(Boolean);
}

// Comment markers around the page-specific tags, so the browser can find and replace them.
const START = "page-head";
const END = "/page-head";

/** Everything that goes into <head> for one page (used when pre-rendering). */
export function renderHead(seo: SeoProps = {}, pathname = "/"): string {
  return [...siteHeadTags(), `<!--${START}-->`, ...pageHeadTags(seo, pathname), `<!--${END}-->`].join("\n    ");
}

/** Browser only: replace the page-specific <head> tags after a client-side navigation. */
export function applyPageHead(seo: SeoProps = {}, pathname = "/") {
  const head = document.head;
  const nodes = [...head.childNodes];
  const start = nodes.find((n) => n.nodeType === Node.COMMENT_NODE && n.nodeValue === START);
  const end = nodes.find((n) => n.nodeType === Node.COMMENT_NODE && n.nodeValue === END);
  if (!start || !end) return;

  const html = pageHeadTags(seo, pathname).join("");
  // Skip the work if nothing changed (e.g. the first render after hydration).
  let current = "";
  for (let n = start.nextSibling; n && n !== end; n = n.nextSibling) {
    if (n.nodeType === Node.ELEMENT_NODE) current += (n as Element).outerHTML;
  }
  const template = document.createElement("template");
  template.innerHTML = html;
  const next = [...template.content.childNodes].map((n) => (n as Element).outerHTML ?? "").join("");
  if (current === next) return;

  while (start.nextSibling && start.nextSibling !== end) start.nextSibling.remove();
  end.parentNode!.insertBefore(template.content, end);
}
