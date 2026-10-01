import type { Metadata } from "next"
import { QuoteSection } from "@/components/site/quote-form"
import { interestOptions, site, type Interest } from "@/lib/site"

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: `Request a free, no-pressure quote on a water softener, filtration, or reverse osmosis system from ${site.name}.`,
  alternates: { canonical: "/quote" },
}

export default async function QuotePage({ searchParams }: PageProps<"/quote">) {
  const { interest } = await searchParams
  const preselected = (interestOptions as readonly string[]).includes(String(interest))
    ? (interest as Interest)
    : undefined
  return <QuoteSection defaultInterest={preselected} />
}
