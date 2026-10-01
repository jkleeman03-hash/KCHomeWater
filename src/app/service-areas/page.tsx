import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon, MapPinIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { PageHero } from "@/components/site/page-hero"
import { QuoteCta } from "@/components/site/quote-cta"
import { Section, SectionHeading } from "@/components/site/section"
import { ServicesGrid } from "@/components/site/services-grid"
import { areas } from "@/lib/areas"

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "KC Home Water serves Kansas City and Jackson County, MO, and Johnson County, KS, with water softeners, filtration, and reverse osmosis.",
  alternates: { canonical: "/service-areas" },
}

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/service-areas", label: "Service Areas" }]}
        eyebrow="Service areas"
        title="Serving the Kansas City metro on both sides of State Line"
        intro="We install water softeners, filtration, and reverse osmosis systems throughout Jackson County, MO and Johnson County, KS. Don't see your city? Reach out anyway and we'll tell you right away."
      />
      <Section>
        <SectionHeading eyebrow="Where we work" title="Choose your county" />
        <div className="grid gap-6 md:grid-cols-2">
          {areas.map((area) => (
            <Card key={area.slug} className="group relative py-8 shadow-[0_10px_30px_-12px_rgba(19,41,75,.25)]">
              <CardContent className="px-7">
                <p className="eyebrow">{area.stateName}</p>
                <h3 className="mb-4 text-2xl">
                  <Link href={`/service-areas/${area.slug}`} className="after:absolute after:inset-0">
                    {area.name}, {area.state}
                  </Link>
                </h3>
                <ul className="mb-6 grid grid-cols-2 gap-2">
                  {area.cities.map((city) => (
                    <li key={city} className="flex items-center gap-2 font-semibold text-navy">
                      <MapPinIcon className="size-4 shrink-0 text-blue" />
                      {city}
                    </li>
                  ))}
                </ul>
                <span className="flex items-center gap-1.5 font-semibold text-blue">
                  Explore {area.name}
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
      <ServicesGrid tone="tint" title="Services available across the metro" />
      <QuoteCta />
    </>
  )
}
