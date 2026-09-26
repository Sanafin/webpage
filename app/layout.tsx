import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import localFont from 'next/font/local'
import { MotionProvider } from '@/components/motion-provider'
import { site } from '@/lib/site'
import './globals.css'

// One variable font file covers every weight
const geist = localFont({
  src: '../public/fonts/Geist-Variable.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-sans',
  display: 'swap',
})

// Only the legal and framework pages use the serif; never preload it
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: '%s | Sanafin',
  },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body suppressHydrationWarning className={`${geist.variable} ${playfair.variable} font-sans antialiased bg-[#f8f4ef] text-[#2f241f]`}>
        <a href="#main" className="skip-link">Skip to content</a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
