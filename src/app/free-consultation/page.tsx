import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRightIcon } from "lucide-react"
import { CheckBadge } from "@/components/site/hero"
import { ChatWidget } from "@/components/site/chat-widget"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Free Consultation",
  description:
    "Get a free consultation and written price for a water softener, whole-home filtration, or tankless RO system anywhere in the Kansas City metro.",
  alternates: { canonical: "/free-consultation" },
}

const expectations = [
  "A few quick questions about your home, water, and goals",
  "A recommendation for the right system, with no pressure",
  "A clear, written price before any work begins",
  "Installation scheduled at a time that works for you",
]

// The only page with the GoHighLevel chat widget. Every "Free Consultation" button links here.
export default function FreeConsultationPage() {
  return (
    <section className="bg-gradient-to-b from-tint to-white pt-8 pb-20 md:pt-12 md:pb-28">
      <div className="container-site">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm">
          <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
            <li><Link href="/" className="hover:text-blue">Home</Link></li>
            <li className="flex items-center gap-1.5">
              <ChevronRightIcon className="size-3.5" />
              <span aria-current="page" className="font-semibold text-navy">Free Consultation</span>
            </li>
          </ol>
        </nav>
        <div className="max-w-2xl">
          <p className="eyebrow">Free consultation</p>
          <h1 className="text-[clamp(2.1rem,4.4vw,3.3rem)] leading-[1.1]">Get your price. No pressure, no obligation.</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Use the chat window in the bottom corner of the screen to tell us a little about your home. We&apos;ll get
            back to you within one business day with a clear recommendation and price.
          </p>
          <ul className="mt-8 grid gap-3">
            {expectations.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[1.02rem] font-semibold text-navy">
                <span className="mt-1"><CheckBadge /></span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-muted-foreground">
            Rather talk? Call us at{" "}
            <a href={site.phoneHref} className="font-semibold text-blue hover:underline">{site.phoneDisplay}</a>.
          </p>
        </div>
      </div>
      <ChatWidget />
    </section>
  )
}
