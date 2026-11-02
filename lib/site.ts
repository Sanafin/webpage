// Single source of truth for labels, links and identity used across the site.
// Copy that appears in more than one place lives here so it cannot drift.

export const site = {
  name: "Sanafin",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sanafin.tech",
  tagline: "Pay for verified care, from anywhere.",
  title: "Sanafin | Pay for verified care, from anywhere",
  description:
    "Sanafin lets any payer, anywhere, buy verified health outcomes. Insurers, employers and governments commit a capped budget to a care pathway; an independent cost-effectiveness evaluation checks the result against the threshold both sides agreed; payment is released only on a pass. Started with metabolic health in Switzerland. Funds sit with a licensed custody partner, never with Sanafin.",
  // The one-sentence positioning every section is built on.
  positioning:
    "Sanafin lets any payer, anywhere, buy verified health outcomes: the payer commits a capped budget, a provider delivers the care, an independent evaluation verifies the outcome, and payment is released only when it is met. Funds sit with a licensed custody partner, never with Sanafin.",
  doodleUrl: "https://doodle.com/bp/wasumekniran/discover-sanafin",
  linkedin: "https://linkedin.com/company/sanafin",
  careers: "https://wellfound.com/company/sanafin",
  ceo: { name: "Dr. Wasu Mekniran", firstName: "Wasu", title: "CEO" },
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
