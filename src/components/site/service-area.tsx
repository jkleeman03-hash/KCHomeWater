import Link from "next/link"
import { Button } from "@/components/ui/button"
import { EstimateButton } from "@/components/site/estimate-button"
import { Section } from "@/components/site/section"
import { areas } from "@/lib/areas"
import { serviceArea } from "@/lib/site"

export function ServiceArea() {
  return (
    <Section id="area">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">Service area</p>
          <h2 className="text-3xl md:text-4xl">
            Serving the entire Kansas City metro, on both sides of State Line.
          </h2>
          <p className="mt-4 mb-8 leading-relaxed text-pretty text-muted-foreground">
            From the Northland to Cass County and from Independence to Olathe. Don&apos;t see your city? If it&apos;s in
            the metro, we cover it.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <EstimateButton />
            <Button asChild variant="outline" size="xl" className="bg-transparent">
              <Link href="/service-areas">All service areas</Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 rounded-2xl border bg-secondary p-6 sm:p-8">
          {areas.map((area) => (
            <CityList key={area.slug} href={`/service-areas/${area.slug}`} heading={`${area.name}, ${area.state}`} cities={area.cities} />
          ))}
          <div className="col-span-2">
            <CityList href="/service-areas" heading="And the rest of the metro" cities={serviceArea.restOfMetro} columns />
          </div>
        </div>
      </div>
    </Section>
  )
}

export function CityList({
  href,
  heading,
  cities,
  columns,
}: {
  href: string
  heading: string
  cities: string[]
  columns?: boolean
}) {
  return (
    <div>
      <h3 className="mb-3 font-mono text-xs font-medium tracking-widest text-primary uppercase">
        <Link href={href} className="hover:underline">{heading}</Link>
      </h3>
      <ul className={`grid gap-2 text-sm font-medium ${columns ? "grid-cols-2" : ""}`}>
        {cities.map((city) => (
          <li key={city}>{city}</li>
        ))}
      </ul>
    </div>
  )
}
