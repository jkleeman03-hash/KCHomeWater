import { Button } from "@/components/ui/button"
import { quoteHref, type Interest } from "@/lib/site"

// Goes to the quote page with the system the visitor clicked on pre-selected.
export function QuoteLink({
  interest,
  variant,
  children,
}: {
  interest: Interest
  variant: "navy" | "sun"
  children: React.ReactNode
}) {
  return (
    <Button asChild variant={variant} size="xl" className="mt-auto w-full">
      <a href={quoteHref(interest)}>{children}</a>
    </Button>
  )
}
