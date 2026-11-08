import type { Metadata } from "next"
import Link from "next/link"
import { requireSession } from "@/lib/app-auth"
import { listContracts } from "@/lib/app/data"
import { chf, shortHash } from "@/lib/demo/data"
import { PageHeader } from "@/components/app/shell"
import { Pill } from "@/components/app/status-pill"
import { fmtDateTime, th } from "@/components/app/format"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = { title: "Settlements" }

export default async function SettlementsPage() {
  await requireSession()
  const rows = (await listContracts()).filter((c) => c.settlement).sort((a, b) => ((a.settlement?.settledAt ?? "") < (b.settlement?.settledAt ?? "") ? 1 : -1))
  const released = rows.reduce((a, c) => a + (c.settlement?.payeeAmountChf ?? 0), 0)
  const returned = rows.reduce((a, c) => a + (c.settlement?.returnedToPayerChf ?? 0), 0)
  return (
    <>
      <PageHeader title="Settlements" lead="One instruction per contract, issued the moment the verdict is in. Each carries the audit hash of the run that decided it." />
      <div className="overflow-hidden rounded-[24px] border border-[#ece7e2] bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={`pl-5 ${th}`}>Settled</TableHead>
              <TableHead className={`${th}`}>Contract</TableHead>
              <TableHead className={`${th}`}>Action</TableHead>
              <TableHead className={`text-right ${th}`}>To provider</TableHead>
              <TableHead className={`text-right ${th}`}>To payer</TableHead>
              <TableHead className={`pr-5 text-right ${th}`}>Reference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((c) => {
              const s = c.settlement!
              return (
                <TableRow key={c.id} className="border-[#f0ebe6] hover:bg-[#fcfbfa]">
                  <TableCell className="pl-5 font-mono text-[12px] tabular-nums text-[#766d67]">{fmtDateTime(s.settledAt)}</TableCell>
                  <TableCell>
                    <Link href={`/app/contracts/${c.id}`} className="text-[13.5px] font-medium hover:underline">
                      {c.name}
                    </Link>
                    <span className="block font-mono text-[11.5px] text-[#766d67]">
                      composite {c.scores?.composite} · cut-off {c.cutoff}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Pill tone={s.action === "released" ? "teal" : "ink"}>{s.action === "released" ? "Released" : "Returned"}</Pill>
                  </TableCell>
                  <TableCell className="text-right font-mono text-[13px] tabular-nums">{chf(s.payeeAmountChf)}</TableCell>
                  <TableCell className="text-right font-mono text-[13px] tabular-nums">{chf(s.returnedToPayerChf)}</TableCell>
                  <TableCell className="pr-5 text-right font-mono text-[12px] text-[#766d67]" title={s.reference}>
                    {shortHash(s.reference)}
                  </TableCell>
                </TableRow>
              )
            })}
            <TableRow className="bg-[#fcfbfa] hover:bg-[#fcfbfa]">
              <TableCell className="pl-5 text-[12.5px] text-[#766d67]" colSpan={3}>
                Total across {rows.length} settlements
              </TableCell>
              <TableCell className="text-right font-mono text-[13px] tabular-nums text-[#0f766e]">{chf(released)}</TableCell>
              <TableCell className="text-right font-mono text-[13px] tabular-nums">{chf(returned)}</TableCell>
              <TableCell className="pr-5" />
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <p className="mt-4 text-[12px] text-[#766d67]">Money is held and paid by a licensed custody partner; Sanafin issues the instruction and keeps the proof.</p>
    </>
  )
}
