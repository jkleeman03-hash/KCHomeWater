import type { Metadata } from "next"
import Link from "next/link"
import { ContactBlock, LegalPage } from "@/components/site/legal-page"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your information, including text message consent.`,
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        {site.legalName} d/b/a {site.name} (&quot;{site.name},&quot; &quot;we,&quot; &quot;us&quot;) respects your
        privacy. This policy explains what information we collect through {site.url.replace("https://", "")} and our
        phone, email, and text message communications, and how we use it.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Information you give us:</strong> your name, phone number, email address, ZIP code or service address,
          the products you&apos;re interested in, and anything you write in a message to us.
        </li>
        <li>
          <strong>Technical information:</strong> our website host automatically records basic technical data such as
          IP address, browser type, and pages visited, for security and to keep the site running. We do not use
          advertising or tracking cookies.
        </li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your quote request and answer your questions.</li>
        <li>To schedule, perform, and follow up on your water treatment installation or service.</li>
        <li>To send you text messages, if you have agreed to receive them (see below).</li>
        <li>To keep records required to run our business and meet legal obligations.</li>
      </ul>

      <h2>Text messaging (SMS)</h2>
      <p>
        If you opt in, {site.name} will send you text messages about your quote, appointments, installation, and
        customer service. Message frequency varies. Message and data rates may apply. You can opt out at any time by
        replying <strong>STOP</strong>, and reply <strong>HELP</strong> for help. You can also contact us using the
        details below.
      </p>
      <p>
        <strong>
          No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.
          Text messaging originator opt-in data and consent are excluded from all information sharing described in this
          policy and will not be shared with any third parties.
        </strong>
      </p>

      <h2>How we share information</h2>
      <p>We do not sell or rent your personal information. We share it only as needed to serve you:</p>
      <ul>
        <li>
          <strong>Installation contractors:</strong> the independent licensed plumbing contractor who installs your
          system receives the name, phone number, and service address needed to complete your job.
        </li>
        <li>
          <strong>Service providers:</strong> companies that help us operate, such as our website host, email provider,
          and customer relationship management (CRM) software. They may use your information only to provide services to
          us.
        </li>
        <li>
          <strong>Legal reasons:</strong> when required by law, or to protect our rights, our customers, or the public.
        </li>
      </ul>

      <h2>How long we keep information</h2>
      <p>
        We keep your information for as long as needed to provide our services, support any installed system, and meet
        legal and tax requirements, then delete it.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>Reply STOP to any text message to stop receiving texts.</li>
        <li>Ask us to see, correct, or delete the personal information we hold about you by contacting us below.</li>
      </ul>

      <h2>Children&apos;s privacy</h2>
      <p>Our services are for adults. We do not knowingly collect information from children under 13.</p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The &quot;last updated&quot; date above shows when it last changed.
        See also our <Link href="/terms">Terms of Service</Link>.
      </p>

      <h2>Contact us</h2>
      <ContactBlock />
    </LegalPage>
  )
}
