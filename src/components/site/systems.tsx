import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckBadge } from "@/components/site/hero"
import { QuoteLink } from "@/components/site/quote-link"
import { Section, SectionHeading } from "@/components/site/section"
import { cn } from "@/lib/utils"
import type { Interest } from "@/lib/site"

type System = {
  tag: string
  title: string
  price: React.ReactNode
  body: string
  features: string[]
  interest: Interest
  cta: string
  featured?: boolean
}

// TODO: confirm "starting at" prices once pricing is finalized
const systems: System[] = [
  {
    tag: "Whole home",
    title: "Water softener + carbon filter",
    price: <>Starting at <strong>$3,200</strong> installed</>,
    body: "Treats every tap, shower, and appliance in the house. The carbon stage removes chlorine and chloramine taste and odor. The softener stops scale before it starts.",
    features: [
      "Sized to your household and water usage",
      "Protects water heater, fixtures & appliances",
      "Softer-feeling showers and laundry",
      "Installed at your main water line",
    ],
    interest: "Water softener + carbon filter",
    cta: "Quote this system",
  },
  {
    tag: "Kitchen",
    title: "Under-sink reverse osmosis",
    price: <>Starting at <strong>$600</strong> installed</>,
    body: "Bottled-water quality at your kitchen sink. Multi-stage RO filtration reduces dissolved solids and many contaminants for drinking, coffee, and cooking.",
    features: [
      "Dedicated drinking-water faucet",
      "Stop buying and hauling bottled water",
      "Great for coffee, ice, and baby formula",
      "Compact, fits under most sinks",
    ],
    interest: "Under-sink reverse osmosis",
    cta: "Quote this system",
  },
  {
    tag: "Best value",
    title: "The complete package",
    price: <><strong>Bundle &amp; save</strong> same-visit install</>,
    body: "Get the whole-home softener + carbon system and an RO drinking water system installed in the same visit, with a bundle discount.",
    features: [
      "Treated water everywhere, pure water to drink",
      "One install appointment",
      "Bundle discount on combined systems",
      "Financing options available", // TODO: remove until a financing partner is set up
    ],
    interest: "Complete package (softener + RO)",
    cta: "Quote the bundle",
    featured: true,
  },
]

export function Systems() {
  return (
    <Section id="systems" tone="tint">
      <SectionHeading eyebrow="Our systems" title="Two systems that solve most Kansas City water problems.">
        We keep the lineup simple on purpose. You won&apos;t get a 40-page catalog or a surprise upsell. We install
        proven equipment sized for your home.
      </SectionHeading>

      <div className="grid gap-6 lg:grid-cols-3">
        {systems.map((system) => (
          <Card
            key={system.title}
            className={cn(
              "py-8 shadow-[0_10px_30px_-12px_rgba(19,41,75,.25)]",
              system.featured && "ring-2 ring-sun",
            )}
          >
            <CardContent className="flex h-full flex-col px-7">
              <Badge
                className={cn(
                  "mb-4 h-auto rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase",
                  system.featured ? "bg-[#fdf0d3] text-[#8a5d05]" : "bg-tint text-blue",
                )}
              >
                {system.tag}
              </Badge>
              <h3 className="text-lg">{system.title}</h3>
              <p className="my-3 text-sm text-muted-foreground [&_strong]:mx-1 [&_strong]:font-heading [&_strong]:text-3xl [&_strong]:text-navy">
                {system.price}
              </p>
              <p className="mb-5 text-muted-foreground">{system.body}</p>
              <ul className="mb-7 grid gap-2.5">
                {system.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[0.97rem]">
                    <span className="mt-1"><CheckBadge /></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <QuoteLink interest={system.interest} variant={system.featured ? "sun" : "navy"}>
                {system.cta}
              </QuoteLink>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Final price depends on your plumbing, home size, and installation location. You&apos;ll get a written quote
        before any work begins.
      </p>
    </Section>
  )
}
