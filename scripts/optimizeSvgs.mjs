// Recompress raster images embedded as base64 data URIs inside SVGs.
// Usage: node scripts/optimizeSvgs.mjs <file.svg>...
import fs from "node:fs";
import sharp from "sharp";

for (const file of process.argv.slice(2)) {
  const svg = fs.readFileSync(file, "utf8");
  const re = /data:image\/(png|jpe?g|webp);base64,([A-Za-z0-9+/=]+)/g;
  const matches = [...svg.matchAll(re)];
  let out = svg;
  for (const m of matches) {
    const buf = Buffer.from(m[2], "base64");
    const meta = await sharp(buf).metadata();
    const width = Math.min(meta.width ?? 800, 400);
    const webp = await sharp(buf)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();
    out = out.replace(m[0], `data:image/webp;base64,${webp.toString("base64")}`);
  }
  fs.writeFileSync(file, out);
  console.log(file, `${(svg.length / 1e6).toFixed(2)}MB -> ${(out.length / 1e6).toFixed(2)}MB`);
}
