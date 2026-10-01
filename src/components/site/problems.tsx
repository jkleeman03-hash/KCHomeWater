import { DropletIcon, ShowerHeadIcon, SparklesIcon, WashingMachineIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
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
    <Section id="problems">
      <SectionHeading eyebrow="Kansas City water" title="Your city water is safe to drink. It can still be hard on your home.">
        Most KC-area utilities draw from the Missouri River and treat it with chloramine. The water meets safety
        standards, but many homeowners still deal with:
      </SectionHeading>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {problems.map(({ icon: Icon, title, body }) => (
          <Card key={title} className="py-6">
            <CardContent className="px-6">
              <div className="mb-4 grid size-12 place-items-center rounded-xl bg-tint">
                <Icon className="size-6 text-blue" strokeWidth={1.8} />
              </div>
              <h3 className="mb-2 text-lg">{title}</h3>
              <p className="text-muted-foreground">{body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
