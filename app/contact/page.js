import { PageHero } from "@/components/shared/PageHero";
import { Mail, MessageSquare, Phone, Clock } from "lucide-react";

export const metadata = {
  title: "Contact",
  description:
    "Speak directly with John Codrington at Capital Unique. A conversation begins with understanding your situation, without obligation or pressure.",
};

const CHANNELS = [
  {
    icon: MessageSquare,
    title: "Start with Charles A.I",
    body: "Map your scenario before the call. Charles A.I helps you arrive prepared.",
    href: "/charles-ai",
    cta: "Open Charles A.I",
  },
  {
    icon: Mail,
    title: "Email John directly",
    body: "Detailed scenarios, supporting documents, or questions before a conversation.",
    href: "mailto:hello@capitalunique.com",
    cta: "hello@capitalunique.com",
  },
  {
    icon: Phone,
    title: "Book a call",
    body: "A focused conversation about your scenario. Direct access to John, no intermediaries.",
    href: "#book",
    cta: "Schedule a conversation",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        heading="A direct conversation"
        body="A conversation with Capital Unique begins with understanding your situation, without obligation or pressure. John reviews every enquiry personally."
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
                    className="w-full rounded-md border border-border bg-input-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cu-brandy-light"
                  />
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
                    className="w-full rounded-md border border-border bg-input-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cu-brandy-light"
                  />
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
                  className="w-full rounded-md border border-border bg-input-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cu-brandy-light"
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
                  className="w-full rounded-md border border-border bg-input-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cu-brandy-light"
                />
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
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cu-brandy-darkest text-cu-brandy">
                  <c.icon size={18} strokeWidth={1.5} />
                </div>
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
            <div className="rounded-2xl border border-border bg-cu-surface-abyss p-6">
              <div className="flex items-start gap-3">
                <Clock
                  size={18}
                  strokeWidth={1.5}
                  className="mt-0.5 flex-shrink-0 text-cu-brandy"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Hours and location
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Monday to Friday, 9:00–18:00 AEST/AEDT.
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Based in Victoria. We work with borrowers and investors
                    across Australia.
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
