"use client"

import Link from "next/link"
import Image from "next/image"
import { Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-20 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Image
              src="/images/sanafin_logo.png"
              alt="Sanafin"
              width={110}
              height={36}
              className="h-9 w-auto mb-6"
              style={{ height: "36px", width: "auto" }}
            />
            <p className="text-sm text-[#8c6a59] leading-relaxed mb-0">
              Reimbursement. Now software.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#2f241f] mb-6">Solutions</p>
            <ul className="space-y-4 text-sm text-[#8c6a59]">
              <li><Link href="/#how" className="text-link hover:text-[#14B8A6]">How it works</Link></li>
              <li><Link href="/#usecases" className="text-link hover:text-[#14B8A6]">Use cases</Link></li>
              <li><Link href="/eden-framework" className="text-link hover:text-[#14B8A6]">EDEN Framework</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#2f241f] mb-6">Support</p>
            <ul className="space-y-4 text-sm text-[#8c6a59]">
              <li><Link href="/#resources" className="text-link hover:text-[#14B8A6]">Resources</Link></li>
              <li><Link href="/#faq" className="text-link hover:text-[#14B8A6]">FAQ</Link></li>
              <li><Link href="/api-docs" className="text-link hover:text-[#14B8A6]">API Documentation</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#2f241f] mb-6">Important Links</p>
            <ul className="space-y-4 text-sm text-[#8c6a59]">
              <li><Link href="/#contact" className="text-link hover:text-[#14B8A6]">Join Beta Waitlist</Link></li>
              <li><Link href="/demo" className="text-link hover:text-[#14B8A6]">Book a Demo</Link></li>
              <li><a href="https://wellfound.com/company/sanafin" target="_blank" rel="noopener noreferrer" className="text-link hover:text-[#14B8A6]">Careers (Wellfound)</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="font-mono text-xs text-[#8c6a59]/60">
              &copy; {new Date().getFullYear()} Sanafin.tech.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-wider text-[#8c6a59]/60">
              <Link href="/imprint" className="text-link hover:text-[#14B8A6]">Imprint</Link>
              <Link href="/privacy" className="text-link hover:text-[#14B8A6]">Privacy Policy</Link>
              <Link href="/terms" className="text-link hover:text-[#14B8A6]">Terms & Compliance</Link>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <p className="font-mono text-xs text-[#8c6a59]/60">
              Every value-based contract, one operating system.
            </p>
            <a
              href="https://linkedin.com/company/sanafin"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-action text-[#8c6a59]/60 flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#14B8A6]/5"
              aria-label="Sanafin on LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
