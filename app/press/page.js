import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { Mail, Phone, ExternalLink } from "lucide-react";
import { BrandIcon } from "@/components/shared/BrandIcon";
import { COMPANY } from "@/lib/company-info";
import { CASE_STUDIES } from "@/lib/case-studies";

export const metadata = {
  alternates: { canonical: "/press" },
  title: "Press & Media",
  description:
    "Press contact, brand assets, and approved background for journalists writing about Capital Unique and the non-bank capital market in Australia.",
};

const ASSETS = [
  {
    label: "Brand mark (SVG, PNG)",
    href: "#brand-mark",
    note: "Logo on dark background and on light. SVG and 2× PNG.",
  },
  {
    label: "John Codrington portrait (high-res)",
    href: "/images/about/john-codrington.jpg",
    note: "Approved press portrait. Credit not required but appreciated.",
  },
  {
    label: "Brand guidelines (PDF)",
    href: "/brand/capital-unique-brand-guidelines.pdf",
    note: "Colour, typography, voice, and usage notes — plus the compliance language required when describing Capital Unique.",
    download: true,
  },
];

export default function PressPage() {
  return (
    <>
      <PageHero
        eyebrow="Press & Media"
        heading="For journalists and producers"
        body="Capital Unique is a private, principal-led capital advisor based in Australia. John Codrington is available for considered commentary on non-bank lending, capital structure, and market cycles."
        primaryCta={{
          label: "Email press desk",
          href: "mailto:hello@capitalunique.com",
        }}
        secondaryCta={{ label: "Download brand kit", href: "#assets" }}
      />

      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.5fr] md:gap-x-16">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-cu-brandy">
                Press contact
              </p>
              <p className="mt-4 font-serif text-2xl font-semibold leading-tight">
                John Codrington
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Founder, {COMPANY.name}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={COMPANY.emailHref}
                  className="inline-flex items-center gap-2 text-sm font-medium text-cu-brandy hover:text-cu-brandy-light"
                >
                  <Mail size={14} />
                  {COMPANY.email}
                </a>
                <a
                  href={COMPANY.phoneOfficeHref}
                  className="inline-flex items-center gap-2 text-sm font-medium text-cu-brandy hover:text-cu-brandy-light"
                >
                  <Phone size={14} />
                  {COMPANY.phoneOffice} (office)
                </a>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-cu-brandy">
                About Capital Unique
              </p>
              <div className="mt-4 space-y-4 text-base text-muted-foreground">
                <p>
                  Capital Unique provides capital advisory and structuring
                  services for commercial borrowers and sophisticated investors
                  across Australia. The firm operates exclusively in the
                  wholesale and commercial market — outside the consumer credit
                  framework.
                </p>
                <p>
                  Engagements are principal-led: John Codrington personally
                  oversees every transaction. The firm does not operate as a
                  product distributor, volume broker, or committee-driven
                  lender.
                </p>
                <p>
                  Capital Unique works across property development,
                  construction, business, commercial, agricultural, and private
                  capital scenarios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.25em] text-cu-brandy">
            Case studies
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            Anonymised deal scenarios for background
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Real engagements, anonymised, that journalists are welcome to draw
            on when writing about Capital Unique and John Codrington. Each shows
            how the firm structures capital in situations mainstream lenders
            decline. Figures are rounded and clients are not identified. For
            detail on a specific scenario, email the press desk.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {CASE_STUDIES.map((cs) => (
              <article
                key={cs.headline}
                className="flex flex-col rounded-2xl border border-border bg-cu-surface-vault p-8 md:p-10"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-cu-brandy">
                    {cs.sector}
                  </p>
                  <p className="text-sm font-semibold text-cu-brandy">
                    {cs.capital}
                  </p>
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                  {cs.headline}
                </h3>
                <p className="mt-4 text-base text-muted-foreground">
                  {cs.outcome}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            Case studies are anonymised. Capital figures are rounded and each
            outcome is specific to that engagement; nothing here predicts or
            guarantees a particular result. Further recent work is on our{" "}
            <Link href="/our-work" className="underline hover:text-foreground">
              Our Work
            </Link>{" "}
            page.
          </p>
        </div>
      </section>

      <section
        id="assets"
        className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.25em] text-cu-brandy">
            Brand assets
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            Logos, portrait, and brand guidelines
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-5">
            {ASSETS.map((asset) => (
              <a
                key={asset.label}
                href={asset.href}
                download={asset.download ? "" : undefined}
                className="group flex items-start justify-between gap-6 rounded-2xl border border-border bg-cu-surface-vault p-6 transition-colors hover:bg-cu-surface-char md:p-8"
              >
                <div>
                  <p className="font-serif text-lg font-semibold leading-tight md:text-xl">
                    {asset.label}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {asset.note}
                  </p>
                </div>
                <BrandIcon name="Download" size="sm" className="mt-1" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            For high-resolution assets not listed here (event photography,
            specific composition requests), email the press desk.
          </p>
        </div>
      </section>

      <section className="bg-background px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            Working on a story?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            For interview requests, embargo coordination, or background on a
            specific topic, email the press desk directly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:hello@capitalunique.com"
              className="inline-flex items-center gap-2 rounded-md bg-cu-brandy px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-cu-brandy-light transition-colors"
            >
              <Mail size={16} />
              Email press desk
            </a>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-cu-surface-vault px-6 py-3 text-sm font-medium text-foreground hover:bg-cu-surface-char transition-colors"
            >
              About John
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
