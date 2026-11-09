// Fails the build if public copy contains a word the honesty rules forbid.
// Scope: landing-page components, shared copy modules and fixtures (lib, including
// lib/demo/fixtures.json), the product walkthrough (/demo), the booking page (/call)
// and the private app shell (/app). JSON is scanned because the demo fixtures are
// generated from pipeline exports whose vocabulary is not the site's.
import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { findForbidden } from "./forbidden.mjs"

const ROOTS = ["components", "lib", "app/page.tsx", "app/layout.tsx", "app/demo", "app/call", "app/app"]
const SKIP = [/components\/ui\//]
const EXEMPT = new Set(["lib/site.ts"])

function walk(p, out = []) {
  let st
  try {
    st = statSync(p)
  } catch {
    return out // a root that does not exist yet is not an error
  }
  if (st.isDirectory()) for (const f of readdirSync(p)) walk(join(p, f), out)
  else if (/\.(tsx?|mdx?|json)$/.test(p) && !SKIP.some((r) => r.test(p))) out.push(p)
  return out
}

const files = ROOTS.flatMap((r) => walk(r))
const hits = []
for (const f of files) {
  if (EXEMPT.has(f)) continue
  const lines = readFileSync(f, "utf8").split("\n")
  lines.forEach((line, i) => {
    let from = 0
    for (;;) {
      const hit = findForbidden(line.slice(from))
      if (!hit) break
      const at = from + hit.index
      // Minified JSON is one line; show a window around the match, not the file.
      const window = line.slice(Math.max(0, at - 40), at + hit.match.length + 40).trim()
      hits.push(`${f}:${i + 1}: …${window}…`)
      from = at + hit.match.length
    }
  })
}
if (hits.length) {
  console.error("Forbidden copy found:\n" + hits.join("\n"))
  process.exit(1)
}
console.log(`check-copy: ${files.length} files clean`)
