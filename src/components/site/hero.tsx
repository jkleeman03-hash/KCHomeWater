import Image from "next/image"
import { CheckIcon } from "lucide-react"
import { ChatButton } from "@/components/site/chat-button"

const trustPoints = ["Licensed & insured plumbers", "Upfront, written pricing", "Most installs done in one visit"]

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-tint to-white pt-10 pb-14 md:pt-18 md:pb-22">
      <div className="container-site grid items-center gap-12 md:grid-cols-[1.15fr_.85fr]">
        <div>
          <p className="eyebrow">Serving the entire Kansas City metro</p>
          <h1 className="text-[clamp(2.3rem,5vw,3.6rem)] leading-[1.1]">
            Softer, cleaner water from every tap in your home.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            We design and install whole-home water softeners, carbon filtration, and reverse osmosis drinking water
            systems for Kansas City homes. You get upfront pricing with no pushy in-home sales pitch, and a licensed
            local plumber does the install.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ChatButton />
          </div>
          <ul className="mt-6 flex flex-col gap-x-6 gap-y-2.5 sm:flex-row sm:flex-wrap">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-[0.95rem] font-semibold text-navy">
                <CheckBadge />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <HeroArt />
      </div>
    </section>
  )
}

export function CheckBadge() {
  return (
    <span className="grid size-[18px] shrink-0 place-items-center rounded-full bg-blue text-white">
      <CheckIcon className="size-3" strokeWidth={3.5} />
    </span>
  )
}

function HeroArt() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-[0_24px_50px_-20px_rgba(19,41,75,.45)]">
      <Image
        src="/images/drinking-filtered-water.jpg"
        alt="Woman drinking a glass of filtered water in her kitchen"
        fill
        priority
        sizes="(min-width: 768px) 28rem, 100vw"
        className="object-cover object-[50%_30%]"
      />
    </div>
  )
}
