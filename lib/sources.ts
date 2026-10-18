// Footnote registry. Every figure on the site points at one of these entries via
// <Fn id="…" />. The registry order does not matter: footnote numbers come from
// `cited` below, which lists the sources in the order they appear on the page, and
// the footer's "Notes & sources" renders that same list, so numbering cannot drift.

export type Source = {
  id: string
  label: string
  // A source without a link is an owner-supplied fact awaiting its citation and
  // renders as such. Keep these rare.
  href?: string
  note?: string
}

export const sources: Source[] = [
  {
    id: "direct-trial",
    label: "DiRECT trial, UK primary care: 68 of 149 participants (46%) in type 2 diabetes remission at 12 months on a formula-diet weight-management programme (Lean et al., Lancet 2018; Lancet Diabetes Endocrinol 2019). Swiss basic insurance pays per service (TARDOC) and per pack (FOPH list of specialities)",
    href: "https://doi.org/10.1016/S0140-6736(17)33102-1",
  },
  {
    id: "okp-premiums",
    label: "FOPH — average monthly basic-insurance premium CHF 128 in 1996 (statistics of mandatory health insurance) and CHF 412 for 2027 (press release of 29 September 2026); 3.2× over the period, still paid per service",
    href: "https://www.bag.admin.ch/bag/de/home/versicherungen/krankenversicherung/krankenversicherung-versicherer-aufsicht/praemien.html",
  },
  {
    id: "idf-atlas",
    label: "International Diabetes Federation, IDF Diabetes Atlas, 11th edition (2025): diabetes accounted for USD 1.015 trillion of health expenditure in 2024, 12% of global health expenditure, adults aged 20–79",
    href: "https://diabetesatlas.org/",
  },
  {
    id: "sgb5-134",
    label: "§ 134 SGB V — from 1 January 2026 at least 20% of a DiGA's reimbursement price must depend on measured performance",
    href: "https://www.gesetze-im-internet.de/sgb_5/__134.html",
  },
  {
    id: "bfarm-digig",
    label: "BfArM — DiGA guidance under the Digital Act (DigiG); performance-linked price components apply to new agreements from 1 July 2026",
    href: "https://www.bfarm.de/DE/Medizinprodukte/Aufgaben/DiGA-und-DiPA/DiGA/_node.html",
  },
  {
    id: "diga-report",
    label: "GKV-Spitzenverband, DiGA-Bericht 2025 (reporting period to 31 Dec 2025): EUR ~400 m paid since 2020, 74 products admitted, 48 permanently listed, 16 struck off, 59% average negotiated price reduction",
    href: "https://www.gkv-spitzenverband.de/krankenversicherung/digitalisierung/kv_diga/diga.jsp",
  },
  {
    id: "sgb5-139e",
    label: "§ 139e SGB V — removal after a failed trial period; no repeat provisional admission",
    href: "https://www.gesetze-im-internet.de/sgb_5/__139e.html",
  },
  {
    id: "migel-40",
    label: "FOPH — Mittel- und Gegenständeliste (MiGeL); amendment to Anhang 2 KLV of 2 December 2025 opening product group 40 for digital health applications from 1 July 2026, first position admitted under evaluation to 31 December 2026",
    href: "https://www.bag.admin.ch/bag/de/home/versicherungen/krankenversicherung/krankenversicherung-leistungen-tarife/Mittel-und-Gegenstaendeliste.html",
  },
  {
    id: "foph-dga-decisions",
    label: "Published FOPH decisions on digital health applications under MiGeL product group 40: 7 of 8 rejected on effectiveness (Wirksamkeit). Sanafin analysis of the published decisions; citation to follow.",
  },
  {
    id: "tardoc",
    label: "OAAT/OTMA — TARDOC and outpatient flat rates, in force 1 January 2026",
    href: "https://oaat-otma.ch/",
  },
  {
    id: "wegovy",
    label: "FOPH — Specialty list decision on Wegovy (1 March 2024): coverage conditional on at least 5% weight loss within 16 weeks; limitation amended 1 May 2025",
    href: "https://www.bag.admin.ch/dam/de/sd-web/4UEBFvIzBFFM/wegovy-neuaufnahme-01-03-2024.pdf",
  },
  {
    id: "ehds",
    label: "Regulation (EU) 2025/327 on the European Health Data Space — in force March 2025, applies in stages from 2027, patient summaries from 2029",
    href: "https://eur-lex.europa.eu/eli/reg/2025/327/oj",
  },
  {
    id: "vbc-barriers",
    label: "Barriers to outcome-based contracts: three of five barrier groups are administration, measurement and data infrastructure (PMC9539523)",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9539523/",
  },
  {
    id: "ada-remission",
    label: "Riddle et al., Consensus report: definition and interpretation of remission in type 2 diabetes — HbA1c < 6.5% for at least 3 months without glucose-lowering medication (Diabetes Care 2021)",
    href: "https://doi.org/10.2337/dci21-0034",
  },
  {
    id: "consultancy-estimate",
    label: "Cost of building reimbursement evidence by hand, per project: Sanafin estimate from conversations with Swiss digital health companies and HTA consultancies, not third-party research",
  },
  {
    id: "eden",
    label: "Mekniran W, Kowatsch T. EDEN: A Computational Framework to Align Incentives in Aging (2025)",
    href: "https://doi.org/10.5220/0013359800003911",
  },
  {
    id: "swiss-hta",
    label: "Mekniran W et al. Health Technology Assessment of Swiss Digital Diabetes Screening — 40-year Markov model, Swiss payer perspective (medRxiv preprint, February 2026)",
    href: "https://doi.org/10.64898/2026.02.10.26345992",
  },
  {
    id: "cms-cgt",
    label: "CMS Cell and Gene Therapy Access Model — outcomes-based agreements negotiated on behalf of 32 states, the District of Columbia and Puerto Rico; settled by rebate over an eleven-year model period",
    href: "https://www.cms.gov/priorities/innovation/innovation-models/cgt",
  },
  {
    id: "cms-access",
    label: "CMS ACCESS (Advancing Chronic Care with Effective, Scalable Solutions) Model — began 5 July 2026 and runs ten years; outcome targets are set on biomarkers such as blood pressure, HbA1c, lipids or weight, or on validated patient-reported outcome measures (PROMs)",
    href: "https://www.cms.gov/priorities/innovation/innovation-models/access",
  },
  {
    id: "okp-medicines",
    label: "Mandatory health-insurance (OKP) spend on medicines in 2025: CHF 9.7 bn, about a fifth of all OKP cost (priminfo.admin.ch, FOPH)",
    href: "https://www.priminfo.admin.ch/",
  },
  {
    id: "kvg-52b",
    label: "Art. 52b E-KVG — consultation on the second cost-containment package opened 18 February 2026, consolidating the legal basis for price models with reimbursements and extending it to MiGeL and the analysis list. FOPH: \"Das Ziel ist, jährlich rund 350 Millionen Franken einzusparen.\"",
    href: "https://www.bag.admin.ch/de/newnsb/lCw7tC_x3NSVit2XLLYny",
  },
  {
    id: "glp1-discontinuation",
    label: "Gasoyan H et al., Changes in weight and glycemic control following obesity treatment with semaglutide or tirzepatide by discontinuation status, Obesity (2025), doi:10.1002/oby.24331. Real-world cohort of 7,881 US adults (Cleveland Clinic, Ohio and Florida). Discontinuation within twelve months: 53.0% on semaglutide (21.6% early, 31.4% late) and 50.6% on tirzepatide (16.4% early, 34.1% late)",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12381620/",
  },
  {
    id: "diga-repayment",
    label: "GKV-Spitzenverband, DiGA-Bericht 2025: more than EUR 25 m of repayment claims at risk on prescription apps paid before proof of benefit, with nine manufacturers insolvent",
    href: "https://www.gkv-spitzenverband.de/krankenversicherung/digitalisierung/kv_diga/diga.jsp",
  },
  {
    id: "atmp-spend",
    label: "IQVIA Institute, Strengthening Pathways for Cell and Gene Therapies (March 2024): USD 5.9 bn spent on cell and gene therapies in 2023, up 38% on the year and averaging 65% annual growth over five years; 62% of it in the United States",
    href: "https://www.iqvia.com/insights/the-iqvia-institute/reports-and-publications/reports/strengthening-pathways-for-cell-and-gene-therapies",
  },
  {
    id: "dtx-study-budgets",
    label: "Digital-therapeutic study budgets available a year in Switzerland, about CHF 6 m: Sanafin estimate from published FOPH decisions and funder conversations, not third-party research",
  },
]

// Sources cited on the landing page, in order of first appearance, top to bottom.
// Citing a source that is missing here fails the build, so add it in reading order.
export const cited = [
  "direct-trial", // Why we exist
  "okp-medicines", // Problem
  "glp1-discontinuation",
  "okp-premiums",
  "sgb5-134", // Any care, anywhere
  "kvg-52b",
  "cms-access",
] as const

export function sourceNumber(id: string): number {
  const i = (cited as readonly string[]).indexOf(id)
  if (i === -1) throw new Error(`Source "${id}" is cited but missing from \`cited\` in lib/sources.ts`)
  return i + 1
}

export function citedSources(): Source[] {
  return cited.map((id) => getSource(id))
}

export function getSource(id: string): Source {
  const s = sources.find((x) => x.id === id)
  if (!s) throw new Error(`Unknown source id: ${id}`)
  return s
}
