import { lmImage } from "@/lib/lead-magnet-images";
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
        icon="MessagesSquare"
        badge="Script"
        title="Deck — The lender conversation, swipe by swipe"
        intro="Eight swipes. Adapt the wording; keep the structure."
        cards={[
          {
            image: lmImage("lender-conversation-adviser-explaining"),
            title: "Open with the deal in one line",
            body: (
              <>
                <p className="font-medium text-foreground">
                  &ldquo;I&apos;m after [amount] for [purpose], over [term],
                  secured by [asset], exiting via [sale/refinance] by
                  [date].&rdquo;
                </p>
                <p className="mt-3">
                  One sentence gives a credit-minded lender everything they
                  need to decide whether to keep listening — size, security,
                  term and exit. It also signals you understand your own deal,
                  which is the single biggest trust cue in the first minute. If
                  you can&apos;t compress it to a sentence, you&apos;re not
                  ready to have the conversation yet.
                </p>
              </>
            ),
          },
          {
            image: lmImage("lender-conversation-key-on-envelope"),
            title: "Lead with the exit, not the rate",
            body: (
              <>
                <p className="font-medium text-foreground">
                  &ldquo;The exit is [sale / refinance], and here&apos;s the
                  evidence.&rdquo;
                </p>
                <p className="mt-3">
                  A lender&apos;s first private question is always &ldquo;how
                  do I get repaid?&rdquo; — answer it before they ask and the
                  whole tone shifts from interrogation to assessment. Bring the
                  proof (contracts, a refinance indication, comparable sales),
                  not an assertion. Rate is a conversation you earn{" "}
                  <em>after</em> they want the deal, not before.
                </p>
              </>
            ),
          },
          {
            image: lmImage("lender-conversation-plumb-bob"),
            title: "Name the risk first",
            body: (
              <>
                <p className="font-medium text-foreground">
                  &ldquo;The two things I&apos;d want a lender comfortable with
                  are [A] and [B] — here&apos;s how each is managed.&rdquo;
                </p>
                <p className="mt-3">
                  Every credit team will find the weak points anyway. Surfacing
                  them yourself, with the mitigant attached, converts your
                  biggest liabilities into evidence that you think like an
                  underwriter. Disclosed risk gets priced; discovered risk gets
                  declined.
                </p>
              </>
            ),
          },
          {
            image: lmImage("lender-conversation-weight-on-pages"),
            title: "Show conservative numbers",
            body: (
              <>
                <p className="font-medium text-foreground">
                  &ldquo;These figures already assume [sales down / costs up /
                  time out]. Even then it stacks at [margin / cover].&rdquo;
                </p>
                <p className="mt-3">
                  Optimistic numbers make a lender do the discounting for you —
                  and they&apos;ll discount harder than you would. Presenting a
                  stressed case that still works removes their main objection
                  before it&apos;s raised and is the most persuasive thing you
                  can put on the table.
                </p>
              </>
            ),
          },
          {
            image: lmImage("lender-conversation-booth-meeting"),
            title: "Ask the cost question properly",
            body: (
              <>
                <p className="font-medium text-foreground">
                  &ldquo;What&apos;s the all-in cost over my actual term —
                  every fee included, not the headline rate?&rdquo;
                </p>
                <p className="mt-3">
                  Headline rate is the least useful number on a term sheet.
                  Establishment, line, exit and default fees can move the true
                  cost by several points, especially on a short term. Asking
                  this in the first conversation tells the lender you
                  can&apos;t be won on a low rate alone — which changes what
                  they put in front of you.
                </p>
              </>
            ),
          },
          {
            image: lmImage("lender-conversation-balance-scale"),
            title: "Handle the price push",
            body: (
              <>
                <p className="font-medium text-foreground">
                  &ldquo;I&apos;m comparing on effective cost and certainty of
                  funding, not the rate alone. What does your all-in look like,
                  and how certain is your capital?&rdquo;
                </p>
                <p className="mt-3">
                  This reframes the negotiation from a number to a value
                  judgement, and quietly tests the thing that actually sinks
                  deals: a lender whose funding isn&apos;t committed. A
                  confident answer is reassuring; a vague one just told you
                  what you needed to know.
                </p>
              </>
            ),
          },
          {
            image: lmImage("lender-conversation-empty-boardroom"),
            title: "Test their speed and authority",
            body: (
              <>
                <p className="font-medium text-foreground">
                  &ldquo;Who makes the credit decision, and what&apos;s a
                  realistic time to a binding offer for a deal like
                  mine?&rdquo;
                </p>
                <p className="mt-3">
                  Speed is usually the reason you&apos;re talking to a non-bank
                  lender at all, so qualify it early. You&apos;re listening for
                  a named decision-maker and a specific timeframe — &ldquo;it
                  depends&rdquo; with no process behind it is itself the
                  answer, and a reason to keep other options live.
                </p>
              </>
            ),
          },
          {
            image: lmImage("lender-conversation-corridor-handoff"),
            title: "Close with a next step",
            body: (
              <>
                <p className="font-medium text-foreground">
                  &ldquo;If I send the one-pager and [the key document] today,
                  what can you come back with, and by when?&rdquo;
                </p>
                <p className="mt-3">
                  Never end a lender call without a dated commitment and a
                  clear ball-in-court. It keeps momentum, creates a soft
                  deadline, and — when you&apos;re speaking to more than one
                  lender — lets you run a real, time-bound comparison instead
                  of an open-ended chase.
                </p>
              </>
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
