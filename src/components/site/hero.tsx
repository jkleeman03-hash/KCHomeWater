import Image from "next/image"
import { CheckIcon, MapPinIcon } from "lucide-react"
import { EstimateButton } from "@/components/site/estimate-button"

const trustPoints = ["Licensed & insured plumbers", "Upfront, written pricing", "Most installs done in one visit"]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-site grid items-center gap-12 pt-12 pb-20 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="flex animate-rise flex-col">
          <p className="eyebrow flex items-center gap-2">
            <MapPinIcon className="size-4" />
            Serving the entire Kansas City metro
          </p>
          <h1 className="text-4xl leading-tight md:text-6xl md:leading-[1.05]">
            Whole home water filtration for cleaner, better-tasting Kansas City water
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
            KC Home Water helps homeowners enjoy softer, cleaner, better-tasting water. We install water softeners,
            whole-home carbon filters, well water treatment, and reverse osmosis drinking water systems for homes on
            city or well water. You
            get honest recommendations, upfront pricing, and a licensed local plumber for the install.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <EstimateButton />
          </div>
          <ul className="mt-10 grid max-w-lg gap-4 border-t pt-6 sm:grid-cols-3">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm font-medium">
                <CheckBadge />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <HeroArt />
      </div>
    </section>
  )
}

export function CheckBadge() {
  return <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2.5} />
}

function HeroArt() {
  return (
    <div className="relative aspect-[4/5] w-full animate-rise overflow-hidden rounded-2xl bg-muted [animation-delay:150ms] sm:aspect-square lg:aspect-[4/5]">
      <Image
        src="/images/drinking-filtered-water.jpg"
        alt="Woman drinking a glass of filtered water in her kitchen"
        fill
        priority
        sizes="(min-width: 1024px) 520px, 100vw"
        className="object-cover object-[50%_30%]"
      />
    </div>
  )
}
