import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & security',
  description: 'Terms of use and security practices for the Sanafin platform.',
  alternates: { canonical: '/terms' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
