import { Button } from "@/components/ui/button"

// Links to /free-consultation, the only page with the GoHighLevel chat widget (A2P 10DLC allows one opt-in source).
// A plain <a> rather than next/link so the page loads fresh and the widget snippet is in the server HTML.
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
      <a href="/free-consultation" onClick={onClick}>
        {children}
      </a>
    </Button>
  )
}
