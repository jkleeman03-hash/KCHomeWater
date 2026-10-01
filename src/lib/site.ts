// Business details used across the site. Update placeholders here and they change everywhere.
export const site = {
  name: "KC Home Water",
  legalName: "Whole Home Water LLC",
  url: "https://kchomewater.com",
  phoneDisplay: "(816) 000-0000", // TODO: real phone number
  phoneHref: "tel:+18160000000",
  email: "contact@kchomewater.com",
  description:
    "Whole-home water softeners, carbon filtration, and reverse osmosis drinking water for Kansas City, MO and Johnson County, KS homes. Upfront pricing, installed by licensed local plumbers.",
}

export const serviceArea = {
  missouri: ["Kansas City", "Independence", "Lee's Summit", "Blue Springs", "Raytown", "Grandview"],
  kansas: ["Overland Park", "Olathe", "Lenexa", "Shawnee", "Leawood", "Prairie Village", "Mission", "Merriam"],
}

export const interestOptions = [
  "Water softener + carbon filter",
  "Under-sink reverse osmosis",
  "Complete package (softener + RO)",
  "Well water treatment",
  "Not sure yet, help me decide",
] as const

export type Interest = (typeof interestOptions)[number]
