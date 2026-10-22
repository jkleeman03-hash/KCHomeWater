import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRightIcon,
  BookOpenIcon,
  CalculatorIcon,
  ClipboardListIcon,
  MapPinIcon,
  MessageCircleIcon,
  PhoneIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"
import { Section } from "@/components/site/section"
import { Button } from "@/components/ui/button"
import { services } from "@/lib/services"
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
    body: "Answer a few questions about your home and see a price range in under a minute.",
    icon: CalculatorIcon,
  },
  ...services.map((service) => ({
    href: `/services/${service.slug}`,
    label: service.name,
    body: service.highlights[0],
    icon: service.icon,
  })),
  {
    href: "/#how",
    label: "Our process",
    body: "From a short call to install day, here's what to expect.",
    icon: ClipboardListIcon,
  },
  {
    href: "/blog/who-we-are",
    label: "Meet Joey and Anna",
    body: "Who we are, how we keep prices down, and who installs your system.",
    icon: UsersIcon,
  },
  {
    href: "/service-areas",
    label: "Service areas",
    body: "We serve homes across the Kansas City metro, in Missouri and Kansas.",
    icon: MapPinIcon,
  },
  {
    href: "/blog",
    label: "Blog",
    body: "Plain-language guides to hard water, filtration, and reverse osmosis.",
    icon: BookOpenIcon,
  },
  {
    href: "/free-consultation",
    label: "Free consultation",
    body: "Chat with us about your water and what your home needs.",
    icon: MessageCircleIcon,
  },
]

export default function WelcomePage() {
  return (
    <>
      <section className="pt-8 pb-10 md:pt-20 md:pb-20">
        <div className="container-site max-w-3xl animate-rise text-center">
          <p className="eyebrow">Kansas City metro</p>
          <h1 className="text-3xl leading-tight text-balance md:text-5xl md:leading-[1.08]">
            Welcome to KC Home Water, your whole&#8209;home water specialists
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground md:mt-6 md:text-lg">
            Where would you like to start?
          </p>
          <Button asChild size="xl" className="mt-6 w-full sm:w-auto">
            <a href={site.phoneHref}>
              <PhoneIcon />
              Call {site.phoneDisplay}
            </a>
          </Button>
        </div>
      </section>
      <Section tone="card" className="py-8 md:py-16">
        {/* One compact row per link on phones, cards in a grid on larger screens */}
        <ul className="grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-2 lg:grid-cols-3">
          {destinations.map(({ href, label, body, icon: Icon }) => (
            <li
              key={href}
              className="group relative flex items-center gap-4 bg-card px-4 py-4 transition-colors hover:bg-background active:bg-background md:flex-col md:items-start md:gap-3 md:p-8"
            >
              <Icon className="size-6 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <h2 className="text-lg leading-snug md:text-xl">
                  <Link href={href} className="after:absolute after:inset-0">
                    {label}
                  </Link>
                </h2>
                <p className="mt-1 text-sm leading-snug text-muted-foreground md:mt-3 md:mb-4 md:leading-relaxed">{body}</p>
              </div>
              <ArrowRightIcon className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1 md:mt-auto md:size-4" />
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
