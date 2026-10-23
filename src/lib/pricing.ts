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

export function isZip(zip: string) {
  return /^\d{5}$/.test(zip)
}

export type WaterSource = "city" | "well"

// The A/B test on /pricing (see proxy.ts): "gated" asks for contact details before showing the estimate, "open" after.
export const estimateVariants = ["gated", "open"] as const
export type EstimateVariant = (typeof estimateVariants)[number]

export type EstimateInput = {
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
    taps: taps <= 1 ? 1 : taps === 2 ? 3 : 4,
  }
  const total = Object.values(scores).reduce((sum, s) => sum + s, 0)
  return { scores, total, price: priceByScore[total] }
}

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

// The only result visitors see. The scores behind it stay internal.
export function priceRange(input: EstimateInput) {
  const { price } = scoreEstimate(input)
  return `${money.format(price.low)} – ${money.format(price.high)}`
}

// Price range shown for each total score (scores run from 5 to 14).
export const priceByScore: Record<number, { low: number; high: number }> = {
  5: { low: 2450, high: 2800 },
  6: { low: 2650, high: 2900 },
  7: { low: 2800, high: 3050 },
  8: { low: 2950, high: 3200 },
  9: { low: 3100, high: 3450 },
  10: { low: 3250, high: 3600 },
  11: { low: 3400, high: 3800 },
  12: { low: 3650, high: 4050 },
  13: { low: 3900, high: 4300 },
  14: { low: 4150, high: 4550 },
}
