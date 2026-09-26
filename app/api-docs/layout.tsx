import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API documentation',
  description: 'Sanafin Outcome Studio API: intake, verification and settlement instructions for outcome-conditional contracts.',
  alternates: { canonical: '/api-docs' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
