import { ChatWidgetToggle } from "@/components/site/chat-widget-toggle"

// GoHighLevel chat widget. This is the site's only lead form, and it only appears on /free-consultation.
// A2P 10DLC rules reject a site that has any other form collecting phone numbers or SMS consent, or the widget on
// more than one page, so don't add it anywhere else.
// Rendered as GHL's plain embed snippet so it appears in the server HTML. GHL's A2P checker flagged the widget's own
// form as a second opt-in source when the snippet was injected later by next/script. It goes in as raw HTML because
// the loader inserts a <chat-widget> element next to the script, which would otherwise break React hydration.
const snippet =
  '<script src="https://widgets.leadconnectorhq.com/loader.js" data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" data-widget-id="6abed452b9739b9592c5b726" data-source="WEB_USER"></script>'

export function ChatWidget() {
  return (
    <>
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: snippet }} />
      <ChatWidgetToggle />
    </>
  )
}
