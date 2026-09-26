// HEAD-checks every linked source in lib/sources.ts. Run manually before release.
import { readFileSync } from "node:fs"
const src = readFileSync("lib/sources.ts", "utf8")
const urls = [...src.matchAll(/href: "([^"]+)"/g)].map((m) => m[1])
let bad = 0
for (const u of urls) {
  try {
    const r = await fetch(u, { method: "GET", redirect: "follow", headers: { "user-agent": "Mozilla/5.0 (source check)" } })
    console.log(r.status, u)
    if (r.status >= 400) bad++
  } catch (e) {
    console.log("ERR", u, e.message)
    bad++
  }
}
process.exit(bad ? 1 : 0)
