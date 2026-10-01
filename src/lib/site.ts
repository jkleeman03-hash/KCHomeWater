// Business details used across the site. Update placeholders here and they change everywhere.
export const site = {
  name: "KC Home Water",
  legalName: "Whole Home Water LLC",
  url: "https://kchomewater.com",
  phoneDisplay: "(816) 705-0137",
  phoneHref: "tel:+18167050137",
  email: "contact@kchomewater.com",
  // Must match the address on the A2P 10DLC brand registration.
  address: {
    street: "117 S Lexington Street",
    suite: "STE 100",
    city: "Harrisonville",
    state: "MO",
    zip: "64701",
    country: "US",
  },
  description:
    "Whole-home water softeners, carbon filtration, and reverse osmosis drinking water for Kansas City, MO and Johnson County, KS homes. Upfront pricing, installed by licensed local plumbers.",
}

export const addressLines = [
  `${site.address.street}, ${site.address.suite}`,
  `${site.address.city}, ${site.address.state} ${site.address.zip}`,
]

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
