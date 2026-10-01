"use client"

import Script from "next/script"
import { usePathname } from "next/navigation"
import { quotePath } from "@/lib/site"

// The widget renders inside a shadow root, so page CSS can't reach it. On phones, lift it above the
// fixed MobileCallBar (hidden at md and up) by adding a style inside that shadow root.
const mobileOffset = `@media (max-width: 767px) {
  #lc_text-widget, #lc_text-widget--btn { bottom: 76px !important; }
}`

function liftAboveCallBar() {
  let tries = 0
  const timer = setInterval(() => {
    const root = document.querySelector("chat-widget")?.shadowRoot
    if (root) {
      const style = document.createElement("style")
      style.textContent = mobileOffset
      root.appendChild(style)
    }
    if (root || ++tries > 40) clearInterval(timer)
  }, 250)
}

// GoHighLevel chat widget. Loads when the browser is idle so it doesn't slow the first paint.
// Skipped on /quote: A2P 10DLC rules say no page with the widget may also have a form that collects phone numbers.
export function ChatWidget() {
  if (usePathname() === quotePath) return null
  return (
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="6abed452b9739b9592c5b726"
      data-source="WEB_USER"
      strategy="lazyOnload"
      onLoad={liftAboveCallBar}
    />
  )
}
