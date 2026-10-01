import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Section, SectionHeading } from "@/components/site/section"

const homeFaqs = [
  {
    q: "I'm on city water. Do I really need a softener?",
    a: "City water is treated to be safe, not soft. Kansas City area water is typically moderately hard to hard, which causes scale buildup, spotting, and dry skin. A softener fixes those problems. The carbon filter stage takes care of chlorine and chloramine taste and odor.",
  },
  {
    q: "How long does installation take?",
    a: "Most whole-home systems install in a few hours, and under-sink RO systems usually take one to two hours. Bundled installs are typically done in a single visit.",
  },
  {
    q: "Who actually does the installation?",
    a: "A licensed, insured local plumber from our vetted installer network. We handle your quote, scheduling, and support, and the plumber handles the work at your water line.",
  },
  {
    q: "What maintenance is involved?",
    a: "Softeners need salt added every so often. Carbon and RO filters need periodic replacement, usually every 6 to 12 months depending on the stage. We'll tell you exactly what to expect and can handle filter changes for you.",
  },
  {
    // TODO: confirm once warranty terms are written
    q: "What warranty do I get?",
    a: "Equipment is covered by the manufacturer's warranty, and installation is covered by our workmanship guarantee. You'll get the full details in writing with your quote.",
  },
  {
    // TODO: remove until a financing partner is set up
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
    <Section id="faq" tone="tint">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQ" title={title} />
        <Accordion type="single" collapsible className="grid gap-3">
          {items.map((item) => (
            <AccordionItem key={item.q} value={item.q} className="rounded-xl border bg-white px-6 last:border-b">
              <AccordionTrigger className="py-5 text-base font-bold text-navy hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  )
}
