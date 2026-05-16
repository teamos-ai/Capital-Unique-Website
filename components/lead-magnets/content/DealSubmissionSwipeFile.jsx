import { Lead, Callout } from "../LeadMagnetShell";
import { SwipeDeck } from "../SwipeDeck";

export default function DealSubmissionSwipeFile() {
  return (
    <>
      <Lead>
        Lenders decide fast when a deal is presented well — and stall when
        they have to dig. Copy these three decks. Swipe by swipe, they are the
        exact framing that gets a confident, quick yes.
      </Lead>

      <SwipeDeck
        icon="ClipboardList"
        badge="Deal Summary"
        title="Deck 1 — The one-page deal summary"
        intro="Five swipes. This is the whole deal on a single page. If it doesn't fit, it isn't clear enough yet."
        cards={[
          {
            title: "The ask, in one line",
            body: (
              <>
                <p className="font-medium text-foreground">
                  &ldquo;[Amount] for [purpose], over [term], secured by
                  [asset], exiting via [sale / refinance] by [date].&rdquo;
                </p>
                <p className="mt-3">
                  This single sentence is the whole deal a credit team needs to
                  triage in or out. If you can&apos;t state it cleanly, you
                  don&apos;t yet understand your own transaction — and a lender
                  will sense that immediately. Lead every conversation and every
                  document with it.
                </p>
              </>
            ),
          },
          {
            title: "The security",
            body: (
              <p>
                State the asset, its location, the current as-is value and the
                basis for it (independent valuation, contract, comparables), and
                any existing debt with payout figures. Then name the LVR
                you&apos;re asking for plainly — don&apos;t make the lender
                calculate it. Clear security framing is what lets a lender size
                the deal in the first read instead of the third.
              </p>
            ),
          },
          {
            title: "The numbers",
            body: (
              <p>
                For a development: GRV, total development cost, margin on cost,
                and contingency. For a transaction: the figures that prove it
                services or sells. Present them conservatively and with finance
                costs already included — numbers that flatter the deal get
                discounted harder than numbers that already assume the downside.
              </p>
            ),
          },
          {
            title: "The exit",
            body: (
              <p>
                Spell out how the loan is repaid, by when, and the evidence the
                exit is credible — comparable sales, a refinance term sheet, or
                a contract of sale. Add the second exit and its cost. An exit
                that is asserted is an exit declined; an exit that is evidenced,
                with a managed plan B, is fundable.
              </p>
            ),
          },
          {
            title: "The risks, named first",
            body: (
              <p>
                List the two or three things that could realistically go wrong
                and, beside each, exactly how it is managed. Naming your own
                risks converts them from objections into evidence that you
                think like an underwriter. Disclosed risk gets priced; hidden
                risk, once discovered, ends the conversation.
              </p>
            ),
          },
        ]}
      />

      <SwipeDeck
        icon="MessageCircleQuestion"
        badge="Question"
        title="Deck 2 — Questions to ask a non-bank lender"
        intro="Eight swipes. Ask these before you engage. The answers tell you who you're dealing with."
        cards={[
          {
            title: "The true cost",
            body: (
              <>
                <p className="font-medium text-foreground">
                  &ldquo;What is the all-in cost over my actual term — every
                  fee included, not the headline rate?&rdquo;
                </p>
                <p className="mt-3">
                  Establishment, line, brokerage and exit fees can move the
                  real cost by several points on a short facility. A lender who
                  can&apos;t answer this clearly is either disorganised or
                  hoping you won&apos;t ask.
                </p>
              </>
            ),
          },
          {
            title: "The default rate",
            body: (
              <>
                <p className="font-medium text-foreground">
                  &ldquo;What triggers the default rate, and what does the cost
                  become if it applies?&rdquo;
                </p>
                <p className="mt-3">
                  The default rate is where short-term lending gets expensive
                  fast. Know exactly what breaches it (a missed milestone, a
                  late exit) and the dollar consequence before you sign, not
                  after.
                </p>
              </>
            ),
          },
          {
            title: "Decision & speed",
            body: (
              <>
                <p className="font-medium text-foreground">
                  &ldquo;Who makes the credit decision, and what is your
                  realistic time to a binding offer?&rdquo;
                </p>
                <p className="mt-3">
                  Speed is usually why you&apos;re using a non-bank lender at
                  all. You want a named decision-maker and a specific
                  timeframe — not a committee and &ldquo;it depends.&rdquo;
                </p>
              </>
            ),
          },
          {
            title: "Conditions to draw",
            body: (
              <>
                <p className="font-medium text-foreground">
                  &ldquo;Exactly what conditions must be met to draw the first
                  dollar?&rdquo;
                </p>
                <p className="mt-3">
                  An approval that can&apos;t fund is worthless. Surface the
                  conditions precedent now so they don&apos;t become a delay at
                  the moment you need the money.
                </p>
              </>
            ),
          },
          {
            title: "Discharge & exit fees",
            body: (
              <>
                <p className="font-medium text-foreground">
                  &ldquo;What does discharge require, and what are the exit /
                  early-repayment fees?&rdquo;
                </p>
                <p className="mt-3">
                  Getting out can cost as much as getting in. Know the
                  discharge process and whether repaying early is penalised —
                  it changes the true cost of a short-term facility materially.
                </p>
              </>
            ),
          },
          {
            title: "If the exit slips",
            body: (
              <>
                <p className="font-medium text-foreground">
                  &ldquo;What happens if my exit is 30–60 days late —
                  extension terms and cost?&rdquo;
                </p>
                <p className="mt-3">
                  Exits slip; lenders know it. The quality and fairness of the
                  extension answer tells you how this lender behaves when a
                  deal is under pressure — which is exactly when it matters.
                </p>
              </>
            ),
          },
          {
            title: "Certainty of funding",
            body: (
              <>
                <p className="font-medium text-foreground">
                  &ldquo;Is your funding committed, and have you funded deals
                  like mine recently?&rdquo;
                </p>
                <p className="mt-3">
                  The deal-killer nobody mentions is a lender whose own capital
                  isn&apos;t certain. Recent, comparable, funded deals are the
                  proof that an indicative offer will actually settle.
                </p>
              </>
            ),
          },
          {
            title: "What would decline it",
            body: (
              <>
                <p className="font-medium text-foreground">
                  &ldquo;What would make you decline this deal?&rdquo;
                </p>
                <p className="mt-3">
                  The single most revealing question you can ask. The answer
                  tells you their real appetite, surfaces the objection early
                  while you can still address it, and shows whether they&apos;ve
                  genuinely understood your deal.
                </p>
              </>
            ),
          },
        ]}
      />

      <SwipeDeck
        icon="FileCheck2"
        badge="Document"
        title="Deck 3 — The deal-ready document list"
        intro="Twelve swipes. Have these ready before you submit and you remove the lender's reasons to slow down."
        cards={[
          {
            title: "One-page deal summary",
            body: (
              <p>
                The Deck 1 summary — the ask, security, numbers, exit and
                risks on a single page. It sets the speed and tone of the
                entire assessment; everything else is the evidence behind it.
              </p>
            ),
          },
          {
            title: "Asset details & valuation basis",
            body: (
              <p>
                Address, title particulars and the most recent valuation or the
                basis for the value claimed. The lender sizes early leverage
                against this number, so make it independent and defensible.
              </p>
            ),
          },
          {
            title: "Current debt position",
            body: (
              <p>
                Existing facilities and payout figures on the security. It
                defines how much the new capital actually has to do and whether
                the lender is first-ranking — a question they will not proceed
                without answering.
              </p>
            ),
          },
          {
            title: "Feasibility (development)",
            body: (
              <p>
                Costs, GRV, margin on cost and contingency. This is the
                document a credit team re-runs themselves — present it
                conservatively with finance costs in it so their version and
                yours agree.
              </p>
            ),
          },
          {
            title: "Sales / comparable evidence",
            body: (
              <p>
                Independent, dated and genuinely comparable sales — or signed
                contracts. This is what turns your revenue assumption from a
                hope the valuer won&apos;t support into a number they will.
              </p>
            ),
          },
          {
            title: "Entity & ownership chart",
            body: (
              <p>
                A clean one-page structure showing the borrowing entity,
                ownership and guarantors. Opaque structures slow credit and
                security work; a clear chart removes a whole category of
                questions.
              </p>
            ),
          },
          {
            title: "Financials",
            body: (
              <p>
                Last two years plus the current position, reconciled. Numbers
                that don&apos;t tie together erode trust faster than weak
                numbers presented honestly.
              </p>
            ),
          },
          {
            title: "Director / guarantor position",
            body: (
              <p>
                IDs and a basic asset & liability statement for the people
                standing behind the deal. Recourse is part of how every
                non-bank facility is priced, so make it easy to assess.
              </p>
            ),
          },
          {
            title: "Track record",
            body: (
              <p>
                Prior completed projects or transactions of a comparable type
                and scale. Track record is one of the first things a credit
                team weighs; if it&apos;s thin, this is where the team around
                you carries it.
              </p>
            ),
          },
          {
            title: "Approvals & build contract",
            body: (
              <p>
                For development: DA / approvals status and the building
                contract. Approval risk and build risk are priced heavily —
                certainty here directly improves leverage and terms.
              </p>
            ),
          },
          {
            title: "Exit evidence",
            body: (
              <p>
                A refinance indication, contracts of sale, or hard absorption
                data. This is the single document that most often decides
                whether a credit team is comfortable — make it the strongest
                in the pack.
              </p>
            ),
          },
          {
            title: "Risk note",
            body: (
              <p>
                A short, honest note on the known risks and how each is
                managed. Submitting it unprompted is the clearest signal you
                think like an underwriter — and it frames the risks before the
                lender does.
              </p>
            ),
          },
        ]}
      />

      <Callout>
        Bring all three decks to the first conversation and you change the
        dynamic: the lender is assessing a prepared operator, not chasing a
        moving target. Prepared deals get faster decisions and better terms.
      </Callout>
    </>
  );
}
