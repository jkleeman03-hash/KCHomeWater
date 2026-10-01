import type { Metadata } from "next"
import { HowItWorks } from "@/components/site/how-it-works"
import { PageHero } from "@/components/site/page-hero"
import { QuoteCta } from "@/components/site/quote-cta"
import { ServicesGrid } from "@/components/site/services-grid"
import { Systems } from "@/components/site/systems"

export const metadata: Metadata = {
  title: "Water Filtration & Treatment Services",
  description:
    "Whole-home filtration, water softeners, carbon filtration, reverse osmosis, well water, and city water treatment for Kansas City and Johnson County homes.",
  alternates: { canonical: "/services" },
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/services", label: "Services" }]}
        eyebrow="Our services"
        title="Complete water filtration & treatment for Kansas City homes"
        intro="Whether you're dealing with hard water, a chemical taste, or a private well, we'll recommend the right system, give you a written price, and have a licensed local plumber install it."
      />
      <ServicesGrid title="Find the right fit for your water." />
      <Systems />
      <HowItWorks />
      <QuoteCta />
    </>
  )
}
