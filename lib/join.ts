// Copy for /join, the page students reach from the QR code at events and from job boards.
// Pay is stated plainly: we are a lean, grant-funded team.

export const joinRoles = [
  {
    id: "bizdev",
    image: "/images/join/bizdev.webp",
    title: "Pilot manager / business development",
    format: "Working student or internship",
    what: "Run our first pilots with insurers, clinics and fitness providers, from first call to agreed result. German or French helps.",
    fit: "MTEC, HSG, economics · German or French a big plus",
  },
  {
    id: "engineer",
    image: "/images/join/engineer.webp",
    title: "Full-stack engineer",
    format: "Internship or working student",
    what: "Build Outcome Studio, our product for agreeing and checking health results.",
    fit: "Computer science · TypeScript, React, Python",
  },
  {
    id: "health-data",
    image: "/images/join/health-data.webp",
    title: "Health data and outcomes analyst",
    format: "Thesis or internship",
    what: "Decide which health results can be measured, and what a fair target is.",
    fit: "Health sciences, HST, epidemiology, statistics",
  },
] as const

export const openApplicationImage = "/images/join/open.webp"

export const thesisTopics = [
  { title: "Pricing a health result", q: "How should a payer price a prevention outcome that pays off years later?", fields: "Finance, economics, MTEC" },
  { title: "Trust in paying for results", q: "What do providers and payers need to see before they sign? An interview study.", fields: "Management, behavioural science" },
] as const

export const joinInterests = [
  ...joinRoles.map((r) => ({ id: r.id, label: r.title })),
  { id: "thesis", label: "Thesis project" },
  { id: "other", label: "Something else" },
] as const
