import { Lead, Section, Callout, List } from "../LeadMagnetShell";

export default function BorrowersGuide() {
  return (
    <>
      <Lead>
        Non-bank capital isn&apos;t a last resort — it&apos;s a different tool.
        Used in the right scenario it is faster, more flexible and more
        commercial than a bank. Used in the wrong one it is simply more
        expensive. This guide is the difference between the two.
      </Lead>

      <Section kicker="The shift" title="Why non-bank lending exists">
        <p>
          Australian banks have steadily retreated from anything that
          doesn&apos;t fit a narrow policy box — tighter capital rules, slower
          credit, heavier presale and serviceability hurdles. Non-bank lenders
          (private credit) raised funds specifically to lend into that gap.
          They are specialists, not generalists: they price risk deal by deal
          rather than declining anything outside a template.
        </p>
        <p>
          The trade is straightforward. You pay a margin over a bank for speed,
          flexibility and a decision-maker who understands the scenario. When
          that speed or flexibility unlocks more value than it costs, non-bank
          is the right call. When it doesn&apos;t, a bank is cheaper and you
          should wait.
        </p>
      </Section>

      <Section kicker="The test" title="When non-bank is the right tool">
        <List
          items={[
            "Timing is the constraint — a settlement, a window, an opportunity that won't wait for a bank's process.",
            "The scenario is non-conforming — recent credit events, complex structure, income that doesn't present cleanly, an asset banks don't love.",
            "The bank's terms break the deal — presale or equity hurdles the project can't carry.",
            "Speed creates value — getting started sooner is worth more than the rate differential.",
          ]}
        />
        <Callout>
          If none of these are true, you probably don&apos;t need a non-bank
          lender — and a good adviser will tell you so. Cost without a reason is
          just cost.
        </Callout>
      </Section>

      <Section
        kicker="The number that matters"
        title="The real cost of capital — beyond the rate"
      >
        <p>
          The headline interest rate is the least useful number on a term
          sheet. The figure that decides whether a facility is expensive is the
          all-in cost over the actual term:
        </p>
        <List
          items={[
            "Establishment / line / commitment fees (often 1–3% upfront)",
            "Brokerage or advisory fees",
            "Ongoing line fees on undrawn or drawn balances",
            "Exit, discharge and early-repayment fees",
            "The default rate — what the cost becomes if anything slips",
          ]}
        />
        <p>
          A lower headline rate with heavier fees on a short term routinely
          costs more than a higher rate with light fees. Always compare the
          effective annualised cost, not the rate.
        </p>
      </Section>

      <Section kicker="The lens" title="What a non-bank lender actually assesses">
        <p>
          Banks lead with policy. Non-bank lenders lead with the deal. Broadly,
          they weigh four things:
        </p>
        <List
          numbered
          items={[
            "Security — the asset, its value, and how realistically it can be sold if needed.",
            "Exit — how, and how certainly, the loan gets repaid (sale, refinance, settlement).",
            "Scenario strength — does the story hold together, and are the numbers conservative?",
            "The borrower — track record, conduct, and whether issues are disclosed or hidden.",
          ]}
        />
        <p>
          A strong scenario is conservative, has a clear and near-term exit, and
          surfaces its own weaknesses before the lender finds them. A weak one
          relies on best-case assumptions and an exit that &ldquo;should&rdquo;
          happen.
        </p>
      </Section>

      <Section
        kicker="The mistakes"
        title="What gets a good deal declined"
      >
        <List
          items={[
            "Optimistic feasibility — value or sales evidence the lender's valuer won't support.",
            "No real exit — a refinance or sale that isn't yet credible.",
            "Thin or messy documentation — financials that don't reconcile.",
            "Surprises late — undisclosed issues that erode trust mid-process.",
            "Leaving it too late — engaging a lender after the timing pressure is already critical.",
          ]}
        />
      </Section>

      <Section kicker="Before you sign" title="The questions to ask">
        <List
          items={[
            "What is the all-in cost over my actual term — every fee included?",
            "What triggers the default rate, and what does the cost become if it applies?",
            "What exactly is required to draw, and to discharge?",
            "What happens if my exit is a month late?",
            "Who makes the credit decision, and how quickly?",
          ]}
        />
        <Callout>
          The quality of the answers tells you as much as the answers
          themselves. A lender who can&apos;t explain its own cost structure
          clearly is a risk in its own right.
        </Callout>
      </Section>
    </>
  );
}
