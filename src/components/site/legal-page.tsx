import Link from "next/link"
import { ChevronRightIcon } from "lucide-react"
import { addressLines, site } from "@/lib/site"

export const legalUpdated = "October 1, 2026"

// Plain reading layout for the Privacy Policy and Terms of Service.
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="pt-8 pb-20 md:pt-12">
      <div className="container-site max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm">
          <ol className="flex items-center gap-1.5 text-muted-foreground">
            <li><Link href="/" className="hover:text-blue">Home</Link></li>
            <li className="flex items-center gap-1.5">
              <ChevronRightIcon className="size-3.5" />
              <span aria-current="page" className="font-semibold text-navy">{title}</span>
            </li>
          </ol>
        </nav>
        <h1 className="text-[clamp(2.1rem,4.4vw,3rem)] leading-[1.1]">{title}</h1>
        <p className="mt-3 text-muted-foreground">Last updated: {legalUpdated}</p>
        <div className="mt-10 grid gap-4 text-[1.05rem] leading-relaxed [&_a]:text-blue [&_a]:underline [&_h2]:mt-8 [&_h2]:text-2xl [&_li]:ml-5 [&_li]:list-disc [&_ul]:grid [&_ul]:gap-2">
          {children}
        </div>
      </div>
    </section>
  )
}

export function ContactBlock() {
  return (
    <address className="not-italic">
      {site.legalName} d/b/a {site.name}
      {addressLines.map((line) => <div key={line}>{line}</div>)}
      <div>Phone: <a href={site.phoneHref}>{site.phoneDisplay}</a></div>
      <div>Email: <a href={`mailto:${site.email}`}>{site.email}</a></div>
    </address>
  )
}
