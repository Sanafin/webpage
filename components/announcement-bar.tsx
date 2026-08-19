"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function AnnouncementBar() {
  return (
    <div className="bg-[#1a2530] text-white w-full border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center justify-center gap-4">
        <p 
          className="font-sans text-[11px] font-medium !text-white"
          style={{ color: '#ffffff', opacity: 1 }}
        >
          🏆 Sanafin named winner of the InnoBooster Sustainable Digital Finance Award
        </p>
        <Link 
          href="https://ibsdf.ch/" 
          target="_blank"
          rel="noopener noreferrer"
          className="action-primary group bg-[#14B8A6] text-black px-3 py-0.5 rounded-full font-sans text-[10px] font-bold hover:bg-[#2dd4bf] flex items-center gap-1.5"
        >
          View 
          <span className="text-[12px] leading-none transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </div>
  )
}
