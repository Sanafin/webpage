import type { StaticImageData } from "next/image"

import innoboosterLogo from "@/components/ui/logo/innobooster.png"
import kickfoundationLogo from "@/components/ui/logo/kickfoundation_pos_farbe.png"
import sicLogo from "@/components/ui/logo/SIC-logo.png"
import sftaLogo from "@/components/ui/logo/sfta_logo.png"

export type Backer = {
  name: string
  shortName?: string
  logo: StaticImageData
  // Say plainly what the relationship is. None of these organisations holds equity.
  relationship: "Award" | "Grant" | "Coaching" | "Programme" | "Membership"
  year?: number
  description: string
  sourceUrl?: string
  // Shown in the hero proof row
  inHero?: boolean
}

export type Loi = {
  // Partner described by type. Set `named` to true only with written permission.
  partnerType: string
  name?: string
  named?: boolean
  kind: "hospital" | "digital-health" | "university" | "provider"
  country: string
  focus: string
  signed?: string // "Jun 2026"
  status: string
}

// Programmes and awards that support Sanafin. Only list what can be shown publicly.
export const backers: Backer[] = [
  {
    name: "Innovation Booster Sustainable Digital Finance",
    shortName: "Innovation Booster",
    logo: innoboosterLogo,
    relationship: "Award",
    description: "Winner. Innosuisse-funded programme, CHF 20,000 non-dilutive.",
    sourceUrl: "https://ibsdf.ch/",
    inHero: true,
  },
  {
    name: "Kick Foundation",
    logo: kickfoundationLogo,
    relationship: "Programme",
    description: "Start-up programme participation.",
    inHero: true,
  },
  {
    name: "SIC",
    logo: sicLogo,
    relationship: "Programme",
    description: "Programme participation.",
    inHero: true,
  },
  {
    name: "Swiss FinTech Association",
    shortName: "SFTA",
    logo: sftaLogo,
    relationship: "Membership",
    description: "Member. Open verification thread with insurers.",
    sourceUrl: "https://swissfintech.org/",
  },
]

// Signed letters of intent, anonymised on purpose: partners are described by type,
// never by name or logo, unless they have agreed to be named publicly.
export const lois: Loi[] = [
  {
    partnerType: "Swiss cantonal hospital",
    name: "HOCH Ostschweiz",
    named: false,
    kind: "hospital",
    country: "Switzerland",
    focus: "Diabetes care proof of concept",
    signed: "Jun 2026",
    status: "Proof of concept running to Oct 2026",
  },
  {
    partnerType: "Swiss digital health company",
    name: "Elysia Solutions GmbH",
    named: false,
    kind: "digital-health",
    country: "Switzerland",
    focus: "Digital-health partner in the proof of concept",
    status: "Active",
  },
  {
    partnerType: "University longevity medicine centre",
    named: false,
    kind: "university",
    country: "Switzerland",
    focus: "Workflow validation",
    status: "Scoping",
  },
  {
    partnerType: "Preventive health provider",
    named: false,
    kind: "provider",
    country: "Switzerland",
    focus: "Workflow validation",
    status: "Scoping",
  },
]

export function loiLabel(loi: Loi): string {
  return loi.named && loi.name ? loi.name : loi.partnerType
}
