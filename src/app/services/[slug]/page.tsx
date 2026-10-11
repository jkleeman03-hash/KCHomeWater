import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Faq } from "@/components/site/faq"
import { HowItWorks } from "@/components/site/how-it-works"
import { PageHero } from "@/components/site/page-hero"
import { PointBand, PointCards } from "@/components/site/points"
import { ContactCta } from "@/components/site/contact-cta"
import { ServicesGrid } from "@/components/site/services-grid"
import { getService, services } from "@/lib/services"
import { cn } from "@/lib/utils"

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
          <div
            className={cn(
              "grid items-center gap-6 rounded-2xl border bg-white p-6 shadow-[0_10px_30px_-12px_rgba(19,41,75,.25)] sm:p-8",
              service.image && "sm:grid-cols-[minmax(0,11rem)_1fr]",
            )}
          >
            {service.image && (
              <Image
                src={service.image.src}
                alt={service.image.alt}
                width={service.image.width}
                height={service.image.height}
                priority
                sizes="11rem"
                className="mx-auto h-auto w-40 sm:w-full"
              />
            )}
            <dl className={cn("grid gap-4", !service.image && "sm:grid-cols-2")}>
              {service.atAGlance.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-bold tracking-widest text-muted-foreground uppercase">{item.label}</dt>
                  <dd className="mt-1 font-heading text-lg font-bold text-navy">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />
      <PointCards eyebrow="What you get" title={`Why homeowners choose our ${service.name.toLowerCase()}`} points={service.benefits} />
      <PointBand eyebrow="Why it matters" title="Why it matters for Kansas City homes" points={service.whyItMatters} />
      <HowItWorks />
      <Faq title={`${service.name} questions`} items={service.faqs} />
      <ServicesGrid title="Other ways we can help" excludeSlug={service.slug} />
      <ContactCta />
    </>
  )
}
