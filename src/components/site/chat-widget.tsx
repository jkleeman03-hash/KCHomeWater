"use client"

import Script from "next/script"

// GoHighLevel chat widget. Loads when the browser is idle so it doesn't slow the first paint.
// This is the site's only lead form. A2P 10DLC rules reject a site that has any other form collecting phone
// numbers or SMS consent on a page with the widget, so don't add one.
export function ChatWidget() {
  return (
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="6abed452b9739b9592c5b726"
      data-source="WEB_USER"
      strategy="lazyOnload"
    />
  )
}
