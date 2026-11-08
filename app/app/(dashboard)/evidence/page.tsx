import type { Metadata } from "next"
import { requireSession } from "@/lib/app-auth"
import { NotYet } from "@/components/app/not-yet"

export const metadata: Metadata = { title: "Evidence" }

export default async function EvidencePage() {
  await requireSession()
  return <NotYet title="Evidence" lead="Every observation that fed a verdict, with its source and timestamp." what="Lab, CGM, device and EHR observations will be listed here per patient and per rule, as they are ingested." />
}
