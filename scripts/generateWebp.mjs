// Post-build step: writes a .webp copy next to every PNG/JPEG in
// dist/images (e.g. hero.png -> hero.png.webp). public/.htaccess serves the
// .webp automatically (on Apache) to browsers that support it, so pages keep using the
// original URLs. Safe to skip: if sharp is unavailable the site still works.
import fs from "node:fs";
import path from "node:path";

const dir = path.resolve("dist/images");

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn("⚠️  sharp is not installed — skipping WebP generation.");
  process.exit(0);
}

function* walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

if (!fs.existsSync(dir)) process.exit(0);

let count = 0;
let saved = 0;
for (const file of walk(dir)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  try {
    const before = fs.statSync(file).size;
    const buf = await sharp(file).webp({ quality: 80 }).toBuffer();
    // Only keep the WebP if it is actually smaller.
    if (buf.length < before) {
      fs.writeFileSync(`${file}.webp`, buf);
      count++;
      saved += before - buf.length;
    }
  } catch (err) {
    console.warn(`Could not convert ${file}: ${err.message}`);
  }
}
console.log(`✅ WebP: ${count} images, ${(saved / 1024 / 1024).toFixed(1)} MB saved`);
