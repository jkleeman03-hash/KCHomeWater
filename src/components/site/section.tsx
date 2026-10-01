import { cn } from "@/lib/utils"

type SectionProps = {
  id?: string
  tone?: "white" | "tint" | "dark"
  className?: string
  children: React.ReactNode
}

export function Section({ id, tone = "white", className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        tone === "tint" && "bg-tint",
        tone === "dark" && "bg-navy text-[#cfdcec] [&_h2]:text-white [&_h3]:text-white",
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
    <div className={cn("mb-12 max-w-2xl", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.15]">{title}</h2>
      {children && <div className="mt-4 text-[1.08rem] text-muted-foreground">{children}</div>}
    </div>
  )
}
