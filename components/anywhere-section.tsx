import { Fn } from "@/components/fn"
import { Reveal } from "@/components/reveal"
import { DrawPath, Pop, Words } from "@/components/fx"
import world from "@/lib/world-dots.json"

// The punch line as a picture: one contract template on a dotted world map (Wise /
// Klarna pattern). Zurich is where the template runs today, the black pins are the
// founders' network, and the hollow pins are illustrative configurations of the same
// four fields, never customers. Dots are
// precomputed with dotted-map into lib/world-dots.json, so no map library ships.

type PinKey = keyof typeof world.pins
type Kind = "live" | "network" | "example"
// Which side of the pin the label sits on; Zurich, Amsterdam and Berlin are close
// enough that each needs its own side.
type Side = "right" | "left" | "top" | "bottom"

const pins: { key: PinKey; city: string; note: string; kind: Kind; side: Side }[] = [
  { key: "zurich", city: "Zurich", note: "Type 2 diabetes · where we started", kind: "live", side: "bottom" },
  { key: "amsterdam", city: "Amsterdam", note: "Network", kind: "network", side: "left" },
  { key: "berlin", city: "Berlin", note: "Network", kind: "network", side: "top" },
  { key: "bangkok", city: "Bangkok", note: "Network", kind: "network", side: "bottom" },
  { key: "tokyo", city: "Tokyo", note: "Network", kind: "network", side: "left" },
  { key: "minnesota", city: "Minnesota", note: "Network", kind: "network", side: "right" },
  { key: "australia", city: "Australia", note: "Network", kind: "network", side: "left" },
  { key: "riyadh", city: "Riyadh", note: "Weight management", kind: "example", side: "right" },
  { key: "saopaulo", city: "São Paulo", note: "Prediabetes prevention", kind: "example", side: "right" },
]

const sideClass: Record<Side, string> = {
  right: "-translate-y-1/2 pl-3 sm:pl-4",
  left: "-translate-x-full -translate-y-1/2 pr-3 sm:pr-4",
  top: "-translate-x-1/2 -translate-y-full pb-2.5",
  bottom: "-translate-x-1/2 pt-3",
}

const legend: { kind: Kind; label: string }[] = [
  { kind: "live", label: "Where we started" },
  { kind: "network", label: "Our network" },
  { kind: "example", label: "Illustrative configuration, not a customer" },
]

function Dot({ kind }: { kind: Kind }) {
  if (kind === "live") return <span className="h-2.5 w-2.5 rounded-full bg-[#14b8a6] ring-4 ring-[#14b8a6]/20" />
  if (kind === "network") return <span className="h-2 w-2 rounded-full bg-[#1f1a17]" />
  return <span className="h-2 w-2 rounded-full border border-[#1f1a17] bg-[#fbfaf8]" />
}

const fields = ["Payer", "Pathway", "Threshold", "Price per verified unit"]

const signals = [
  { region: "Germany", text: "App prices tied to performance", sourceId: "sgb5-134" },
  { region: "Switzerland", text: "Outcome rebates on medicines", sourceId: "kvg-52b" },
  { region: "United States", text: "Chronic care paid on blood sugar and weight", sourceId: "cms-access" },
]

// A gentle arc between two map points, bowed upwards
function arc([x1, y1]: number[], [x2, y2]: number[]) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.28
  return `M${x1},${y1} Q${mx},${my} ${x2},${y2}`
}

