import Link from "next/link"
import { Logo } from "@/components/site/logo"
import { areas } from "@/lib/areas"
import { services } from "@/lib/services"
import { site } from "@/lib/site"

export function Footer() {
  return (
    <footer className="bg-navy pt-16 pb-24 text-[#b6c6dc] md:pb-7 [&_a:hover]:underline">
      <div className="container-site grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo light className="h-24" />
          <p className="mt-4">Water softeners, filtration, and reverse osmosis for Kansas City area homes.</p>
          <ul className="mt-4 grid gap-1 text-white">
            <li><a href={site.phoneHref}>{site.phoneDisplay}</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>
        </div>
        <div>
          <FooterHeading>Services</FooterHeading>
          <ul className="grid gap-1 text-white">
            {services.map((service) => (
              <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <FooterHeading>Service areas</FooterHeading>
          <ul className="grid gap-1 text-white">
            {areas.map((area) => (
              <li key={area.slug}><Link href={`/service-areas/${area.slug}`}>{area.name}, {area.state}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <FooterHeading>Company</FooterHeading>
          <ul className="grid gap-1 text-white">
            <li><Link href="/#how">Our process</Link></li>
            <li><Link href="/#about">About us</Link></li>
            <li><Link href="/#faq">FAQ</Link></li>
            <li><a href="#quote">Free quote</a></li>
          </ul>
        </div>
      </div>
      <div className="container-site mt-12 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-sm">
        <p>
          &copy; {new Date().getFullYear()} {site.legalName} d/b/a {site.name}. All rights reserved.
        </p>
        <p>Installations are performed by independent licensed and insured plumbing contractors.</p>
      </div>
    </footer>
  )
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 text-sm tracking-widest text-white uppercase">{children}</h3>
}

export function MobileCallBar() {
  return (
    <a
      href={site.phoneHref}
      className="fixed inset-x-0 bottom-0 z-40 bg-sun px-4 py-4 text-center font-extrabold text-navy shadow-[0_-6px_20px_-8px_rgba(0,0,0,.3)] md:hidden"
    >
      Call for a free quote
    </a>
  )
}
