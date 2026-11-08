import "server-only"
// The app shell reads through this async facade. Today it delegates to the static
// fixtures; wiring the verification service later changes this file only:
//   listContracts   ← index of cohorts
//   fetchContract   ← POST /api/verify/{id} (scores, summary, economics, payout)
//                     + GET /api/audit/{id} (timeline, integrity)
//   fetchHorizons   ← GET /api/economics/{id}/horizons
import * as demo from "@/lib/demo/data"
import type { Contract, HorizonRow } from "@/lib/demo/types"

export async function listContracts(): Promise<Contract[]> {
  return demo.getContracts()
}

export async function fetchContract(id: string): Promise<Contract | null> {
  return demo.getContract(id) ?? null
}

export async function fetchHorizons(id: string): Promise<HorizonRow[]> {
  return demo.getContract(id)?.horizons ?? []
}

export async function fetchPatients(id: string) {
  // The fixture stores the one evaluated cohort's patients once; both settled runs share it.
  const c = demo.getContract(id)
  if (!c || c.source === "synthetic") return []
  return demo.getPatients()
}
