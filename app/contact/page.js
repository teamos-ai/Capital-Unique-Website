import { PageHero } from "@/components/shared/PageHero";
import { MapPin, Clock, Smartphone, Printer } from "lucide-react";
import { BrandIcon } from "@/components/shared/BrandIcon";
import { COMPANY } from "@/lib/company-info";

export const metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description:
    "Speak directly with the Team at Capital Unique. A conversation begins with understanding your situation, without obligation or pressure.",
};

const CHANNELS = [
  {
    iconName: "MessageSquare",
    title: "Start with Charles A.I",
    body: "Map your scenario before the call. Charles A.I helps you arrive prepared.",
    href: "/charles-ai",
    cta: "Open Charles A.I",
  },
  {
    iconName: "Mail",
    title: "Email the Team directly",
    body: "Detailed scenarios, supporting documents, or questions before a conversation.",
    href: COMPANY.emailHref,
    cta: COMPANY.email,
  },
  {
    iconName: "Phone",
    title: "Call the office",
    body: "Direct access to the Team during business hours. No call centre, no triage.",
    href: COMPANY.phoneOfficeHref,
    cta: COMPANY.phoneOffice,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        heading="A direct conversation"
        body="A conversation with Capital Unique begins with understanding your situation, without obligation or pressure. The Team reviews every enquiry personally."
      />

      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-x-16">
          {/* Form (GHL iframe placeholder) */}
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
              Send a message
            </p>
            <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Tell us about your scenario
            </h2>
            <p className="mt-5 text-base text-muted-foreground">
              A few sentences are enough to start. We respond within one business
              day, in confidence.
            </p>

            {/*
              GHL Contact Form #1 (main contact) — placeholder.
              When the GHL form is created, replace this block with:
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/<FORM_ID>"
                style={{ width: "100%", height: "auto", border: "none", minHeight: "560px" }}
                id="contact-form"
                title="Capital Unique contact form"
              />
              Custom CSS (paste into GHL > Form > Advanced > Custom CSS) lives in
              lib/ghl-form-css.js (TBD).
            */}
            <form
              className="mt-8 grid grid-cols-1 gap-4"
              action="#"
              method="post"
              data-ghl-form-placeholder="contact-main"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="sr-only">
                    Full name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Full name"
                    required
                    minLength={2}
                    className="input-base"
                  />
                  <p className="input-error-message">
                    Please enter your full name.
                  </p>
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    required
                    className="input-base"
                  />
                  <p className="input-error-message">
                    Please enter a valid email address.
                  </p>
                </div>
              </div>
              <div>
                <label htmlFor="contact-phone" className="sr-only">
                  Phone number
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone (optional)"
                  className="input-base"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="sr-only">
                  Tell us about your scenario
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  placeholder="Brief context about your scenario, timing, and what you're working toward."
                  required
                  minLength={20}
                  className="input-base"
                />
                <p className="input-error-message">
                  Please provide at least a sentence or two of context.
                </p>
              </div>
              <button
                type="submit"
                className="mt-2 inline-flex w-fit items-center rounded-md bg-cu-brandy px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-cu-brandy-light transition-colors"
              >
                Send message
              </button>
              <p className="text-xs text-muted-foreground">
                Submissions are received in confidence. By sending, you agree to
                our{" "}
                <a
                  href="/privacy"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>

          {/* Channels + office info */}
          <aside className="flex flex-col gap-5">
            <p className="text-xs uppercase tracking-[0.25em] text-cu-brandy">
              Other ways to reach us
            </p>
            {CHANNELS.map((c) => (
              <a
                key={c.title}
                href={c.href}
                className="group rounded-2xl border border-border bg-cu-surface-vault p-6 transition-colors hover:bg-cu-surface-char"
              >
                <BrandIcon name={c.iconName} size="sm" className="mb-4" />
                <h3 className="font-serif text-lg font-semibold leading-tight tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
                <p className="mt-4 text-sm font-medium text-cu-brandy group-hover:text-cu-brandy-light">
                  {c.cta} →
                </p>
              </a>
            ))}

            {/* Office info */}
            <div className="rounded-2xl border border-border bg-cu-surface-abyss p-6 space-y-5">
              {/* Hours */}
              <div className="flex items-start gap-3">
                <Clock
                  size={18}
                  strokeWidth={1.5}
                  className="mt-0.5 flex-shrink-0 text-cu-brandy"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Hours</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {COMPANY.hours.long}
                  </p>
                </div>
              </div>

              <div className="h-px bg-border/60" />

              {/* Sydney office */}
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  strokeWidth={1.5}
                  className="mt-0.5 flex-shrink-0 text-cu-brandy"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {COMPANY.officeAddress.label}
                  </p>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {COMPANY.officeAddress.line1}
                    <br />
                    {COMPANY.officeAddress.line2}
                  </p>
                </div>
              </div>

              {/* Postal address */}
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  strokeWidth={1.5}
                  className="mt-0.5 flex-shrink-0 text-cu-brandy"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {COMPANY.postalAddress.label}
                  </p>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {COMPANY.postalAddress.line1}
                    <br />
                    {COMPANY.postalAddress.line2}
                  </p>
                </div>
              </div>

              <div className="h-px bg-border/60" />

              {/* Mobile */}
              {/* Fax */}
              <div className="flex items-start gap-3">
                <Printer
                  size={18}
                  strokeWidth={1.5}
                  className="mt-0.5 flex-shrink-0 text-cu-brandy"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Fax</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {COMPANY.fax}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
