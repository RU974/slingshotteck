import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import devSsr from "./plugins/devSsr.js";
import imageSizes from "./plugins/imageSizes.js";
import markdown from "./plugins/markdown.js";

const src = (p: string) => fileURLToPath(new URL(`./src/${p}`, import.meta.url));

export default defineConfig({
  plugins: [markdown(), imageSizes(), react(), tailwindcss(), devSsr()],
  appType: "custom",
  resolve: {
    alias: [
      { find: /^@\/components\//, replacement: src("layouts/components/") },
      { find: /^@\/helpers\//, replacement: src("layouts/helpers/") },
      { find: /^@\/partials\//, replacement: src("layouts/partials/") },
      { find: /^@\//, replacement: src("") },
    ],
  },
  server: { port: 3000 },
  preview: { port: 3000 },
  build: {
    // Static site output. The SSR bundle used for pre-rendering goes to .ssr/ (deleted after the build).
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: "assets",
  },
});
