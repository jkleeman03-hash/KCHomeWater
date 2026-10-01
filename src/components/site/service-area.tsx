import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/site/section"
import { areas } from "@/lib/areas"

export function ServiceArea() {
  return (
    <Section id="area">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">Service area</p>
          <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.15]">
            Serving the Kansas City metro on both sides of State Line.
          </h2>
          <p className="mt-4 mb-7 text-muted-foreground">
            Don&apos;t see your city? Reach out anyway. If we can&apos;t serve you yet, we&apos;ll tell you right away.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="navy" size="xl">
              <a href="#quote">Check my address</a>
            </Button>
            <Button asChild variant="navy-outline" size="xl">
              <Link href="/service-areas">All service areas</Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 rounded-2xl bg-tint p-6 sm:p-8">
          {areas.map((area) => (
            <CityList key={area.slug} href={`/service-areas/${area.slug}`} heading={`${area.name}, ${area.state}`} cities={area.cities} />
          ))}
        </div>
      </div>
    </Section>
  )
}

export function CityList({ href, heading, cities }: { href: string; heading: string; cities: string[] }) {
  return (
    <div>
      <h3 className="mb-3 text-sm tracking-widest text-blue uppercase">
        <Link href={href} className="hover:underline">{heading}</Link>
      </h3>
      <ul className="grid gap-2 font-semibold text-navy">
        {cities.map((city) => (
          <li key={city}>{city}</li>
        ))}
      </ul>
    </div>
  )
}
