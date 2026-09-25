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

// Signed LOIs and paid pilots. The "Signed with" row stays hidden until this has entries.
export const lois: Loi[] = []
