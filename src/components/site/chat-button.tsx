"use client"

import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

type ChatWidgetApi = { openWidget: () => void }

// Opens the GoHighLevel chat widget, which is the site's only lead form (A2P 10DLC allows one opt-in source).
// Falls back to calling us if the widget hasn't loaded yet.
export function ChatButton({
  variant = "sun",
  size = "xl",
  className,
  onClick,
  children = "Free Consultation",
}: {
  variant?: "sun" | "navy" | "navy-outline"
  size?: "default" | "xl"
  className?: string
  onClick?: () => void
  children?: React.ReactNode
}) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={site.phoneHref}
        onClick={(e) => {
          onClick?.()
          const chat = (window as { leadConnector?: { chatWidget?: ChatWidgetApi } }).leadConnector?.chatWidget
          if (chat) {
            e.preventDefault()
            chat.openWidget()
          }
        }}
      >
        {children}
      </a>
    </Button>
  )
}
