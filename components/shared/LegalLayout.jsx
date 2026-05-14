// LegalLayout — long-form readable container for privacy/terms/disclaimer pages.
// Keep reading width tight; cap at ~700px. Manual prose styling (no @tailwindcss/typography).

export function LegalLayout({ title, eyebrow, lastUpdated, effectiveDate, children }) {
  return (
    <article className="bg-background">
      <header className="border-b border-border bg-cu-surface-abyss px-6 pb-12 pt-20 lg:px-10 lg:pb-16 lg:pt-32">
        <div className="mx-auto max-w-3xl">
          {eyebrow && (
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
              {eyebrow}
            </p>
          )}
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
            {lastUpdated && (
              <p>
                <span className="text-foreground/80">Last updated:</span>{" "}
                {lastUpdated}
              </p>
            )}
            {effectiveDate && (
              <p>
                <span className="text-foreground/80">Effective:</span>{" "}
                {effectiveDate}
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="legal-prose mx-auto max-w-3xl">{children}</div>
      </div>

      <div className="border-t border-border bg-cu-surface-abyss px-6 py-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-xs text-muted-foreground">
          This document was prepared as a working draft for Capital Unique. It
          should be reviewed by a qualified Australian legal practitioner before
          being relied upon. The current version reflects the website&apos;s data
          handling and operating model as at the effective date above.
        </div>
      </div>
    </article>
  );
}
