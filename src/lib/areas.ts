import { serviceArea } from "@/lib/site"

type Faq = { q: string; a: string }
type Point = { title: string; body: string }

export type Area = {
  slug: string
  name: string
  state: "MO" | "KS"
  stateName: string
  cities: string[]
  metaTitle: string
  metaDescription: string
  headline: string
  intro: string
  water: { title: string; paragraphs: string[] }
  reasons: Point[]
  faqs: Faq[]
}

// One entry per page under /service-areas.
// TODO: double-check utility details against each utility's latest water quality report before launch
export const areas: Area[] = [
  {
    slug: "jackson-county-mo",
    name: "Jackson County",
    state: "MO",
    stateName: "Missouri",
    cities: serviceArea.missouri,
    metaTitle: "Water Softeners & Filtration in Jackson County, MO",
    metaDescription:
      "Water softeners, whole-home filtration, and reverse osmosis for Kansas City, Independence, Lee's Summit, Blue Springs, and the rest of Jackson County, MO.",
    headline: "Water softeners & filtration in Jackson County, MO",
    intro:
      "From Kansas City to Lee's Summit and Blue Springs, we help Jackson County homeowners get softer, better-tasting water with upfront pricing and installation by licensed local plumbers.",
    water: {
      title: "What's in Jackson County water?",
      paragraphs: [
        "Kansas City's water comes mostly from the Missouri River and is disinfected with chloramine. Independence draws from wells along the Missouri River, and many surrounding cities buy their water from one of these systems.",
        "That water meets safety standards, but it's typically moderately hard to hard. Many homeowners also notice a chemical taste or smell. Both are easy to fix at home.",
      ],
    },
    reasons: [
      {
        title: "Advice that fits your home",
        body: "Older homes in Kansas City and newer builds in Lee's Summit have different needs. We recommend based on your plumbing, household, and water.",
      },
      {
        title: "Straightforward process",
        body: "Tell us about your home, get a written quote, and schedule a licensed plumber. No two-hour in-home sales demo.",
      },
      {
        title: "Local support",
        body: "We're based in Kansas City and stay available for filter changes, service, and questions after the install.",
      },
    ],
    faqs: [
      {
        q: "I live in an older Kansas City home. Can you still install?",
        a: "Usually, yes. Older plumbing sometimes needs a few extra fittings, and we'll account for that in your written quote.",
      },
      {
        q: "Which Jackson County cities do you serve?",
        a: `We serve ${serviceArea.missouri.join(", ")}, and nearby areas. If you don't see your city, reach out and we'll tell you right away.`,
      },
      {
        q: "Do you work with landlords and rental properties?",
        a: "Yes. Treated water can be a selling point for tenants. Let us know the property details when you request a quote.",
      },
    ],
  },
  {
    slug: "johnson-county-ks",
    name: "Johnson County",
    state: "KS",
    stateName: "Kansas",
    cities: serviceArea.kansas,
    metaTitle: "Water Softeners & Filtration in Johnson County, KS",
    metaDescription:
      "Water softeners, whole-home filtration, and reverse osmosis for Overland Park, Olathe, Lenexa, Shawnee, Leawood, and the rest of Johnson County, KS.",
    headline: "Water softeners & filtration in Johnson County, KS",
    intro:
      "From Overland Park and Olathe to Leawood and Shawnee, we help Johnson County homeowners get softer, better-tasting water with upfront pricing and installation by licensed local plumbers.",
    water: {
      title: "What's in Johnson County water?",
      paragraphs: [
        "Most of Johnson County is served by WaterOne, which draws from the Missouri and Kansas Rivers and disinfects with chloramine. Olathe and a few other cities run their own water utilities.",
        "That water meets safety standards, but it's typically moderately hard to hard, and many homeowners notice a chemical taste or smell. Both are easy to fix at home.",
      ],
    },
    reasons: [
      {
        title: "Advice that fits your home",
        body: "We size systems to your household and water use, whether you're in a 1950s ranch in Prairie Village or new construction in Olathe.",
      },
      {
        title: "Straightforward process",
        body: "Tell us about your home, get a written quote, and schedule a licensed plumber. No two-hour in-home sales demo.",
      },
      {
        title: "Ready for move-in or resale",
        body: "Buying or selling? Treated water is a nice upgrade for a new home and a selling point when you list.",
      },
    ],
    faqs: [
      {
        q: "Is WaterOne water hard?",
        a: "Johnson County water is generally moderately hard to hard. WaterOne's annual water quality report lists the exact numbers, and we can help you read it.",
      },
      {
        q: "Which Johnson County cities do you serve?",
        a: `We serve ${serviceArea.kansas.join(", ")}, and nearby areas. If you don't see your city, reach out and we'll tell you right away.`,
      },
      {
        q: "Does my HOA need to approve a water system?",
        a: "Water treatment equipment is installed inside your home, so HOA approval usually isn't needed. Check your HOA rules if you're unsure.",
      },
    ],
  },
]

export function getArea(slug: string) {
  return areas.find((area) => area.slug === slug)
}
