// Copy for /join, the page students reach from the QR code at events and from job boards.
// Pay is stated plainly: we are a lean, grant-funded team.

export const joinRoles = [
  {
    id: "engineer",
    title: "Full-stack engineer",
    format: "Internship or founding team",
    what: "Build Sanafin Outcome Studio: the guided builder, the outcome checks and the agreement flow.",
    fit: "Computer science · TypeScript, React, Python",
  },
  {
    id: "health-data",
    title: "Health data and outcomes analyst",
    format: "Thesis or internship",
    what: "Build the benchmark library: which health results can be measured, how, and what a fair target is.",
    fit: "Health sciences, HST, epidemiology, statistics",
  },
  {
    id: "bizdev",
    title: "Business development and partnerships",
    format: "Working student or internship",
    what: "Talk to insurers, clinics and prevention or fitness providers, and turn interest into pilots.",
    fit: "MTEC, HSG, economics · German or French a big plus",
  },
  {
    id: "growth",
    title: "Growth and content",
    format: "Internship",
    what: "Run the self-service funnel: landing pages, short videos, LinkedIn and sign-up conversion.",
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

export const joinOffer = [
  { format: "Thesis", detail: "Unpaid, as theses are. A real topic with data, and help finding an ETH or HSG supervisor." },
  { format: "Research project", detail: "Short and paid by the hour: user and payer interviews, a small market study." },
  { format: "Internship", detail: "Real ownership of one piece of the product or go-to-market. A modest stipend where funds allow." },
  { format: "Founding team", detail: "For the right person after a trial project: shares that vest over four years." },
] as const

export const joinInterests = [
  ...joinRoles.map((r) => ({ id: r.id, label: r.title })),
  { id: "thesis", label: "Thesis project" },
  { id: "other", label: "Something else" },
] as const
