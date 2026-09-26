import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { DemoBooking } from '@/components/demo-booking'

export const metadata: Metadata = {
  title: 'Book a discovery call',
  description:
    'A 25-minute working session with a Sanafin founder: your programme, the outcome it can prove, who would fund it, and whether a two-week pilot fits.',
  alternates: { canonical: '/demo' },
}

export default async function DemoPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const { role } = await searchParams
  return (
    <div className="page-wrapper min-h-screen flex flex-col">
      <Header />
      <main id="main" className="landing-page flex-grow pt-32 md:pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <DemoBooking initialRole={role} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
