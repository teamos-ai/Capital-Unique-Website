import { Callout, List } from "../LeadMagnetShell";
import { BookReader } from "../BookReader";

export default function BorrowersGuide() {
  return (
    <BookReader
      cover={{
        kicker: "The Borrower's Guide",
        title: "The Borrower's Guide to Non-Bank Capital",
        subtitle:
          "How non-bank lending actually works in Australia — and when it's the right call.",
      }}
      pages={[
        {
          kicker: "The Borrower's Guide",
          title: "Capital, on your terms",
          body: (
            <>
              <p>
                Non-bank capital isn&apos;t a last resort — it&apos;s a
                different tool. Used in the right scenario it is faster, more
                flexible and more commercial than a bank. Used in the wrong one
                it is simply more expensive.
              </p>
              <p>
                This short book is the difference between the two: how non-bank
                lending actually works in Australia, when it beats the bank,
                what a lender is really assessing, and the questions that
                separate a good outcome from a costly one. Turn the page.
              </p>
            </>
          ),
        },
        {
          kicker: "The shift",
          title: "Why non-bank lending exists",
          body: (
            <>
              <p>
                Australian banks have steadily retreated from anything that
                doesn&apos;t fit a narrow policy box — tighter capital rules,
                slower credit, heavier presale and serviceability hurdles. That
                retreat didn&apos;t reduce the need for capital; it just moved
                it.
              </p>
              <p>
                Non-bank lenders — private credit — raised funds specifically
                to lend into that gap. They are specialists, not generalists:
                they price risk deal by deal rather than declining anything
                outside a template, and the people assessing your deal usually
                understand the asset class first-hand.
              </p>
              <p>
                The trade is straightforward. You pay a margin over a bank for
                speed, flexibility and a decision-maker who understands the
                scenario. When that speed or flexibility unlocks more value
                than it costs, non-bank is the right call. When it doesn&apos;t,
                a bank is cheaper and you should wait.
              </p>
            </>
          ),
        },
        {
          kicker: "The test",
          title: "When non-bank is the right tool",
          body: (
            <>
              <p>
                Non-bank capital earns its margin in four situations. If your
                deal sits in one or more of them, the cost is buying something
                real:
              </p>
              <List
                items={[
                  "Timing is the constraint — a settlement, a window, or an opportunity that won't wait for a bank's process.",
                  "The scenario is non-conforming — recent credit events, complex structure, income that doesn't present cleanly, or an asset banks don't love.",
                  "The bank's terms break the deal — presale or equity hurdles the project simply can't carry.",
                  "Speed creates value — getting started sooner is worth more than the rate differential.",
                ]}
              />
              <Callout>
                If none of these are true, you probably don&apos;t need a
                non-bank lender — and a good adviser will tell you so. Cost
                without a reason is just cost.
              </Callout>
            </>
          ),
        },
        {
          kicker: "The number that matters",
          title: "The real cost of capital",
          body: (
            <>
              <p>
                The headline interest rate is the least useful number on a term
                sheet. What decides whether a facility is genuinely expensive
                is the all-in cost over your actual term — every charge
                included:
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
                A lower headline rate with heavier fees on a short term
                routinely costs more than a higher rate with light fees —
                because upfront fees don&apos;t amortise over six months the
                way they do over five years. Always compare the effective
                annualised cost, not the rate.
              </p>
            </>
          ),
        },
        {
          kicker: "The lens",
          title: "What a lender actually assesses",
          body: (
            <>
              <p>
                Banks lead with policy. Non-bank lenders lead with the deal.
                Broadly, they weigh four things, in this order:
              </p>
              <List
                numbered
                items={[
                  "Security — the asset, its value, and how realistically it can be sold if it ever has to be.",
                  "Exit — how, and how certainly, the loan gets repaid (sale, refinance, settlement) and the evidence behind it.",
                  "Scenario strength — does the story hold together, and are the numbers conservative or hopeful?",
                  "The borrower — track record, conduct, and whether issues are disclosed or hidden.",
                ]}
              />
              <p>
                A strong scenario is conservative, has a clear and near-term
                exit, and surfaces its own weaknesses before the lender finds
                them. A weak one relies on best-case assumptions and an exit
                that &ldquo;should&rdquo; happen.
              </p>
            </>
          ),
        },
        {
          kicker: "The mistakes",
          title: "What gets a good deal declined",
          body: (
            <>
              <p>
                Most declines aren&apos;t about credit quality — they&apos;re
                about presentation and preparation. The recurring five:
              </p>
              <List
                items={[
                  "Optimistic feasibility — value or sales evidence the lender's valuer won't support.",
                  "No real exit — a refinance or sale that isn't yet credible or evidenced.",
                  "Thin or messy documentation — financials that don't reconcile.",
                  "Surprises late — undisclosed issues that erode trust mid-process.",
                  "Leaving it too late — engaging a lender after the timing pressure is already critical.",
                ]}
              />
              <p>
                Every one of these is avoidable, and avoiding them doesn&apos;t
                just win approval — it wins better terms, because a lender
                prices uncertainty and preparation removes it.
              </p>
            </>
          ),
        },
        {
          kicker: "Before you sign",
          title: "The questions to ask",
          body: (
            <>
              <p>
                Put these to any lender before you engage. The quality of the
                answers tells you as much as the answers themselves:
              </p>
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
                A lender who can&apos;t explain its own cost structure clearly
                is a risk in its own right. Clarity from them is part of what
                you&apos;re buying.
              </Callout>
            </>
          ),
        },
        {
          kicker: "In one line",
          title: "What good looks like",
          body: (
            <>
              <p>
                The right non-bank deal is the cheapest capital that actually
                solves the constraint — not the lowest rate, and not the most
                leverage available. It&apos;s decided by a person who
                understood the scenario, on terms you can explain in a
                sentence, with an exit you can evidence.
              </p>
              <p>
                If your scenario fits the test on page three, the next move
                isn&apos;t more reading — it&apos;s a conversation. That&apos;s
                where the structure gets built.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
