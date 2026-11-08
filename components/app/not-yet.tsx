import { PageHeader } from "@/components/app/shell"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"

// Placeholder for sections of the shell that connect to the verification engine later.
export function NotYet({ title, lead, what }: { title: string; lead: string; what: string }) {
  return (
    <>
      <PageHeader title={title} lead={lead} />
      <Empty className="rounded-[24px] border border-dashed border-[#e6dfd8] bg-white py-16">
        <EmptyHeader>
          <EmptyTitle className="text-[15px] font-medium text-[#1f1a17]">Connects to the verification engine in a later release</EmptyTitle>
          <EmptyDescription className="text-[13px] text-[#766d67]">{what}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </>
  )
}
