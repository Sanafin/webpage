import type { Contract } from "@/lib/demo/types"
import { chf } from "@/lib/demo/data"

// Where the committed money stands per contract: released (teal), returned (ink),
// still held (plate). One honest picture instead of a time series the run does not have.
export function FundsBars({ contracts }: { contracts: Contract[] }) {
  return (
    <ul className="space-y-4">
      {contracts.map((c) => {
        const released = c.settlement?.payeeAmountChf ?? 0
        const returned = c.settlement?.returnedToPayerChf ?? 0
        const held = Math.max(0, c.committedChf - released - returned)
        const w = (n: number) => `${(n / c.committedChf) * 100}%`
        return (
          <li key={c.id}>
            <div className="flex items-baseline justify-between gap-4 text-[13px]">
              <span className="min-w-0 truncate text-[#1f1a17]">{c.name}</span>
              <span className="shrink-0 font-mono tabular-nums text-[#766d67]">{chf(c.committedChf)}</span>
            </div>
            <div className="mt-1.5 flex h-2.5 w-full overflow-hidden rounded-full bg-[#f5f1ed]" role="img" aria-label={`${chf(released)} released, ${chf(returned)} returned, ${chf(held)} held`}>
              {released > 0 && <span className="h-full bg-[#14b8a6]" style={{ width: w(released) }} />}
              {returned > 0 && <span className="h-full bg-[#1f1a17]" style={{ width: w(returned) }} />}
            </div>
          </li>
        )
      })}
      <li className="flex flex-wrap gap-x-5 gap-y-1 pt-1 text-[11.5px] text-[#766d67]">
        <span className="inline-flex items-center gap-1.5"><i className="inline-block h-2 w-2 rounded-full bg-[#14b8a6]" /> released to provider</span>
        <span className="inline-flex items-center gap-1.5"><i className="inline-block h-2 w-2 rounded-full bg-[#1f1a17]" /> returned to payer</span>
        <span className="inline-flex items-center gap-1.5"><i className="inline-block h-2 w-2 rounded-full border border-[#e6dfd8] bg-[#f5f1ed]" /> held by custody partner</span>
      </li>
    </ul>
  )
}
