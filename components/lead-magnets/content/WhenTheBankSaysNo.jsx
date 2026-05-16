import { Callout, List } from "../LeadMagnetShell";
import { BookReader } from "../BookReader";

export default function WhenTheBankSaysNo() {
  return (
    <BookReader
      pages={[
        {
          kicker: "When the Bank Says No",
          title: "Fund what banks won't",
          body: (
            <>
              <p>
                The bank passed, stalled, or wants more presales than the
                project can carry. That isn&apos;t the end of the project —
                it&apos;s the point where the capital stack starts to matter.
              </p>
              <p>
                This book walks the non-bank path for developers: why the money
                moved, the stack layer by layer, what a credit team actually
                checks, the vocabulary that moves the decision, and how to
                present a project that gets a fast yes. Turn the page.
              </p>
            </>
          ),
        },
        {
          kicker: "The landscape",
          title: "Why development funding moved",
          body: (
            <>
              <p>
                Major banks have pulled back from development lending while
                demand for housing and well-located commercial stock has not.
                The gap that opened is now filled by non-bank lenders and
                private credit funds that raised capital specifically to fund
                development.
              </p>
              <p>
                The difference is people and posture: in-house teams who read
                feasibilities for a living, lower presale hurdles, and
                decisions in weeks rather than quarters. You pay a margin for
                that — but on most projects the cost of <em>not</em> starting,
                or starting late, is larger than the margin.
              </p>
            </>
          ),
        },
        {
          kicker: "The toolkit",
          title: "The capital stack, layer by layer",
          body: (
            <>
              <p>
                A development is rarely funded by one facility. The stack is
                built from the cheapest, safest money up to the most expensive
                — each layer repaid before the one above it:
              </p>
              <List
                numbered
                items={[
                  "Site acquisition / equity release — against the site, up to ~65% of as-is value (more with a DA). Bridges you to construction.",
                  "Senior construction debt — the core facility, up to ~70% of GRV or ~80% of total cost, low or no presale hurdle.",
                  "Stretch senior — pushes leverage toward ~90% of cost for a de-risked project, at a higher blended cost.",
                  "Mezzanine — fills the gap above senior, short term, only on a de-risked deal with a clear exit.",
                  "Preferred equity — sponsor funds part of the equity, an investor funds the rest for a coupon and/or profit share.",
                  "Residual stock — against completed, individually-titled stock once construction is done.",
                ]}
              />
              <Callout>
                The art is using the least expensive money the deal can safely
                carry — not the most leverage available. Maximum gearing is how
                thin margins become losses.
              </Callout>
            </>
          ),
        },
        {
          kicker: "The decision drivers",
          title: "What lenders check first",
          body: (
            <>
              <p>
                Before a credit team commits to a development, five things
                decide the outcome:
              </p>
              <List
                items={[
                  "Feasibility — margin on cost (~18–25%) and whether the assumptions are conservative.",
                  "Security & leverage — LVR against as-is value, and loan-to-cost / loan-to-GRV on the build.",
                  "Presales — qualifying pre-commitment the deal carries (non-bank hurdles are lower, not always zero).",
                  "The team — developer track record, builder strength, and the delivery structure.",
                  "The exit — sale-rate evidence or a credible refinance to residual stock.",
                ]}
              />
              <p>
                Notice none of these is the interest rate. Get these right and
                pricing follows; get them wrong and no rate saves the deal.
              </p>
            </>
          ),
        },
        {
          kicker: "The vocabulary",
          title: "The numbers that move it",
          body: (
            <>
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
                You don&apos;t need to model these to a lender&apos;s
                precision — but you do need to know roughly where your deal
                sits on each, because that is the conversation. A developer who
                can&apos;t state their own LVR and margin reads as a developer
                who hasn&apos;t tested the deal.
              </p>
            </>
          ),
        },
        {
          kicker: "The mistakes",
          title: "Why fundable projects still fail",
          body: (
            <>
              <p>
                These aren&apos;t bad projects — they&apos;re good projects
                presented in a way that invites a decline:
              </p>
              <List
                items={[
                  "Feasibility built on best-case sales the valuer won't support.",
                  "Contingency too thin for the build risk (5%+ is the floor lenders expect).",
                  "Finance costs left out of the feasibility, quietly erasing the margin.",
                  "Engaging finance after the site is bought, not before.",
                  "An exit that is asserted, not evidenced.",
                ]}
              />
              <p>
                Every one is self-inflicted, and every one is fixable before a
                lender ever sees the deal.
              </p>
            </>
          ),
        },
        {
          kicker: "The win",
          title: "How to get a fast yes",
          body: (
            <>
              <List
                numbered
                items={[
                  "Lead with a one-page summary: the deal, the numbers, the ask, the exit.",
                  "Show a conservative feasibility with finance costs and real contingency already in it.",
                  "Bring evidence, not assertion — comparable sales, builder, DA status, timeline.",
                  "Name the risks first and how each is managed. Lenders fund disclosed risk; they decline hidden risk.",
                  "Plan finance before you acquire the site, so the structure shapes the deal — not the other way round.",
                ]}
              />
              <Callout>
                A well-presented project doesn&apos;t just get approved faster
                — it gets better terms, because a lender prices uncertainty and
                clarity removes it. The next move is the conversation.
              </Callout>
            </>
          ),
        },
      ]}
    />
  );
}
