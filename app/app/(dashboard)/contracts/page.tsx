import type { Metadata } from "next"
import Link from "next/link"
import { requireSession } from "@/lib/app-auth"
import { listContracts } from "@/lib/app/data"
import { chf } from "@/lib/demo/data"
import { PageHeader } from "@/components/app/shell"
import { StatusPill } from "@/components/app/status-pill"
import { fmtDate, th } from "@/components/app/format"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = { title: "Contracts" }

export default async function ContractsPage() {
  await requireSession()
  const contracts = await listContracts()
  return (
    <>
      <PageHeader
        title="Contracts"
        lead="Each row is one cohort under one set of thresholds. The verdict and the money follow from the rules fixed before enrolment."
        action={
          <span className="inline-flex cursor-not-allowed items-center rounded-full border border-[#e6dfd8] px-4 py-2 text-[13px] text-[#766d67]" aria-disabled="true" title="Not available in the preview">
            New contract
          </span>
        }
      />
      <div className="overflow-hidden rounded-[24px] border border-[#ece7e2] bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={`pl-5 ${th}`}>Contract</TableHead>
              <TableHead className={`${th}`}>Cohort</TableHead>
              <TableHead className={`text-right ${th}`}>Committed</TableHead>
              <TableHead className={`${th}`}>Status</TableHead>
              <TableHead className={`text-right ${th}`}>Composite</TableHead>
              <TableHead className={`pr-5 text-right ${th}`}>Last event</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((c) => {
              const lastEvent = c.timeline[c.timeline.length - 1]
              return (
                <TableRow key={c.id} className="border-[#f0ebe6] hover:bg-[#fcfbfa]">
                  <TableCell className="pl-5">
                    <Link href={`/app/contracts/${c.id}`} className="block">
                      <span className="block text-[13.5px] font-medium text-[#1f1a17] hover:underline">{c.name}</span>
                      <span className="block font-mono text-[11.5px] text-[#766d67]">{c.id}</span>
                    </Link>
                  </TableCell>
                  <TableCell className="text-[13px] text-[#6f6660]">
                    {c.cohortSize} patients · {c.source}
                  </TableCell>
                  <TableCell className="text-right font-mono text-[13px] tabular-nums">{chf(c.committedChf)}</TableCell>
                  <TableCell>
                    <StatusPill status={c.status} />
                  </TableCell>
                  <TableCell className="text-right font-mono text-[13px] tabular-nums">
                    {c.scores ? (
                      <>
                        {c.scores.composite} <span className="text-[#766d67]">/ {c.cutoff}</span>
                      </>
                    ) : (
                      <span className="text-[#766d67]">month {c.monthsElapsed ?? 0} of 6</span>
                    )}
                  </TableCell>
                  <TableCell className="pr-5 text-right font-mono text-[12px] tabular-nums text-[#766d67]">
                    {lastEvent ? `${lastEvent.kind} · ${fmtDate(lastEvent.at)}` : "—"}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
