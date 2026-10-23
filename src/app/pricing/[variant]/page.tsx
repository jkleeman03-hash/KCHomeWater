import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { estimateVariants, type EstimateVariant } from "@/lib/pricing"
import { metadata as pricingMetadata } from "../page"
import { PricingView } from "../pricing-view"

// The two versions of /pricing in the estimator A/B test. Visitors reach them through the proxy.ts rewrite and still
// see /pricing in the address bar. Both versions keep the /pricing canonical, and they must not be noindex: Google sees
// them at /pricing itself.
export const dynamicParams = false

export function generateStaticParams() {
  return estimateVariants.map((variant) => ({ variant }))
}

export const metadata: Metadata = pricingMetadata

export default async function PricingVariantPage({ params }: PageProps<"/pricing/[variant]">) {
  const { variant } = await params
  if (!estimateVariants.includes(variant as EstimateVariant)) notFound()
  return <PricingView variant={variant as EstimateVariant} />
}
