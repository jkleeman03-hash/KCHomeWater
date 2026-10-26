"use client"

import { usePathname } from "next/navigation"
import Script from "next/script"
import { useEffect, useRef } from "react"
import { site } from "@/lib/site"

type Fbq = (...args: unknown[]) => void

// Sends a standard Meta event, e.g. "Lead". Never pass the visitor's name, phone, email, or ZIP.
export function trackPixel(event: string, params?: Record<string, string>) {
  ;(window as { fbq?: Fbq }).fbq?.("track", event, params)
}

// Meta's standard pixel snippet. It tracks the first PageView itself; later in-site navigations don't reload the page,
// so the effect below tracks a PageView for each of those.
export function MetaPixel() {
  const pathname = usePathname()
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    trackPixel("PageView")
  }, [pathname])

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${site.metaPixelId}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${site.metaPixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}
