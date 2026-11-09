import type { Metadata } from "next"
import { requireSession } from "@/lib/app-auth"
import { NotYet } from "@/components/app/not-yet"

export const metadata: Metadata = { title: "Data sources" }

export default async function DatasourcesPage() {
  await requireSession()
  return <NotYet title="Data sources" lead="Where the observations come from." what="FHIR R4 endpoints, CSV drops and device feeds, with their last delivery and record counts." />
}
