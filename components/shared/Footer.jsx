import Link from "next/link";
import Image from "next/image";
import { FOOTER_NAV, LEGAL_NAV } from "@/lib/nav";
import { COMPANY } from "@/lib/company-info";

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22.675 0h-21.35C.59 0 0 .59 0 1.32v21.35C0 23.41.59 24 1.325 24H12.82V14.71h-3.13v-3.62h3.13V8.41c0-3.1 1.89-4.79 4.66-4.79 1.32 0 2.46.1 2.79.14v3.24h-1.92c-1.5 0-1.79.71-1.79 1.76v2.31h3.59l-.47 3.62h-3.12V24h6.12c.73 0 1.32-.59 1.32-1.32V1.32C24 .59 23.41 0 22.675 0z" />
    </svg>
  );
}

// Built from COMPANY.social — only renders icons where the URL is non-null,
// so TBA channels don't appear as broken "#" links.
const SOCIAL_LINKS = [
  { label: "LinkedIn", href: COMPANY.social.linkedin, icon: LinkedInIcon },
  { label: "Instagram", href: COMPANY.social.instagram, icon: InstagramIcon },
  { label: "Facebook", href: COMPANY.social.facebook, icon: FacebookIcon },
].filter((s) => Boolean(s.href));

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-border bg-cu-surface-abyss text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
          {/* Brand + newsletter */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              aria-label={`${COMPANY.name} home`}
              className="inline-flex w-fit items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cu-brandy-light focus-visible:ring-offset-2 focus-visible:ring-offset-cu-surface-abyss"
            >
              {/* Silver logo in light mode, original logo in dark mode */}
              <Image
                src="/brand/logo-horizontal-light.png"
                alt={COMPANY.name}
                width={200}
                height={40}
                className="block h-9 w-auto object-contain dark:hidden"
              />
              <Image
                src="/brand/logo-horizontal.png"
                alt={COMPANY.name}
                width={200}
                height={40}
                className="hidden h-9 w-auto object-contain dark:block"
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Receive insights on private finance, market shifts, and Capital Unique
              updates. Quiet, considered, no spam.
            </p>

            {/*
              GHL Newsletter Form #5 — placeholder.
              When the GHL form is created, replace this block with:
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/<FORM_ID>"
                style={{ width: "100%", height: "auto", border: "none", minHeight: "120px" }}
                id="newsletter-form"
                title="Capital Unique newsletter signup"
              />
              Custom CSS (paste into GHL > Form > Advanced > Custom CSS) lives in
              lib/ghl-form-css.js (TBD).
            */}
            <form
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
              data-ghl-form-placeholder="newsletter"
              action="#"
              method="post"
            >
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                placeholder="Your email address"
                className="flex-1 rounded-md border border-border bg-input-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cu-brandy-light"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-cu-brandy px-4 py-2.5 text-sm font-medium text-white hover:bg-cu-brandy-light transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-muted-foreground">
              By subscribing you agree to our{" "}
              <Link href="/privacy" className="underline hover:text-foreground">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {Object.entries(FOOTER_NAV).map(([heading, links]) => (
              <div key={heading} className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-foreground">{heading}</h3>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* General advice mini-disclaimer — full text on desktop, terse on mobile */}
        <div className="mt-12 rounded-xl border border-border bg-cu-surface-vault px-5 py-4">
          {/* Mobile: terse */}
          <p className="text-xs leading-relaxed text-muted-foreground sm:hidden">
            <span className="font-medium text-foreground/85">
              General information only.
            </span>{" "}
            Not financial advice.{" "}
            <Link
              href="/disclaimer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              See Disclaimer
            </Link>
            .
          </p>
          {/* Desktop: full */}
          <p className="hidden text-xs leading-relaxed text-muted-foreground sm:block">
            <span className="font-medium text-foreground/85">
              General information only.
            </span>{" "}
            Information on this site is general in nature and does not
            constitute personal financial, legal, or tax advice. Capital Unique
            does not hold an Australian Credit Licence and does not provide
            consumer credit, credit assistance, or financial product advice.
            Services are limited to wholesale and commercial scenarios. See our{" "}
            <Link
              href="/disclaimer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Disclaimer
            </Link>
            .
          </p>
        </div>

        {/* Legal nav row */}
        <nav
          aria-label="Legal"
          className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-6"
        >
          {LEGAL_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 flex flex-col-reverse items-start gap-6 border-t border-border pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-xs text-muted-foreground">
            <p>© {CURRENT_YEAR} {COMPANY.name}. All rights reserved.</p>
            <p className="mt-1">
              ABN {COMPANY.abn} · ACN {COMPANY.acn}
            </p>
            <p className="mt-1">
              {COMPANY.officeAddress.full} ·{" "}
              <a
                href={COMPANY.phoneOfficeHref}
                className="hover:text-foreground"
              >
                {COMPANY.phoneOffice}
              </a>
            </p>
          </div>
          {SOCIAL_LINKS.length > 0 && (
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${COMPANY.name} on ${label}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-cu-surface-vault transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cu-brandy-light"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
