import { DropletIcon, ShowerHeadIcon, SparklesIcon, WashingMachineIcon } from "lucide-react"
import { Section, SectionHeading } from "@/components/site/section"

const problems = [
  {
    icon: ShowerHeadIcon,
    title: "Scale buildup",
    body: "White crust on faucets and showerheads, spotty dishes, and cloudy glass shower doors.",
  },
  {
    icon: DropletIcon,
    title: "Chemical taste & smell",
    body: "The chlorine or \"pool\" taste that makes plain tap water unpleasant to drink.",
  },
  {
    icon: SparklesIcon,
    title: "Dry skin & hair",
    body: "Hard water leaves residue that soap can't rinse off, so skin feels tight and hair looks dull.",
  },
  {
    icon: WashingMachineIcon,
    title: "Shorter appliance life",
    body: "Scale coats the inside of water heaters, dishwashers, and washing machines, making them work harder.",
  },
]

export function Problems() {
  return (
    <Section id="problems" tone="card">
      <SectionHeading eyebrow="Kansas City water" title="Your city water is safe to drink. It can still be hard on your home.">
        Most Kansas City tap water comes from the Missouri River and is disinfected with a chlorine-based treatment.
        It meets safety standards, but many homeowners still deal with:
      </SectionHeading>
      <ul className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {problems.map(({ icon: Icon, title, body }) => (
          <li key={title} className="flex flex-col gap-3 bg-card p-6 md:p-8">
            <Icon className="mb-2 size-6 text-primary" strokeWidth={1.8} />
            <h3 className="text-lg">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
