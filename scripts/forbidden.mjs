// Words that must never appear in public copy. One list, two consumers:
// scripts/check-copy.mjs (the prebuild gate) and scripts/build-demo-fixtures.mjs
// (which rewrites pipeline exports before they enter the repo). lib/site.ts keeps a
// human-readable copy of the same list for the site itself.
export const FORBIDDEN = [
  /\bescrow/i,
  /blockchain/i,
  /\bEVM\b/,
  /smart contract/i,
  /CHF 1\.5/,
  /\bTAM\b/,
  /guarantee/i,
  /real-time/i,
  /Backed by/,
  /HIPAA/,
  /SOC ?2\b/,
]

// First forbidden match in a string, or null.
export function findForbidden(text) {
  for (const re of FORBIDDEN) {
    const m = re.exec(text)
    if (m) return { re, index: m.index, match: m[0] }
  }
  return null
}
