import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/app-auth"
import { listContracts } from "@/lib/app/data"
import { chf } from "@/lib/demo/data"
import { LoginForm } from "./login-form"

export const metadata: Metadata = { title: "Sign in" }

// Two panels in one card: the form, and a plate that says what the passcode opens.
// The right panel is built from the same fixtures the dashboard shows, so the
// numbers on the door match the numbers inside.
export default async function LoginPage() {
  if (await getSession()) redirect("/app")
  const contracts = await listContracts()
  const settled = contracts.filter((c) => c.settlement)
  const released = settled.reduce((a, c) => a + (c.settlement?.payeeAmountChf ?? 0), 0)
  const events = contracts.reduce((a, c) => a + c.timeline.length, 0)

  return (
    <main id="main" className="flex min-h-screen items-center justify-center bg-[#fbfaf8] px-6 py-16">
      <div className="w-full max-w-3xl">
        <div className="grid overflow-hidden rounded-[24px] border border-[#ece7e2] bg-white md:grid-cols-[1.1fr_1fr]">
          <div className="p-7 sm:p-9">
            <Image src="/images/sanafin_logo.png" alt="Sanafin" width={110} height={36} className="h-7 w-auto" style={{ height: "28px", width: "auto" }} priority />
            <h1 className="font-display mt-7 text-[26px] leading-tight text-[#1f1a17]">Outcome Studio</h1>
            <p className="mt-1 text-[13px] text-[#766d67]">Private preview for payers and care providers</p>
            <LoginForm />
            <p className="mt-5 text-[12px] leading-relaxed text-[#766d67]">The passcode is shared by Sanafin after a discovery call. Sessions last 12 hours.</p>
          </div>
          <div className="border-t border-[#ece7e2] bg-[#f5f1ed] p-7 sm:p-9 md:border-t-0 md:border-l">
            <p className="text-[12px] text-[#766d67]">Inside the preview</p>
            <dl className="mt-4 divide-y divide-[#e6dfd8]">
              {[
                [String(contracts.length), "outcome contracts", "on synthetic cohorts of 100 patients"],
                [String(settled.length), "settlements", `${chf(released)} released on verified outcomes`],
                [String(events), "audit events", "hash-chained, re-verifiable from the export"],
              ].map(([n, k, m]) => (
                <div key={k} className="flex items-baseline gap-3 py-3">
                  <dt className="w-10 shrink-0 font-mono text-[22px] leading-none tabular-nums text-[#1f1a17]">{n}</dt>
                  <dd className="min-w-0">
                    <span className="block text-[13.5px] text-[#1f1a17]">{k}</span>
                    <span className="block text-[12px] text-[#766d67]">{m}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[12px] leading-relaxed text-[#766d67]">Example data from one real verification run. No patient is real and no customer is shown.</p>
          </div>
        </div>
        <p className="mt-5 text-center text-[12px] text-[#766d67]">
          Looking for the product walkthrough?{" "}
          <Link href="/demo" className="text-[#1f1a17] underline decoration-[#d9d1ca] underline-offset-4 hover:decoration-[#1f1a17]">
            It needs no passcode.
          </Link>
        </p>
      </div>
    </main>
  )
}
