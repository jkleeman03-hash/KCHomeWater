import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactCta } from "@/components/site/contact-cta"
import { PageHero } from "@/components/site/page-hero"
import { PricingEstimator } from "@/components/site/pricing-estimator"
import { Section } from "@/components/site/section"
import type { EstimateVariant } from "@/lib/pricing"

// The /pricing page. proxy.ts serves one of two versions of it, gated or open, for the estimator A/B test.
export function PricingView({ variant }: { variant: EstimateVariant }) {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/pricing", label: "Pricing" }]}
        eyebrow="Pricing"
        title="Estimate your price in under a minute"
        cta={false}
        actions={
          <Button asChild variant="outline" size="xl" className="bg-transparent">
            <Link href="/pricing/explained">
              What matters and why?
              <ArrowRightIcon />
            </Link>
          </Button>
        }
        intro="Tell us a few things about your home and we'll show you an estimated price range. Then book a free consultation for a clear, written quote."
      />
      <Section tone="card" className="pt-12 md:pt-16">
        <PricingEstimator variant={variant} />
      </Section>
      <ContactCta />
    </>
  )
}
