import { Section, SectionHeading } from "@/components/site/section"

const steps = [
  {
    title: "Tell us about your home",
    body: "Fill out the quick form or give us a call. We'll ask a few questions about your home, water, and goals.",
  },
  {
    title: "Get a clear, written quote",
    body: "You'll see exactly what's included and what it costs. Nothing is hidden, and we'll never pressure you with a high-pressure demo.",
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
      <SectionHeading eyebrow="How it works" title="From quote to clean water, without the runaround." />
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="relative">
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute top-6 right-[-14px] left-16 hidden h-0.5 bg-[repeating-linear-gradient(90deg,var(--border)_0_8px,transparent_8px_14px)] lg:block"
              />
            )}
            <span className="mb-5 grid size-12 place-items-center rounded-full bg-navy text-lg font-extrabold text-white">
              {i + 1}
            </span>
            <h3 className="mb-2 text-lg">{step.title}</h3>
            <p className="text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
