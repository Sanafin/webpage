import type { StaticImageData } from "next/image"

import innoboosterLogo from "@/components/ui/logo/innobooster.png"
import kickfoundationLogo from "@/components/ui/logo/kickfoundation_pos_farbe.png"
import sicLogo from "@/components/ui/logo/SIC-logo.png"
import sftaLogo from "@/components/ui/logo/sfta_logo.png"

export type Backer = {
  name: string
  logo: StaticImageData
}

export type Loi = {
  // Partner name, or an anonymised description such as "Swiss health insurer"
  partner: string
  // Short qualifier shown under the name, e.g. "Signed LOI · 2026"
  detail: string
  logo?: StaticImageData
}

// Programmes and awards that support Sanafin. Only list what can be shown publicly.
export const backers: Backer[] = [
  { name: "InnoBooster", logo: innoboosterLogo },
  { name: "Kick Foundation", logo: kickfoundationLogo },
  { name: "SIC", logo: sicLogo },
  { name: "SFTA", logo: sftaLogo },
]

// Signed letters of intent, anonymised on purpose: partners are described by type,
// never by name or logo, unless they have agreed to be named publicly.
// The "Letters of intent" row stays hidden while this is empty.
export const lois: Loi[] = [
  { partner: "Swiss hospital group", detail: "Diabetes care proof of concept" },
  { partner: "Swiss digital prevention company", detail: "Reimbursement readiness" },
  { partner: "University longevity medicine centre", detail: "Workflow validation" },
  { partner: "Preventive health provider", detail: "Workflow validation" },
]
