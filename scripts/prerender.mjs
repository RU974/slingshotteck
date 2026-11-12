// Build step: turns the site into plain static files in dist/.
// Renders every page with the SSR bundle in .ssr/ (built by `npm run build:ssr`)
// and writes it as an .html file:
//   /            -> dist/index.html
//   /about       -> dist/about.html
//   /blog/post   -> dist/blog/post.html
// plus 404.html, redirect pages, sitemap-index.xml and sitemap-0.xml.
// Afterwards the .ssr/ folder is deleted; nothing on the server needs Node.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const outDir = path.join(root, "dist");
const ssrDir = path.join(root, ".ssr");

const { render, prerenderPaths, sitemap, sitemapIndex } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const template = fs.readFileSync(path.join(outDir, "index.html"), "utf-8");
const fill = ({ head, html }) => template.replace("<!--app-head-->", head).replace("<!--app-html-->", html);

const fileFor = (urlPath) => (urlPath === "/" ? "index.html" : `${urlPath.replace(/^\//, "")}.html`);

function write(file, contents) {
  const full = path.join(outDir, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents);
}

let count = 0;
for (const urlPath of [...new Set(prerenderPaths())]) {
  const result = render(urlPath);
  if (result.status !== 200) throw new Error(`Page ${urlPath} rendered with status ${result.status}`);
  write(fileFor(urlPath), fill(result));
  count++;
}

// Not-found page (most hosts serve 404.html automatically; .htaccess points Apache at it).
write("404.html", fill(render("/404")));

// Old URLs that moved. .htaccess sends a real 301 on Apache; these pages cover other hosts.
const redirects = { "/features": "/services", "/elements": "/" };
for (const [from, to] of Object.entries(redirects)) {
  write(
    fileFor(from),
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Redirecting…</title>` +
      `<meta name="robots" content="noindex"><link rel="canonical" href="${to}">` +
      `<meta http-equiv="refresh" content="0; url=${to}"></head>` +
      `<body><a href="${to}">Continue</a></body></html>`,
  );
}

write("sitemap-index.xml", sitemapIndex());
write("sitemap.xml", sitemapIndex());
write("sitemap-0.xml", sitemap());

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`✅ Pre-rendered ${count} pages + 404 into dist/`);
