import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SwissCross } from "@/components/ui/swiss-cross"
import { SidebarNav } from "@/components/app/sidebar-nav"
import { logout } from "@/app/app/(auth)/login/actions"

// The app frame: a quiet sidebar with a workspace row at the foot, a one-line top
// bar that carries the honesty label once, and a paper content area. The marketing
// header is not used here; this is the product's own voice.
export function AppShell({ children, contractCount }: { children: React.ReactNode; contractCount: number }) {
  return (
    <div className="min-h-screen bg-[#fbfaf8] text-[#1f1a17] md:flex">
      <aside className="border-b border-[#ece7e2] bg-[#fcfbfa] md:sticky md:top-0 md:flex md:h-screen md:w-60 md:shrink-0 md:flex-col md:border-r md:border-b-0">
        <div className="flex items-center justify-between px-4 py-4 md:px-5 md:py-5">
          <Link href="/app" className="flex items-center gap-2.5 rounded-lg">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1f1a17]">
              <SwissCross className="h-3 w-3 text-white" />
            </span>
            <span className="leading-tight">
              <span className="block text-[13.5px] font-semibold">Outcome Studio</span>
              <span className="block text-[11px] text-[#766d67]">by Sanafin</span>
            </span>
          </Link>
          <form action={logout} className="md:hidden">
            <button type="submit" className="text-[12.5px] text-[#766d67] hover:text-[#1f1a17]">
              Sign out
            </button>
          </form>
        </div>
        <nav aria-label="App" className="px-3 pb-3 md:flex-1">
          <SidebarNav counts={{ "/app/contracts": contractCount }} />
        </nav>
        <div className="hidden border-t border-[#ece7e2] p-3 md:block">
          <div className="flex items-center gap-2.5 rounded-xl px-2 py-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f5f1ed] font-mono text-[11px] font-medium text-[#1f1a17]">DW</span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[13px] font-medium">Demo workspace</span>
              <span className="block truncate text-[11.5px] text-[#766d67]">Example data only</span>
            </span>
          </div>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-20 hidden h-14 items-center justify-between border-b border-[#ece7e2] bg-[#fbfaf8]/90 px-8 backdrop-blur-md md:flex">
          <p className="flex items-center gap-2 text-[12.5px] text-[#766d67]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#f15d22]" aria-hidden="true" />
            Private preview · every figure comes from a real verification run on synthetic data
          </p>
          <div className="flex items-center gap-5 text-[12.5px]">
            <Link href="/demo" className="inline-flex items-center gap-1 text-[#766d67] hover:text-[#1f1a17]">
              Walkthrough
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <form action={logout}>
              <button type="submit" className="rounded-full border border-[#e6dfd8] px-3.5 py-1.5 text-[12.5px] text-[#1f1a17] transition-colors hover:border-[#1f1a17]">
                Sign out
              </button>
            </form>
          </div>
        </div>
        <main id="main" className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
          {children}
        </main>
      </div>
    </div>
  )
}

export function PageHeader({ eyebrow, title, lead, action }: { eyebrow?: React.ReactNode; title: string; lead?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && <p className="text-[12.5px] text-[#766d67]">{eyebrow}</p>}
        <h1 className="font-display mt-1 text-[28px] leading-tight tracking-tight sm:text-[32px]">{title}</h1>
        {lead && <p className="mt-2 max-w-md text-[14px] leading-relaxed text-[#6f6660]">{lead}</p>}
      </div>
      {action}
    </header>
  )
}
