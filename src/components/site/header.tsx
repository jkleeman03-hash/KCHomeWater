"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDownIcon, MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/site/logo"
import { areas } from "@/lib/areas"
import { services } from "@/lib/services"
import { quotePath, site } from "@/lib/site"

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
  { href: "/#about", label: "About" },
  { href: "/#faq", label: "FAQ" },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="container-site flex h-20 items-center justify-between">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {links.map((link) =>
            link.children ? (
              <div key={link.href} className="group relative">
                <Link href={link.href} className="flex items-center gap-1 font-semibold text-foreground hover:text-blue">
                  {link.label}
                  <ChevronDownIcon className="size-4 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute top-full left-1/2 w-72 -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="rounded-xl border bg-white p-2 shadow-[0_10px_30px_-12px_rgba(19,41,75,.35)]">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="block rounded-lg px-3 py-2 font-semibold text-navy hover:bg-tint">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link key={link.href} href={link.href} className="font-semibold text-foreground hover:text-blue">
                {link.label}
              </Link>
            ),
          )}
          <Button asChild variant="sun" className="h-10 px-5">
            <a href={quotePath}>Free quote</a>
          </Button>
        </nav>

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
                  <Link href={link.href} onClick={() => setOpen(false)} className="block py-1 text-lg font-semibold text-navy">
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
              <Button asChild variant="sun" size="xl" className="mt-6">
                <a href={quotePath} onClick={() => setOpen(false)}>Get a free quote</a>
              </Button>
              <a href={site.phoneHref} className="mt-4 text-center font-semibold text-navy">
                Call {site.phoneDisplay}
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
