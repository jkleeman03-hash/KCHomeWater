// Business details used across the site. Update placeholders here and they change everywhere.
export const site = {
  name: "KC Home Water",
  legalName: "Whole Home Water LLC",
  url: "https://kchomewater.com",
  phoneDisplay: "(816) 705-0137",
  phoneHref: "tel:+18167050137",
  email: "contact@kchomewater.com",
  // GoHighLevel booking calendar shown under the estimate on /pricing; empty hides it. Its form must collect email only
  // (no phone, no SMS consent) to stay clear of A2P 10DLC. TODO: paste the booking link from GHL (Calendars > Share).
  bookingCalendarUrl: "",
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
    "Whole-home water softeners, carbon filtration, and reverse osmosis drinking water for homes across the Kansas City metro. Upfront pricing, installed by licensed local plumbers.",
}

export const addressLines = [
  `${site.address.street}, ${site.address.suite}`,
  `${site.address.city}, ${site.address.state} ${site.address.zip}`,
]

// We serve the whole Kansas City metro. Jackson and Johnson counties have their own pages; the rest are listed together.
export const serviceArea = {
  missouri: ["Kansas City", "Independence", "Lee's Summit", "Blue Springs", "Raytown", "Grandview", "Grain Valley"],
  kansas: ["Overland Park", "Olathe", "Lenexa", "Shawnee", "Leawood", "Prairie Village", "Mission", "Merriam", "Gardner"],
  restOfMetro: [
    "Liberty, MO",
    "Gladstone, MO",
    "North Kansas City, MO",
    "Parkville, MO",
    "Riverside, MO",
    "Belton, MO",
    "Raymore, MO",
    "Harrisonville, MO",
    "Kansas City, KS",
    "Bonner Springs, KS",
    "Leavenworth, KS",
    "Lansing, KS",
  ],
}

