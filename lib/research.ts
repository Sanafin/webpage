// Publications by the founding team. Shared by the landing page and /eden-framework.

export type Publication = {
  title: string
  authors: string
  year: string
  doi: string
  venue?: string
  category: "Adoption" | "Integration" | "Investment"
}

export const publications: Publication[] = [
  {
    title: "Health Technology Assessment of Swiss Digital Diabetes Screening",
    authors: "Mekniran W et al.",
    year: "2026",
    doi: "10.64898/2026.02.10.26345992",
    venue: "medRxiv preprint",
    category: "Integration",
  },
  {
    title: "Digital health incentives in type-2 diabetes prevention",
    authors: "Mekniran W, Diethelm W, Stalder V, Fleisch E, Kowatsch T, Jovanova M",
    year: "2026",
    doi: "10.1177/20552076261425402",
    venue: "Digital Health",
    category: "Adoption",
  },
  {
    title: "Assessment of B2C Model for Digital Diabetes Screening",
    authors: "Mekniran W, Kowatsch T",
    year: "2026",
    doi: "10.1186/s12913-026-14075-3",
    venue: "BMC Health Services Research",
    category: "Investment",
  },
  {
    title: "A Prevention-First Framework for Noncommunicable Diseases",
    authors: "Mekniran W, Fleisch E, Kowatsch T, Jovanova M",
    year: "2026",
    doi: "10.2139/ssrn.6256938",
    venue: "SSRN",
    category: "Integration",
  },
  {
    title: "The Longevity Landscape: Mapping Stakeholder Priorities",
    authors: "Mekniran W, Giger O, Fleisch E, Kowatsch T, Jovanova M",
    year: "2025",
    doi: "10.1186/s12889-025-25498-8",
    venue: "BMC Public Health",
    category: "Adoption",
  },
  {
    title: "EDEN: A Computational Framework to Align Incentives in Aging",
    authors: "Mekniran W, Kowatsch T",
    year: "2025",
    doi: "10.5220/0013359800003911",
    category: "Adoption",
  },
  {
    title: "Reimagining Preventive Care and Digital Health",
    authors: "Mekniran W, Kramer J-N, Kowatsch T",
    year: "2024",
    doi: "10.5220/0012400300003657",
    category: "Integration",
  },
  {
    title: "Scalable Business Models in Digital Healthy Longevity",
    authors: "Mekniran W, Kowatsch T",
    year: "2023",
    doi: "10.5220/0011778400003414",
    category: "Investment",
  },
]

// Real, dated events only. Add to the end as they happen.
export const milestones = [
  { date: "2023", label: "First publication on business models for digital prevention" },
  { date: "2025", label: "EDEN framework published" },
  { date: "Feb 2026", label: "Swiss HTA model for digital diabetes screening released as a preprint" },
  { date: "Jun 2026", label: "Letter of intent signed with a Swiss hospital for a diabetes care proof of concept" },
  { date: "To Oct 2026", label: "Clinical proof of concept running with a Swiss hospital and a digital health partner" },
] as const
