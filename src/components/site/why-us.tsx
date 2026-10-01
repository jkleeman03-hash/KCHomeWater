import { Section } from "@/components/site/section"

const reasons = [
  {
    title: "Upfront pricing",
    body: "You'll get a written quote before any work starts. The price doesn't change on install day.",
  },
  {
    title: "Licensed & insured installers",
    body: "Every install is done by a licensed plumber we've personally vetted, with liability and workers' comp coverage.",
  },
  {
    title: "Right-sized, not oversold",
    body: "We recommend what your home actually needs, even when that's the smaller system.",
  },
  {
    title: "Proudly Kansas City",
    body: "We live here and drink this water too. We serve both sides of State Line.",
  },
]

export function WhyUs() {
  return (
    <Section id="about" tone="dark">
      <div className="grid items-start gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="eyebrow text-sky">About KC Home Water</p>
          <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.15]">Local, straightforward, and on your side.</h2>
          <p className="mt-4">
            Some water treatment companies send a salesperson to your kitchen for a two-hour demo that ends in a
            high-pressure close. We don&apos;t work that way. We give you honest advice, fair upfront pricing, and
            professional installation.
          </p>
        </div>
        <ul className="grid gap-7 sm:grid-cols-2">
          {reasons.map((reason) => (
            <li key={reason.title} className="border-t-2 border-blue pt-4">
              <h3 className="mb-1.5 text-lg">{reason.title}</h3>
              <p className="text-[0.97rem]">{reason.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
