"use client"

import { useActionState, useEffect, useState } from "react"
import Link from "next/link"
import { CircleCheckIcon, Loader2Icon } from "lucide-react"
import { submitQuote, type QuoteState } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { SELECT_INTEREST_EVENT } from "@/components/site/quote-link"
import { Section } from "@/components/site/section"
import { interestOptions, site, type Interest } from "@/lib/site"

const inputClass = "h-11 rounded-lg bg-[#fbfcfe] px-3.5 text-base md:text-base"

export function QuoteSection({ defaultInterest = interestOptions[0] }: { defaultInterest?: Interest }) {
  return (
    <Section id="quote">
      <div className="grid items-start gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="eyebrow">Free quote</p>
          <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.15]">Get your price. No pressure, no obligation.</h2>
          <p className="mt-4 text-[1.08rem] text-muted-foreground">
            Tell us a little about your home and we&apos;ll get back to you within one business day with a clear
            recommendation and price.
          </p>
          <dl className="mt-7 grid gap-4">
            <ContactLine label="Call or text" href={site.phoneHref} value={site.phoneDisplay} />
            <ContactLine label="Email" href={`mailto:${site.email}`} value={site.email} />
          </dl>
        </div>
        <QuoteForm defaultInterest={defaultInterest} />
      </div>
    </Section>
  )
}

function ContactLine({ label, href, value }: { label: string; href: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold tracking-widest text-muted-foreground uppercase">{label}</dt>
      <dd>
        <a href={href} className="text-xl font-bold text-navy">{value}</a>
      </dd>
    </div>
  )
}

function QuoteForm({ defaultInterest }: { defaultInterest: Interest }) {
  const [state, formAction, pending] = useActionState<QuoteState, FormData>(submitQuote, { status: "idle" })
  const [interest, setInterest] = useState<Interest>(defaultInterest)

  useEffect(() => {
    const onSelect = (e: Event) => setInterest((e as CustomEvent<Interest>).detail)
    window.addEventListener(SELECT_INTEREST_EVENT, onSelect)
    return () => window.removeEventListener(SELECT_INTEREST_EVENT, onSelect)
  }, [])

  const cardClass = "rounded-2xl border bg-white p-6 shadow-[0_10px_30px_-12px_rgba(19,41,75,.25)] sm:p-8"

  if (state.status === "success") {
    return (
      <div className={`${cardClass} text-center`} role="status">
        <CircleCheckIcon className="mx-auto mb-4 size-12 text-blue" />
        <h3 className="mb-2 font-heading text-2xl">Thanks! We got your request.</h3>
        <p className="text-muted-foreground">
          We&apos;ll reach out within one business day. Need us sooner? Call or text{" "}
          <a href={site.phoneHref} className="font-semibold text-navy underline">{site.phoneDisplay}</a>.
        </p>
      </div>
    )
  }

  const errors = state.fieldErrors ?? {}

  return (
    <form action={formAction} className={`${cardClass} grid gap-5`} noValidate>
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Leave this empty <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <Input id="name" name="name" autoComplete="name" required className={inputClass} aria-invalid={!!errors.name} />
        </Field>
        <Field id="phone" label="Phone" error={errors.phone}>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" required className={inputClass} aria-invalid={!!errors.phone} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="Email" error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" required className={inputClass} aria-invalid={!!errors.email} />
        </Field>
        <Field id="zip" label="ZIP code" error={errors.zip}>
          <Input id="zip" name="zip" inputMode="numeric" autoComplete="postal-code" maxLength={5} required className={inputClass} aria-invalid={!!errors.zip} />
        </Field>
      </div>

      <Field id="interest" label="What are you interested in?">
        <Select name="interest" value={interest} onValueChange={(v) => setInterest(v as Interest)}>
          <SelectTrigger id="interest" className={`${inputClass} w-full data-[size=default]:h-11`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {interestOptions.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field id="message" label={<>Anything we should know? <span className="font-normal text-muted-foreground">(optional)</span></>}>
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Home size, number of bathrooms, water issues you've noticed..."
          className="min-h-28 rounded-lg bg-[#fbfcfe] px-3.5 py-3 text-base md:text-base"
        />
      </Field>

      <label className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
        <input type="checkbox" name="smsConsent" className="mt-1 size-4 shrink-0 accent-blue" />
        <span>
          <span className="font-semibold text-navy">Optional:</span> Text me about my quote and appointment. I agree to
          receive text messages from {site.name} at the number above. Message frequency varies. Message &amp; data rates
          may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of purchase.
        </span>
      </label>

      {state.message && <p className="text-sm font-semibold text-destructive" role="alert">{state.message}</p>}

      <Button type="submit" variant="sun" size="xl" disabled={pending} className="w-full">
        {pending && <Loader2Icon className="animate-spin" />}
        {pending ? "Sending..." : "Request my free quote"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        We&apos;ll only use your info to follow up on your quote. We never sell your information. See our{" "}
        <Link href="/privacy" className="underline">Privacy Policy</Link> and{" "}
        <Link href="/terms" className="underline">Terms of Service</Link>.
      </p>
    </form>
  )
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: React.ReactNode
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id} className="text-[0.95rem] font-semibold text-navy">{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
