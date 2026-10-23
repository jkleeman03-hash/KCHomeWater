"use client"

import { useState } from "react"
import Script from "next/script"
import { track } from "@vercel/analytics"
import { MessageSquareIcon, PhoneIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { site } from "@/lib/site"
import { saveEstimate, type Lead } from "@/app/pricing/actions"
import { isCoreZip, isZip, priceRange, type EstimateInput, type EstimateVariant, type WaterSource } from "@/lib/pricing"

// An A/B test (see proxy.ts) shows each visitor one of two versions:
// - "gated": name, phone, and optional email are required, along with the ZIP, before the estimate shows.
// - "open": the estimate shows with just the ZIP, and a short form beside the price asks for their details.
// Either way the details are saved as a GHL contact tagged "estimate" and "estimate-<variant>" (see actions.ts), so we
// can call them back even if they don't book, and compare how many leads each version brings in. Their answers and
// price range also ride along in the calendar link and fill hidden fields on the GHL "Quote Call" form.
// Once it shows, visitors can call or text us, or book their quote call on the GoHighLevel calendar below it.
// Both this form and the calendar collect a phone number for calls only: no SMS consent checkbox, and the calendar's
// SMS notifications are off, so neither is a second texting opt-in for A2P 10DLC (see chat-widget.tsx). Call and text
// links just open the visitor's own phone app.

const waterOptions: { value: WaterSource; label: string }[] = [
  { value: "city", label: "City water" },
  { value: "well", label: "Well water" },
]
const bathroomOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4+" },
]
const residentOptions = bathroomOptions
const tapOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3+" },
]

export function PricingEstimator({ variant }: { variant: EstimateVariant }) {
  const gated = variant === "gated"
  const [lead, setLead] = useState<Lead>({ name: "", phone: "", email: "" })
  const [leadSaved, setLeadSaved] = useState(false)
  const [zip, setZip] = useState("")
  const [water, setWater] = useState<WaterSource>("city")
  const [bathrooms, setBathrooms] = useState(2)
  const [residents, setResidents] = useState(2)
  const [taps, setTaps] = useState(1)
  const [input, setInput] = useState<EstimateInput | null>(null)
  const [errors, setErrors] = useState<Errors>({})

  // Shows the estimate right away; saving it to GHL happens in the background.
  function submitLead(next: EstimateInput) {
    void saveEstimate(lead, next, variant)
    setLeadSaved(true)
    track("Lead submitted", { variant })
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Bots fill the hidden "company" field; people never see it.
    if (new FormData(e.currentTarget).get("company")) return
    const found = { ...(gated ? validateLead(lead) : {}), ...(isZip(zip) ? {} : { zip: "Please enter your 5-digit ZIP code." }) }
    setErrors(found)
    if (Object.keys(found).length) return
    const next = { zip, water, bathrooms, residents, taps }
    setInput(next)
    if (gated) submitLead(next)
    // Anonymous funnel events for Vercel Analytics. Never send the name, phone, email, or ZIP.
    track("Estimate completed", { area: isCoreZip(zip) ? "Jackson/Johnson" : "Other", water, variant })
  }

  return (
    <>
      <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-7 rounded-2xl border bg-card p-6 md:p-10">
          {gated && <LeadFields lead={lead} onChange={setLead} errors={errors} />}
          <Field id="zip" label="ZIP code" error={errors.zip}>
            <Input
              id="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="64063"
              {...fieldProps("zip", errors)}
            />
          </Field>
          <Honeypot />
          <Choice legend="City water or well water?" name="water" options={waterOptions} value={water} onChange={setWater} />
          <Choice legend="Bathrooms in home" name="bathrooms" options={bathroomOptions} value={bathrooms} onChange={setBathrooms} />
          <Choice legend="Residents in home" name="residents" options={residentOptions} value={residents} onChange={setResidents} />
          <Choice legend="Number of drinking taps" name="taps" options={tapOptions} value={taps} onChange={setTaps} />
          <Button type="submit" size="xl">
            Get my estimate
          </Button>
        </form>

        <div aria-live="polite" className="lg:sticky lg:top-28">
          {input ? (
            <Result input={input}>
              {!gated && (
                <LeadRequest
                  lead={lead}
                  onChange={setLead}
                  saved={leadSaved}
                  onSubmit={() => submitLead(input)}
                />
              )}
            </Result>
          ) : (
            <EmptyResult gated={gated} />
          )}
        </div>
      </div>
      {input && site.bookingCalendarUrl && (
        <BookingCalendar url={bookingUrl(site.bookingCalendarUrl, leadSaved ? lead : null, input)} />
      )}
    </>
  )
}

