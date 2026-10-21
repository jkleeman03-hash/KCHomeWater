"use client"

import { useState } from "react"
import Script from "next/script"
import { track } from "@vercel/analytics"
import { MessageSquareIcon, PhoneIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { site } from "@/lib/site"
import { isCoreZip, scoreEstimate, zipFromAddress, type EstimateInput, type WaterSource } from "@/lib/pricing"

// The estimate runs in the browser. Nothing is sent anywhere unless the visitor books a call: then their answers and
// price range ride along in the calendar link and fill hidden fields on the GHL "Quote Call" form, so they're saved on
// the contact for the call.
// Once it shows, visitors can call or text us, or book their quote call on the GoHighLevel calendar below it.
// The calendar collects a phone number for calls only: its form has no SMS consent checkbox and its SMS notifications
// are off, so it isn't a second texting opt-in for A2P 10DLC (see chat-widget.tsx). Call and text links just open the
// visitor's own phone app.

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

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export function PricingEstimator() {
  const [address, setAddress] = useState("")
  const [water, setWater] = useState<WaterSource>("city")
  const [bathrooms, setBathrooms] = useState(2)
  const [residents, setResidents] = useState(2)
  const [taps, setTaps] = useState(1)
  const [input, setInput] = useState<EstimateInput | null>(null)
  const [zipError, setZipError] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const zip = zipFromAddress(address)
    setZipError(!zip)
    setInput(zip ? { address: address.trim(), zip, water, bathrooms, residents, taps } : null)
    // Anonymous funnel events for Vercel Analytics. Never send the address or ZIP.
    if (zip) track("Estimate completed", { area: isCoreZip(zip) ? "Jackson/Johnson" : "Other", water })
  }

  return (
    <>
      <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-7 rounded-2xl border bg-card p-6 md:p-10">
          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="text-sm font-medium">
              Address
            </label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="street-address"
              placeholder="123 Main St, Lee's Summit, MO 64063"
              aria-invalid={zipError}
              aria-describedby={zipError ? "address-error" : undefined}
              className="h-11"
            />
            {zipError && (
              <p id="address-error" className="text-xs text-destructive">
                Please include your 5-digit ZIP code.
              </p>
            )}
          </div>
          <Choice legend="City water or well water?" name="water" options={waterOptions} value={water} onChange={setWater} />
          <Choice legend="Bathrooms in home" name="bathrooms" options={bathroomOptions} value={bathrooms} onChange={setBathrooms} />
          <Choice legend="Residents in home" name="residents" options={residentOptions} value={residents} onChange={setResidents} />
          <Choice legend="Number of drinking taps" name="taps" options={tapOptions} value={taps} onChange={setTaps} />
          <Button type="submit" size="xl">
            Get my estimate
          </Button>
        </form>

        <div aria-live="polite" className="lg:sticky lg:top-28">
          {input ? <Result input={input} /> : <EmptyResult />}
        </div>
      </div>
      {input && site.bookingCalendarUrl && <BookingCalendar url={bookingUrl(site.bookingCalendarUrl, input)} />}
    </>
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

function EmptyResult() {
  return (
    <div className="rounded-2xl border border-dashed p-8 text-center">
      <p className="eyebrow mb-2">Your estimate</p>
      <p className="text-muted-foreground">Fill in your home details, get your estimate, and book a time.</p>
    </div>
  )
}

// Shows only the price range. The scores behind it stay internal.
function priceRange(input: EstimateInput) {
  const { price } = scoreEstimate(input)
  return `${money.format(price.low)} – ${money.format(price.high)}`
}

// Query keys must match the hidden fields' query keys on the GHL "Quote Call" form.
function bookingUrl(base: string, input: EstimateInput) {
  const url = new URL(base)
  // "or more" rather than "+", because GHL turns a "+" into a space
  const plus = (n: number, max: number) => (n >= max ? `${max} or more` : String(n))
  url.searchParams.set("estimate_address", input.address)
  url.searchParams.set("water_source", input.water === "city" ? "City water" : "Well water")
  url.searchParams.set("bathrooms", plus(input.bathrooms, 4))
  url.searchParams.set("residents", plus(input.residents, 4))
  url.searchParams.set("drinking_taps", plus(input.taps, 3))
  url.searchParams.set("estimate_range", priceRange(input))
  return url.toString()
}

function Result({ input }: { input: EstimateInput }) {
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
      <p className="mt-6 text-sm font-medium">Get your exact quote:</p>
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
