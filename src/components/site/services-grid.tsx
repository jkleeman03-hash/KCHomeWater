import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/site/section"
import { services } from "@/lib/services"

export function ServicesGrid({
  title = "Water treatment for every Kansas City home.",
  intro,
  excludeSlug,
  tone = "white",
}: {
  title?: string
  intro?: React.ReactNode
  excludeSlug?: string
  tone?: "white" | "tint"
}) {
  return (
    <Section id="services" tone={tone}>
      <SectionHeading eyebrow="Services" title={title}>{intro}</SectionHeading>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services
          .filter((service) => service.slug !== excludeSlug)
          .map(({ slug, name, summary, icon: Icon }) => (
            <Card key={slug} className="group relative py-6 transition-shadow hover:shadow-[0_10px_30px_-12px_rgba(19,41,75,.3)]">
              <CardContent className="flex h-full flex-col px-6">
                <div className="mb-4 grid size-12 place-items-center rounded-xl bg-tint">
                  <Icon className="size-6 text-blue" strokeWidth={1.8} />
                </div>
                <h3 className="mb-2 text-lg">
                  <Link href={`/services/${slug}`} className="after:absolute after:inset-0">
                    {name}
                  </Link>
                </h3>
                <p className="mb-5 text-muted-foreground">{summary}</p>
                <span className="mt-auto flex items-center gap-1.5 font-semibold text-blue">
                  Explore service
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </CardContent>
            </Card>
          ))}
      </div>
    </Section>
  )
}
