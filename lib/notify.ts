// Transactional email and contact capture through Plunk (open source, AGPL;
// self-hostable or hosted at useplunk.com). Two env vars: PLUNK_SECRET_KEY and
// DECK_NOTIFY_TO. Nothing here logs personal data.

const API = process.env.PLUNK_API_URL ?? "https://api.useplunk.com/v1"
const TIMEOUT_MS = 8000

async function post(path: string, secret: string, body: unknown): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    return await fetch(`${API}${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timer)
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string)
}

// Emails the owner about a deck request and sends the requester a short
// confirmation. The owner replies personally with the deck.
export async function notifyDeckRequest(
  secret: string,
  to: string,
  input: { email: string; name: string; firm: string; note?: string; source?: string },
): Promise<Response> {
  const rows = [
    ["Name", input.name],
    ["Firm", input.firm],
    ["Email", input.email],
    ["Note", input.note || "—"],
    ["Source", input.source ?? "investors"],
  ]
  const body = `<p>New deck request from sanafin.tech.</p><table>${rows
    .map(([k, v]) => `<tr><td style="padding:2px 12px 2px 0;color:#766d67">${k}</td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table><p>Reply to ${escapeHtml(input.email)} with the view-only link.</p>`

  const owner = await post("/send", secret, {
    to,
    subject: `Deck request: ${input.name}, ${input.firm}`,
    body,
    subscribed: false,
  })
  if (!owner.ok) return owner

  // Confirmation to the requester; failure here must not fail the request
  await post("/send", secret, {
    to: input.email,
    subject: "Your Sanafin deck request",
    body: `<p>Thank you, ${escapeHtml(input.name.split(/\s+/)[0])}.</p><p>Wasu Mekniran, CEO, will send you the deck personally within one working day.</p><p>Sanafin · Outcome-based payment for digital health</p>`,
    subscribed: false,
  }).catch(() => undefined)

  return owner
}

// Adds an email to the product-updates contacts (marketing consent given).
export async function subscribeContact(secret: string, input: { email: string; source?: string; audience?: string }): Promise<Response> {
  return post("/contacts", secret, {
    email: input.email,
    subscribed: true,
    data: { source: input.source ?? "Product updates form", audience: input.audience ?? "" },
  })
}
