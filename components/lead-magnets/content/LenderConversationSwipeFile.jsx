import { Lead, Callout } from "../LeadMagnetShell";
import { SwipeDeck } from "../SwipeDeck";

export default function LenderConversationSwipeFile() {
  return (
    <>
      <Lead>
        The first lender conversation sets the price and the pace. Copy this
        framing. It signals a prepared operator in the first thirty seconds —
        and prepared operators get faster yeses and better terms.
      </Lead>

      <SwipeDeck
        title="Deck — The lender conversation, swipe by swipe"
        intro="Eight swipes. Adapt the wording; keep the structure."
        cards={[
          {
            title: "Swipe 1 — Open with the deal in one line",
            body: (
              <p>
                &ldquo;I&apos;m after [amount] for [purpose], over [term],
                secured by [asset], exiting via [sale/refinance] by
                [date].&rdquo; You&apos;ve told them everything that matters
                before they&apos;ve had to ask.
              </p>
            ),
          },
          {
            title: "Swipe 2 — Lead with the exit, not the rate",
            body: (
              <p>
                &ldquo;The exit is [X], and here&apos;s the evidence.&rdquo;
                Lenders relax when the way out is clear. Rate is a conversation
                you have <em>after</em> they want the deal.
              </p>
            ),
          },
          {
            title: "Swipe 3 — Name the risk first",
            body: (
              <p>
                &ldquo;The two things I&apos;d want a lender comfortable with
                are [A] and [B] — here&apos;s how each is managed.&rdquo; You
                control the narrative instead of defending it.
              </p>
            ),
          },
          {
            title: "Swipe 4 — Show conservative numbers",
            body: (
              <p>
                &ldquo;These figures already assume [downside]. Even then it
                stacks at [margin/cover].&rdquo; Conservatism is the most
                persuasive thing you can bring.
              </p>
            ),
          },
          {
            title: "Swipe 5 — Ask the cost question properly",
            body: (
              <p>
                &ldquo;What&apos;s the all-in cost over my actual term — every
                fee in the number?&rdquo; Never negotiate against a headline
                rate.
              </p>
            ),
          },
          {
            title: "Swipe 6 — Handle the price push",
            body: (
              <p>
                &ldquo;I&apos;m comparing on effective cost and certainty of
                funding, not the rate alone. What does your all-in look like,
                and how certain is your capital?&rdquo;
              </p>
            ),
          },
          {
            title: "Swipe 7 — Test their speed and authority",
            body: (
              <p>
                &ldquo;Who makes the credit decision, and what&apos;s a
                realistic time to a binding offer for a deal like this?&rdquo;
                Vague answers are an answer.
              </p>
            ),
          },
          {
            title: "Swipe 8 — Close with a next step",
            body: (
              <p>
                &ldquo;If I send the one-pager and the [doc] today, what can
                you come back with, and by when?&rdquo; Always leave with a
                date.
              </p>
            ),
          },
        ]}
      />

      <Callout>
        Notice what&apos;s missing: pleading, over-explaining, and leading with
        rate. Prepared borrowers set the tone — and the tone sets the terms.
      </Callout>
    </>
  );
}
