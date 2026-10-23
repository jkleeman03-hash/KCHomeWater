import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/site/page-hero"
import { Section, SectionHeading } from "@/components/site/section"

export const metadata: Metadata = {
  title: "Pricing Explained",
  description:
    "What affects the price of a water softener, filtration, or RO system in Kansas City: city vs. well water, bathrooms, household size, drinking taps, installation, and upkeep.",
  alternates: { canonical: "/pricing/explained" },
}

const factors = [
  {
    title: "City water or well water",
    body: "City water in the Kansas City area is treated and fairly consistent from home to home, so we know what we're working with: hardness, plus chlorine or chloramine. Well water varies much more. It can carry iron, sulfur, sediment, or other minerals that need extra treatment and more setup, so well water raises the estimate.",
  },
  {
    title: "Bathrooms in your home",
    body: "Bathrooms tell us how much water your home can use at once. More showers, toilets, and sinks running at the same time means the system has to move more water per minute without losing pressure. That takes a larger softener and filter tank.",
  },
  {
    title: "Residents in your home",
    body: "More people means more water through the system every day. A bigger household needs a softener with more capacity so it isn't constantly regenerating, and it uses up filter media faster. We size the system to your household so it keeps up without overspending.",
  },
  {
    title: "Drinking taps",
    body: "Reverse osmosis is installed where you drink the water, usually under the kitchen sink. Each additional tap where you want purified water, like a second kitchen sink, a wet bar, or a bathroom, means another system or more line to reach it.",
  },
]

const upkeep = [
  {
    title: "Softener salt",
    body: "Add salt to the brine tank every month or two, depending on household size and water use. We'll show you how to check it.",
  },
  {
    title: "Replacement filters",
    body: "Carbon and RO filters need replacing periodically, usually every 6 to 12 months depending on the stage. You'll get a replacement schedule with your quote, and we can handle filter changes for you.",
  },
  {
    // TODO: confirm check-up frequency and cost with the owner
    title: "Check-ups",
    body: "A periodic check-up keeps your system's settings dialed in and catches small issues before they become big ones.",
  },
]

export default function PricingExplainedPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/pricing", label: "Pricing" },
          { href: "/pricing/explained", label: "Pricing Explained" },
        ]}
        eyebrow="Pricing explained"
        title="What matters and why"
        intro="Every home is different, so we ask a few quick questions before we estimate a price. Here's what each one tells us, plus what to expect from Kansas City water, installation, and upkeep."
        actions={
          <Button asChild size="xl">
            <Link href="/pricing">
              Get my estimate
              <ArrowRightIcon />
            </Link>
          </Button>
        }
      />

      <Section tone="card">
        <SectionHeading eyebrow="The questions we ask" title="Four things that shape your price" />
        <ol className="grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-2">
          {factors.map((factor, i) => (
            <li key={factor.title} className="flex flex-col gap-3 bg-card p-6 md:p-8">
              <span className="font-mono text-sm text-primary" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl">{factor.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{factor.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* TODO: double-check utility details against each utility's latest water quality report (same as areas.ts) */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading eyebrow="Kansas City water" title="Safe to drink, but hard on your home" className="mb-0" />
          <div className="flex flex-col gap-4 leading-relaxed text-muted-foreground">
            <p>
              Most Kansas City-area utilities draw from the Missouri River and treat the water with chloramine.
              Independence draws from wells along the river, and many surrounding cities buy their water from one of
              these systems.
            </p>
            <p>
              The water meets safety standards, but it&apos;s typically moderately hard to hard, and many homeowners
              notice a chemical taste or smell. That&apos;s why most KC homes do best with a softener for hardness and
              carbon filtration for chloramine, plus reverse osmosis at the kitchen tap for the purest drinking water.
            </p>
            <p>
              Your utility&apos;s annual water quality report lists your water&apos;s hardness, and we&apos;re happy
              to help you read it.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="tint">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading eyebrow="Installation" title="Done by a licensed local plumber" className="mb-0" />
          <div className="flex flex-col gap-4 leading-relaxed text-muted-foreground">
            <p>
              Every system is installed by a licensed, insured local plumber we&apos;ve personally vetted. Whole-home
              systems go in at your main water line, often near the water heater, and most installs take a few hours.
            </p>
            <p>
              Tankless reverse osmosis goes under the sink and usually takes one to two hours. It uses a small pump, so
              it needs an outlet under or near the sink.
            </p>
            <p>
              Older homes sometimes need a few extra fittings. We account for that in your written quote, so the price
              doesn&apos;t change on install day.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="card">
        <SectionHeading eyebrow="Maintenance" title="Simple upkeep keeps your water at its best">
          A water system isn&apos;t set-and-forget, but the upkeep is light. Here&apos;s what to plan for.
        </SectionHeading>
        <ul className="grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-3">
          {upkeep.map((item) => (
            <li key={item.title} className="flex flex-col gap-2 bg-card p-6 md:p-8">
              <h3 className="text-lg">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* TODO: confirm once warranty terms are written (same wording as the home page FAQ) */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading eyebrow="Warranty" title="Covered from equipment to install" className="mb-0" />
          <div className="flex flex-col gap-4 leading-relaxed text-muted-foreground">
            <p>
              Equipment is covered by the manufacturer&apos;s warranty, and installation is covered by our workmanship
              guarantee. You&apos;ll get the full details in writing with your quote.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="eyebrow">Your estimate</p>
            <h2 className="text-3xl md:text-5xl">See your price range in under a minute.</h2>
            <p className="mt-6 leading-relaxed text-pretty">
              Answer the same four questions, plus your ZIP code, and we&apos;ll show you an estimated price range.
              Your exact price comes in a written quote.
            </p>
          </div>
          <Button asChild variant="bright" size="xl">
            <Link href="/pricing">
              Get my estimate
              <ArrowRightIcon />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  )
}
