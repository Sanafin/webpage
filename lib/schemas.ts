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

// Client-side validation for the /join interest form (also a mailto, no server).
export const joinSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().toLowerCase().email("Please enter a valid email").max(254),
  studies: z.string().trim().min(2, "What and where do you study?").max(160),
  link: z.string().trim().max(300).optional().or(z.literal("")),
  note: z.string().trim().max(800).optional().or(z.literal("")),
})

export type JoinRequest = z.infer<typeof joinSchema>
