// Converts the downloaded Higgsfield picks into web-ready files under public/media.
//
//   node scripts/media-import.mjs <folder-with-downloads>
//
// Name each download after its slot (any of .png .jpg .webp .mp4):
//   hero-plate, act-refuses, act-pays, act-tamper, problem, custody, partners,
//   research, og, closing-loop
// Unknown names are skipped and reported. Existing outputs are overwritten.
// After running, set the matching entries in lib/media.ts to the printed paths.

import { existsSync, mkdirSync, readdirSync, statSync, copyFileSync } from "node:fs"
import { extname, join, basename, resolve } from "node:path"
import sharp from "sharp"

const SLOTS = {
  "hero-plate": { out: "public/media/hero-plate.webp", width: 2400, quality: 78, key: "heroPlate" },
  "act-refuses": { out: "public/media/act-refuses.webp", width: 1600, quality: 80, key: "actRefuses" },
  "act-pays": { out: "public/media/act-pays.webp", width: 1600, quality: 80, key: "actPays" },
  "act-tamper": { out: "public/media/act-tamper.webp", width: 1600, quality: 80, key: "actTamper" },
  problem: { out: "public/media/problem-still.webp", width: 1600, quality: 80, key: "problemStill" },
  custody: { out: "public/media/custody-still.webp", width: 1600, quality: 80, key: "custodyStill" },
  partners: { out: "public/media/partners-still.webp", width: 1600, quality: 80, key: "partnersStill" },
  research: { out: "public/media/research-still.webp", width: 1600, quality: 80, key: "researchStill" },
  og: { out: "public/og.jpg", width: 1200, height: 630, jpeg: true, quality: 82, key: null },
  "closing-loop": { out: "public/media/closing-loop.mp4", video: true, key: "closingLoop" },
}

const dir = process.argv[2]
if (!dir || !existsSync(dir)) {
  console.error("usage: node scripts/media-import.mjs <folder-with-downloads>")
  process.exit(1)
}

mkdirSync("public/media", { recursive: true })
const done = []

for (const file of readdirSync(dir)) {
  const slot = basename(file, extname(file)).toLowerCase()
  const spec = SLOTS[slot]
  if (!spec) {
    console.log(`skip   ${file} (no slot named "${slot}")`)
    continue
  }
  const src = resolve(join(dir, file))
  if (spec.video) {
    copyFileSync(src, spec.out)
    const mb = statSync(spec.out).size / 1_048_576
    console.log(`${mb > 1.5 ? "LARGE " : "video "}${spec.out} ${mb.toFixed(2)} MB${mb > 1.5 ? " — re-encode below 1.5 MB before shipping" : ""}`)
  } else {
    let img = sharp(src).rotate()
    img = spec.height ? img.resize(spec.width, spec.height, { fit: "cover", position: "attention" }) : img.resize({ width: spec.width, withoutEnlargement: true })
    img = spec.jpeg ? img.jpeg({ quality: spec.quality, mozjpeg: true }) : img.webp({ quality: spec.quality })
    await img.toFile(spec.out)
    const kb = statSync(spec.out).size / 1024
    console.log(`${kb > 250 ? "LARGE " : "image "}${spec.out} ${kb.toFixed(0)} KB`)
  }
  if (spec.key) done.push([spec.key, "/" + spec.out.replace(/^public\//, "")])
}

if (done.length) {
  console.log("\nlib/media.ts entries:")
  for (const [k, p] of done) console.log(`  ${k}: "${p}",`)
}
