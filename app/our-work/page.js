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
    sector: "Business",
    headline: "Refinancing an expired corporate facility out of default",
    structure: "Temporary facility to discharge the outgoing lender, then a long-term refinance",
    capital: "$1.9M",
    outcome:
      "A corporate borrower's business facility had expired and a previous broker could not move it. Exit fees and a high default rate were mounting, and the principal was overseas on a family matter. We arranged a temporary facility to discharge the outgoing lender and negotiated favourable discharge terms. The matter has since settled, which restored order and eased the default costs. Once the remaining loan-to-value conditions are met, it refinances to a long-term principal and interest facility at a materially lower rate.",
    tags: ["Refinance", "Non-bank", "Corporate"],
  },
  {
    sector: "Private Capital",
    headline: "A private facility to reset a corporate group after the 2020 pandemic",
    structure: "Private facility across two securities, then a short-term bridge through the restructure",
    capital: "$1.23M",
    outcome:
      "A corporate group came through the 2020 pandemic with damaged credit files after circumstances outside their control, which put mainstream refinancing out of reach. We put a private facility in place to discharge the mortgages across both properties and finalise a company administration, which gave them room to restructure and repair their credit history. A short-term facility carried them through the delays, and we have since secured indicative approval for a long-term facility at a substantially better rate, subject to the final credit matters being resolved.",
    tags: ["Private credit", "Restructure", "Corporate"],
  },
  {
    sector: "Construction",
    headline: "Completion capital for a builder whose lender would not fund the finish",
    structure: "Additional construction funding secured against verified end value",
    capital: "$900K",
    outcome:
      "A licensed building team had fully drawn their original construction facility, and their lender would not review or extend it to finish the works in progress. The project valuation showed there was still clear headroom to cover the additional funds. We secured approval for the funding needed to complete the build and bring the property to sale, so the team could move on to their next project.",
    tags: ["Construction", "Completion capital", "Builders"],
  },
  {
    sector: "Agriculture",
    headline: "Refinancing a defaulted rural facility around a succession plan",
    structure: "Family-office facility structured for succession and an eventual sale",
    capital: "$400K",
    outcome:
      "A farming partnership on a rural property had been placed in a poorly structured working-capital loan that quietly expired and fell into default, unnoticed for months while a steep default rate ran. Introduced through the owners' legal advisers, we discharged that facility and rebuilt the structure around their succession plan. That cleared the way to sell the property and move to the coast for retirement. We arranged the facility through one of our family-office relationships that specialises in rural property.",
    tags: ["Agriculture", "Succession", "Refinance"],
  },
  {
    sector: "Property Development",
    headline: "Development funding for an agistment property built for the equine market",
    structure: "Development facility covering council approvals and construction",
    capital: "$565K",
    outcome:
      "A landowner running an agistment operation in Victoria wanted to develop the site for the equine market with accommodation cabins, fencing and stabling, but the project fell outside what traditional lenders would fund. The cabin kits were already on hand. We funded the council approval fees and construction costs, and put the balance toward an investment property purchase. On completion, the improved asset positions the owner to refinance to an institutional lender.",
    tags: ["Development", "Rural land", "Council approvals"],
  },
];

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
