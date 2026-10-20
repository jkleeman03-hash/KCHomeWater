import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

// Links to the pricing estimator. Used on the home page in place of Free Consultation.
export function EstimateButton({
  variant = "default",
  className,
}: {
  variant?: "default" | "outline" | "bright"
  className?: string
}) {
  return (
    <Button asChild variant={variant} size="xl" className={className}>
      <Link href="/pricing">
        Get a Price Estimate
        <ArrowRightIcon />
      </Link>
    </Button>
  )
}
