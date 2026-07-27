import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { CASE_STUDIES } from "@/lib/case-studies";

export const metadata = {
  alternates: { canonical: "/our-work" },
  title: "Our Work",
  description:
    "Recent capital deployed by Capital Unique across property, business, and private capital scenarios in Australia. Anonymised case studies of structured outcomes.",
};

export default function OurWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        heading="Capital deployed, outcomes delivered"
        body="A selection of recent scenarios, anonymised. Each illustrates how we structure capital to fit the reality of a deal — timing, assets, and risk — rather than fitting deals into a template."
        primaryCta={{ label: "Speak with Team", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />

      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {CASE_STUDIES.map((cs) => (
              <article
                key={cs.headline}
                className="flex flex-col rounded-2xl border border-border bg-cu-surface-vault p-8 transition-colors hover:bg-cu-surface-char md:p-10"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-cu-brandy">
                  {cs.sector}
                </p>
                <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                  {cs.headline}
                </h3>
                <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Structure
                    </dt>
                    <dd className="mt-1 text-sm text-foreground/90">
                      {cs.structure}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Capital
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-cu-brandy">
                      {cs.capital}
                    </dd>
                  </div>
                </dl>
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Outcome
                  </p>
                  <p className="mt-2 text-base text-muted-foreground">
                    {cs.outcome}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md border border-border bg-cu-surface-ember px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-xs text-muted-foreground">
            Case studies are anonymised. Capital figures and timelines are
            illustrative of recent scenarios. Each engagement is unique;
            outcomes described do not guarantee or predict any particular
            result for your scenario. See our{" "}
            <a href="/disclaimer" className="underline hover:text-foreground">
              Disclaimer
            </a>
            .
          </p>
        </div>
      </section>

      <CTABlock
        eyebrow="Your scenario"
        heading="Every deal is its own structure"
        body="If something here resembles your situation, the next step is a direct conversation."
        primaryCta={{ label: "Speak with Team", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />
    </>
  );
}
