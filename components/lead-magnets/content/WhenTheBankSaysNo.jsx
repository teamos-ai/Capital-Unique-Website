import { Lead, Section, Callout, List } from "../LeadMagnetShell";

export default function WhenTheBankSaysNo() {
  return (
    <>
      <Lead>
        The bank passed, stalled, or wants more presales than the project can
        carry. That isn&apos;t the end of the project — it&apos;s the point
        where the capital stack starts to matter. This is how developers fund
        what banks won&apos;t.
      </Lead>

      <Section
        kicker="The landscape"
        title="Why development funding moved to non-bank"
      >
        <p>
          Major banks have pulled back from development lending while demand
          for housing and well-located commercial stock has not. Non-bank
          lenders and private credit funds raised capital specifically to fund
          development — with in-house people who understand feasibilities,
          lower presale hurdles, and decisions in weeks rather than quarters.
          You pay a margin for that; on most projects the cost of *not*
          starting is larger.
        </p>
      </Section>

      <Section kicker="The toolkit" title="The capital stack, layer by layer">
        <p>
          A development is rarely funded by one facility. The stack is built
          from the cheapest, safest money down to the most expensive:
        </p>
        <List
          numbered
          items={[
            "Site acquisition / equity release — against the site, typically up to ~65% of as-is value (higher with a DA). Bridges you to construction.",
            "Senior construction debt — the core facility, commonly up to ~70% of GRV or ~80% of total development cost, low or no presale hurdle.",
            "Stretch senior — pushes leverage higher (toward ~90% of cost) for a de-risked project, at a higher blended cost.",
            "Mezzanine — fills the gap above senior, short term, only on a de-risked deal with a clear exit.",
            "Preferred equity — the sponsor funds part of the equity, an investor funds the rest for a coupon and/or profit share; project must be substantially de-risked.",
            "Residual stock — against completed, individually-titled stock once construction is done.",
          ]}
        />
        <Callout>
          Every layer up the stack costs more and is repaid first. The art is
          using the least expensive money the deal can safely carry — not the
          most leverage available.
        </Callout>
      </Section>

      <Section
        kicker="The decision drivers"
        title="What lenders check before they fund a development"
      >
        <List
          items={[
            "Feasibility — margin on cost (lenders look for ~18–25%) and whether the assumptions are conservative.",
            "Security & leverage — LVR against as-is value, and loan-to-cost / loan-to-GRV on the build.",
            "Presales — how much qualifying pre-commitment the deal carries (non-bank hurdles are lower, not always zero).",
            "The team — developer track record, builder strength, and the delivery structure.",
            "The exit — sale rate evidence or a credible refinance to residual stock.",
          ]}
        />
      </Section>

      <Section
        kicker="The vocabulary"
        title="LVR, LCR, GRV, TDC — what actually moves the decision"
      >
        <List
          items={[
            "GRV — Gross Realisation Value: total expected sale value of completed stock (net of GST). The ceiling everything is sized against.",
            "TDC — Total Development Cost: land + construction + consultants + fees + finance + contingency.",
            "LVR — against as-is land value early; against GRV on the completed project.",
            "LCR — loan as a percentage of total development cost.",
            "ICR — interest cover, increasingly the question on income-producing assets.",
          ]}
        />
        <p>
          You don&apos;t need to model these to a lender&apos;s precision — but
          you do need to know roughly where your deal sits, because that is the
          conversation.
        </p>
      </Section>

      <Section
        kicker="The mistakes"
        title="Why fundable projects still get declined"
      >
        <List
          items={[
            "Feasibility built on best-case sales the valuer won't support.",
            "Contingency too thin for the build risk (5%+ is the floor lenders expect).",
            "Finance costs left out of the feasibility, quietly erasing the margin.",
            "Engaging finance after the site is bought, not before.",
            "An exit that is asserted, not evidenced.",
          ]}
        />
      </Section>

      <Section
        kicker="The win"
        title="How to present a project that gets a fast yes"
      >
        <List
          numbered
          items={[
            "Lead with a one-page summary: the deal, the numbers, the ask, the exit.",
            "Show a conservative feasibility with finance costs and real contingency in it.",
            "Bring evidence, not assertion — comparable sales, builder, DA status, timeline.",
            "Name the risks first and how each is managed. Lenders fund disclosed risk; they decline hidden risk.",
            "Plan finance before you acquire the site, so the structure shapes the deal — not the other way round.",
          ]}
        />
        <Callout>
          A well-presented project doesn&apos;t just get approved faster — it
          gets better terms, because a lender prices uncertainty, and clarity
          removes it.
        </Callout>
      </Section>
    </>
  );
}
