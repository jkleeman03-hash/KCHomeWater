"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatButton } from "@/components/site/chat-button"
import { scoreEstimate, zipFromAddress, type EstimateInput, type WaterSource } from "@/lib/pricing"

// Runs entirely in the browser: nothing typed here is saved or sent anywhere. Keep it that way, because a second form
// that collects contact details would fail GoHighLevel's A2P 10DLC check (see chat-widget.tsx).

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
    setInput(zip ? { zip, water, bathrooms, residents, taps } : null)
  }

  return (
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
      <p className="text-muted-foreground">Fill in your home details and select Get my estimate.</p>
    </div>
  )
}

// Shows only the price range. The scores behind it stay internal.
function Result({ input }: { input: EstimateInput }) {
  const { price } = scoreEstimate(input)

  return (
    <figure className="animate-rise rounded-2xl border bg-card p-6 shadow-xl shadow-foreground/10 md:p-8">
      <figcaption>
        <p className="eyebrow mb-2">Your estimate</p>
        <p className="font-mono text-3xl font-medium tracking-tight md:text-4xl">
          {money.format(price.low)} – {money.format(price.high)}
        </p>
      </figcaption>
      <p className="mt-5 border-t border-dashed pt-5 text-sm leading-relaxed text-muted-foreground">
        This is an estimate. Your final price comes in a written quote after a free consultation.
      </p>
      <ChatButton className="mt-6 w-full" />
    </figure>
  )
}
