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

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.QUOTE_TO_EMAIL

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[quote] Email not configured. Lead received:", lead)
      return { status: "success" }
    }
    console.error("[quote] RESEND_API_KEY / QUOTE_TO_EMAIL not set. Lead NOT delivered:", lead)
    return failure()
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.QUOTE_FROM_EMAIL ?? "KC Home Water <onboarding@resend.dev>",
      to: [to],
      reply_to: lead.email,
      subject: `New quote request: ${lead.name} (${lead.zip})`,
      text: [
        `Name: ${lead.name}`,
        `Phone: ${lead.phone}`,
        `Email: ${lead.email}`,
        `ZIP: ${lead.zip}`,
        `Interested in: ${lead.interest}`,
        "",
        lead.message || "(no message)",
      ].join("\n"),
    }),
  })

  if (!res.ok) {
    console.error("[quote] Resend error", res.status, await res.text(), lead)
    return failure()
  }

  return { status: "success" }
}

function failure(): QuoteState {
  return {
    status: "error",
    message: `Sorry, something went wrong sending your request. Please call or text us at ${site.phoneDisplay}.`,
  }
}
