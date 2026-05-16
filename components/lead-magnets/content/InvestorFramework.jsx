import { Lead, Section, Callout, List } from "../LeadMagnetShell";

export default function InvestorFramework() {
  return (
    <>
      <Callout>
        This framework is general information for wholesale and sophisticated
        investors only. It is not a product disclosure statement, an offer, or
        personal advice. Private credit carries real capital risk; assess any
        opportunity against your own circumstances and seek independent advice.
      </Callout>

      <Lead>
        Private credit has gone from niche to a A$200bn+ Australian market. The
        return is attractive because the risk is real — and largely borne by
        the investor. A disciplined framework is what separates a considered
        position from a costly one.
      </Lead>

      <Section kicker="The return" title="What you are actually being paid for">
        <p>
          The yield on a private credit position compensates you for three
          things: capital risk (the borrower may not repay), illiquidity (your
          money is committed for a term), and complexity (someone has to
          originate, structure and monitor the loan). If a return looks high
          relative to the risk being described, the risk is usually being
          understated, not the return overstated.
        </p>
      </Section>

      <Section kicker="The protections" title="Structure is the real security">
        <p>
          Headline rate matters less than where you sit if a loan goes wrong.
          The protections that actually hold:
        </p>
        <List
          items={[
            "First-mortgage security over real property at conservative LVRs — not unsecured or second-ranking exposure.",
            "Covenants and controls — drawdown conditions, valuation rights, step-in rights.",
            "Diversification — limits on exposure to any single borrower, sector or project.",
            "Alignment — the manager's own capital and fee structure pulling the same way as yours.",
          ]}
        />
      </Section>

      <Section
        kicker="The diligence"
        title="The seven areas to test (ASIC-aligned)"
      >
        <p>
          ASIC&apos;s 2025 reviews of the sector flagged exactly where weak
          managers are weak. Test every opportunity against all seven:
        </p>
        <List
          numbered
          items={[
            "Security & capital preservation — what's the loan secured by, at what LVR, ranking where?",
            "Manager track record & governance — how long operating, licensing, history through a downturn?",
            "Fees & remuneration — every fee, the net interest margin retained, borrower-paid fees, disclosed and quantified.",
            "Portfolio transparency & valuation — can you see the underlying loans and how they're valued?",
            "Liquidity — redemption terms, gates, and whether they match the portfolio's true liquidity.",
            "Credit risk management — impairment policy, monitoring, enhanced diligence on larger loans.",
            "Conflicts of interest — related-party lending, and how conflicts are identified and managed.",
          ]}
        />
      </Section>

      <Section kicker="The red flags" title="What should make you pause">
        <List
          items={[
            "Return described in detail; risk described in generalities.",
            "Reluctance to show the underlying loan book or valuation method.",
            "Fee structures that are vague, layered, or only partly disclosed.",
            "Redemption terms more liquid than the assets could possibly support.",
            "Related-party borrowers without clear, independent governance.",
          ]}
        />
        <Callout>
          The single best diligence question is simple: &ldquo;Show me a loan
          that didn&apos;t perform, and exactly what happened next.&rdquo; The
          quality and candour of that answer tells you most of what you need to
          know.
        </Callout>
      </Section>

      <Section kicker="The questions" title="What to ask before you commit">
        <List
          items={[
            "What am I being paid for here, specifically, and why is the return at this level?",
            "Where do I rank if a borrower defaults, and what is the recovery process?",
            "What is the fully-loaded fee load, and what net return have investors actually received?",
            "How concentrated is the book, and what is the largest single exposure?",
            "What were your worst outcomes, and what did investors ultimately get back?",
          ]}
        />
      </Section>
    </>
  );
}
