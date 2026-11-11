import { LegalDoc, type LegalSection } from "@/components/legal-doc"
import { site } from "@/lib/site"

// Written from what this website actually does (revFADP Art. 19, GDPR Art. 13). The studio at studio.sanafin.tech has its
// own privacy notice. Not legal advice: have it checked, and update it when the site adds a provider, tracker or cookie.
// Owner input: replace site.legalLine with the registered company name and postal address when supplied.
const sections: LegalSection[] = [
  {
    id: "controller",
    title: "Who is responsible",
    body: [
      `${site.legalLine}. For anything about your personal data, write to ${site.contactEmail}.`,
      "This notice covers the website sanafin.tech. Sanafin Outcome Studio (studio.sanafin.tech) has its own privacy notice, shown there before you sign up.",
    ],
  },
  {
    id: "collect",
    title: "What data we collect",
    items: [
      { term: "Visits", desc: "When you open the site, our hosting provider processes your IP address, browser details and the pages requested, so it can deliver the site and protect it from attacks. We do not use this to identify you." },
      { term: "Visitor statistics", desc: "If enabled, we count visits and button clicks with Plausible Analytics, which uses no cookies, stores no IP addresses and does not follow you across sites. It shows us only totals." },
      { term: "Messages you send", desc: "The deck request form opens your own email program with a prepared message to us. Nothing is sent until you send that email. We then keep the email and your contact details to answer you." },
      { term: "Booking a call", desc: "Booking a call takes you to Doodle, which then processes the details you enter under its own privacy policy." },
    ],
  },
  {
    id: "why",
    title: "Why we process data",
    items: [
      { term: "Running and securing the site", desc: "Delivering pages and stopping abuse (for EU visitors: legitimate interest, GDPR Art. 6(1)(f))." },
      { term: "Understanding use", desc: "Anonymous visit totals to improve the site (legitimate interest)." },
      { term: "Answering you", desc: "Replying to deck requests, call bookings and other messages (steps you asked for, Art. 6(1)(b), or legitimate interest)." },
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    body: [
      "The public website sets no cookies and uses no advertising or social media trackers. Fonts are served from our own domain. The LinkedIn and Doodle links are plain links: nothing from those services loads until you click them.",
      "The internal team area at /app, which needs a passcode, sets one strictly necessary sign-in cookie (sf_app, 12 hours). Because it is strictly necessary, we do not ask for consent.",
    ],
  },
  {
    id: "sharing",
    title: "Who processes data for us",
    body: [
      "Sanafin never sells personal data. The site is hosted by Cloudflare, Inc. (USA) on its global network. Visitor statistics, where enabled, are processed by Plausible Insights OÜ (Estonia, EU). Emails you send us are handled by our email provider. These providers process data only on our instructions.",
      "Cloudflare may process data in the USA. Switzerland and the EU recognise the EU as adequate; for the USA we rely on the Swiss-US and EU-US Data Privacy Framework, under which Cloudflare is certified, or on standard contractual clauses.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: [
      "Our hosting provider keeps technical logs only briefly. Emails and contact details from enquiries are kept as long as we are in contact and as required for business records (up to 10 years in Switzerland).",
    ],
  },
  {
    id: "rights",
    title: "Your rights",
    body: [
      "You can ask for access to your data, correction, deletion or a copy, and object to processing based on legitimate interest. Write to us at the address below; we answer within 30 days. You can also complain to the Swiss Federal Data Protection and Information Commissioner (FDPIC, edoeb.admin.ch) or, in the EU, to the authority where you live.",
    ],
  },
  {
    id: "contact",
    title: "Privacy contact",
    body: ["For data protection questions or to exercise your rights, contact us at:"],
    email: site.contactEmail,
  },
]

export default function PrivacyPage() {
  return (
    <LegalDoc
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="How the Sanafin website handles personal data. In short: no cookies on the public site, no tracking, and only the data you choose to send us."
      sections={sections}
    />
  )
}
