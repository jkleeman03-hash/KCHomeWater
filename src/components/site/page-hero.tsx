import Link from "next/link"
import { ChevronRightIcon } from "lucide-react"
import { ChatButton } from "@/components/site/chat-button"

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
    <section className="pt-8 pb-20 md:pt-12 md:pb-24">
      <div className="container-site">
        <nav aria-label="Breadcrumb" className="mb-10 font-mono text-xs">
          <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            {crumbs.map((crumb, i) => (
              <li key={crumb.href} className="flex items-center gap-1.5">
                <ChevronRightIcon className="size-3.5" />
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="font-medium text-foreground">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-foreground">{crumb.label}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className={aside ? "grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16" : "max-w-3xl"}>
          <div className="animate-rise">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="text-4xl leading-tight md:text-5xl md:leading-[1.08]">{title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">{intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ChatButton />
            </div>
          </div>
          {aside}
        </div>
      </div>
    </section>
  )
}
