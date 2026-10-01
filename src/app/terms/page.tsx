import type { Metadata } from "next"
import Link from "next/link"
import { ContactBlock, LegalPage } from "@/components/site/legal-page"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms for using the ${site.name} website and text message program.`,
  alternates: { canonical: "/terms" },
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p>
        These terms apply to your use of the {site.name} website and our text message program. {site.name} is a trade
        name of {site.legalName}, a Missouri limited liability company. By using this website or opting in to texts, you
        agree to these terms.
      </p>

      <h2>Our services</h2>
      <p>
        We help Kansas City area homeowners choose and purchase water softeners, filtration, and reverse osmosis systems.
        Installations are performed by independent licensed and insured plumbing contractors. Information on this website
        is general. Prices, product details, and any warranty terms for your project are set out in your written quote or
        agreement, which controls over anything on this website.
      </p>

      <h2>Text message program</h2>
      <ul>
        <li>
          <strong>Program:</strong> {site.name} customer care texts about your quote, appointments, installation, and
          service.
        </li>
        <li>
          <strong>Opting in:</strong> you opt in by checking the text message box on our quote form or by texting us
          first. Consent is not a condition of purchase.
        </li>
        <li><strong>Frequency:</strong> message frequency varies.</li>
        <li><strong>Cost:</strong> message and data rates may apply.</li>
        <li>
          <strong>Opting out:</strong> reply <strong>STOP</strong> to any message to cancel. You&apos;ll get one
          confirmation text and no further messages unless you opt in again.
        </li>
        <li>
          <strong>Help:</strong> reply <strong>HELP</strong> for help, or call{" "}
          <a href={site.phoneHref}>{site.phoneDisplay}</a> or email <a href={`mailto:${site.email}`}>{site.email}</a>.
        </li>
        <li>Carriers are not liable for delayed or undelivered messages.</li>
        <li>
          See our <Link href="/privacy">Privacy Policy</Link> for how we handle your information. We do not share mobile
          opt-in data with third parties.
        </li>
      </ul>

      <h2>Using this website</h2>
      <p>
        You agree not to misuse this website, including by submitting false information, attempting to disrupt it, or
        using it for any unlawful purpose. Website content, including text, graphics, and logos, belongs to{" "}
        {site.legalName} and may not be copied without permission.
      </p>

      <h2>Disclaimer and limitation of liability</h2>
      <p>
        This website is provided &quot;as is.&quot; To the fullest extent permitted by law, {site.legalName} is not
        liable for indirect or consequential damages arising from your use of the website. Nothing in these terms limits
        any rights you have under your written agreement with us or under applicable law.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of Missouri.</p>

      <h2>Changes to these terms</h2>
      <p>We may update these terms from time to time. The &quot;last updated&quot; date above shows when they last changed.</p>

      <h2>Contact us</h2>
      <ContactBlock />
    </LegalPage>
  )
}
