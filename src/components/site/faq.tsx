import { PlusIcon } from "lucide-react"
import { Section, SectionHeading } from "@/components/site/section"

const homeFaqs = [
  {
    q: "I'm on city water. Do I really need a softener?",
    a: "City water is treated to be safe, not soft. Kansas City area water is typically moderately hard to hard, which causes scale buildup, spotting, and dry skin. A softener fixes those problems, and a carbon filter removes the chlorine taste and smell.",
  },
  {
    q: "How long does installation take?",
    a: "Most whole-home systems install in a few hours, and under-sink reverse osmosis drinking water systems usually take one to two hours. Bundled installs are typically done in a single visit.",
  },
  {
    q: "Who actually does the installation?",
    a: "A licensed, insured local plumber from our vetted installer network. We handle your quote, scheduling, and support, and the plumber does the plumbing work.",
  },
  {
    q: "What maintenance is involved?",
    a: "Softeners need salt added every so often. Carbon and reverse osmosis filters need replacing, usually every 6 to 12 months depending on the filter. We'll tell you exactly what to expect and can handle filter changes for you.",
  },
  {
    // TODO: confirm once warranty terms are written
    q: "What warranty do I get?",
    a: "Equipment is covered by the manufacturer's warranty, and installation is covered by our workmanship guarantee. You'll get the full details in writing with your quote.",
  },
  {
    q: "Do you offer financing?",
    a: "Yes. Financing options are available on qualifying purchases. Ask about monthly payment options when you request your quote.",
  },
]

export function Faq({
  items = homeFaqs,
  title = "Common questions",
}: {
  items?: { q: string; a: string }[]
  title?: string
}) {
  return (
    <Section id="faq" tone="card">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <SectionHeading eyebrow="FAQ" title={title} className="mb-0" />
        <div className="flex flex-col">
          {items.map((item) => (
            <details key={item.q} className="group border-b py-5 first:pt-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium text-foreground [&::-webkit-details-marker]:hidden">
                {item.q}
                <PlusIcon className="size-5 shrink-0 text-primary transition-transform group-open:rotate-45" />
              </summary>
              <p className="mt-3 max-w-prose leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}
