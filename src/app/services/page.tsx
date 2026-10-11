import type { Metadata } from "next"
import { HowItWorks } from "@/components/site/how-it-works"
import { PageHero } from "@/components/site/page-hero"
import { ContactCta } from "@/components/site/contact-cta"
import { ServicesGrid } from "@/components/site/services-grid"

export const metadata: Metadata = {
  title: "Water Filtration & Treatment Services",
  description:
    "Whole-home water softeners, whole-home water filtration, and tankless reverse osmosis drinking water for homes across the Kansas City metro.",
  alternates: { canonical: "/services" },
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/services", label: "Services" }]}
        eyebrow="Our services"
        title="Complete water filtration & treatment for Kansas City homes"
        intro="Whole-Home water systems to improve every tap, shower & appliance. With a free consultation, we recommend the right system for your home needs, we provide a clear, written price, then schedule a time that works for you with a local, licensed plumber to install."
      />
      <ServicesGrid title="Find the right fit for your water." />
      <HowItWorks />
      <ContactCta />
    </>
  )
}
