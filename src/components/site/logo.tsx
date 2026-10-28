import { useId } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Brand logo (original file: public/logo.svg, traced from Brand Assets/KC_Home_Water_Logo.png).
// Inlined so the wordmark renders in Fraunces.
// The light variant is for dark backgrounds: navy becomes white and the blues are lightened.
export function LogoMark({ light = false, className }: { light?: boolean; className?: string }) {
  const id = useId()
  const ink = light ? "#ffffff" : "#012561"
  const [blueDark, blueLight] = light ? ["#4FA3E8", "#9AD8FA"] : ["#0148A2", "#29B0F3"]

  return (
    <svg viewBox="40 52 1222 1038" role="img" aria-label="KC Home Water" className={cn("h-16 w-auto", className)}>
      <defs>
        <linearGradient id={`${id}-wave`} gradientUnits="userSpaceOnUse" x1="320" y1="0" x2="980" y2="0">
          <stop offset="0%" stopColor={blueDark} />
          <stop offset="100%" stopColor={blueLight} />
        </linearGradient>
        <linearGradient id={`${id}-left`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={blueDark} />
          <stop offset="100%" stopColor={light ? blueDark : "#003A85"} />
        </linearGradient>
        <linearGradient id={`${id}-right`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={blueLight} />
          <stop offset="100%" stopColor={light ? blueLight : "#1590DE"} />
        </linearGradient>
      </defs>
      <path d="M81,1050 L81,500 L651,96 L1221,500 L1221,1050 Z" fill="none" stroke={ink} strokeWidth="58" strokeLinejoin="round" />
      <text x="644" y="540" textAnchor="middle" fontSize="272" fill={ink} className="font-logo font-black">
        KC
      </text>
      <path
        d="M318,636 C420,588 560,594 662,640 C770,690 880,702 976,650 L968,692 C880,738 760,736 650,690 C550,650 440,642 330,670 Z"
        fill={`url(#${id}-wave)`}
      />
      <path d="M247,560 C226,588 178,640 178,686 C178,726 210,754 248,754 C286,754 318,726 318,686 C318,640 268,588 247,560 Z" fill={`url(#${id}-left)`} />
      <path d="M207,640 C188,672 190,718 238,746 C212,720 202,690 214,642 Z" fill="#ffffff" />
      <path d="M1056,563 C1035,591 986,642 986,688 C986,728 1018,754 1056,754 C1094,754 1126,728 1126,688 C1126,642 1077,591 1056,563 Z" fill={`url(#${id}-right)`} />
      <path d="M1097,642 C1116,674 1114,720 1066,746 C1092,720 1102,690 1090,644 Z" fill="#ffffff" />
      <text x="652" y="934" textAnchor="middle" fontSize="166" textLength="1044" lengthAdjust="spacingAndGlyphs" fill={ink} className="font-logo font-black">
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
