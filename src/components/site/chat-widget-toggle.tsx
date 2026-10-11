"use client"

import { useEffect } from "react"

type ChatWidgetApi = { openWidget: () => void }

// Opens the chat when /free-consultation mounts, and hides it when the visitor navigates away inside the site, so the
// widget never shows on another page. Hidden rather than removed, so it comes back if they return with the Back button.
export function ChatWidgetToggle() {
  useEffect(() => {
    const widgets = () => document.querySelectorAll<HTMLElement>("chat-widget")
    widgets().forEach((el) => (el.style.display = ""))

    let tries = 0
    const timer = window.setInterval(() => {
      const chat = (window as { leadConnector?: { chatWidget?: ChatWidgetApi } }).leadConnector?.chatWidget
      if (chat) chat.openWidget()
      if (chat || ++tries > 50) window.clearInterval(timer)
    }, 300)

    return () => {
      window.clearInterval(timer)
      widgets().forEach((el) => (el.style.display = "none"))
    }
  }, [])

  return null
}
