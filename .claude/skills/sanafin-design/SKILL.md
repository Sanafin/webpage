---
name: sanafin-design
description: Design system and UX/UI review rules for sanafin.tech. Load before changing any page, section or component, and before reviewing screenshots. Encodes the brand tokens, the section grammar that keeps the page from feeling templated, the honesty rules for numbers and imagery, and the review procedure.
---

# Sanafin design skill

The page sells trust to pre-seed investors first and to Swiss digital-health buyers second. It must look like a
company that already exists, not like a generated landing page. Read this before editing `app/` or `components/`,
and run the review at the end against real screenshots, never against the code alone.

## 1. Brand system (tokens live in `app/globals.css`)

| Role | Value | Use |
|---|---|---|
| Paper | `#fbfaf8` / `#f8f4ef` | page background |
| Plate | `#f5f1ed` | at most one plate group per screen |
| Ink | `#1f1a17` | headings, body emphasis |
| Ink soft | `rgba(31,26,23,.45)` | second line of a two-tone heading only |
| Muted | `#766d67` (min) / `#6f6660` | body, captions; never lighter than `#766d67` on paper |
| Orange | `#f15d22` (hover `#d94f18`) | the primary button and at most one other accent per screen |
| Teal | `#14b8a6` fill, `#0f766e` text | "verified / pass" states and the film legend only |
| Type | Geist variable (`--font-sans`), display weight 400, `-0.035em` | one family; Playfair italic is allowed as an accent voice in at most two places on the page |
| Radius | 24 px containers, 16–18 px inner cards, 9999 buttons | |
| Motion | fade-up 0.7 s `[0.16,1,0.3,1]`, once, section-level only | never on every child |

Two CTA labels exist: **Book a discovery call** (orange) and **Request the deck** (ink). Never a third.

## 2. Section grammar (the anti-template rules)

A page reads as designed when consecutive sections use different sentence structures. Available structures:

- **Editorial** – heading + one paragraph at ≤ 60ch, no container, generous top and bottom space.
- **Stat row** – 3 large numerals with one-line captions and footnotes; no cards around them if the row above or below already uses cards.
- **Split** – text column + one visual (film, screenshot, still); the visual is the hero of the section.
- **List** – rows separated by hairlines (`border-[#ece7e2]`), no cards; used for timelines, publications, partners, FAQ.
- **Bento** – tiles on plates; reserved for the product, once.
- **Band** – one full-width image or plate with a short message; used for the closing, once.

Rules:
1. No two consecutive sections may share the same structure. Two card grids in a row is the most common failure.
2. One eyebrow style, in muted grey, and only where the section title does not already say what the section is. Orange is not a label colour.
3. Two-tone headings (ink + soft ink) in at most four sections; the others get a single-colour heading, sometimes shorter than one line.
4. Label budget: at most one "illustrative / example data" note per section, placed once, in a caption; never as chips.
5. Pacing: alternate long and short sections. At least two sections on the page should fit in under 60 % of a 900 px viewport.
6. Right-column paragraphs are capped at `max-w-md` (≈ 60ch). Headings wrap to at most three lines at 1280 px.
7. Whitespace does the grouping before borders do; borders before backgrounds; backgrounds before shadows.
8. Icons are used only when they carry meaning a word cannot (sources, LinkedIn). Decorative lucide icons are removed.
9. **Fintech-in-healthcare texture.** Every screen carries one technical artefact that could only come from this product: a ledger with tabular mono figures, the verification certificate, the terminal output of a verification run, an API response, a clinical value with its threshold. Calm layout is not the same as a brochure; without these the page stops feeling like software.
10. **A face early.** A real person appears within the first three screens (founder note, portrait beside a quote from the deck). Team cards alone, seven screens down, do not give the company a face.
11. One dark technical panel per page is allowed and encouraged (the terminal); it is the product's voice, not a decoration.

## 3. Honesty rules (enforced by `scripts/check-copy.mjs`)

- Every figure carries `<Fn id>` into `lib/sources.ts` or is labelled "Sanafin estimate" / "illustrative".
- Never: escrow, blockchain/EVM/L2, round size, TAM/SAM, guarantee, real-time, HIPAA, SOC 2, "Backed by".
- No fake logos, testimonials, people or UI presented as customer data. Generated stills are metaphors and are captioned as such; the product preview says "example data" inside the frame.
- Partners under NDA stay anonymised (`named: false` in `lib/traction.ts`).

## 4. Imagery

- World: cream linen, pale oak, brushed brass, one teal and one amber marble, soft north light. Slots live in `lib/media.ts`; every component renders a plain plate when a slot is `null`.
- Prefer one real artefact per screen over a generated one when it exists: a product screenshot, the film, a portrait.
- Never people, coins, pills, flags, or UI in generated images.

## 5. Review procedure (do this before every commit that touches the page)

1. Build, start, capture `/` at 1440×900, 1280×800 and 390×844 (`scratchpad/shots9.mjs` pattern) and read the images.
2. Walk the sections top to bottom and write down each one's structure from §2. Fix any repeat.
3. Count orange elements per viewport; more than two means labels are doing layout's job.
4. Check the first screen: headline, CTAs and proof line above the fold at 1280×800, product frame at least 60 % visible.
5. Check three Mobbin references for the section you changed (`mcp__Mobbin__search_sections`) and name what they do that the section does not.
6. Run `node scripts/check-copy.mjs`, `pnpm exec tsc --noEmit`, `pnpm build`.

A change that improves a section but makes it look like its neighbours is not an improvement.
