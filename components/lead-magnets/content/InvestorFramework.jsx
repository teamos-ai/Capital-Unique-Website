import { Callout, List } from "../LeadMagnetShell";
import { BookReader } from "../BookReader";
import { lmImage } from "@/lib/lead-magnet-images";

export default function InvestorFramework() {
  return (
    <BookReader
      cover={{
        image: lmImage("cover-private-lending"),
        kicker: "Wholesale investors only",
        title: "Private Lending: A Wholesale Investor's Framework",
        subtitle: "Income, risk and what to watch for in Australian private credit.",
      }}
      pages={[
        {
          kicker: "Wholesale investors only",
          title: "A framework, not an offer",
          body: (
            <>
              <Callout>
                General information for wholesale and sophisticated investors
                only. Not a product disclosure statement, an offer, or personal
                advice. Private credit carries real capital risk — assess any
                opportunity against your own circumstances and seek independent
                advice.
              </Callout>
              <p>
                Private credit has gone from niche to a A$200bn+ Australian
                market. The return is attractive because the risk is real — and
                largely borne by the investor. A disciplined framework is what
                separates a considered position from a costly one. Turn the
                page.
              </p>
            </>
          ),
        },
        {
          kicker: "The return",
          title: "What you're actually paid for",
          body: (
            <>
              <p>
                The yield on a private credit position compensates you for
                three distinct things:
              </p>
              <List
                items={[
                  "Capital risk — the borrower may not repay, and you may not recover in full.",
                  "Illiquidity — your money is committed for a term, often with limited or gated redemption.",
                  "Complexity — someone has to originate, structure, document and monitor each loan.",
                ]}
              />
              <p>
                The test follows directly: if a return looks high relative to
                the risk being described, the risk is almost always being
                understated — not the return overstated. Your job is to price
                the risk yourself, not accept the manager&apos;s framing of it.
              </p>
            </>
          ),
        },
        {
          kicker: "The protections",
          title: "Structure is the real security",
          body: (
            <>
              <p>
                Headline rate matters far less than where you sit when a loan
                goes wrong. The protections that actually hold up under stress:
              </p>
              <List
                items={[
                  "First-mortgage security over real property at conservative LVRs — not unsecured or second-ranking exposure.",
                  "Covenants and controls — drawdown conditions, valuation rights, step-in rights.",
                  "Diversification — hard limits on exposure to any single borrower, sector or project.",
                  "Alignment — the manager's own capital and fee structure pulling the same way as yours.",
                ]}
              />
              <p>
                A fund can quote an excellent rate and still be a poor risk if
                it&apos;s second-ranking, concentrated, and lightly covenanted.
                Read the structure before the return.
              </p>
            </>
          ),
        },
        {
          kicker: "The diligence",
          title: "Seven areas to test",
          body: (
            <>
              <p>
                ASIC&apos;s 2025 reviews of the sector flagged exactly where
                weak managers are weak. Test every opportunity against all
                seven:
              </p>
              <List
                numbered
                items={[
                  "Security & capital preservation — what's the loan secured by, at what LVR, ranking where?",
                  "Manager track record & governance — how long operating, licensed, and history through a downturn?",
                  "Fees & remuneration — every fee, the net interest margin retained, borrower-paid fees, disclosed and quantified.",
                  "Portfolio transparency & valuation — can you see the underlying loans and how they're valued?",
                  "Liquidity — redemption terms, gates, and whether they match the portfolio's true liquidity.",
                  "Credit risk management — impairment policy, monitoring, enhanced diligence on larger loans.",
                  "Conflicts of interest — related-party lending, and how conflicts are identified and managed.",
                ]}
              />
            </>
          ),
        },
        {
          kicker: "The red flags",
          title: "What should make you pause",
          body: (
            <>
              <List
                items={[
                  "Return described in detail; risk described in generalities.",
                  "Reluctance to show the underlying loan book or the valuation method.",
                  "Fee structures that are vague, layered, or only partly disclosed.",
                  "Redemption terms more liquid than the underlying assets could possibly support.",
                  "Related-party borrowers without clear, independent governance.",
                ]}
              />
              <Callout>
                The single best diligence question is simple: &ldquo;Show me a
                loan that didn&apos;t perform, and exactly what happened
                next.&rdquo; The candour and detail of that answer tells you
                most of what you need to know about a manager.
              </Callout>
            </>
          ),
        },
        {
          kicker: "The questions",
          title: "Before you commit",
          body: (
            <>
              <List
                items={[
                  "What am I being paid for here, specifically, and why is the return at this level?",
                  "Where do I rank if a borrower defaults, and what is the recovery process?",
                  "What is the fully-loaded fee load, and what net return have investors actually received?",
                  "How concentrated is the book, and what is the largest single exposure?",
                  "What were your worst outcomes, and what did investors ultimately get back?",
                ]}
              />
              <p>
                Strong managers answer all five plainly and with numbers. Hesitation
                or generality on any of them is, itself, the answer — and a
                reason to keep your capital where you can see it.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
