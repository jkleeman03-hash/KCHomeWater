import type { Metadata } from "next"
import { ContactCta } from "@/components/site/contact-cta"
import { PageHero } from "@/components/site/page-hero"
import { PricingEstimator } from "@/components/site/pricing-estimator"
import { Section } from "@/components/site/section"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Estimate the cost of a water softener, whole-home filtration, or tankless RO system for your Kansas City home in under a minute.",
  alternates: { canonical: "/pricing" },
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/pricing", label: "Pricing" }]}
        eyebrow="Pricing"
        title="Estimate your price in under a minute"
        cta={false}
        intro="Tell us a few things about your home and we'll show you an estimated price range. Then book a free consultation for a clear, written quote."
      />
      <Section tone="card" className="pt-12 md:pt-16">
        <PricingEstimator />
      </Section>
      <ContactCta />
    </>
  )
}
