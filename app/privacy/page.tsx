import { LegalDoc, type LegalSection } from "@/components/legal-doc"
import { site } from "@/lib/site"

const sections: LegalSection[] = [
  {
    id: "core",
    title: "Data protection at the core",
    body: [
      "We build our platform with privacy-by-design. Personal and commercial data is processed only to the extent necessary to structure, verify, and execute outcome-based healthcare contracts. We are committed to transparency, minimization of data footprints, and maintaining healthcare-grade security.",
    ],
  },
  {
    id: "collect",
    title: "What data we collect",
    items: [
      { term: "Account & profile information", desc: "Names, business email addresses, roles, and institutional affiliations." },
      { term: "Contract & rules metadata", desc: "Target thresholds, timeline boundaries, and logical criteria defining clinical outcome success." },
      { term: "Clinical verification events", desc: "De-identified clinical biomarker feeds, digital health data, or audit-trail inputs uploaded to trigger contract payouts." },
    ],
  },
  {
    id: "why",
    title: "Why we process data",
    items: [
      { term: "Contract execution", desc: "To calculate cost performance, verify clinical milestones, and automatically trigger payout routing." },
      { term: "Auditability & operations", desc: "To maintain immutable history records for payers, providers, and auditors to review outcome performance." },
      { term: "Service improvement", desc: "To optimize behavioral engagement rules and support onboarding or integration requests." },
    ],
  },
  {
    id: "protection",
    title: "How data is protected",
    body: [
      "We secure data using transport-layer encryption (TLS 1.3), encryption-at-rest (AES-256), strict role-based access controls (RBAC), and segmentation between clinical and financial data. All clinical verification events are de-identified at the source whenever possible, ensuring personal health information is not exposed to financial operators.",
    ],
  },
  {
    id: "sharing",
    title: "Data sharing & third parties",
    body: [
      "Sanafin never sells personal or healthcare data. We share data only with the processors needed to run this website and our contracts: Cloudflare (hosting, global network), Doodle (call scheduling) and, where a contract requires it, the licensed custody partner named in that contract. Clinical data is pseudonymised before verification.",
    ],
  },
  {
    id: "rights",
    title: "Your rights",
    body: [
      "Depending on your jurisdiction, you have the right to access, rectify, or delete your personal data processed on our systems. You can manage access permissions for specific clinical integrations through your client dashboard at any time.",
    ],
  },
  {
    id: "contact",
    title: "Privacy contact",
    body: ["For data processing inquiries or to exercise your privacy rights, contact our trust team at:"],
    email: site.contactEmail,
  },
]

export default function PrivacyPage() {
  return (
    <LegalDoc
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="At Sanafin, data protection is a product principle, not just a legal requirement. We design our outcome-based contract systems to prioritize data privacy, security, transparency, and responsible processing at every layer."
      sections={sections}
    />
  )
}
