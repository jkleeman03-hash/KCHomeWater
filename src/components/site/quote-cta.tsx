import { Button } from "@/components/ui/button"
import { Section } from "@/components/site/section"
import { quoteHref, site, type Interest } from "@/lib/site"

// Closing call to action on every page except /quote, which holds the form itself.
export function QuoteCta({ interest }: { interest?: Interest }) {
  return (
    <Section tone="dark">
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <p className="eyebrow text-[#9fc1e6]">Free quote</p>
          <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.15]">Get your price. No pressure, no obligation.</h2>
          <p className="mt-4 text-[1.08rem]">
            Tell us a little about your home and we&apos;ll get back to you within one business day with a clear
            recommendation and price.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col">
          <Button asChild variant="sun" size="xl">
            <a href={quoteHref(interest)}>Get my free quote</a>
          </Button>
          <Button asChild variant="navy-outline" size="xl" className="border-white text-white hover:bg-white hover:text-navy">
            <a href={site.phoneHref}>Call {site.phoneDisplay}</a>
          </Button>
        </div>
      </div>
    </Section>
  )
}
