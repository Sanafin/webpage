// Footnote registry. Every figure on the site points at one of these entries via
// <Fn id="…" />, and the footer renders the numbered "Notes & sources" list from
// the same array, so numbering can never drift. Order here = footnote number.

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
]

export function sourceNumber(id: string): number {
  const i = sources.findIndex((s) => s.id === id)
  if (i === -1) throw new Error(`Unknown source id: ${id}`)
  return i + 1
}

export function getSource(id: string): Source {
  const s = sources.find((x) => x.id === id)
  if (!s) throw new Error(`Unknown source id: ${id}`)
  return s
}
