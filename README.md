# Slingshotteck website

React 19 + Vite, **pre-rendered to a fully static site**. There is no backend:
`npm run build` writes plain HTML, CSS, JS and images to `dist/`, and any web
host can serve that folder (cPanel/Apache, Nginx, Netlify, Vercel, Cloudflare Pages, GitHub Pages…).

Only the contact and lead forms are hydrated as React "islands" in the browser.

Requires **Node.js 22.12 or newer** (only to build, not on the web server).

## Develop

```bash
npm install
npm run dev            # http://localhost:3000 with hot reload
```

## Build & go live

```bash
npm install
npm run build          # -> dist/  (upload the CONTENTS of this folder)
npm run preview        # optional: check the built site at http://localhost:3000
```

Upload everything inside `dist/` (including the hidden `.htaccess` file) to your
site's web root, for example `public_html/` on cPanel.

Page URLs are clean (`/about`, `/blog/my-post`), served from `about.html`, `blog/my-post.html`:

- **cPanel / Apache / LiteSpeed**: works out of the box via the included `.htaccess`
  (clean URLs, 404 page, redirects, `www` redirect, caching, security headers, WebP).
- **Nginx**: point `root` at the `dist` folder and use
  ```nginx
  location / { try_files $uri $uri.html $uri/ =404; }
  error_page 404 /404.html;
  ```
- **Netlify / Vercel / Cloudflare Pages**: build command `npm run build`, output directory `dist`.

## Forms

The contact form and the free-checklist form are sent with
[Web3Forms](https://web3forms.com) (free, no backend):

1. Get an access key at web3forms.com (enter the email that should receive submissions).
2. Paste it into `src/config/config.json` → `params.web3forms_access_key`.
3. Rebuild and upload.

Until a key is set, the forms open the visitor's email app with the message
pre-filled, addressed to `params.footer_email`.

The "Book a Discovery Call" card on the contact page opens a WhatsApp chat
(edit the number/message in `src/content/contact/-index.md`).

## Project layout

```
index.html             HTML template (head/body placeholders)
src/entry-server.tsx   Renders a URL to HTML (+ sitemap) — used at build time
src/entry-client.tsx   Hydrates islands in the browser
src/routes.tsx         URL -> page mapping
src/pages/             Page components
src/layouts/           Base layout, partials (header/footer) and components
src/lib/submitForm.ts  Form sending (Web3Forms / email fallback)
src/content/           Markdown content (edit text here)
src/config/            Site config, menu, social links, theme colours/fonts
src/styles/            Tailwind CSS
public/                Images, videos, robots.txt, .htaccess and DOM scripts (copied as-is)
plugins/               Vite plugins (Markdown loader, image sizes, dev renderer)
scripts/prerender.mjs  Writes every page to dist/*.html + sitemaps
```

Adding a blog post, service or legal page: drop a Markdown file into
`src/content/blog`, `src/content/services` or `src/content/pages`, then rebuild.
It gets its own HTML page and is added to the sitemap automatically.
