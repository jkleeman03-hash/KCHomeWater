import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { CheckBadge } from "@/components/site/hero"
import { Section, SectionHeading } from "@/components/site/section"
import { services } from "@/lib/services"
import { cn } from "@/lib/utils"

export function ServicesGrid({
  title = "Water treatment for every Kansas City home.",
  intro,
  excludeSlug,
  tone = "card",
}: {
  title?: string
  intro?: React.ReactNode
  excludeSlug?: string
  tone?: "white" | "card" | "tint"
}) {
  const shown = services.filter((service) => service.slug !== excludeSlug)

  return (
    <Section id="services" tone={tone}>
      <SectionHeading eyebrow="Services" title={title}>{intro}</SectionHeading>
      <ul
        className={cn(
          "grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-2",
          shown.length % 3 === 0 && "lg:grid-cols-3",
        )}
      >
        {shown.map(({ slug, name, category, summary, highlights, icon: Icon }) => (
            <li key={slug} className="group relative flex flex-col bg-card p-6 transition-colors hover:bg-background md:p-8">
              <div className="mb-5 flex items-center justify-between gap-3">
                <Icon className="size-6 text-primary" strokeWidth={1.8} />
                <span className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[11px] font-medium tracking-wide text-secondary-foreground uppercase">
                  {category}
                </span>
              </div>
              <h3 className="mb-2 text-lg">
                <Link href={`/services/${slug}`} className="after:absolute after:inset-0">
                  {name}
                </Link>
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{summary}</p>
              <ul className="mb-6 flex flex-col gap-2 text-sm">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <CheckBadge />
                    {highlight}
                  </li>
                ))}
              </ul>
              <span className="mt-auto flex items-center gap-1.5 text-sm font-medium text-primary">
                Explore service
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </li>
          ))}
      </ul>
    </Section>
  )
}
