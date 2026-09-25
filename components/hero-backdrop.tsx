import { heroVideo } from "@/lib/media"

// Layered dark backdrop: optional video, drifting colour fields, fine grid and grain.
export function HeroBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[#120d0b]" />

      {heroVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-45 motion-reduce:hidden"
          src={heroVideo.src}
          poster={heroVideo.poster}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* Drifting colour fields */}
      <div className="aurora-blob absolute -top-[20%] left-[8%] h-[70vh] w-[70vh] rounded-full bg-[#f15d22]/35 blur-[120px]" />
      <div className="aurora-blob aurora-blob--slow absolute top-[25%] -right-[10%] h-[65vh] w-[65vh] rounded-full bg-[#14B8A6]/25 blur-[130px]" />
      <div className="aurora-blob aurora-blob--reverse absolute -bottom-[30%] left-[35%] h-[60vh] w-[60vh] rounded-full bg-[#b83305]/30 blur-[140px]" />

      {/* Fine grid, fading out from the centre */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fffaf6 1px, transparent 1px), linear-gradient(to bottom, #fffaf6 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 10%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 10%, transparent 75%)",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Fade into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#120d0b]" />
    </div>
  )
}
