import { Section, SectionHeading } from "@/components/site/section"

const steps = [
  {
    title: "Tell us about your home",
    body: "Fill out the quick form or give us a call. We'll ask a few questions about your home, water, and goals.",
  },
  {
    title: "Get a clear, written quote",
    body: "You'll see exactly what's included and what it costs. Nothing is hidden, and there's no high-pressure sales pitch.",
  },
  {
    title: "Licensed plumber installs",
    body: "A vetted, licensed, and insured local plumber installs your system. Most jobs are done in a single visit.",
  },
  {
    title: "Enjoy better water",
    body: "We walk you through how everything works and stay available for filter changes, service, and questions.",
  },
]

export function HowItWorks() {
  return (
    <Section id="how">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <SectionHeading
          eyebrow="How it works"
          title="From quote to clean water, without the runaround."
          className="mb-0 lg:sticky lg:top-28 lg:self-start"
        />
        <ol className="flex flex-col">
          {steps.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t py-8 first:border-t-0 first:pt-0">
              <span className="font-mono text-sm text-primary" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl">{step.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
