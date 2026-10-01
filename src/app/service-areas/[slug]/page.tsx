import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MapPinIcon } from "lucide-react"
import { Faq } from "@/components/site/faq"
import { PageHero } from "@/components/site/page-hero"
import { PointBand, PointCards } from "@/components/site/points"
import { QuoteSection } from "@/components/site/quote-form"
import { Section, SectionHeading } from "@/components/site/section"
import { ServicesGrid } from "@/components/site/services-grid"
import { areas, getArea } from "@/lib/areas"

export const dynamicParams = false

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }))
}

export async function generateMetadata({ params }: PageProps<"/service-areas/[slug]">): Promise<Metadata> {
  const area = getArea((await params).slug)
  if (!area) return {}
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: { canonical: `/service-areas/${area.slug}` },
  }
}

export default async function AreaPage({ params }: PageProps<"/service-areas/[slug]">) {
  const area = getArea((await params).slug)
  if (!area) notFound()

  return (
    <>
      <PageHero
        crumbs={[
          { href: "/service-areas", label: "Service Areas" },
          { href: `/service-areas/${area.slug}`, label: `${area.name}, ${area.state}` },
        ]}
        eyebrow={`${area.name}, ${area.stateName}`}
        title={area.headline}
        intro={area.intro}
      />
      <Section>
        <SectionHeading eyebrow="Communities" title={`Cities we serve in ${area.name}`} />
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {area.cities.map((city) => (
            <li key={city} className="flex items-center gap-3 rounded-xl border bg-tint px-5 py-4 font-semibold text-navy">
              <MapPinIcon className="size-5 shrink-0 text-blue" />
              {city}, {area.state}
            </li>
          ))}
        </ul>
      </Section>
      <PointBand eyebrow="Local water" title={area.water.title} points={area.reasons}>
        {area.water.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </PointBand>
      <ServicesGrid tone="tint" title={`Water treatment services in ${area.name}`} />
      <PointCards
        eyebrow="Why KC Home Water"
        title={`A better way to buy water treatment in ${area.name}`}
        points={[
          {
            title: "Upfront, written pricing",
            body: "You'll know exactly what's included and what it costs before any work starts.",
          },
          {
            title: "Licensed & insured installers",
            body: "Every install is done by a licensed local plumber we've personally vetted.",
          },
          {
            title: "Right-sized, not oversold",
            body: "We recommend what your home actually needs, even when that's the smaller system.",
          },
        ]}
      />
      <Faq title={`${area.name} water questions`} items={area.faqs} />
      <QuoteSection />
    </>
  )
}
