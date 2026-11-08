"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ActCare } from "@/components/demo/act-care"
import { ActCommit } from "@/components/demo/act-commit"
import { ActSettle } from "@/components/demo/act-settle"
import { ActVerify, type Scenario } from "@/components/demo/act-verify"
import { Rail } from "@/components/demo/rail"
import { usePlayer } from "@/components/demo/use-player"
import { getContract, getMonthly, getPatients, getRules, getWalkthrough } from "@/lib/demo/data"

// One contract, start to finish. /demo shows every artefact the product produces;
// the landing page passes `compact`, which gives each act one artefact and half the
// text, in a lower frame.
const FULL = [
  { id: "commit", number: "01", label: "Commit", seconds: 9 },
  { id: "care", number: "02", label: "Care", seconds: 14 },
  { id: "verify", number: "03", label: "Verify", seconds: 13 },
  { id: "settle", number: "04", label: "Settle", seconds: 10 },
] as const
const COMPACT = [
  { id: "commit", number: "01", label: "Commit", seconds: 7 },
  { id: "care", number: "02", label: "Care", seconds: 9 },
  { id: "verify", number: "03", label: "Verify", seconds: 9 },
  { id: "settle", number: "04", label: "Settle", seconds: 7 },
] as const
const ACTS = FULL

const walk = getWalkthrough()
const monthly = getMonthly()
const patients = getPatients()
const rules = getRules()

// Deep links: /demo#verify or /demo#settle:fail open that step at its final frame.
function fromHash(): { act: number; scenario: Scenario } | null {
  if (typeof window === "undefined") return null
  const m = window.location.hash.match(/^#(commit|care|verify|settle)(?::(pass|fail))?$/)
  if (!m) return null
  return { act: ACTS.findIndex((a) => a.id === m[1]), scenario: (m[2] as Scenario) ?? "pass" }
}

export function Walkthrough({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion() ?? false
  const stageRef = useRef<HTMLDivElement>(null)
  const acts = compact ? COMPACT : FULL
  const { act, t, playing, finished, goTo, open, restart, togglePlay } = usePlayer(acts, stageRef, reduce)
  const [scenario, setScenario] = useState<Scenario>("pass")

  const pass = getContract(walk.passContractId)!
  const fail = getContract(walk.failContractId)!
  const contract = scenario === "pass" ? pass : fail

  useEffect(() => {
    const h = fromHash()
    if (!h) return
    setScenario(h.scenario)
    open(h.act)
  }, [open])

  // Changing scenario replays the current act so the swap is visible.
  function onScenario(s: Scenario) {
    if (s === scenario) return
    setScenario(s)
    restart()
  }

  return (
    <div
      ref={stageRef}
      className="overflow-hidden rounded-3xl border border-[#ece7e2] bg-[#fbfaf8] shadow-[0_40px_100px_-50px_rgba(47,36,31,0.5)]"
    >
      <Rail acts={acts} act={act} t={t} playing={playing} finished={finished} onToggle={togglePlay} onGoTo={goTo} />

      {/* Stage: a fixed canvas from lg up, so the frame never grows or shrinks between
          acts. Shorter acts sit centred; below lg the acts stack and the frame follows. */}
      <div className={`flex flex-col px-4 py-6 sm:px-8 sm:py-8 lg:overflow-y-auto ${compact ? "lg:h-[520px] xl:h-[480px]" : "lg:h-[780px] xl:h-[720px]"}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${act}-${scenario}`}
            className="my-auto w-full"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {act === 0 && <ActCommit t={t} data={walk.commitment} compact={compact} />}
            {act === 1 && <ActCare t={t} monthly={monthly} patients={patients} rules={rules} compact={compact} />}
            {act === 2 && <ActVerify t={t} contract={contract} scenario={scenario} onScenario={onScenario} compact={compact} />}
            {act === 3 && <ActSettle t={t} contract={contract} compact={compact} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
