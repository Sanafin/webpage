import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CallBooking } from '@/components/call-booking'

export const metadata: Metadata = {
  title: 'Book a discovery call',
  description:
    'A 25-minute working session with a Sanafin founder: your programme, the outcome it can prove, who would fund it, and whether a two-week pilot fits.',
  alternates: { canonical: '/call' },
}

// Static: the optional ?role= preselection is read on the client inside CallBooking,
// so this page is prerendered and served from the asset cache like the rest of the site.
export default function CallPage() {
  return (
    <div className="page-wrapper min-h-screen flex flex-col">
      <Header />
      <main id="main" className="landing-page flex-grow pt-32 md:pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* The fallback is the full page without the ?role= preselection, so the
              prerendered HTML carries the content and hydration only adds the role. */}
          <Suspense fallback={<CallBooking />}>
            <CallBooking readRoleFromUrl />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