// The open version's ask, shown under the price.
function LeadRequest({
  lead,
  onChange,
  saved,
  onSubmit,
}: {
  lead: Lead
  onChange: (lead: Lead) => void
  saved: boolean
  onSubmit: () => void
}) {
  const [errors, setErrors] = useState<Errors>({})

  if (saved) {
    return (
      <p className="mt-6 rounded-lg bg-secondary p-4 text-sm font-medium">
        Thanks, {lead.name.trim().split(/\s+/)[0]}. We&apos;ll call you soon with your exact quote.
      </p>
    )
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (new FormData(e.currentTarget).get("company")) return
    const found = validateLead(lead)
    setErrors(found)
    if (!Object.keys(found).length) onSubmit()
  }

  return (
    <form onSubmit={submit} noValidate className="mt-6 flex flex-col gap-5 border-t border-dashed pt-6">
      <p className="text-sm font-medium">Want your exact quote? We&apos;ll call you.</p>
      <LeadFields lead={lead} onChange={onChange} errors={errors} />
      <Honeypot />
      <Button type="submit" size="xl">
        Get my quote
      </Button>
    </form>
  )
}

function LeadFields({ lead, onChange, errors }: { lead: Lead; onChange: (lead: Lead) => void; errors: Errors }) {
  const set = (key: keyof Lead) => (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...lead, [key]: e.target.value })
  return (
    <>
      <Field id="name" label="Name" error={errors.name}>
        <Input id="name" value={lead.name} onChange={set("name")} autoComplete="name" {...fieldProps("name", errors)} />
      </Field>
      <Field id="phone" label="Phone" error={errors.phone} hint="We'll only use it to call you. We won't text you.">
        <Input
          id="phone"
          type="tel"
          value={lead.phone}
          onChange={set("phone")}
          autoComplete="tel"
          placeholder="(816) 555-0123"
          {...fieldProps("phone", errors)}
        />
      </Field>
      <Field id="email" label="Email (optional)" error={errors.email}>
        <Input
          id="email"
          type="email"
          value={lead.email}
          onChange={set("email")}
          autoComplete="email"
          {...fieldProps("email", errors)}
        />
      </Field>
    </>
  )
}

// Hidden from people and screen readers; bots fill it in.
function Honeypot() {
  return <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
}

type Errors = Partial<Record<keyof Lead | "zip", string>>

function validateLead(lead: Lead): Errors {
  const errors: Errors = {}
  const digits = lead.phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "")
  if (!lead.name.trim()) errors.name = "Please enter your name."
  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(digits)) errors.phone = "Please enter a 10-digit phone number."
  if (lead.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim()))
    errors.email = "Please check your email address."
  return errors
}

function fieldProps(id: keyof Errors, errors: Errors) {
  return { "aria-invalid": !!errors[id], "aria-describedby": errors[id] ? `${id}-error` : undefined, className: "h-11" }
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : (
        hint && <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  )
}

