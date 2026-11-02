// One illustrative dataset, used by the hero preview, the three acts, the product
// tiles and the example contracts, so the numbers agree everywhere. Every value is
// synthetic and every surface that shows it says so.

export const example = {
  programme: "Type 2 diabetes digital programme",
  funder: "Supplementary insurer",
  manufacturer: "Digital diabetes programme",
  cohort: 100,
  committed: "CHF 180,000",
  duration: "12 months",
  // WZW composite score out of 100 and the pre-agreed release cut-off
  cutoff: 75,
  threshold: { label: "HbA1c reduction", value: "≥ 0.5 pp at month 6" },
  // HbA1c (%) over six months, ending below the contract target
  trend: [7.6, 7.5, 7.4, 7.25, 7.15, 7.0, 6.95],
  baseline: 7.6,
  target: 7.1,
  delta: "−0.65 pp",
  milestones: [
    { label: "Month 6 · HbA1c threshold", amount: "CHF 60,000", status: "Released" },
    { label: "Month 12 · sustained", amount: "CHF 90,000", status: "Held" },
    { label: "Adherence bonus", amount: "CHF 30,000", status: "Held" },
  ],
  sources: ["Care app", "Lab HbA1c", "CGM", "EHR · FHIR R4"],
} as const

// The three-act demo, told with the same cohort. Figures are synthetic.
export const acts = [
  {
    id: "refuses",
    number: "01",
    title: "First, it refuses to pay.",
    lead: "The cohort misses the pre-agreed threshold.",
    body: "One hundred patients, CHF 180,000 committed before the first enrolment. The composite comes in at 29 against a cut-off of 75. Nothing is released; the money returns to the payer.",
    rows: [
      ["Wirksamkeit", "54 / 100"],
      ["Zweckmässigkeit", "34 / 100"],
      ["Wirtschaftlichkeit", "0 / 100"],
      ["Composite", "29 / 100 · insufficient"],
      ["Released to provider", "CHF 0"],
      ["Returned to payer", "CHF 180,000"],
    ],
    tone: "ink",
  },
  {
    id: "pays",
    number: "02",
    title: "Then it pays, in one block.",
    lead: "Same contract, same cut-off. Only the patients changed.",
    body: "The composite reaches 99. The payer knows the amount the moment the last patient is measured. The provider gets one payment instruction with a fingerprint its auditor can keep.",
    rows: [
      ["Composite", "99 / 100 · meets WZW"],
      ["Average HbA1c change", "−1.3 pp"],
      ["Verdict", "Threshold met"],
      ["Released to provider", "CHF 180,000"],
      ["Time from last measurement", "about a second"],
    ],
    tone: "orange",
  },
  {
    id: "tamper",
    number: "03",
    title: "Then it catches us tampering.",
    lead: "One value in a hundred, edited by 0.1.",
    body: "Same verdict, same score, different fingerprint. Anyone with the exported file can re-run the check on their own machine. Neither side has to trust us.",
    rows: [
      ["Verdict matches", "true"],
      ["Composite matches", "true"],
      ["Audit hash matches", "false"],
      ["Certificate", "7aaa8b48…"],
      ["Recomputed", "d9b10fb1…"],
    ],
    tone: "teal",
  },
] as const

// Example contract designs. Illustrative structures, not customer data; thresholds
// are footnoted to clinical references where one exists.
export const contracts = [
  {
    id: "t2d",
    name: "Type 2 diabetes screening",
    population: "1,000 adults at risk, screened digitally",
    duration: "12 months",
    committed: "CHF 180,000",
    sources: ["Screening app", "Lab HbA1c", "EHR · FHIR R4"],
    targets: [
      { label: "Screening completed", threshold: "≥ 60% of invited by month 3" },
      { label: "HbA1c reduction in confirmed cases", threshold: "≥ 0.5 pp at month 6" },
      { label: "Remission (optional bonus)", threshold: "HbA1c < 6.5% for ≥ 3 months off medication", sourceId: "ada-remission" },
    ],
    milestones: [
      { text: "Month 6", amount: "CHF 60,000" },
      { text: "Month 12", amount: "CHF 90,000" },
      { text: "Adherence bonus", amount: "CHF 30,000" },
    ],
  },
  {
    id: "weight",
    name: "Weight management",
    population: "800 patients on GLP-1 therapy with digital support",
    duration: "16 weeks",
    committed: "CHF 120,000",
    sources: ["Smart scales", "Adherence tracker", "Telehealth"],
    targets: [
      { label: "Weight loss", threshold: "≥ 5% at week 16", sourceId: "wegovy" },
      { label: "GLP-1 adherence", threshold: "≥ 85%" },
    ],
    milestones: [
      { text: "Week 8", amount: "CHF 30,000" },
      { text: "Week 16", amount: "CHF 60,000" },
      { text: "Adherence bonus", amount: "CHF 30,000" },
    ],
  },
  {
    id: "prevention",
    name: "Diabetes prevention",
    population: "1,000 people with HbA1c 5.7–6.4%",
    duration: "6 months",
    committed: "CHF 250,000",
    sources: ["Lab results", "Wearables", "Coaching"],
    targets: [
      { label: "HbA1c reduction", threshold: "≥ 0.5 pp" },
      { label: "Weight loss", threshold: "≥ 5%" },
    ],
    milestones: [
      { text: "Month 3", amount: "CHF 80,000" },
      { text: "Month 6", amount: "CHF 120,000" },
      { text: "Weight-loss bonus", amount: "CHF 50,000" },
    ],
  },
] as const
