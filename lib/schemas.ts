import { z } from "zod"

// Shared between the forms (validate on blur) and the API routes (validate again).

export const deckRequestSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  firm: z.string().trim().min(2, "Please enter your firm").max(120),
  email: z.string().trim().toLowerCase().email("Please enter a valid work email").max(254),
  note: z.string().trim().max(500).optional().or(z.literal("")),
  // Honeypot: real visitors never fill this in
  website: z.string().max(0).optional().or(z.literal("")),
  source: z.enum(["hero", "investors", "closing", "demo", "header", "footer"]).optional(),
})

export type DeckRequest = z.infer<typeof deckRequestSchema>

export const accessRequestSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter a valid email").max(254),
  website: z.string().max(0).optional().or(z.literal("")),
  source: z.string().trim().max(60).optional(),
  audience: z.string().trim().max(40).optional(),
})
