// Vite plugin (dev only): renders pages on the fly while you run `npm run dev`,
// so the dev server shows the same HTML that `npm run build` writes to dist/.
import fs from "node:fs";
import path from "node:path";

export default function devSsr() {
  return {
    name: "dev-ssr",
    // `npm run preview`: serve dist/ like a static host does (/about -> about.html, 404.html).
    configurePreviewServer(server) {
      const outDir = path.resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((req, res, next) => {
        const pathname = decodeURIComponent((req.url || "/").split("?")[0]);
        if (path.extname(pathname)) return next();
        const file = pathname === "/" ? "index.html" : `${pathname.replace(/\/+$/, "")}.html`;
        const full = path.join(outDir, file);
        if (full.startsWith(outDir) && fs.existsSync(full)) {
          req.url = "/" + file;
          return next();
        }
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(fs.readFileSync(path.join(outDir, "404.html")));
      });
    },
    configureServer(server) {
      // Returned function runs after Vite's own middlewares (assets, /src, /public files).
      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (req.method !== "GET" && req.method !== "HEAD") return next();
          const url = req.originalUrl || req.url || "/";
          const pathname = url.split("?")[0];
          // Leave real files (with an extension) to Vite.
          if (path.extname(pathname) && !pathname.endsWith(".html")) return next();
          try {
            const raw = fs.readFileSync(path.resolve(server.config.root, "index.html"), "utf-8");
            const template = await server.transformIndexHtml(url, raw);
            const { render } = await server.ssrLoadModule("/src/entry-server.tsx");
            const { status, head, html } = render(pathname.replace(/\.html$/, "").replace(/\/index$/, "/"));
            res.statusCode = status;
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(template.replace("<!--app-head-->", head).replace("<!--app-html-->", html));
          } catch (err) {
            server.ssrFixStacktrace(err);
            next(err);
          }
        });
      };
    },
  };
}
