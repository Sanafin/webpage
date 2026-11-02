import { LegalDoc, type LegalSection } from "@/components/legal-doc"
import { site } from "@/lib/site"

const sections: LegalSection[] = [
  {
    id: "using-sanafin",
    title: "Using Sanafin",
    body: [
      "Sanafin provides SaaS infrastructure to structure, deploy, and automate outcome-based healthcare contracts. Our platform combines outcome verification, contract logic and settlement instructions so that funders, manufacturers and care teams can execute outcome-conditional agreements. Funds committed under such agreements are held by a licensed custody partner, never by Sanafin.",
    ],
  },
  {
    id: "access",
    title: "Account & access rules",
    items: [
      { term: "Authorized credentials", desc: "Users must maintain the confidentiality of all system credentials and API tokens." },
      { term: "Access scope", desc: "Platform access is granted solely to configure contracts, integrate clinical data sources, and review verification and settlement records." },
    ],
  },
  {
    id: "responsibilities",
    title: "User responsibilities",
    items: [
      { term: "Accurate thresholds", desc: "Customers are responsible for specifying correct clinical metrics and verification logic in contract models." },
      { term: "Lawful data sourcing", desc: "You must ensure all digital health data, laboratory results, or clinical evidence feeds are legally obtained." },
    ],
  },
  {
    id: "security",
    title: "Security infrastructure",
    body: ["We secure customer systems and data through institutional-grade controls:"],
    items: [
      { term: "End-to-end encryption", desc: "All data is encrypted in transit using TLS 1.3 and at rest with AES-256 keys." },
      { term: "Role-based access (RBAC)", desc: "Strict authentication rules govern access to contract rules, settlement records, and API credentials." },
      { term: "De-identification sinks", desc: "Clinical biomarker feeds are pseudonymized at the integration source to protect privacy." },
    ],
  },
  {
    id: "compliance",
    title: "Compliance & governance",
    body: ["Our governance framework is aligned with leading national and global standards:"],
    items: [
      { term: "Regulatory alignment", desc: "Designed to meet the requirements of the Swiss Federal Act on Data Protection (FADP) and the GDPR." },
      { term: "Swiss legal principles", desc: "Conditional commitments and contract triggers are modelled to reflect the Swiss Code of Obligations." },
      { term: "Audit-ready logs", desc: "Platform activity logs are designed for institutional SOC-2 compliance audits." },
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: [
      "You agree not to bypass security configurations, introduce malicious code, reverse-engineer the contract execution compiler, or attempt to manipulate verification events. Any suspicious activity will result in immediate API suspension.",
    ],
  },
  {
    id: "risk",
    title: "Risk management & fallbacks",
    body: [
      "We mitigate operational risks through clear contract safety valves and automated fallbacks. Every outcome-based contract structured on Sanafin includes explicit parameters to manage edge cases:",
    ],
    items: [
      { term: "Exception paths", desc: "Predefined logic handles missing data feeds, client dropouts, or temporary connection issues without locking funds." },
      { term: "Oracle fallbacks", desc: "If primary digital health validation sources fail, secure human-review checkpoints resolve clinical disputes." },
      { term: "Custody of funds", desc: "Funds are routed only upon verified outcome confirmation, preventing unauthorized or early payout release." },
    ],
  },
  {
    id: "payment",
    title: "Payment & custody terms",
    body: [
      "Platform fees are defined in executed Statements of Work (SOW) or Order Forms. Funds committed under an outcome-conditional contract are held by a licensed custody partner and are released or returned only according to the verified contract criteria. Sanafin is not a bank or payment institution and does not hold client funds.",
    ],
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: [
      "Sanafin owns all proprietary software, databases, API designs, and interfaces. Open-source specifications, including the EDEN framework schema, are licensed separately under their respective MIT/standard open licenses.",
    ],
  },
  {
    id: "verification",
    title: "Verification transparency",
    body: [
      "Transparency is key to eliminating disputes. Sanafin publishes the mathematical algorithms used to verify outcomes and calculate time-value thresholds under the open-source EDEN framework. Payers and providers can inspect and run independent tests on the validation scripts to confirm correctness before deploying them to production.",
    ],
  },
  {
    id: "liability",
    title: "Limitations of liability",
    body: [
      "Sanafin is a software provider and is not a party to clinical treatment outcomes or care decisions. We do not provide medical or clinical advisory. To the maximum extent permitted by law, Sanafin is not liable for indirect, incidental, or consequential damages resulting from clinical data inaccuracies or verification source failures.",
    ],
  },
  {
    id: "termination",
    title: "Termination",
    body: [
      "Either party may terminate platform access in accordance with SOW agreements. Upon termination, committed funds are released or returned by the custody partner according to the final verified contract status in the audit record.",
    ],
  },
  {
    id: "contact",
    title: "Contact & inquiries",
    body: ["For legal inquiries, terms compliance, or data security documentation, contact:"],
    email: site.contactEmail,
  },
]

export default function TermsPage() {
  return (
    <LegalDoc
      eyebrow="Agreement & trust"
      title="Terms of Service & Compliance"
      intro="These terms define the service boundaries, regulatory compliance frameworks, and trust standards between Sanafin and our enterprise partners."
      sections={sections}
    />
  )
}
