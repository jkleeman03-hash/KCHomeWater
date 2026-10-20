"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDownIcon, MenuIcon, PhoneIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ChatButton } from "@/components/site/chat-button"
import { Logo } from "@/components/site/logo"
import { areas } from "@/lib/areas"
import { services } from "@/lib/services"
import { site } from "@/lib/site"

type NavLink = { href: string; label: string; children?: { href: string; label: string }[] }

const links: NavLink[] = [
  { href: "/#how", label: "Process" },
  {
    href: "/services",
    label: "Services",
    children: services.map((s) => ({ href: `/services/${s.slug}`, label: s.name })),
  },
  {
    href: "/service-areas",
    label: "Service Areas",
    children: areas.map((a) => ({ href: `/service-areas/${a.slug}`, label: `${a.name}, ${a.state}` })),
  },
  { href: "/pricing", label: "Pricing" },
  { href: "/#about", label: "About" },
  { href: "/#faq", label: "FAQ" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  // The Free Consultation page already has the chat open, so the button there would just link to itself.
  const showChatButton = usePathname() !== "/free-consultation"

  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between gap-6">
        <Logo className="h-12" />

        <nav aria-label="Main" className="hidden items-center gap-8 text-sm text-muted-foreground lg:flex">
          {links.map((link) =>
            link.children ? (
              <div key={link.href} className="group relative">
                <Link href={link.href} className="flex items-center gap-1 transition-colors hover:text-foreground">
                  {link.label}
                  <ChevronDownIcon className="size-4 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute top-full left-1/2 w-72 -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="rounded-xl border bg-card p-2 shadow-xl shadow-foreground/10">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="block rounded-lg px-3 py-2 font-medium text-foreground hover:bg-secondary">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground"
          >
            <PhoneIcon className="size-4" />
            {site.phoneDisplay}
          </a>
          {showChatButton && <ChatButton size="default" className="h-9 px-4" />}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-lg" className="lg:hidden" aria-label="Open menu">
              <MenuIcon className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="overflow-y-auto px-6 pt-16 pb-8">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav aria-label="Mobile" className="flex flex-col">
              {links.map((link) => (
                <div key={link.href} className="border-b py-3">
                  <Link href={link.href} onClick={() => setOpen(false)} className="block py-1 text-lg font-semibold text-foreground">
                    {link.label}
                  </Link>
                  {link.children && (
                    <ul className="mt-1 grid gap-1 pl-3">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="block py-1 text-muted-foreground"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              {showChatButton && <ChatButton className="mt-6" onClick={() => setOpen(false)} />}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
