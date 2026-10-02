// GoHighLevel chat widget. This is the site's only lead form. A2P 10DLC rules reject a site that has any other form
// collecting phone numbers or SMS consent on a page with the widget, so don't add one.
// Rendered as GHL's plain embed snippet so it appears in the server HTML. GHL's A2P checker flagged the widget's own
// form as a second opt-in source when the snippet was injected later by next/script.
export function ChatWidget() {
  return (
    <script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="6abed452b9739b9592c5b726"
      data-source="WEB_USER"
    />
  )
}
