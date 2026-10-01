import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Faq } from "@/components/site/faq"
import { HowItWorks } from "@/components/site/how-it-works"
import { PageHero } from "@/components/site/page-hero"
import { PointBand, PointCards } from "@/components/site/points"
import { QuoteSection } from "@/components/site/quote-form"
import { ServicesGrid } from "@/components/site/services-grid"
import { getService, services } from "@/lib/services"

export const dynamicParams = false

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug)
  if (!service) return {}
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  }
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug)
  if (!service) notFound()

  return (
    <>
      <PageHero
        crumbs={[
          { href: "/services", label: "Services" },
          { href: `/services/${service.slug}`, label: service.name },
        ]}
        eyebrow={service.name}
        title={service.headline}
        intro={service.intro}
        aside={
          <dl className="grid gap-4 rounded-2xl border bg-white p-6 shadow-[0_10px_30px_-12px_rgba(19,41,75,.25)] sm:grid-cols-2 sm:p-8">
            {service.atAGlance.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-bold tracking-widest text-muted-foreground uppercase">{item.label}</dt>
                <dd className="mt-1 font-heading text-lg font-bold text-navy">{item.value}</dd>
              </div>
            ))}
          </dl>
        }
      />
      <PointCards eyebrow="What you get" title={`Why homeowners choose our ${service.name.toLowerCase()}`} points={service.benefits} />
      <PointBand eyebrow="Why it matters" title="Why it matters for Kansas City homes" points={service.whyItMatters} />
      <HowItWorks />
      <Faq title={`${service.name} questions`} items={service.faqs} />
      <ServicesGrid title="Other ways we can help" excludeSlug={service.slug} />
      <QuoteSection defaultInterest={service.interest} />
    </>
  )
}
