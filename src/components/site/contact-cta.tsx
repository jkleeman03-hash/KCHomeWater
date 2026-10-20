import { ChatButton } from "@/components/site/chat-button"
import { Section } from "@/components/site/section"

// Closing call to action at the bottom of each page.
export function ContactCta() {
  return (
    <Section tone="dark">
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <p className="eyebrow">Free consultation</p>
          <h2 className="text-3xl md:text-5xl">Get your price. No pressure, no obligation.</h2>
          <p className="mt-6 leading-relaxed text-pretty">
            Tell us a little about your home and we&apos;ll get back to you within one business day with a clear
            recommendation and price.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col">
          <ChatButton variant="bright" />
        </div>
      </div>
    </Section>
  )
}
