import { Section, SectionHeading } from "@/components/site/section"

type Point = { title: string; body: string }

// Numbered cards, used for "benefits" style sections on inner pages.
export function PointCards({ eyebrow, title, points }: { eyebrow: string; title: string; points: Point[] }) {
  return (
    <Section tone="card">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <ul className="grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-3">
        {points.map((point, i) => (
          <li key={point.title} className="flex flex-col gap-2 bg-card p-6 md:p-8">
            <span className="mb-3 font-mono text-sm text-primary" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-lg">{point.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{point.body}</p>
          </li>
        ))}
      </ul>
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
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="text-3xl md:text-4xl">{title}</h2>
          {children && <div className="mt-4 grid gap-4 leading-relaxed">{children}</div>}
        </div>
        <ul className="grid gap-7">
          {points.map((point) => (
            <li key={point.title} className="border-t border-background/20 pt-5">
              <h3 className="mb-2 text-lg">{point.title}</h3>
              <p className="text-sm leading-relaxed">{point.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
