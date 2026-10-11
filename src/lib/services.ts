import { GlassWaterIcon, HouseIcon, SparklesIcon, type LucideIcon } from "lucide-react"

type Faq = { q: string; a: string }
type Point = { title: string; body: string }

export type Service = {
  slug: string
  name: string
  // Where the system treats water, shown as a badge on service cards.
  category: "Whole home" | "Point of use (tap)"
  icon: LucideIcon
  summary: string
  // Product photo shown next to the intro on the service page. Use a white-background image.
  image?: { src: string; alt: string; width: number; height: number }
  // Short bullets shown on service cards.
  highlights: string[]
  metaTitle: string
  metaDescription: string
  headline: string
  intro: string
  atAGlance: { label: string; value: string }[]
  benefits: Point[]
  whyItMatters: Point[]
  faqs: Faq[]
}

// One entry per page under /services. Order here is the order shown in menus and grids.
export const services: Service[] = [
  {
    slug: "water-softener-systems",
    name: "Whole-Home Water Softener",
    category: "Whole home",
    icon: SparklesIcon,
    image: {
      src: "/images/water-softener.png",
      alt: "Whole-home water softener with resin tank and brine tank",
      width: 310,
      height: 444,
    },
    summary:
      "A softener removes the calcium and magnesium that make water hard, so scale stops building up in your pipes, water heater, and appliances.",
    highlights: [
      "Swaps hardness minerals out through ion exchange",
      "Stops new scale in water heaters, dishwashers & fixtures",
      "Fewer spots on dishes and glass, less soap scum",
      "Softer-feeling skin, hair, and laundry",
    ],
    metaTitle: "Whole-Home Water Softener Installation in Kansas City",
    metaDescription:
      "Whole-home water softeners for homes across the Kansas City metro. Sized to your household, installed by licensed local plumbers, with a free written quote.",
    headline: "Whole-home water softeners for Kansas City homes",
    intro:
      "Hard water is full of dissolved calcium and magnesium. A water softener captures those minerals on resin beads and exchanges them for sodium, so every tap, shower, and appliance in the house gets soft water. The resin cleans itself automatically on a schedule, and all you do is keep the salt topped off.",
    atAGlance: [
      { label: "Treats", value: "Every tap, shower & appliance" },
      { label: "Installed at", value: "Your main water line" },
      { label: "Upkeep", value: "Add salt as needed" },
      { label: "Pricing", value: "Free written quote" },
    ],
    benefits: [
      {
        title: "How it works",
        body: "Water flows through a tank of resin beads that grab calcium and magnesium. When the resin is full, the system rinses it with brine from the salt tank and starts fresh.",
      },
      {
        title: "Sized to your home",
        body: "We match the softener to your household size and water hardness so it regenerates efficiently and doesn't waste salt or water.",
      },
      {
        title: "One visit to install",
        body: "A licensed local plumber installs the softener at your main line, usually near the water heater, in a single visit.",
      },
    ],
    whyItMatters: [
      {
        title: "Scale shortens appliance life",
        body: "Hardness minerals harden into scale inside water heaters, dishwashers, washing machines, and coffee makers. Scale makes them work harder and can shorten their life.",
      },
      {
        title: "Hard water across the metro",
        body: "Water around Kansas City is typically moderately hard to hard. That's where the white crust on faucets and spots on dishes come from.",
      },
      {
        title: "Less cleaning, less soap",
        body: "Soap lathers better in soft water, so you use less of it. Glass, tile, and fixtures stay cleaner longer.",
      },
    ],
    faqs: [
      {
        q: "How do I know if I have hard water?",
        a: "White crust on faucets, spotty dishes, and soap that won't lather are the usual signs. Your utility's annual water quality report lists hardness, and we can help you read it.",
      },
      {
        q: "Does a softener filter my water too?",
        a: "No. A softener removes hardness minerals, but it doesn't target chlorine, chloramine, or taste. That's what whole-home filtration does, and the two are often installed together.",
      },
      {
        q: "Will soft water feel slippery?",
        a: "Some people notice a smoother feel at first. That's the absence of hard-water residue, and most people get used to it quickly.",
      },
      {
        q: "How often do I add salt?",
        a: "It depends on household size and water use, but most homes add salt every month or two. We'll show you how to check.",
      },
    ],
  },
  {
    slug: "whole-home-water-filtration",
    name: "Whole-Home Water Filtration",
    category: "Whole home",
    icon: HouseIcon,
    image: {
      src: "/images/whole-home-filtration.png",
      alt: "Three-stage whole-home water filtration system with housing wrench",
      width: 291,
      height: 293,
    },
    summary:
      "A whole-home filter treats water where it enters your house, reducing chlorine, chloramine, and sediment at every tap and shower, not just the kitchen.",
    highlights: [
      "Reduces chlorine & chloramine taste and smell",
      "Filtered water in showers, baths & laundry",
      "Catches sediment before it reaches fixtures",
      "One system instead of pitchers and shower filters",
    ],
    metaTitle: "Whole-Home Water Filtration in Kansas City",
    metaDescription:
      "Whole-home water filtration for homes across the Kansas City metro. Reduce chlorine and chloramine at every tap and shower, installed by licensed local plumbers.",
    headline: "Whole-home water filtration for Kansas City homes",
    intro:
      "A whole-home filtration system sits on your main water line, so water is filtered before it reaches any faucet, shower, or appliance. Activated carbon reduces the chlorine and chloramine utilities add for disinfection, along with many taste and odor issues, and a sediment stage catches grit before it gets into your plumbing.",
    atAGlance: [
      { label: "Treats", value: "Every tap, shower & appliance" },
      { label: "Installed at", value: "Your main water line" },
      { label: "Upkeep", value: "Periodic filter replacement" },
      { label: "Pricing", value: "Free written quote" },
    ],
    benefits: [
      {
        title: "Better water everywhere",
        body: "Water from every faucet tastes and smells cleaner, not just the one with a pitcher filter.",
      },
      {
        title: "Nicer showers",
        body: "You breathe and absorb shower water too. Many people notice less chemical smell and less dry skin once chloramine is reduced.",
      },
      {
        title: "Pairs with a softener",
        body: "Filtration handles taste, odor, and chemicals. A softener handles hardness. Installed together, they cover both in one visit.",
      },
    ],
    whyItMatters: [
      {
        title: "Chloramine is common here",
        body: "Major KC-area utilities disinfect with chloramine. It keeps water safe in the pipes, but it lasts longer than chlorine and needs the right carbon to reduce it.",
      },
      {
        title: "More than drinking water",
        body: "Most of the water you use goes to showers, baths, and laundry. A kitchen filter only treats a small fraction of it.",
      },
      {
        title: "Aging pipes and seasonal changes",
        body: "Water can pick up sediment from older city and household plumbing, and river-sourced water tastes different through the year. Filtration smooths that out.",
      },
    ],
    faqs: [
      {
        q: "Is my city water unsafe?",
        a: "No. KC-area utilities meet federal safety standards. Whole-home filtration is about taste, smell, and comfort, plus keeping sediment out of your plumbing.",
      },
      {
        q: "Will it lower my water pressure?",
        a: "A properly sized system shouldn't cause a noticeable drop. Sizing it to your home's flow rate is part of the quote.",
      },
      {
        q: "How long do the filters last?",
        a: "It depends on the system and how much water you use. We'll give you a replacement schedule with your quote.",
      },
      {
        q: "Do I still need a drinking water system?",
        a: "Whole-home filtration makes all your water taste and feel better. For the highest-purity water for drinking and cooking, add a tankless RO system at the kitchen sink.",
      },
    ],
  },
  {
    slug: "tankless-reverse-osmosis",
    name: "Tankless Reverse Osmosis",
    category: "Point of use (tap)",
    icon: GlassWaterIcon,
    image: {
      src: "/images/reverse-osmosis.png",
      alt: "Tankless reverse osmosis system with four filter stages and a drinking water faucet",
      width: 194,
      height: 167,
    },
    summary:
      "Purified drinking water on demand from its own faucet. No storage tank, and a remineralization stage adds healthy minerals back for better taste.",
    highlights: [
      "Best at the kitchen sink, fridge & ice maker",
      "Tankless: fresh water made on demand, more cabinet space",
      "Remineralization adds back calcium & magnesium",
      "Stop buying and hauling bottled water",
    ],
    metaTitle: "Tankless Reverse Osmosis Drinking Water in Kansas City",
    metaDescription:
      "Tankless reverse osmosis drinking water systems with remineralization for homes across the Kansas City metro. Installed under the sink by licensed local plumbers.",
    headline: "Tankless reverse osmosis drinking water for Kansas City homes",
    intro:
      "Reverse osmosis (RO) pushes water through an extremely fine membrane that reduces dissolved solids and many contaminants, giving you bottled-water quality from a dedicated faucet. Our tankless system makes that water on demand instead of storing it, then adds back healthy minerals for a clean, balanced taste.",
    atAGlance: [
      { label: "Best for", value: "Drinking, coffee, ice & cooking" },
      { label: "Installed at", value: "Under your kitchen sink" },
      { label: "Typical install", value: "1 to 2 hours" },
      { label: "Pricing", value: "Free written quote" },
    ],
    benefits: [
      {
        title: "Where it makes sense",
        body: "RO is a point-of-use system, so it goes where you drink and cook: the kitchen sink, plus a line to the fridge or ice maker. It's a great fit for families buying bottled water, coffee and tea lovers, and homes with babies on formula.",
      },
      {
        title: "Why tankless matters",
        body: "Traditional RO stores water in a pressurized tank where it sits for hours. Tankless makes fresh water as you pour, fills glasses faster, and frees up most of the cabinet space a tank would take.",
      },
      {
        title: "Remineralization",
        body: "RO removes nearly everything, including the calcium and magnesium that give water its taste. A remineralization stage adds those minerals back, so water tastes crisp instead of flat and is less acidic.",
      },
    ],
    whyItMatters: [
      {
        title: "Better-tasting water",
        body: "RO removes the chemical aftertaste many people notice in treated city water, and remineralization keeps it from tasting flat.",
      },
      {
        title: "Fresher than a tank",
        body: "Water that sits in a storage tank can pick up a stale taste between uses. Tankless water is made when you need it.",
      },
      {
        title: "Less plastic, less hauling",
        body: "Families who buy cases of bottled water every week can cut that out and save the trips.",
      },
    ],
    faqs: [
      {
        q: "Why not use RO for the whole house?",
        a: "RO is slow and very thorough, which is exactly what you want for drinking water but overkill for showers and laundry. Whole-home filtration and softening handle the rest of the house.",
      },
      {
        q: "Does a tankless system need power?",
        a: "Most tankless RO systems use a small built-in pump, so they need an outlet under or near the sink. We'll check your cabinet before installation day.",
      },
      {
        q: "Can RO connect to my refrigerator or ice maker?",
        a: "Often, yes, depending on how far the fridge is from the sink. Mention it when you reach out and we'll plan for it.",
      },
      {
        q: "Does RO waste water?",
        a: "RO systems send some water to the drain as they filter. Modern tankless systems are much more efficient than older tank systems, and we'll explain the ratio for the system we recommend.",
      },
    ],
  },
]

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}
