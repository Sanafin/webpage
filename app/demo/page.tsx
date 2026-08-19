import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { DemoBooking } from '@/components/demo-booking'

export const metadata: Metadata = {
  title: 'Book a Discovery Call | Sanafin Outcome Studio',
  description: 'Book a 25-minute discovery session to map your Swiss market-access path, metabolic outcomes, and HTA evidence gaps.',
}

export default function DemoPage() {
  return (
    <div className="page-wrapper min-h-screen flex flex-col bg-[#f8f4ef]">
      <Header />
      <main className="flex-grow pt-28 pb-12 relative overflow-hidden md:pt-30 md:pb-14">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(140, 106, 89, 0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(140, 106, 89, 0.09) 1px, transparent 1px)`,
            backgroundSize: '88px 88px',
            maskImage: 'radial-gradient(ellipse 82% 74% at 50% 45%, black 28%, transparent 86%)',
            WebkitMaskImage: 'radial-gradient(ellipse 82% 74% at 50% 45%, black 28%, transparent 86%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <DemoBooking />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
