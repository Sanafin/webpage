import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EDEN framework',
  description: 'The open research framework behind Sanafin: eight publications on incentives, risk structures and health economics for outcome-based digital health.',
  alternates: { canonical: '/eden-framework' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
