import { useId } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Brand logo (original file: public/logo.svg). Inlined so the wordmark renders in the site's Fraunces font.
// The light variant is for dark backgrounds: navy becomes white and the blues are lightened.
export function LogoMark({ light = false, className }: { light?: boolean; className?: string }) {
  const gradientId = useId()
  const ink = light ? "#ffffff" : "#13294B"
  const [blueDark, blueLight] = light ? ["#6FA8DC", "#A9CCEC"] : ["#2E5F94", "#6FA8DC"]

  return (
    <svg viewBox="58 33 164 148" role="img" aria-label="KC Home Water" className={cn("h-16 w-auto", className)}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={blueDark} />
          <stop offset="100%" stopColor={blueLight} />
        </linearGradient>
      </defs>
      <path d="M65,110 L140,40 L215,110 L215,175 L65,175 Z" fill="none" stroke={ink} strokeWidth="7" strokeLinejoin="round" />
      <text x="140" y="100" textAnchor="middle" fontSize="22" letterSpacing="1" fill={ink} className="font-heading font-bold">
        KC
      </text>
      <path d="M95,123 Q120,112 140,123 Q160,134 185,123" fill="none" stroke={`url(#${gradientId})`} strokeWidth="5.5" strokeLinecap="round" />
      <path d="M95,112 C89,118 87,121 87,125 C87,130 90,134 95,134 C100,134 103,130 103,125 C103,121 101,118 95,112 Z" fill={blueDark} />
      <path d="M185,112 C179,118 177,121 177,125 C177,130 180,134 185,134 C190,134 193,130 193,125 C193,121 191,118 185,112 Z" fill={blueLight} />
      <text x="140" y="158" textAnchor="middle" fontSize="16" letterSpacing="2" fill={ink} className="font-heading font-bold">
        HOME WATER
      </text>
    </svg>
  )
}

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="KC Home Water home" className="inline-flex">
      <LogoMark light={light} className={className} />
    </Link>
  )
}
