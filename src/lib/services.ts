import { Building2Icon, GlassWaterIcon, HouseIcon, LeafIcon, SparklesIcon, WavesIcon, type LucideIcon } from "lucide-react"

type Faq = { q: string; a: string }
type Point = { title: string; body: string }

export type Service = {
  slug: string
  name: string
  icon: LucideIcon
  summary: string
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
    slug: "whole-home-water-filtration",
    name: "Whole-Home Water Filtration",
    icon: HouseIcon,
    summary: "Filtered, softened water at every tap, shower, and appliance, treated where water enters your home.",
    metaTitle: "Whole-Home Water Filtration in Kansas City",
    metaDescription:
      "Whole-home water filtration for homes across the Kansas City metro. Carbon filtration and softening installed at your main line by licensed local plumbers.",
    headline: "Whole-home water filtration for Kansas City homes",
    intro:
      "A whole-home system treats water right where it enters your house, so every faucet, shower, and appliance gets the same clean water. Ours pairs a carbon filter for taste and odor with a softener for hard-water scale.",
    atAGlance: [
      { label: "Best for", value: "Every tap, shower & appliance" },
      { label: "Installed at", value: "Your main water line" },
      { label: "Typical install", value: "A few hours, one visit" },
      { label: "Pricing", value: "Free written quote" },
    ],
    benefits: [
      {
        title: "Sized to your home",
        body: "We size the system to your household, bathrooms, and water usage so you never run short on treated water.",
      },
      {
        title: "One system, every tap",
        body: "Skip juggling pitcher filters and shower filters. Everything downstream of the main line is treated.",
      },
      {
        title: "Protects your plumbing",
        body: "Softening stops new scale from building up in your water heater, dishwasher, and fixtures.",
      },
    ],
    whyItMatters: [
      {
        title: "Chloramine taste and smell",
        body: "KC-area utilities disinfect with chloramine. It keeps water safe, but many people notice the taste and smell in drinking water and showers.",
      },
      {
        title: "Hard water around the metro",
        body: "Water across the metro is typically moderately hard to hard, which leaves spots on dishes and crust on fixtures.",
      },
      {
        title: "Protecting a home investment",
        body: "Water heaters and appliances are expensive to replace. Treating water at the source helps them work as designed.",
      },
    ],
    faqs: [
      {
        q: "Where does a whole-home system go?",
        a: "Usually next to your water heater or where the main line enters the home, often in a basement, garage, or utility room. We'll confirm the spot before installation day.",
      },
      {
        q: "Will it lower my water pressure?",
        a: "A properly sized system shouldn't cause a noticeable drop. Sizing it to your home's flow rate is part of the quote.",
      },
      {
        q: "Do I still need a drinking water system?",
        a: "Whole-home filtration makes all your water taste and feel better. If you also want bottled-water quality for drinking and cooking, adding an under-sink RO system is the upgrade.",
      },
    ],
  },
  {
    slug: "reverse-osmosis-drinking-water",
    name: "Reverse Osmosis Drinking Water",
    icon: GlassWaterIcon,
    summary: "Bottled-water quality from a dedicated faucet at your kitchen sink, for drinking, coffee, and cooking.",
    metaTitle: "Reverse Osmosis Drinking Water Systems in Kansas City",
    metaDescription:
      "Under-sink reverse osmosis drinking water systems for homes across the Kansas City metro. Upfront pricing, installed by licensed local plumbers.",
    headline: "Reverse osmosis drinking water systems in Kansas City",
    intro:
      "An under-sink reverse osmosis (RO) system gives you great-tasting drinking water from its own faucet. Multi-stage filtration reduces dissolved solids and many contaminants, so you can stop buying and hauling bottled water.",
    atAGlance: [
      { label: "Best for", value: "Drinking, coffee, ice & cooking" },
      { label: "Installed at", value: "Under your kitchen sink" },
      { label: "Typical install", value: "1 to 2 hours" },
      { label: "Pricing", value: "Free written quote" },
    ],
    benefits: [
      {
        title: "Dedicated faucet",
        body: "A separate drinking water faucet sits next to your main faucet, so filtered water is always one turn away.",
      },
      {
        title: "Compact install",
        body: "The system fits under most kitchen sinks and leaves room for storage.",
      },
      {
        title: "Simple upkeep",
        body: "Filters are changed on a set schedule, usually every 6 to 12 months depending on the stage. We'll tell you exactly when.",
      },
    ],
    whyItMatters: [
      {
        title: "Better-tasting water",
        body: "RO removes the chemical aftertaste many people notice in treated city water.",
      },
      {
        title: "Less plastic, less hauling",
        body: "Families who buy cases of bottled water every week can cut that out and save the trips.",
      },
      {
        title: "Peace of mind",
        body: "RO reduces a broad range of dissolved contaminants, which matters to families with young kids.",
      },
    ],
    faqs: [
      {
        q: "Can RO connect to my refrigerator or ice maker?",
        a: "Often, yes, depending on how far the fridge is from the sink. Mention it in your quote request and we'll plan for it.",
      },
      {
        q: "Does RO waste water?",
        a: "RO systems send some water to the drain as they filter. Modern systems are much more efficient than older ones, and we'll explain the ratio for the system we recommend.",
      },
      {
        q: "Should I get RO and a softener together?",
        a: "They do different jobs. A softener protects your whole home from scale, and RO gives you the purest water for drinking. Many homeowners bundle both in one visit.",
      },
    ],
  },
  {
    slug: "well-water-treatment",
    name: "Well Water Treatment",
    icon: WavesIcon,
    summary: "Treatment for private wells, starting with a water test so the system matches what's actually in your water.",
    metaTitle: "Well Water Treatment in the Kansas City Area",
    metaDescription:
      "Well water testing and treatment for homes on private wells around the Kansas City metro. We start with your water test and recommend only what you need.",
    // TODO: confirm installer network can handle well systems (iron, sulfur, bacteria) before promoting this page
    headline: "Well water treatment for homes around Kansas City",
    intro:
      "Private wells don't get treated by a utility, so what comes out of the tap depends on your well. We start with a water test, then recommend treatment matched to what's actually in your water, not a one-size-fits-all package.",
    atAGlance: [
      { label: "Best for", value: "Homes on a private well" },
      { label: "First step", value: "Water test" },
      { label: "Typical issues", value: "Hardness, iron, odor" },
      { label: "Pricing", value: "Quoted after testing" },
    ],
    benefits: [
      {
        title: "Test first",
        body: "Well water varies a lot from one property to the next. A test tells us what needs treating so you don't pay for equipment you don't need.",
      },
      {
        title: "Targeted treatment",
        body: "Depending on results, that may mean softening, filtration, or other treatment stages working together.",
      },
      {
        title: "Licensed installation",
        body: "A licensed local plumber installs your system and connects it to your existing well equipment.",
      },
    ],
    whyItMatters: [
      {
        title: "No utility treatment",
        body: "Unlike city water, private well water isn't treated or monitored for you. Keeping it in good shape is up to the homeowner.",
      },
      {
        title: "Stains and odors",
        body: "Hardness and iron can stain sinks, tubs, and laundry, and some wells have a noticeable smell.",
      },
      {
        title: "Changing water quality",
        body: "Well water can change with the seasons and over time, so periodic testing is a good habit.",
      },
    ],
    faqs: [
      {
        q: "How do I get my well water tested?",
        a: "Reach out and we'll walk you through testing options. Your county health department may also offer private well testing.",
      },
      {
        q: "What if my water has bacteria?",
        a: "Bacteria needs to be addressed directly, often by disinfecting the well and adding a treatment stage. Your test results determine the right approach.",
      },
      {
        q: "Can you install on a new well?",
        a: "Yes. Once the well is producing and tested, we can recommend and install treatment.",
      },
    ],
  },
  {
    slug: "water-softener-systems",
    name: "Water Softener Systems",
    icon: SparklesIcon,
    summary: "Stop scale buildup, spotty dishes, and dry skin by removing the hardness minerals from your water.",
    metaTitle: "Water Softener Installation in Kansas City",
    metaDescription:
      "Water softener systems for homes across the Kansas City metro. Sized to your household, installed by licensed local plumbers, with upfront pricing.",
    headline: "Water softener systems for Kansas City homes",
    intro:
      "Hard water leaves white crust on fixtures, spots on dishes, and residue on skin and hair. A water softener removes the calcium and magnesium that cause it, protecting your plumbing and appliances. Ours comes paired with a carbon filter stage.",
    atAGlance: [
      { label: "Best for", value: "Scale, spots & dry skin" },
      { label: "Installed at", value: "Your main water line" },
      { label: "Upkeep", value: "Add salt as needed" },
      { label: "Pricing", value: "Free written quote" },
    ],
    benefits: [
      {
        title: "Careful sizing",
        body: "We match the softener to your household size and water hardness so it regenerates efficiently and doesn't waste salt.",
      },
      {
        title: "Convenient installation",
        body: "We work around your home's layout and your schedule. Most installs are done in a single visit.",
      },
      {
        title: "Equipment protection",
        body: "Soft water limits new scale on fixtures, water heaters, dishwashers, and washing machines.",
      },
    ],
    whyItMatters: [
      {
        title: "Easier cleaning",
        body: "Hard water makes soap scum and spots harder to clean off glass, tile, and dishes.",
      },
      {
        title: "Comfort",
        body: "Soft water rinses cleaner, so many people notice softer skin, shinier hair, and softer laundry.",
      },
      {
        title: "New fixtures and renovations",
        body: "If you've just moved in or remodeled, a softener helps keep new fixtures and appliances looking new.",
      },
    ],
    faqs: [
      {
        q: "How do I know if I have hard water?",
        a: "White crust on faucets, spotty dishes, and soap that won't lather are the usual signs. Your utility's annual water quality report lists hardness, and we can help you read it.",
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
    slug: "carbon-filtration-systems",
    name: "Carbon Filtration Systems",
    icon: LeafIcon,
    summary: "Reduce chlorine and chloramine taste and odor throughout your home with activated carbon filtration.",
    metaTitle: "Carbon Water Filtration in Kansas City",
    metaDescription:
      "Whole-home carbon filtration to reduce chlorine and chloramine taste and odor for homes across the Kansas City metro.",
    headline: "Carbon filtration systems for Kansas City homes",
    intro:
      "Activated carbon is the workhorse of water filtration. It reduces the chlorine and chloramine that utilities use for disinfection, along with many taste and odor issues. Our whole-home system includes a carbon stage, so every tap benefits.",
    atAGlance: [
      { label: "Best for", value: "Chemical taste & smell" },
      { label: "Installed at", value: "Your main water line" },
      { label: "Upkeep", value: "Periodic media replacement" },
      { label: "Included in", value: "Our whole-home system" },
    ],
    benefits: [
      {
        title: "Better taste everywhere",
        body: "Water from every faucet tastes and smells cleaner, not just the one with a pitcher filter.",
      },
      {
        title: "Nicer showers",
        body: "Many people notice less chemical smell in the shower once chloramine is reduced.",
      },
      {
        title: "Works with a softener",
        body: "Carbon and softening work well together, and our whole-home system includes both.",
      },
    ],
    whyItMatters: [
      {
        title: "Chloramine is common here",
        body: "Major KC-area utilities use chloramine, which lasts longer in pipes than chlorine and needs the right carbon to reduce it.",
      },
      {
        title: "Taste drives habits",
        body: "When tap water tastes good, families drink more of it and buy less bottled water.",
      },
      {
        title: "Seasonal changes",
        body: "River-sourced water can taste different through the year. Carbon filtration helps smooth that out.",
      },
    ],
    faqs: [
      {
        q: "Does carbon soften water?",
        a: "No. Carbon targets taste, odor, and chemicals, while a softener removes hardness minerals. That's why our whole-home system includes both.",
      },
      {
        q: "How long does the carbon last?",
        a: "It depends on the system and how much water you use. We'll give you a replacement schedule with your quote.",
      },
      {
        q: "Is carbon filtration enough for drinking water?",
        a: "It makes tap water taste much better. For the highest-purity drinking water, add an under-sink RO system.",
      },
    ],
  },
  {
    slug: "city-water-treatment",
    name: "City Water Treatment",
    icon: Building2Icon,
    summary: "Your city water is safe, but it can still be hard and taste like chemicals. We fix both.",
    metaTitle: "City Water Treatment in Kansas City",
    metaDescription:
      "City water treatment for homes across the Kansas City metro. Reduce chloramine taste and hard-water scale with whole-home filtration and softening.",
    headline: "City water treatment for the Kansas City metro",
    intro:
      "City water is treated to be safe to drink. That doesn't mean it's pleasant. Disinfectants affect taste and smell, and hardness minerals still cause scale. Whole-home filtration and softening deal with both, and RO takes drinking water a step further.",
    atAGlance: [
      { label: "Best for", value: "Homes on municipal water" },
      { label: "Common issues", value: "Chloramine & hardness" },
      { label: "Solution", value: "Carbon + softener, plus RO" },
      { label: "Pricing", value: "Free written quote" },
    ],
    benefits: [
      {
        title: "Made for local water",
        body: "We recommend systems based on what your utility's water actually contains, not a generic package.",
      },
      {
        title: "Two problems, one install",
        body: "Carbon handles taste and odor, the softener handles hardness, and both go in on the same visit.",
      },
      {
        title: "Upfront pricing",
        body: "You get a written quote before any work begins. The price doesn't change on install day.",
      },
    ],
    whyItMatters: [
      {
        title: "Treated for safety, not comfort",
        body: "Utilities treat water to meet safety standards. Taste, odor, and hardness are left for homeowners to handle.",
      },
      {
        title: "Aging pipes",
        body: "Water can pick up sediment and taste from older city and household plumbing on the way to your tap.",
      },
      {
        title: "Good for buyers and renters",
        body: "Treated water is a selling point when you list a home or rent out a property.",
      },
    ],
    faqs: [
      {
        q: "Is my city water unsafe?",
        a: "No. KC-area utilities meet federal safety standards. Treatment at home is about taste, smell, and protecting your plumbing from hardness.",
      },
      {
        q: "How do I find out what's in my water?",
        a: "Every utility publishes an annual Consumer Confidence Report. Send us your city and we'll help you make sense of it.",
      },
      {
        q: "Do I need both filtration and softening?",
        a: "Not always. If taste is your only concern, carbon may be enough. If you see scale and spots, you'll want softening too. We'll recommend what fits.",
      },
    ],
  },
]

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}
