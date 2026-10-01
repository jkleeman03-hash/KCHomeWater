import { CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

const trustPoints = ["Licensed & insured plumbers", "Upfront, written pricing", "Most installs done in one visit"]

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-tint to-white pt-10 pb-14 md:pt-18 md:pb-22">
      <div className="container-site grid items-center gap-12 md:grid-cols-[1.15fr_.85fr]">
        <div>
          <p className="eyebrow">Kansas City, MO &amp; Johnson County, KS</p>
          <h1 className="text-[clamp(2.3rem,5vw,3.6rem)] leading-[1.1]">
            Softer, cleaner water from every tap in your home.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            We design and install whole-home water softeners, carbon filtration, and reverse osmosis drinking water
            systems for Kansas City homes. You get upfront pricing with no pushy in-home sales pitch, and a licensed
            local plumber does the install.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="sun" size="xl">
              <a href="#quote">Get my free quote</a>
            </Button>
            <Button asChild variant="navy-outline" size="xl">
              <a href={site.phoneHref}>Call {site.phoneDisplay}</a>
            </Button>
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
    <svg viewBox="0 0 420 420" aria-hidden="true" className="mx-auto hidden w-full max-w-md md:block">
      <defs>
        <linearGradient id="drop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6FA8DC" />
          <stop offset="1" stopColor="#2E5F94" />
        </linearGradient>
      </defs>
      <circle cx="210" cy="210" r="200" fill="#e6eef8" />
      <circle cx="210" cy="210" r="150" fill="none" stroke="#c3d6ec" strokeWidth="2" strokeDasharray="4 10" />
      <path d="M210 70c-48 60-80 102-80 142a80 80 0 0 0 160 0c0-40-32-82-80-142Z" fill="url(#drop)" />
      <path d="M172 226a40 40 0 0 0 38 34" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" opacity=".7" />
      <g fill="#13294B" opacity=".9">
        <rect x="58" y="300" width="22" height="46" rx="3" />
        <rect x="84" y="274" width="18" height="72" rx="3" />
        <rect x="106" y="310" width="24" height="36" rx="3" />
        <rect x="290" y="288" width="20" height="58" rx="3" />
        <rect x="314" y="262" width="16" height="84" rx="3" />
        <rect x="334" y="304" width="26" height="42" rx="3" />
      </g>
      <path d="M40 346h340" stroke="#13294B" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
