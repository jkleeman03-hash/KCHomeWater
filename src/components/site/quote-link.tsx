"use client"

import { Button } from "@/components/ui/button"
import type { Interest } from "@/lib/site"

export const SELECT_INTEREST_EVENT = "kchw:select-interest"

// Jumps to the quote form and pre-selects the system the visitor clicked on.
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
      <a
        href="#quote"
        onClick={() => window.dispatchEvent(new CustomEvent(SELECT_INTEREST_EVENT, { detail: interest }))}
      >
        {children}
      </a>
    </Button>
  )
}
