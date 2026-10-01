import { Faq } from "@/components/site/faq"
import { Hero } from "@/components/site/hero"
import { HowItWorks } from "@/components/site/how-it-works"
import { Problems } from "@/components/site/problems"
import { QuoteSection } from "@/components/site/quote-form"
import { ServiceArea } from "@/components/site/service-area"
import { ServicesGrid } from "@/components/site/services-grid"
import { Systems } from "@/components/site/systems"
import { WhyUs } from "@/components/site/why-us"

export default function Home() {
  return (
    <>
      <Hero />
      <Problems />
      <Systems />
      <HowItWorks />
      <ServicesGrid tone="tint" />
      <WhyUs />
      <ServiceArea />
      <Faq />
      <QuoteSection />
    </>
  )
}
