import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";

export const metadata = {
  alternates: { canonical: "/our-work" },
  title: "Our Work",
  description:
    "Recent capital deployed by Capital Unique across property, business, and private capital scenarios in Australia. Anonymised case studies of structured outcomes.",
};

const CASE_STUDIES = [
  {
    sector: "Property Development",
    headline: "Bridging a settlement timing gap on a Melbourne mid-rise",
    structure: "Senior secured · 9-month term · staged drawdown",
    capital: "$8.2M",
    outcome:
      "Capital deployed within 14 days of initial conversation. Project settled on schedule and refinanced to construction funding ahead of feasibility window closing.",
    tags: ["Bridging", "Property", "Melbourne"],
  },
  {
    sector: "Commercial",
    headline: "Working capital for a regional logistics operator through a transition",
    structure: "Asset-backed facility · 24-month term · interest only",
    capital: "$3.5M",
    outcome:
      "Funded through an ownership transition where bank lending paused. Operator retained customer contracts and completed handover without disruption.",
    tags: ["Working capital", "Transition", "Commercial"],
  },
  {
    sector: "Construction",
    headline: "Cost-overrun rescue on a residential build in Brisbane",
    structure: "Second mortgage · staged release tied to milestones",
    capital: "$1.6M",
    outcome:
      "Released against verified progress with cost engineer sign-off at each draw. Project completed and handed over on revised timeline.",
    tags: ["Construction", "Cost overrun", "Brisbane"],
  },
  {
    sector: "Private Capital",
    headline: "Discreet liquidity arrangement against a family office portfolio",
    structure: "Asset-backed · bespoke covenants · long horizon",
    capital: "Confidential",
    outcome:
      "Structured to match the client's tax position and trust arrangements. Capital available on standby with drawdown at the client's discretion.",
    tags: ["Private capital", "Family office", "Bespoke"],
  },
  {
    sector: "Agriculture",
    headline: "Seasonal capital for a Riverina cropping operation",
    structure: "Working capital · revolver aligned to harvest cycle",
    capital: "$2.1M",
    outcome:
      "Capital aligned to planting and harvest timing rather than monthly servicing. Repaid in full at harvest with no extension required.",
    tags: ["Agriculture", "Seasonal", "Riverina"],
  },
  {
    sector: "Business",
    headline: "Growth capital for a specialist services business acquiring a competitor",
    structure: "Term loan · 36-month amortisation · earn-out aligned",
    capital: "$4.8M",
    outcome:
      "Capital structured around the acquisition earn-out so servicing matched cashflow ramp. Acquisition completed; business doubled in 18 months.",
    tags: ["Acquisition", "Business", "Services"],
  },
];

export default function OurWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        heading="Capital deployed, outcomes delivered"
        body="A selection of recent scenarios, anonymised. Each illustrates how we structure capital to fit the reality of a deal — timing, assets, and risk — rather than fitting deals into a template."
        primaryCta={{ label: "Speak with John", href: "/contact" }}
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
        primaryCta={{ label: "Speak with John", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />
    </>
  );
}
