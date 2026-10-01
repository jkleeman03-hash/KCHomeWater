"use server"

import { interestOptions, site } from "@/lib/site"

export type QuoteState = {
  status: "idle" | "success" | "error"
  message?: string
  fieldErrors?: Partial<Record<"name" | "phone" | "email" | "zip", string>>
}

const field = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim()

export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  // Honeypot: real visitors never fill this hidden field, bots usually do.
  if (field(formData, "company")) return { status: "success" }

  const lead = {
    name: field(formData, "name").slice(0, 100),
    phone: field(formData, "phone").slice(0, 30),
    email: field(formData, "email").slice(0, 200),
    zip: field(formData, "zip"),
    interest: field(formData, "interest"),
    message: field(formData, "message").slice(0, 2000),
    smsConsent: formData.get("smsConsent") === "on",
  }

  const fieldErrors: QuoteState["fieldErrors"] = {}
  if (!lead.name) fieldErrors.name = "Please enter your name."
  if (lead.phone.replace(/\D/g, "").length < 10) fieldErrors.phone = "Please enter a 10-digit phone number."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) fieldErrors.email = "Please enter a valid email."
  if (!/^\d{5}$/.test(lead.zip)) fieldErrors.zip = "Please enter a 5-digit ZIP code."
  if (Object.keys(fieldErrors).length) return { status: "error", fieldErrors }

  if (!(interestOptions as readonly string[]).includes(lead.interest)) {
    lead.interest = "Not sure yet, help me decide"
  }

  const lines = [
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `ZIP: ${lead.zip}`,
    `Interested in: ${lead.interest}`,
    `Text messages: ${lead.smsConsent ? `opted in (${new Date().toISOString()})` : "did not opt in"}`,
    "",
    lead.message || "(no message)",
  ]

  // Send to every configured destination. The lead counts as delivered if any one of them accepts it.
  const destinations = [
    process.env.RESEND_API_KEY && process.env.QUOTE_TO_EMAIL ? sendEmail(lead, lines) : null,
    process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID ? sendToGoHighLevel(lead, lines) : null,
  ].filter((d) => d !== null)

  if (!destinations.length) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[quote] No delivery configured. Lead received:", lead)
      return { status: "success" }
    }
    console.error("[quote] Neither Resend nor GoHighLevel is configured. Lead NOT delivered:", lead)
    return failure()
  }

  const results = await Promise.allSettled(destinations)
  for (const r of results) if (r.status === "rejected") console.error("[quote]", r.reason, lead)
  if (!results.some((r) => r.status === "fulfilled")) return failure()

  return { status: "success" }
}

type Lead = {
  name: string
  phone: string
  email: string
  zip: string
  interest: string
  message: string
  smsConsent: boolean
}

async function sendEmail(lead: Lead, lines: string[]) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.QUOTE_FROM_EMAIL ?? "KC Home Water <onboarding@resend.dev>",
      to: [process.env.QUOTE_TO_EMAIL],
      reply_to: lead.email,
      subject: `New quote request: ${lead.name} (${lead.zip})`,
      text: lines.join("\n"),
    }),
  })
  if (!res.ok) throw new Error(`Resend error ${res.status}: ${await res.text()}`)
}

// GoHighLevel API v2 with a Private Integration token (scope: contacts.write).
async function sendToGoHighLevel(lead: Lead, lines: string[]) {
  const ghl = (path: string, body: unknown) =>
    fetch(`https://services.leadconnectorhq.com${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GHL_API_KEY}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })

  const [firstName, ...rest] = lead.name.split(/\s+/)
  const digits = lead.phone.replace(/\D/g, "")

  // Upsert matches an existing contact by email/phone, so repeat visitors don't create duplicates.
  const res = await ghl("/contacts/upsert", {
    locationId: process.env.GHL_LOCATION_ID,
    firstName,
    lastName: rest.join(" ") || undefined,
    email: lead.email,
    phone: digits.length === 10 ? `+1${digits}` : `+${digits}`,
    postalCode: lead.zip,
    source: "kchomewater.com quote form",
  })
  if (!res.ok) throw new Error(`GoHighLevel upsert error ${res.status}: ${await res.text()}`)
  const { contact } = (await res.json()) as { contact: { id: string } }

  // Tags are added separately because upsert would replace any tags the contact already has.
  const extras = await Promise.all([
    ghl(`/contacts/${contact.id}/tags`, {
      tags: ["website lead", `interest: ${lead.interest}`, ...(lead.smsConsent ? ["sms opt-in"] : [])],
    }),
    ghl(`/contacts/${contact.id}/notes`, { body: `Website quote request\n\n${lines.join("\n")}` }),
  ])
  for (const r of extras) {
    if (!r.ok) console.error("[quote] GoHighLevel tag/note error", r.status, await r.text())
  }
}

function failure(): QuoteState {
  return {
    status: "error",
    message: `Sorry, something went wrong sending your request. Please call or text us at ${site.phoneDisplay}.`,
  }
}
