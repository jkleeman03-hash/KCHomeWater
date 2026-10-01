import type { MetadataRoute } from "next"
import { areas } from "@/lib/areas"
import { services } from "@/lib/services"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/services`, changeFrequency: "monthly", priority: 0.8 },
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${site.url}/service-areas`, changeFrequency: "monthly", priority: 0.7 },
    ...areas.map((a) => ({ url: `${site.url}/service-areas/${a.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${site.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ]
}