function Choice<T extends string | number>({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string
  name: string
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-sm font-medium">{legend}</legend>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2.5 text-center text-sm transition-colors has-checked:border-primary has-checked:bg-secondary has-checked:font-medium has-focus-visible:ring-2 has-focus-visible:ring-ring"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={option.value === value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function EmptyResult({ gated }: { gated: boolean }) {
  return (
    <div className="rounded-2xl border border-dashed p-8 text-center">
      <p className="eyebrow mb-2">Your estimate</p>
      <p className="text-muted-foreground">{gated ? "Fill in your details" : "Answer a few questions"}, get your estimate, and book a time.</p>
    </div>
  )
}

// Query keys must match the hidden fields' query keys on the GHL "Quote Call" form.
function bookingUrl(base: string, lead: Lead | null, input: EstimateInput) {
  const url = new URL(base)
  // Prefill the contact fields so they don't type them twice
  if (lead) {
    const [firstName, ...rest] = lead.name.trim().split(/\s+/)
    url.searchParams.set("first_name", firstName)
    if (rest.length) url.searchParams.set("last_name", rest.join(" "))
    url.searchParams.set("phone", lead.phone)
    if (lead.email.trim()) url.searchParams.set("email", lead.email.trim())
  }
  // "or more" rather than "+", because GHL turns a "+" into a space
  const plus = (n: number, max: number) => (n >= max ? `${max} or more` : String(n))
  // estimate_address now holds the ZIP, since we no longer ask for the street address
  url.searchParams.set("estimate_address", input.zip)
  url.searchParams.set("water_source", input.water === "city" ? "City water" : "Well water")
  url.searchParams.set("bathrooms", plus(input.bathrooms, 4))
  url.searchParams.set("residents", plus(input.residents, 4))
  url.searchParams.set("drinking_taps", plus(input.taps, 3))
  url.searchParams.set("estimate_range", priceRange(input))
  return url.toString()
}

function Result({ input, children }: { input: EstimateInput; children?: React.ReactNode }) {
  const range = priceRange(input)
  // "?&body=" works on both iPhone and Android
  const smsHref = `sms:${site.phoneHref.replace("tel:", "")}?&body=${encodeURIComponent(
    `Hi, I got an estimate of ${range} on your website (ZIP ${input.zip}). I'd like my exact quote.`,
  )}`

  return (
    <figure className="animate-rise rounded-2xl border bg-card p-6 shadow-xl shadow-foreground/10 md:p-8">
      <figcaption>
        <p className="eyebrow mb-2">Your estimate</p>
        <p className="font-mono text-3xl font-medium tracking-tight md:text-4xl">
          {range}
        </p>
      </figcaption>
      <p className="mt-5 border-t border-dashed pt-5 text-sm leading-relaxed text-muted-foreground">
        This is an estimate. Your final price comes in a written quote after a free consultation.
      </p>
      {children}
      <p className="mt-6 text-sm font-medium">{children ? "Or reach us now:" : "Get your exact quote:"}</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Button asChild size="xl" variant={site.bookingCalendarUrl ? "outline" : "default"}>
          <a href={site.phoneHref} onClick={() => track("Call clicked", { from: "estimate" })}>
            <PhoneIcon />
            Call us
          </a>
        </Button>
        <Button asChild size="xl" variant="outline">
          <a href={smsHref} onClick={() => track("Text clicked", { from: "estimate" })}>
            <MessageSquareIcon />
            Text us
          </a>
        </Button>
      </div>
      {site.bookingCalendarUrl && (
        <Button asChild size="xl" className="mt-3 w-full">
          <a href="#book" onClick={() => track("Book a call clicked")}>
            Book a call
          </a>
        </Button>
      )}
      <p className="mt-4 text-center font-mono text-xs text-muted-foreground">{site.phoneDisplay}</p>
    </figure>
  )
}

function BookingCalendar({ url }: { url: string }) {
  return (
    <div id="book" className="mt-16 scroll-mt-24 animate-rise border-t pt-16">
      <div className="mb-8 max-w-2xl">
        <p className="eyebrow">Next step</p>
        <h2 className="text-3xl md:text-4xl">Pick a time for your quote call</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          We&apos;ll call at the time you choose, confirm a few details, and give you your exact written price.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          We only use your phone number to call you at your scheduled time. We won&apos;t text you.
        </p>
      </div>
      <div className="overflow-hidden rounded-2xl border bg-card">
        {/* id comes from GHL's embed code; its resize script matches on it */}
        <iframe
          id="2rIMIhjlH2KQdj8ps8bw_1792514793675"
          src={url}
          title="Book your quote call"
          allow="payment"
          scrolling="no"
          className="h-[720px] w-full overflow-hidden border-0"
        />
      </div>
      {/* GHL's script that resizes the calendar iframe to fit its content */}
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </div>
  )
}
