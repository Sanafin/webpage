import type { Metadata } from "next"
import { requireSession } from "@/lib/app-auth"
import { NotYet } from "@/components/app/not-yet"

export const metadata: Metadata = { title: "Audit log" }

export default async function AuditlogPage() {
  await requireSession()
  return <NotYet title="Audit log" lead="The hash-chained record of every ingestion, evaluation and settlement." what="The full chain across contracts, verifiable offline from the exported file. Per-contract events are on each contract page today." />
}
