// Single source of truth for labels, links and identity used across the site.
// Copy that appears in more than one place lives here so it cannot drift.

export const site = {
  name: "Sanafin",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sanafin.tech",
  tagline: "Outcome-based payment for digital health.",
  title: "Sanafin | Outcome-based payment for digital health",
  description:
    "Sanafin lets insurers, employers and hospitals fund a digital health outcome before it happens, verifies the result against Swiss WZW criteria and instructs settlement when the agreed threshold is met. Funds sit with a licensed custody partner, never with Sanafin.",
  // The one-sentence positioning every section is built on.
  positioning:
    "Sanafin lets a funder commit money to a health outcome before it happens, verifies the result against Swiss WZW criteria, and instructs settlement the moment the agreed threshold is met. Funds sit with a licensed custody partner, never with Sanafin.",
  doodleUrl: "https://doodle.com/bp/wasumekniran/discover-sanafin",
  linkedin: "https://linkedin.com/company/sanafin",
  careers: "https://wellfound.com/company/sanafin",
  ceo: { name: "Wasu Mekniran", firstName: "Wasu", title: "CEO" },
  // Public address, also on the imprint. Deck requests and contact go here.
  contactEmail: "hello@sanafin.tech",
  // Owner input: legal entity, street and UID replace this line when supplied.
  legalLine: "Sanafin · Switzerland",
} as const

// Exactly two calls to action exist on the site. Never introduce a third label.
export const CTA = {
  buyer: "Book a discovery call",
  investor: "Request the deck",
} as const

// Words that must never appear in public copy. Enforced by scripts/check-copy.mjs.
export const FORBIDDEN_COPY = [
  "escrow",
  "blockchain",
  "EVM",
  "smart contract",
  "CHF 1.5",
  "TAM",
  "guarantee",
  "real-time",
  "Backed by",
  "HIPAA",
  "SOC 2",
] as const
