// Vite plugin: exposes `virtual:image-sizes`, a map of every image in
// public/images to its intrinsic [width, height]. The <ImageMod> component
// uses it to emit width/height attributes (prevents layout shift), which is
// what Astro's <Image> used to do automatically.
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

const VIRTUAL_ID = "virtual:image-sizes";
const RESOLVED_ID = "\0" + VIRTUAL_ID;
const EXT = /\.(png|jpe?g|gif|webp|avif|svg)$/i;

function scan(publicDir) {
  const root = path.join(publicDir, "images");
  const sizes = {};
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (EXT.test(entry.name)) {
        try {
          const { width, height } = imageSize(fs.readFileSync(full));
          if (width && height) {
            const url = "/" + path.relative(publicDir, full).split(path.sep).join("/");
            sizes[url] = [width, height];
          }
        } catch {
          // Unreadable image: skip it, the component falls back to no size.
        }
      }
    }
  };
  walk(root);
  return sizes;
}

export default function imageSizes() {
  let publicDir = path.resolve("public");
  return {
    name: "slingshot-image-sizes",
    configResolved(config) {
      if (config.publicDir) publicDir = config.publicDir;
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id === RESOLVED_ID) {
        return `export default ${JSON.stringify(scan(publicDir))};`;
      }
    },
  };
}
