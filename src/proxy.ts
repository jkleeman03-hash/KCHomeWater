import { NextResponse, type NextRequest } from "next/server"

// Estimator A/B test: each visitor is randomly shown the gated or open version of /pricing (see pricing-estimator.tsx)
// and keeps seeing the same one for 90 days. The address bar still shows /pricing.
// To end the test, delete this file and make /pricing/page.tsx render the winning version.

const cookie = "estimate_variant"
const variants = ["gated", "open"]

export function proxy(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") return NextResponse.next()
  const saved = request.cookies.get(cookie)?.value
  const variant = saved && variants.includes(saved) ? saved : variants[Math.floor(Math.random() * variants.length)]
  const response = NextResponse.rewrite(new URL(`/pricing/${variant}${request.nextUrl.search}`, request.url))
  if (variant !== saved) response.cookies.set(cookie, variant, { maxAge: 60 * 60 * 24 * 90, sameSite: "lax", path: "/" })
  return response
}

export const config = {
  matcher: "/pricing",
}
