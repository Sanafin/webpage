// Fails the build if public copy contains a word the honesty rules forbid.
// Scope: landing-page components, shared copy modules and the demo page.
import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"

const FORBIDDEN = [/\bescrow/i, /blockchain/i, /\bEVM\b/, /smart contract/i, /CHF 1\.5/, /\bTAM\b/, /guarantee/i, /real-time/i, /Backed by/, /HIPAA/, /SOC ?2\b/]
const ROOTS = ["components", "lib", "app/page.tsx", "app/demo", "app/layout.tsx"]
const SKIP = [/components\/ui\//]

function walk(p, out = []) {
  const st = statSync(p)
  if (st.isDirectory()) for (const f of readdirSync(p)) walk(join(p, f), out)
  else if (/\.(tsx?|mdx?)$/.test(p) && !SKIP.some((r) => r.test(p))) out.push(p)
  return out
}

const files = ROOTS.flatMap((r) => walk(r))
const hits = []
for (const f of files) {
  const lines = readFileSync(f, "utf8").split("\n")
  lines.forEach((line, i) => {
    // The forbidden list itself lives in lib/site.ts and the gate
    if (f === "lib/site.ts" || f === "scripts/check-copy.mjs") return
    for (const re of FORBIDDEN) if (re.test(line)) hits.push(`${f}:${i + 1}: ${line.trim()}`)
  })
}
if (hits.length) {
  console.error("Forbidden copy found:\n" + hits.join("\n"))
  process.exit(1)
}
console.log(`check-copy: ${files.length} files clean`)
