// One-shot processor for the Gold Explosion sequence.
// Reads the source JPGs, keys out the near-white studio background
// using a pixel-by-pixel lightness+saturation test (preserves bright
// in-nugget highlights — only truly bg-like pixels get fully
// transparent), resizes to max 1200px wide, encodes as WebP with
// alpha, and writes gold_NNNN.webp into public/gold-sequence/.

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = "C:/Users/tumai/Downloads/Gold Explosion";
const DST_DIR = "C:/dev/capital-unique-website/public/gold-sequence";
const MAX_WIDTH = 1200;
const WEBP_QUALITY = 80;
const ALPHA_QUALITY = 80;

// Background-keying thresholds (tuned for this studio shot — off-white
// bg, warm gold subject).
//   FULLY_BG_L  = lightness above which a pixel is definitely bg
//   FADE_BG_L   = lightness above which we start fading toward transparent
//   MAX_SAT     = chroma below which a pixel counts as "near-grey" (bg)
const FULLY_BG_L = 240;
const FADE_BG_L = 215;
const MAX_SAT_BG = 18;

async function processFile(srcPath, dstPath, frameNumber) {
  // 1) Resize + read raw RGB pixels.
  const { data: rgb, info } = await sharp(srcPath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info; // channels === 3
  const pixelCount = width * height;
  const alpha = Buffer.alloc(pixelCount);

  // 2) Compute an alpha mask from lightness + saturation.
  for (let i = 0; i < pixelCount; i++) {
    const r = rgb[i * channels];
    const g = rgb[i * channels + 1];
    const b = rgb[i * channels + 2];
    const L = (r + g + b) / 3;
    const sat = Math.max(r, g, b) - Math.min(r, g, b);

    if (L >= FULLY_BG_L && sat <= MAX_SAT_BG) {
      // Definitely background.
      alpha[i] = 0;
    } else if (L >= FADE_BG_L && sat <= MAX_SAT_BG + 12) {
      // Soft transition zone — fade alpha by how close to "pure bg".
      const lScore = (L - FADE_BG_L) / (FULLY_BG_L - FADE_BG_L); // 0..1
      const sScore = 1 - sat / (MAX_SAT_BG + 12); // 0..1
      const t = Math.min(1, Math.max(0, lScore * 0.7 + sScore * 0.3));
      alpha[i] = Math.round((1 - t) * 255);
    } else {
      alpha[i] = 255;
    }
  }

  // 3) Combine RGB + alpha and encode as WebP.
  await sharp(rgb, { raw: { width, height, channels: 3 } })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .webp({ quality: WEBP_QUALITY, alphaQuality: ALPHA_QUALITY, effort: 5 })
    .toFile(dstPath);

  const { size } = await fs.stat(dstPath);
  return { width, height, sizeKB: Math.round(size / 1024), frame: frameNumber };
}

async function main() {
  await fs.mkdir(DST_DIR, { recursive: true });
  const all = (await fs.readdir(SRC_DIR))
    .filter((f) => /^ezgif-frame-\d+\.jpe?g$/i.test(f))
    .sort(); // alphabetical = numeric since zero-padded
  console.log(`Found ${all.length} source frames.`);

  let totalKB = 0;
  for (let i = 0; i < all.length; i++) {
    const src = path.join(SRC_DIR, all[i]);
    const num = String(i + 1).padStart(4, "0");
    const dst = path.join(DST_DIR, `gold_${num}.webp`);
    const r = await processFile(src, dst, num);
    totalKB += r.sizeKB;
    console.log(
      `  gold_${num}.webp  ${r.width}x${r.height}  ${r.sizeKB} KB`
    );
  }
  console.log(`\nWrote ${all.length} frames, total ${totalKB} KB.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
