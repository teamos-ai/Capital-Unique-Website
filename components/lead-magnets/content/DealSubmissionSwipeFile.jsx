import { Lead, SwipeDeck, Callout } from "../LeadMagnetShell";

export default function DealSubmissionSwipeFile() {
  return (
    <>
      <Lead>
        Lenders decide fast when a deal is presented well — and stall when
        they have to dig. Copy these three decks. Swipe by swipe, they are the
        exact framing that gets a confident, quick yes.
      </Lead>

      <SwipeDeck
        title="Deck 1 — The one-page deal summary"
        intro="Five swipes. This is the whole deal on a single page. If it doesn't fit, it isn't clear enough yet."
        cards={[
          {
            title: "Swipe 1 — The ask, in one line",
            body: (
              <p>
                &ldquo;[Amount] for [purpose], over [term], secured by [asset],
                exiting via [sale / refinance] by [date].&rdquo; If you
                can&apos;t say it in one sentence, you don&apos;t know the deal
                yet.
              </p>
            ),
          },
          {
            title: "Swipe 2 — The security",
            body: (
              <p>
                Asset, location, current as-is value (and basis), and any
                existing debt. State the LVR you&apos;re asking for plainly.
              </p>
            ),
          },
          {
            title: "Swipe 3 — The numbers",
            body: (
              <p>
                For a project: GRV, total development cost, margin on cost, and
                contingency. For a transaction: the figures that prove it
                services or sells. Conservative, with finance costs included.
              </p>
            ),
          },
          {
            title: "Swipe 4 — The exit",
            body: (
              <p>
                How the loan is repaid, by when, and the evidence it&apos;s
                credible — comparable sales, a refinance term sheet, a contract
                of sale. An exit asserted is an exit declined.
              </p>
            ),
          },
          {
            title: "Swipe 5 — The risks, named first",
            body: (
              <p>
                The two or three things that could go wrong and how each is
                managed. Naming them builds trust; hiding them ends it.
              </p>
            ),
          },
        ]}
      />

      <SwipeDeck
        title="Deck 2 — Questions to ask a non-bank lender"
        intro="Eight swipes. Ask these before you engage. The answers tell you who you're dealing with."
        cards={[
          { title: "Swipe 1", body: <p>What is the all-in cost over my actual term — every fee included, not the headline rate?</p> },
          { title: "Swipe 2", body: <p>What triggers the default rate, and what does the cost become if it applies?</p> },
          { title: "Swipe 3", body: <p>Who makes the credit decision, and what is your realistic time to a binding offer?</p> },
          { title: "Swipe 4", body: <p>Exactly what conditions must be met to draw the first dollar?</p> },
          { title: "Swipe 5", body: <p>What does discharge require, and what are the exit / early-repayment fees?</p> },
          { title: "Swipe 6", body: <p>What happens if my exit is 30–60 days late — extension terms and cost?</p> },
          { title: "Swipe 7", body: <p>Is your funding committed, and have you funded deals like mine recently?</p> },
          { title: "Swipe 8", body: <p>What would make you decline this deal? (The most revealing question of all.)</p> },
        ]}
      />

      <SwipeDeck
        title="Deck 3 — The deal-ready document list"
        intro="Twelve swipes. Have these ready before you submit and you remove the lender's reasons to slow down."
        cards={[
          { title: "Swipe 1", body: <p>One-page deal summary (Deck 1).</p> },
          { title: "Swipe 2", body: <p>Asset details and most recent valuation or appraisal basis.</p> },
          { title: "Swipe 3", body: <p>Current debt position / payout figures on existing facilities.</p> },
          { title: "Swipe 4", body: <p>Feasibility (for development) — costs, GRV, margin, contingency.</p> },
          { title: "Swipe 5", body: <p>Comparable sales or independent sales evidence.</p> },
          { title: "Swipe 6", body: <p>Entity structure and ownership chart.</p> },
          { title: "Swipe 7", body: <p>Financials — last 2 years plus current position.</p> },
          { title: "Swipe 8", body: <p>Director / guarantor IDs and a basic asset & liability position.</p> },
          { title: "Swipe 9", body: <p>Track record — prior completed projects or transactions.</p> },
          { title: "Swipe 10", body: <p>For development: DA / approvals status and the build contract.</p> },
          { title: "Swipe 11", body: <p>The exit evidence — refinance indication or contracts of sale.</p> },
          { title: "Swipe 12", body: <p>A short note on known risks and how each is managed.</p> },
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
