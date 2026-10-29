"use client"

import { usePathname } from "next/navigation"
import Script from "next/script"
import { useEffect, useRef } from "react"
import { site } from "@/lib/site"

type Gtag = (...args: unknown[]) => void

// Google Ads' standard gtag.js snippet. Its config call records the first page view; later in-site navigations don't
// reload the page, so the effect below sends a page_view for each of those.
export function GoogleTag() {
  const pathname = usePathname()
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    ;(window as { gtag?: Gtag }).gtag?.("event", "page_view", { send_to: site.googleAdsId })
  }, [pathname])

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.googleAdsId}`} strategy="afterInteractive" />
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.googleAdsId}');`}
      </Script>
    </>
  )
}
