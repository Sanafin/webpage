// Copy for /join, the page students reach from the QR code at events and from job boards.
// Pay is stated plainly: we are a lean, grant-funded team.

export const joinRoles = [
  {
    id: "engineer",
    title: "Full-stack engineer",
    format: "Internship or working student",
    what: "Build Outcome Studio, our product for agreeing and checking health results.",
    fit: "Computer science · TypeScript, React, Python",
  },
  {
    id: "health-data",
    title: "Health data and outcomes analyst",
    format: "Thesis or internship",
    what: "Decide which health results can be measured, and what a fair target is.",
    fit: "Health sciences, HST, epidemiology, statistics",
  },
  {
    id: "bizdev",
    title: "Business development and partnerships",
    format: "Working student or internship",
    what: "Talk to insurers, clinics and fitness providers. German or French helps.",
    fit: "MTEC, HSG, economics · German or French a big plus",
  },
  {
    id: "growth",
    title: "Growth and content",
    format: "Internship",
    what: "Landing pages, short videos and LinkedIn that bring in sign-ups.",
    fit: "Marketing, design, video",
  },
] as const

export const thesisTopics = [
  { title: "Pricing a health result", q: "How should a payer price a prevention outcome that pays off years later?", fields: "Finance, economics, MTEC" },
  { title: "Checking results automatically", q: "Which rules and data sources can confirm an agreed health result without manual review?", fields: "Computer science, data science, health sciences" },
  { title: "Who benefits from prevention?", q: "Who pays and who saves in Swiss diabetes or cardiovascular prevention?", fields: "Health economics, public health" },
  { title: "Blended finance for prevention", q: "How can grants, insurers and impact investors share the risk of paying for results?", fields: "Sustainable finance" },
  { title: "Trust in paying for results", q: "What do providers and payers need to see before they sign? An interview study.", fields: "Management, behavioural science" },
  { title: "Fitness and longevity as health spending", q: "Can workplace or insurer-funded fitness be paid by result?", fields: "Sports science, HST, business" },
] as const

export const joinInterests = [
  ...joinRoles.map((r) => ({ id: r.id, label: r.title })),
  { id: "thesis", label: "Thesis project" },
  { id: "other", label: "Something else" },
] as const
