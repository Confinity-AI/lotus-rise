// Generate WebP companions for product + trust PNGs (sharp).
// Usage: node scripts/generate-product-webp.mjs

import { readdir, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = join(here, "..", "public", "images");
const DIRS = ["product", "trust"];

async function convertDir(dir) {
  const abs = join(ROOT, dir);
  const files = (await readdir(abs)).filter((f) => f.endsWith(".png"));
  for (const file of files) {
    const src = join(abs, file);
    const dest = join(abs, file.replace(/\.png$/, "@2x.webp"));
    const info = await stat(src);
    await sharp(src)
      .webp({ quality: 82, effort: 4 })
      .toFile(dest);
    const out = await stat(dest);
    console.log(`${dir}/${file} (${info.size}b) -> ${file.replace(/\.png$/, "@2x.webp")} (${out.size}b)`);
  }
}

for (const dir of DIRS) {
  await convertDir(dir);
}

console.log("Done.");
