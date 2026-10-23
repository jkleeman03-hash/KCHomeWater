import type { Metadata } from "next"
import { PricingView } from "./pricing-view"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Estimate the cost of a water softener, whole-home filtration, or tankless RO system for your Kansas City home in under a minute.",
  alternates: { canonical: "/pricing" },
}

// proxy.ts rewrites /pricing to /pricing/gated or /pricing/open, so this only shows if the proxy doesn't run.
export default function PricingPage() {
  return <PricingView variant="gated" />
}
