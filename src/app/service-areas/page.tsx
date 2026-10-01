import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon, MapPinIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { PageHero } from "@/components/site/page-hero"
import { ContactCta } from "@/components/site/contact-cta"
import { Section, SectionHeading } from "@/components/site/section"
import { ServicesGrid } from "@/components/site/services-grid"
import { areas } from "@/lib/areas"
import { serviceArea } from "@/lib/site"

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "KC Home Water serves the entire Kansas City metro, on both the Missouri and Kansas sides, with water softeners, filtration, and reverse osmosis.",
  alternates: { canonical: "/service-areas" },
}

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/service-areas", label: "Service Areas" }]}
        eyebrow="Service areas"
        title="Serving the entire Kansas City metro"
        intro="We install water softeners, filtration, and reverse osmosis systems all across the Kansas City metro, on both sides of State Line. If your home is in the metro, we cover it."
      />
      <Section>
        <SectionHeading eyebrow="Where we work" title="All of the Kansas City metro" />
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
        <div className="mt-6 rounded-2xl bg-tint p-7">
          <h3 className="mb-4 text-2xl">And the rest of the metro</h3>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {serviceArea.restOfMetro.map((city) => (
              <li key={city} className="flex items-center gap-2 font-semibold text-navy">
                <MapPinIcon className="size-4 shrink-0 text-blue" />
                {city}
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <ServicesGrid tone="tint" title="Services available across the metro" />
      <ContactCta />
    </>
  )
}
