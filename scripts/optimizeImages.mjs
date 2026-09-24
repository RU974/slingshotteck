// Recompress large PNG/JPG files in public/images in place (same format, same path).
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const MIN_BYTES = 250 * 1024;
const MAX_WIDTH = 1600;

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

for (const file of walk("public/images")) {
  const ext = path.extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;
  const before = fs.statSync(file).size;
  if (before < MIN_BYTES) continue;
  const img = sharp(file).resize({ width: MAX_WIDTH, withoutEnlargement: true });
  const buf = ext === ".png"
    ? await img.png({ compressionLevel: 9, palette: true, quality: 85 }).toBuffer()
    : await img.jpeg({ quality: 78, mozjpeg: true }).toBuffer();
  if (buf.length < before * 0.9) {
    fs.writeFileSync(file, buf);
    console.log(file, `${(before / 1024) | 0}KB -> ${(buf.length / 1024) | 0}KB`);
  }
}
