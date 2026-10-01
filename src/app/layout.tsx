import type { Metadata } from "next"
import { Fraunces, Manrope } from "next/font/google"
import { Footer, MobileCallBar } from "@/components/site/footer"
import { Header } from "@/components/site/header"
import { serviceArea, site } from "@/lib/site"
import "./globals.css"

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] })
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], weight: ["600", "700"] })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "KC Home Water | Water Softeners & Filtration in Kansas City",
    template: "%s | KC Home Water",
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: "KC Home Water | Softer, cleaner water for Kansas City homes",
    description:
      "Whole-home softening, filtration, and RO drinking water with upfront pricing, installed by licensed local plumbers.",
  },
}

// Local business structured data for Google
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  telephone: site.phoneHref.replace("tel:", ""),
  email: site.email,
  logo: `${site.url}/logo.svg`,
  description: site.description,
  areaServed: [
    ...serviceArea.missouri.map((city) => `${city}, MO`),
    ...serviceArea.kansas.map((city) => `${city}, KS`),
  ],
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${fraunces.variable}`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCallBar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
