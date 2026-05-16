import { Lead, Callout } from "../LeadMagnetShell";
import { SwipeDeck } from "../SwipeDeck";

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
        icon="ShieldQuestion"
        badge="Objection"
        title="Deck — The 10 objections, answered"
        intro="Ten swipes. The objection, then the response that resolves it."
        cards={[
          {
            title: "“Presales are too thin.”",
            body: (
              <>
                <p>
                  Don&apos;t apologise for the number — quantify it. State your
                  qualifying presales, the deposit and contract status behind
                  them, and the absorption evidence supporting the rest of the
                  sell-down.
                </p>
                <p className="mt-3">
                  Then give the plan B: a residual-stock facility or extended
                  sell-down, and what it costs. Non-bank presale hurdles are
                  lower than a bank&apos;s by design — show you understand
                  exactly where yours sits rather than hoping it isn&apos;t
                  raised.
                </p>
              </>
            ),
          },
          {
            title: "“The margin is tight.”",
            body: (
              <>
                <p>
                  Distinguish &ldquo;tight on the base case&rdquo; from
                  &ldquo;tight after stress.&rdquo; Walk the conservative
                  feasibility — sales down, costs up, time out — and show it
                  still clears the ~18–25% band lenders look for.
                </p>
                <p className="mt-3">
                  A margin that survives the combined downside isn&apos;t tight;
                  it&apos;s tested. If it only works in the base case, fix the
                  deal before you present it — a lender will find that out
                  faster than you&apos;d like.
                </p>
              </>
            ),
          },
          {
            title: "“Limited developer track record.”",
            body: (
              <>
                <p>
                  Track record is one of the first things assessed, so
                  don&apos;t hide a thin one — surround it. Lead with the
                  strength of the team you&apos;ve assembled: builder, QS,
                  project manager, and any comparable work delivered.
                </p>
                <p className="mt-3">
                  Then offer structure as the offset — a stronger presale
                  position, lower leverage, or more sponsor equity. Lenders
                  fund first-time developers regularly; they fund unmanaged
                  inexperience rarely.
                </p>
              </>
            ),
          },
          {
            title: "“The valuation looks optimistic.”",
            body: (
              <>
                <p>
                  Replace assertion with evidence: independent, dated,
                  genuinely comparable sales — not the price you hope to
                  achieve.
                </p>
                <p className="mt-3">
                  Then disarm it entirely: offer to be funded on the
                  lender&apos;s own valuer&apos;s number. Willingness to live
                  with their valuation is the most persuasive signal that the
                  value actually holds.
                </p>
              </>
            ),
          },
          {
            title: "“The exit isn’t certain.”",
            body: (
              <>
                <p>
                  Evidence the primary exit — contracts of sale, a refinance
                  term sheet, or hard absorption data — so it stops being a
                  &ldquo;should&rdquo; and becomes a &ldquo;will.&rdquo;
                </p>
                <p className="mt-3">
                  Then give the second exit and its cost: residual stock, an
                  extended sell-down, or a refinance line. Two evidenced exits
                  is a fundable position; one asserted exit is a decline.
                </p>
              </>
            ),
          },
          {
            title: "“Construction cost risk.”",
            body: (
              <>
                <p>
                  Move the risk off the lender&apos;s page: a fixed-price (or
                  capped) building contract, a builder with the capacity and
                  balance sheet to deliver it, and contingency of at least 5%
                  of construction.
                </p>
                <p className="mt-3">
                  Then prove it holds — show the feasibility with a +10% cost
                  case still clearing margin. Cost overrun is the most common
                  way a development loses money; demonstrate you&apos;ve priced
                  it, not assumed it away.
                </p>
              </>
            ),
          },
          {
            title: "“Timing is too tight.”",
            body: (
              <>
                <p>
                  Present the programme with float built in and the
                  critical-path items named, so the lender sees a plan, not
                  optimism.
                </p>
                <p className="mt-3">
                  Then show the finance-cost case for a 3–6 month overrun and
                  that the deal still works. Delay is the most expensive risk
                  in a development — demonstrating you&apos;ve costed it is more
                  reassuring than claiming it won&apos;t happen.
                </p>
              </>
            ),
          },
          {
            title: "“Leverage is too high.”",
            body: (
              <>
                <p>
                  Show exactly where the ask sits against LVR, loan-to-cost and
                  GRV cover — lenders size to the lowest of the three, so know
                  which one is binding.
                </p>
                <p className="mt-3">
                  Then bring the lever you&apos;re willing to pull: more
                  sponsor equity, a mezzanine layer, or a smaller senior ask to
                  land inside appetite. Arriving with the solution is far
                  stronger than waiting to be told there&apos;s a problem.
                </p>
              </>
            ),
          },
          {
            title: "“The structure is complex.”",
            body: (
              <>
                <p>
                  Complexity isn&apos;t the problem — unexplained complexity
                  is. Provide a clean one-page ownership and security chart and
                  a sentence on why the structure exists (tax, partners,
                  staging).
                </p>
                <p className="mt-3">
                  A structure disclosed and rationalised upfront is workable
                  for a credit team; the same structure discovered mid-process
                  reads as something you were hoping they wouldn&apos;t notice.
                </p>
              </>
            ),
          },
          {
            title: "“Why did the bank decline?”",
            body: (
              <>
                <p>
                  Answer it head-on and factually. In most non-bank deals the
                  bank didn&apos;t decline on credit quality — it declined on
                  policy, presale hurdles, or speed.
                </p>
                <p className="mt-3">
                  Naming the real reason plainly resolves the objection and
                  builds trust; deflecting it confirms the lender&apos;s worst
                  assumption. Candour here is a strength, not an admission.
                </p>
              </>
            ),
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
