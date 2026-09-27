import { z } from "zod"

// Client-side validation for the deck request form. The form composes a mailto
// link, so there is no server counterpart.

export const deckRequestSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  firm: z.string().trim().min(2, "Please enter your firm").max(120),
  email: z.string().trim().toLowerCase().email("Please enter a valid work email").max(254),
  note: z.string().trim().max(500).optional().or(z.literal("")),
})

export type DeckRequest = z.infer<typeof deckRequestSchema>
