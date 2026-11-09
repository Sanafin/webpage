import Link from "next/link"
import { requireSession } from "@/lib/app-auth"
import { listContracts } from "@/lib/app/data"
import { chf, shortHash } from "@/lib/demo/data"
import { PageHeader } from "@/components/app/shell"
import { StatTile } from "@/components/app/stat-tile"
import { Pill, StatusPill } from "@/components/app/status-pill"
import { FundsBars } from "@/components/app/funds-bars"
import { fmtDateTime, th } from "@/components/app/format"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default async function OverviewPage() {
  await requireSession()
  const contracts = await listContracts()
  const settled = contracts.filter((c) => c.settlement)
  const committed = contracts.reduce((a, c) => a + c.committedChf, 0)
  const released = settled.reduce((a, c) => a + (c.settlement?.payeeAmountChf ?? 0), 0)
  const returned = settled.reduce((a, c) => a + (c.settlement?.returnedToPayerChf ?? 0), 0)
  const events = contracts
    .flatMap((c) => c.timeline.map((e) => ({ ...e, contract: c })))
    .filter((e) => e.hash)
    .sort((a, b) => (a.at < b.at ? 1 : -1))
    .slice(0, 6)

  return (
    <>
      <PageHeader title="Home" lead="Four outcome contracts on synthetic cohorts. Two have been scored and settled; two have finished their episode and wait for verification." />

      <section aria-label="Totals" className="grid gap-3 sm:grid-cols-3">
        <StatTile label="Committed" value={chf(committed)} meta={`${contracts.length} contracts · held by custody partner until verified`} />
        <StatTile label="Released on verified outcomes" value={chf(released)} meta={`${settled.filter((c) => c.settlement?.action === "released").length} settlement released`} tone="teal" />
        <StatTile label="Returned to payer" value={chf(returned)} meta={`across ${settled.length} settlements · unearned shares included`} />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr] [&>*]:min-w-0">
        <div className="rounded-[24px] border border-[#ece7e2] bg-white p-5 sm:p-6">
          <div className="mb-5 flex items-baseline justify-between">
            <h2 className="text-[15px] font-medium">Where the money stands</h2>
            <Link href="/app/settlements" className="text-[12.5px] text-[#766d67] hover:text-[#1f1a17]">
              Settlements
            </Link>
          </div>
          <FundsBars contracts={contracts} />
        </div>

        <div className="rounded-[24px] border border-[#ece7e2] bg-white p-5 sm:p-6">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-[15px] font-medium">Contracts</h2>
            <Link href="/app/contracts" className="text-[12.5px] text-[#766d67] hover:text-[#1f1a17]">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-[#f0ebe6]">
            {contracts.map((c) => (
              <li key={c.id}>
                <Link href={`/app/contracts/${c.id}`} className="interactive-row -mx-2 flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 hover:bg-[#fcfbfa]">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium">{c.name}</p>
                    <p className="truncate text-[12px] text-[#766d67]">
                      {c.cohortSize} patients · {c.scores ? `composite ${c.scores.composite}` : `month ${c.monthsElapsed ?? 0} of ${6}`}
                    </p>
                  </div>
                  <StatusPill status={c.status} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-[15px] font-medium">Latest audit events</h2>
          <p className="font-mono text-[11.5px] text-[#766d67]">hash-chained · UTC</p>
        </div>
        <div className="overflow-hidden rounded-[24px] border border-[#ece7e2] bg-white">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className={`pl-5 ${th}`}>When</TableHead>
                <TableHead className={`${th}`}>Event</TableHead>
                <TableHead className={`${th}`}>Contract</TableHead>
                <TableHead className={`${th}`}>Detail</TableHead>
                <TableHead className={`pr-5 text-right ${th}`}>Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((e) => (
                <TableRow key={`${e.contract.id}-${e.seq}`} className="border-[#f0ebe6] hover:bg-[#fcfbfa]">
                  <TableCell className="pl-5 font-mono text-[12px] tabular-nums whitespace-nowrap text-[#766d67]">{fmtDateTime(e.at)}</TableCell>
                  <TableCell>
                    <Pill tone={e.kind === "settlement" ? "ink" : "muted"}>{e.kind}</Pill>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Link href={`/app/contracts/${e.contract.id}`} className="font-mono text-[12px] text-[#1f1a17] hover:underline">
                      {e.contract.id}
                    </Link>
                  </TableCell>
                  <TableCell className="max-w-[360px] truncate text-[13px] text-[#6f6660]" title={e.text}>
                    {e.text}
                  </TableCell>
                  <TableCell className="pr-5 text-right font-mono text-[12px] text-[#766d67]" title={e.hash ?? undefined}>
                    {shortHash(e.hash, 10)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  )
}
