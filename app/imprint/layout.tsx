import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Imprint',
  description: 'Legal notice for Sanafin.',
  alternates: { canonical: '/imprint' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
