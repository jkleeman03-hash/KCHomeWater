import Image from "next/image"
import Link from "next/link"
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
          <p className="eyebrow">About KC Home Water</p>
          <h2 className="text-3xl md:text-4xl">Local, straightforward, and on your side.</h2>
          <p className="mt-4 leading-relaxed">
            Some water treatment companies send a salesperson to your kitchen for a two-hour demo that ends in a
            high-pressure close. We don&apos;t work that way. We give you honest advice, fair upfront pricing, and
            professional installation.
          </p>
          <p className="mt-4 leading-relaxed">
            We&apos;re Joey and Anna Kleeman. Joey grew up in Denver and Anna in Columbia, Missouri, and much of our
            family and many of our closest friends live here in the metro. We started KC Home Water so Kansas City
            families can get great water at a fair price.{" "}
            <Link href="/blog/who-we-are" className="font-medium underline underline-offset-4">
              Read our story
            </Link>
          </p>
          <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/kitchen-faucet.jpg"
              alt="Clean water running from a kitchen faucet into a hand"
              fill
              sizes="(min-width: 1024px) 32rem, 100vw"
              className="object-cover object-[50%_35%]"
            />
          </div>
        </div>
        <ul className="grid gap-7 sm:grid-cols-2">
          {reasons.map((reason) => (
            <li key={reason.title} className="border-t border-background/20 pt-5">
              <h3 className="mb-2 text-lg">{reason.title}</h3>
              <p className="text-sm leading-relaxed">{reason.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
