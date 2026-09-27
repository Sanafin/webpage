import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How Sanafin processes personal data, which processors it uses and your rights under the Swiss FADP and GDPR.',
  alternates: { canonical: '/privacy' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
