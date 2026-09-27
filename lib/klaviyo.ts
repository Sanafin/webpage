// Thin wrappers around the Klaviyo API used by the two form routes. Nothing here
// logs personal data; callers log outcome codes only.

const REVISION = "2026-04-15"
const TIMEOUT_MS = 8000

function headers(apiKey: string) {
  return {
    Authorization: `Klaviyo-API-Key ${apiKey}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    revision: REVISION,
  }
}

async function post(url: string, apiKey: string, body: unknown): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    return await fetch(url, { method: "POST", headers: headers(apiKey), body: JSON.stringify(body), signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

// Records a "Deck Requested" event on the investor's profile. No marketing consent
// is set: this is a transactional request the CEO answers personally. The owner's
// notification is a Klaviyo flow triggered by this metric.
export async function trackDeckRequested(
  apiKey: string,
  input: { email: string; name: string; firm: string; note?: string; source?: string },
): Promise<Response> {
  const [firstName, ...rest] = input.name.split(/\s+/)
  const day = new Date().toISOString().slice(0, 10)
  const uniqueId = `deck-${await sha256Hex(`${input.email}:${day}`)}`

  return post("https://a.klaviyo.com/api/events/", apiKey, {
    data: {
      type: "event",
      attributes: {
        metric: { data: { type: "metric", attributes: { name: "Deck Requested" } } },
        profile: {
          data: {
            type: "profile",
            attributes: {
              email: input.email,
              first_name: firstName,
              last_name: rest.join(" ") || undefined,
              organization: input.firm,
              properties: { investor_firm: input.firm },
            },
          },
        },
        properties: {
          firm: input.firm,
          note: input.note || undefined,
          source: input.source ?? "investors",
          page: "/",
        },
        unique_id: uniqueId,
        time: new Date().toISOString(),
      },
    },
  })
}

// Subscribes an email to the product-updates list with marketing consent.
export async function subscribeToUpdates(
  apiKey: string,
  listId: string,
  input: { email: string; source?: string; audience?: string },
): Promise<Response> {
  return post("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/", apiKey, {
    data: {
      type: "profile-subscription-bulk-create-job",
      attributes: {
        custom_source: input.source ?? "Product updates form",
        profiles: {
          data: [
            {
              type: "profile",
              attributes: {
                email: input.email,
                properties: input.audience ? { audience: input.audience } : undefined,
                subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } },
              },
            },
          ],
        },
      },
      relationships: { list: { data: { type: "list", id: listId } } },
    },
  })
}
