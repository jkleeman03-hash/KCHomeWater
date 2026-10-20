import { cn } from "@/lib/utils"

type SectionProps = {
  id?: string
  tone?: "white" | "card" | "tint" | "dark"
  className?: string
  children: React.ReactNode
}

export function Section({ id, tone = "white", className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-28",
        tone === "card" && "border-t bg-card",
        tone === "tint" && "border-y bg-secondary",
        tone === "dark" &&
          "bg-navy text-background/75 [&_.eyebrow]:text-accent [&_h2]:text-background [&_h3]:text-background",
        className,
      )}
    >
      <div className="container-site">{children}</div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string
  title: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("mb-14 max-w-2xl", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl">{title}</h2>
      {children && <div className="mt-4 text-pretty leading-relaxed text-muted-foreground">{children}</div>}
    </div>
  )
}
