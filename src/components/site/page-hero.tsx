import Link from "next/link"
import { ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatButton } from "@/components/site/chat-button"
import { site } from "@/lib/site"

type Crumb = { href: string; label: string }

// Hero for inner pages: breadcrumb trail, headline, intro, CTAs, and an optional side panel.
export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  aside,
}: {
  crumbs: Crumb[]
  eyebrow: string
  title: string
  intro: string
  aside?: React.ReactNode
}) {
  return (
    <section className="bg-gradient-to-b from-tint to-white pt-8 pb-14 md:pt-12 md:pb-20">
      <div className="container-site">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm">
          <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
            <li><Link href="/" className="hover:text-blue">Home</Link></li>
            {crumbs.map((crumb, i) => (
              <li key={crumb.href} className="flex items-center gap-1.5">
                <ChevronRightIcon className="size-3.5" />
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="font-semibold text-navy">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-blue">{crumb.label}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className={aside ? "grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]" : "max-w-3xl"}>
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="text-[clamp(2.1rem,4.4vw,3.3rem)] leading-[1.1]">{title}</h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">{intro}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="sun" size="xl">
                <a href={site.phoneHref}>Call {site.phoneDisplay}</a>
              </Button>
              <ChatButton variant="navy-outline" />
            </div>
          </div>
          {aside}
        </div>
      </div>
    </section>
  )
}
