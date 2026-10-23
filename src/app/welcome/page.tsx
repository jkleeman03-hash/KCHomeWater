import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon, CalculatorIcon, DropletsIcon, type LucideIcon } from "lucide-react"
import { site } from "@/lib/site"

// Landing page for Facebook and Instagram ads. Kept out of search results and the sitemap.
export const metadata: Metadata = {
  title: "Welcome",
  description: site.description,
  alternates: { canonical: "/welcome" },
  robots: { index: false, follow: true },
}

type Destination = { href: string; label: string; body: string; icon: LucideIcon }

const destinations: Destination[] = [
  {
    href: "/pricing",
    label: "Get a price estimate",
    body: "Answer a few questions and see your price range in under a minute.",
    icon: CalculatorIcon,
  },
  {
    href: "/services",
    label: "Learn more",
    body: "Water softeners, whole-home filtration, and reverse osmosis drinking water.",
    icon: DropletsIcon,
  },
]

export default function WelcomePage() {
  return (
    <section className="pt-8 pb-16 md:pt-20 md:pb-24">
      <div className="container-site max-w-2xl animate-rise">
        <div className="text-center">
          <p className="eyebrow">Kansas City metro</p>
          <h1 className="text-3xl leading-tight text-balance md:text-5xl md:leading-[1.08]">Welcome to KC Home Water</h1>
        </div>
        <ul className="mt-8 flex flex-col gap-4 md:mt-12">
          {destinations.map(({ href, label, body, icon: Icon }) => (
            <li
              key={href}
              className="group relative flex items-center gap-4 rounded-2xl border bg-card p-5 transition-colors hover:bg-background active:bg-background md:p-7"
            >
              <Icon className="size-7 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <h2 className="text-lg leading-snug md:text-xl">
                  <Link href={href} className="after:absolute after:inset-0">
                    {label}
                  </Link>
                </h2>
                <p className="mt-1 text-sm leading-snug text-muted-foreground">{body}</p>
              </div>
              <ArrowRightIcon className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
