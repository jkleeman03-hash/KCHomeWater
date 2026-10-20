// Pricing estimator rules. Each answer gets a score, and the total score picks the price range.

// Jackson County, MO and Johnson County, KS ZIP codes score 1. Every other ZIP scores 2.
const jacksonCountyZips = [
  "64013", "64014", "64015", // Blue Springs
  "64016", // Buckner
  "64029", // Grain Valley
  "64030", // Grandview
  "64034", // Greenwood / Lake Winnebago
  "64050", "64051", "64052", "64053", "64054", "64055", "64056", "64057", "64058", // Independence / Sugar Creek
  "64063", "64064", "64081", "64082", "64086", // Lee's Summit
  "64066", // Levasy
  "64070", // Lone Jack
  "64075", // Oak Grove
  "64088", // Sibley
  // Kansas City (Jackson County portions)
  "64105", "64106", "64108", "64109", "64110", "64111", "64112", "64113", "64114", "64120", "64123", "64124",
  "64125", "64126", "64127", "64128", "64129", "64130", "64131", "64132", "64133", "64134", "64136", "64137",
  "64138", "64139", "64145", "64146", "64147",
]

const johnsonCountyZips = [
  "66018", "66019", // De Soto
  "66021", // Edgerton
  "66030", // Gardner
  "66031", // New Century
  "66051", "66061", "66062", "66063", // Olathe
  "66083", // Spring Hill
  "66085", // Stilwell
]

const coreZips = new Set([...jacksonCountyZips, ...johnsonCountyZips])

export function isCoreZip(zip: string) {
  const n = Number(zip)
  // Shawnee Mission / multi-city zones (Mission, Merriam, Overland Park, Prairie Village, Fairway, Leawood, Lenexa, Shawnee)
  return coreZips.has(zip) || (n >= 66201 && n <= 66286)
}

// The last 5-digit number in the address, so a 5-digit house number isn't mistaken for the ZIP.
export function zipFromAddress(address: string) {
  const matches = address.match(/\b\d{5}(?=(-\d{4})?\b)/g)
  return matches ? matches[matches.length - 1] : null
}

export type WaterSource = "city" | "well"

export type EstimateInput = {
  address: string
  zip: string
  water: WaterSource
  bathrooms: number
  residents: number
  taps: number
}

export function scoreEstimate({ zip, water, bathrooms, residents, taps }: EstimateInput) {
  const scores = {
    location: isCoreZip(zip) ? 1 : 2,
    water: water === "city" ? 1 : 2,
    bathrooms: bathrooms <= 2 ? 1 : bathrooms === 3 ? 2 : 3,
    residents: residents <= 2 ? 1 : residents === 3 ? 2 : 3,
    taps: taps <= 1 ? 1 : 2,
  }
  const total = Object.values(scores).reduce((sum, s) => sum + s, 0)
  return { scores, total, price: priceByScore[total] }
}

// Price range shown for each total score (scores run from 5 to 12).
export const priceByScore: Record<number, { low: number; high: number }> = {
  5: { low: 2450, high: 2800 },
  6: { low: 2650, high: 2900 },
  7: { low: 2800, high: 3050 },
  8: { low: 2950, high: 3200 },
  9: { low: 3100, high: 3450 },
  10: { low: 3250, high: 3600 },
  11: { low: 3400, high: 3800 },
  12: { low: 3650, high: 4050 },
}
