import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckBadge } from "@/components/site/hero"
import { ChatButton } from "@/components/site/chat-button"
import { Section, SectionHeading } from "@/components/site/section"
import { cn } from "@/lib/utils"

type System = {
  tag: string
  title: string
  body: string
  features: string[]
  cta: string
  featured?: boolean
}

const systems: System[] = [
  {
    tag: "Whole home",
    title: "Water softener + carbon filter",
    body: "Treats every tap, shower, and appliance in the house. The carbon stage removes chlorine and chloramine taste and odor. The softener stops scale before it starts.",
    features: [
      "Sized to your household and water usage",
      "Protects water heater, fixtures & appliances",
      "Softer-feeling showers and laundry",
      "Installed at your main water line",
    ],
    cta: "Ask about this system",
  },
  {
    tag: "Kitchen",
    title: "Under-sink reverse osmosis",
    body: "Bottled-water quality at your kitchen sink. Multi-stage RO filtration reduces dissolved solids and many contaminants for drinking, coffee, and cooking.",
    features: [
      "Improved taste for drinking water",
      "Dedicated drinking-water faucet",
      "Stop buying and hauling bottled water",
      "Great for coffee, ice, and baby formula",
      "Compact, fits under most sinks",
    ],
    cta: "Ask about this system",
  },
  {
    tag: "Best value",
    title: "The complete package",
    body: "Get the whole-home softener + carbon system and an RO drinking water system installed in the same visit, with a bundle discount.",
    features: [
      "Treated water everywhere, pure water to drink",
      "One install appointment",
      "Bundle discount on combined systems",
      "Financing options available", // TODO: remove until a financing partner is set up
    ],
    cta: "Ask about the bundle",
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
              <p className="mt-3 mb-5 text-muted-foreground">{system.body}</p>
              <ul className="mb-7 grid gap-2.5">
                {system.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[0.97rem]">
                    <span className="mt-1"><CheckBadge /></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <ChatButton variant={system.featured ? "sun" : "navy"} className="mt-auto w-full">
                {system.cta}
              </ChatButton>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Every home is different, so pricing depends on your plumbing, home size, and installation location. You&apos;ll
        get a free written quote before any work begins.
      </p>
    </Section>
  )
}
