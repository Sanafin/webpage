"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Home, Layers, Link2, ShieldCheck, Wallet, type LucideIcon } from "lucide-react"

type Item = { href: string; label: string; icon: LucideIcon }

// Two groups: what the preview can show today, and the engine views that fill in
// once the verification service is wired to the shell.
export const appNav: Array<{ label?: string; items: Item[] }> = [
  {
    items: [
      { href: "/app", label: "Home", icon: Home },
      { href: "/app/contracts", label: "Contracts", icon: FileText },
      { href: "/app/settlements", label: "Settlements", icon: Wallet },
    ],
  },
  {
    label: "Verification engine",
    items: [
      { href: "/app/evidence", label: "Evidence", icon: ShieldCheck },
      { href: "/app/data-sources", label: "Data sources", icon: Link2 },
      { href: "/app/audit-log", label: "Audit log", icon: Layers },
    ],
  },
]

export function SidebarNav({ counts = {} }: { counts?: Record<string, number> }) {
  const pathname = usePathname()
  return (
    <div className="space-y-5">
      {appNav.map((group, gi) => (
        <div key={gi}>
          {group.label && <p className="mb-1.5 px-2.5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#9a908a]">{group.label}</p>}
          <ul className="space-y-0.5">
            {group.items.map(({ href, label, icon: Icon }) => {
              const active = href === "/app" ? pathname === "/app" : pathname.startsWith(href)
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-[13.5px] transition-colors ${
                      active ? "bg-[#f3efeb] font-medium text-[#1f1a17]" : "text-[#766d67] hover:bg-[#f5f1ed] hover:text-[#1f1a17]"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className={`h-4 w-4 ${active ? "text-[#1f1a17]" : "text-[#9a908a]"}`} aria-hidden="true" />
                      {label}
                    </span>
                    {counts[href] !== undefined && <span className="rounded-md bg-white px-1.5 text-[11px] tabular-nums text-[#766d67] ring-1 ring-[#ece7e2]">{counts[href]}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}
