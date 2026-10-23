"use server"

import { estimateVariants, isZip, priceRange, type EstimateInput, type EstimateVariant } from "@/lib/pricing"

// Saves each estimate as a GoHighLevel contact, so we can follow up even if the visitor never books.
// Needs two Vercel env vars: GHL_TOKEN (a Private Integration token with contacts read/write) and GHL_LOCATION_ID.
// The phone number is for calls only: no SMS consent is collected here, so don't add this contact to any texting
// workflow (A2P 10DLC).

export type Lead = { name: string; phone: string; email: string }

const api = "https://services.leadconnectorhq.com"

export async function saveEstimate(lead: Lead, input: EstimateInput, variant: EstimateVariant) {
  const token = process.env.GHL_TOKEN
  const locationId = process.env.GHL_LOCATION_ID
  if (!token || !locationId) {
    console.warn("saveEstimate: GHL_TOKEN or GHL_LOCATION_ID is not set, so this estimate was not saved")
    return
  }

  // Check everything again here, since anyone can call this action directly.
  const name = lead.name.trim().slice(0, 100)
  const phone = toE164(lead.phone)
  const email = lead.email.trim().slice(0, 200)
  if (!name || !phone || (email && !isEmail(email)) || !isZip(input.zip) || !estimateVariants.includes(variant))
    return

  const [firstName, ...rest] = name.split(/\s+/)
  const plus = (n: number, max: number) => (n >= max ? `${max} or more` : String(n))
  const water = input.water === "city" ? "City water" : "Well water"
  const range = priceRange(input)
  // Same custom fields the Quote Call form fills. estimate_address now holds the ZIP, since we no longer ask for the
  // street address.
  const fields = {
    estimate_address: input.zip,
    water_source: water,
    bathrooms: plus(input.bathrooms, 4),
    residents: plus(input.residents, 4),
    drinking_taps: plus(input.taps, 3),
    estimate_range: range,
  }

  const headers = { Authorization: `Bearer ${token}`, Version: "2021-07-28", "Content-Type": "application/json" }
  try {
    const res = await fetch(`${api}/contacts/upsert`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        locationId,
        firstName,
        lastName: rest.join(" ") || undefined,
        phone,
        email: email || undefined,
        postalCode: input.zip,
        source: "Website pricing estimator",
        customFields: Object.entries(fields).map(([key, field_value]) => ({ key, field_value })),
      }),
    })
    if (!res.ok) throw new Error(`upsert ${res.status}: ${await res.text()}`)
    const { contact } = await res.json()

    // Tags go on separately: upsert replaces a returning contact's tags, but this adds to them.
    // estimate-gated or estimate-open compares the two versions in the A/B test.
    const tagged = await fetch(`${api}/contacts/${contact.id}/tags`, {
      method: "POST",
      headers,
      body: JSON.stringify({ tags: ["estimate", `estimate-${variant}`] }),
    })
    if (!tagged.ok) throw new Error(`tags ${tagged.status}: ${await tagged.text()}`)

    // A readable copy on the contact, in case a custom field key doesn't match.
    await fetch(`${api}/contacts/${contact.id}/notes`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        body: [
          `Website estimate: ${range}`,
          `ZIP ${input.zip}, ${water}`,
          `${fields.bathrooms} bathrooms, ${fields.residents} residents, ${fields.drinking_taps} drinking taps`,
        ].join("\n"),
      }),
    })
  } catch (err) {
    console.error("saveEstimate failed", err)
  }
}

// US numbers only. Returns +1XXXXXXXXXX, or null.
function toE164(phone: string) {
  const digits = phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "")
  return /^[2-9]\d{2}[2-9]\d{6}$/.test(digits) ? `+1${digits}` : null
}

function isEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