export function AnywhereSection() {
  const { width, height, dots } = world
  const origin = world.pins.zurich

  return (
    <section id="anywhere" aria-labelledby="anywhere-title" className="relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <h2 id="anywhere-title" className="font-display text-4xl sm:text-5xl leading-[1.04] text-[#1f1a17] mb-5">
            <Words text="The care changes. The contract stays." />
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-[#574e48]">
            One contract template with four fields. No local claims system or bank needed. A payer in Zurich, Riyadh or
            São Paulo funds the same care in its own currency.
          </p>
        </Reveal>

        <Reveal className="relative overflow-hidden rounded-[32px] bg-[#f5f1ed] px-4 pb-6 pt-6 sm:px-10 sm:pb-8 sm:pt-12">
          <div className="relative mx-auto max-w-5xl">
            {/* On phones the map is drawn at 135% and cropped to Minnesota–Australia, so the pins stay legible */}
            <div className="relative -ml-[27%] w-[135%] sm:ml-0 sm:w-full">
            <svg viewBox={`0 0 ${width} ${height}`} className="block h-auto w-full" role="img" aria-label="Dotted world map: Zurich highlighted, network pins in Amsterdam, Berlin, Bangkok, Tokyo, Minnesota and Australia, illustrative pins in Riyadh and São Paulo">
              <g fill="#d9d1ca">
                {dots.map(([x, y]) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r={0.3} />
                ))}
              </g>
              <g fill="none" stroke="#1f1a17" strokeOpacity="0.4" strokeWidth="0.18" strokeDasharray="0.6 0.6">
                {pins
                  .filter((p) => Math.abs(world.pins[p.key][0] - origin[0]) > 6)
                  .map((p, i) => (
                    <DrawPath key={p.key} d={arc(origin, world.pins[p.key])} delay={0.3 + i * 0.12} duration={1.6} />
                  ))}
              </g>
              {pins.map((p, i) => {
                const [x, y] = world.pins[p.key]
                const delay = p.kind === "live" ? 0 : 0.5 + i * 0.12
                if (p.kind === "live")
                  return (
                    <Pop key={p.key} delay={delay}>
                      <circle cx={x} cy={y} r={1.8} fill="#14b8a6" fillOpacity="0.2" />
                      <circle cx={x} cy={y} r={0.75} fill="#14b8a6" />
                    </Pop>
                  )
                if (p.kind === "network")
                  return (
                    <Pop key={p.key} delay={delay}>
                      <circle cx={x} cy={y} r={0.55} fill="#1f1a17" />
                    </Pop>
                  )
                return (
                  <Pop key={p.key} delay={delay}>
                    <circle cx={x} cy={y} r={0.6} fill="#fbfaf8" stroke="#1f1a17" strokeWidth="0.22" />
                  </Pop>
                )
              })}
            </svg>

            {/* Labels as HTML so they stay crisp and readable at any width */}
            {pins.map((p, i) => {
              const [x, y] = world.pins[p.key]
              const live = p.kind === "live"
              return (
                <Reveal
                  key={p.key}
                  className={`absolute ${sideClass[p.side]}`}
                  delay={live ? 0.2 : 0.7 + i * 0.12}
                  style={{ left: `${(x / width) * 100}%`, top: `${(y / height) * 100}%` }}
                >
                  <div className={`whitespace-nowrap rounded-xl px-2 py-1 shadow-[0_6px_20px_-10px_rgba(47,36,31,0.35)] sm:px-2.5 sm:py-1.5 ${live ? "bg-[#1f1a17] text-white" : "bg-white text-[#1f1a17]"}`}>
                    <p className="text-[12px] font-medium leading-tight sm:text-[13px]">{p.city}</p>
                    {p.kind !== "network" && (
                      <p className={`hidden text-[12px] leading-tight sm:block ${live ? "text-[#5eead4]" : "text-[#6f6660]"}`}>{p.note}</p>
                    )}
                  </div>
                </Reveal>
              )
            })}
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 sm:mt-8">
            <ol className="flex flex-wrap items-center justify-center gap-1.5" aria-label="The four fields of every contract">
              {fields.map((f, i) => (
                <li key={f} className="flex items-center gap-1.5">
                  <span className="rounded-full border border-[#e3dcd5] bg-white px-3 py-1 font-mono text-[12px] text-[#1f1a17]">{f}</span>
                  {i < fields.length - 1 && <span className="text-[#b5aaa0]" aria-hidden="true">+</span>}
                </li>
              ))}
            </ol>
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
              {legend.map((l) => (
                <li key={l.kind} className="flex items-center gap-2 text-[12px] text-[#6f6660]">
                  <Dot kind={l.kind} />
                  {l.label}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <p className="mt-10 mb-4 text-center text-[13px] text-[#6f6660]">Payers are already writing outcomes into law</p>
        <ul className="grid gap-5 text-center sm:grid-cols-3">
          {signals.map((s) => (
            <li key={s.sourceId}>
              <p className="text-[13px] text-[#6f6660]">{s.region} · 2026</p>
              <p className="mt-1 text-[15px] text-[#1f1a17]">
                {s.text}
                <Fn id={s.sourceId} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
