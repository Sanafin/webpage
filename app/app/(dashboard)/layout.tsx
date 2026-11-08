import { requireSession } from "@/lib/app-auth"
import { listContracts } from "@/lib/app/data"
import { AppShell } from "@/components/app/shell"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireSession()
  const contracts = await listContracts()
  return <AppShell contractCount={contracts.length}>{children}</AppShell>
}
