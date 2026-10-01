import { ContactCta } from "@/components/site/contact-cta"
import { Faq } from "@/components/site/faq"
import { Hero } from "@/components/site/hero"
import { HowItWorks } from "@/components/site/how-it-works"
import { Problems } from "@/components/site/problems"
import { ServiceArea } from "@/components/site/service-area"
import { Systems } from "@/components/site/systems"
import { WhyUs } from "@/components/site/why-us"

export default function Home() {
  return (
    <>
      <Hero />
      <Problems />
      <Systems />
      <HowItWorks />
      <WhyUs />
      <ServiceArea />
      <Faq />
      <ContactCta />
    </>
  )
}
