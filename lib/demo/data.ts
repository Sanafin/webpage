// Synchronous accessors over the committed fixture file. Safe to import from client
// components (the walkthrough) and from the server. Only this module knows the JSON.
import raw from "./fixtures.json"
import type { Contract, Fixtures, MonthlyPoint, PatientRow, Rule, Walkthrough } from "./types"

const fixtures = raw as unknown as Fixtures

export const getFixturesMeta = () => fixtures.meta
export const getTemplate = () => fixtures.template
export const getRules = (): Rule[] => fixtures.rules
export const getRelease = () => fixtures.release
export const getMonthly = (): MonthlyPoint[] => fixtures.monthly
export const getPatients = (): PatientRow[] => fixtures.patients
export const getContracts = (): Contract[] => fixtures.contracts
export const getContract = (id: string): Contract | undefined => fixtures.contracts.find((c) => c.id === id)
export const getWalkthrough = (): Walkthrough => fixtures.walkthrough

// Formatting helpers shared by the walkthrough and the app shell.
// The site writes amounts as "CHF 180,000" everywhere, so the app does too.
export const chf = (n: number, opts: Intl.NumberFormatOptions = {}) =>
  `CHF ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0, ...opts }).format(n)}`
export const shortHash = (h: string | null | undefined, n = 12) => (h ? `${h.replace(/^0x/, "").slice(0, n)}…` : "—")
export const verdictLabel = (v: string) =>
  v === "meets_wzw" ? "meets" : v === "insufficient" ? "insufficient" : v === "borderline" ? "borderline" : v
