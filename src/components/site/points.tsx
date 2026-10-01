import { Card, CardContent } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/site/section"

type Point = { title: string; body: string }

// Numbered cards, used for "benefits" style sections on inner pages.
export function PointCards({ eyebrow, title, points }: { eyebrow: string; title: string; points: Point[] }) {
  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="grid gap-5 md:grid-cols-3">
        {points.map((point, i) => (
          <Card key={point.title} className="py-6">
            <CardContent className="px-6">
              <span className="mb-4 grid size-10 place-items-center rounded-full bg-navy font-extrabold text-white">
                {i + 1}
              </span>
              <h3 className="mb-2 text-lg">{point.title}</h3>
              <p className="text-muted-foreground">{point.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}

// Dark band with a heading on the left and short points on the right, matching the home page's About section.
export function PointBand({
  eyebrow,
  title,
  children,
  points,
}: {
  eyebrow: string
  title: string
  children?: React.ReactNode
  points: Point[]
}) {
  return (
    <Section tone="dark">
      <div className="grid items-start gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="eyebrow text-sky">{eyebrow}</p>
          <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.15]">{title}</h2>
          {children && <div className="mt-4 grid gap-4">{children}</div>}
        </div>
        <ul className="grid gap-7">
          {points.map((point) => (
            <li key={point.title} className="border-t-2 border-blue pt-4">
              <h3 className="mb-1.5 text-lg">{point.title}</h3>
              <p className="text-[0.97rem]">{point.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
