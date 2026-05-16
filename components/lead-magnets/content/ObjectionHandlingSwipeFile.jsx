import { Lead, SwipeDeck, Callout } from "../LeadMagnetShell";

export default function ObjectionHandlingSwipeFile() {
  return (
    <>
      <Lead>
        Credit teams raise the same ten objections. Walking in with a
        considered answer to each doesn&apos;t just save the deal — it tells
        the lender you&apos;ve done the thinking, which is exactly what they
        want to fund.
      </Lead>

      <SwipeDeck
        title="Deck — The 10 objections, answered"
        intro="Ten swipes. The objection, then the response that resolves it."
        cards={[
          {
            title: "1 · “Presales are too thin.”",
            body: <p>Show qualifying presales, the absorption evidence behind the sell-down, and the residual-stock plan B. Non-bank hurdles are lower — quantify yours rather than apologise for it.</p>,
          },
          {
            title: "2 · “The margin is tight.”",
            body: <p>Walk the conservative feasibility: the downside is already in it and it still clears ~18–25%. Tight on the base case is different from tight after stress-testing.</p>,
          },
          {
            title: "3 · “Limited developer track record.”",
            body: <p>Lead with the team around you — builder, QS, project manager — and any comparable delivered work. Structure (e.g. stronger presale or lower leverage) can offset experience.</p>,
          },
          {
            title: "4 · “The valuation looks optimistic.”",
            body: <p>Provide the independent comparable evidence, dated and relevant. Offer to fund on the lender&apos;s valuer&apos;s number — confidence the value holds is itself persuasive.</p>,
          },
          {
            title: "5 · “The exit isn&apos;t certain.”",
            body: <p>Evidence it: contracts of sale, a refinance indication, or absorption data. Then give the plan B (residual stock / extended sell-down) and what it costs.</p>,
          },
          {
            title: "6 · “Construction cost risk.”",
            body: <p>Fixed-price (or capped) contract, a capable builder with capacity, and ≥5% contingency. Show the +10% cost case still works.</p>,
          },
          {
            title: "7 · “Timing is too tight.”",
            body: <p>Present the programme with float, the critical-path items, and the finance-cost case for a 3–6 month overrun. Demonstrate you&apos;ve priced delay, not ignored it.</p>,
          },
          {
            title: "8 · “Leverage is too high.”",
            body: <p>Show where it sits against LVR, LCR and GRV cover, and offer the lever you&apos;ll pull (more equity, mezzanine, or a lower ask) to bring it into appetite.</p>,
          },
          {
            title: "9 · “The structure is complex.”",
            body: <p>Provide a clean one-page ownership chart and explain why the structure exists. Complexity disclosed and explained is workable; complexity discovered is not.</p>,
          },
          {
            title: "10 · “Why did the bank decline?”",
            body: <p>Answer it head-on and factually — usually policy, presales or speed, not credit quality. Candour here resolves the objection; evasion confirms it.</p>,
          },
        ]}
      />

      <Callout>
        The pattern across all ten: acknowledge, then evidence, then give the
        managed plan B. Lenders don&apos;t need zero risk — they need to see
        you&apos;ve already thought about theirs.
      </Callout>
    </>
  );
}
