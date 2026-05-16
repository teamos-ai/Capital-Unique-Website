import { Lead, CheatZone, KeyRow, Callout } from "../LeadMagnetShell";

export default function LendingRatiosCheatSheet() {
  return (
    <>
      <Lead>
        Five ratios decide most non-bank deals. Here is each one in plain
        English, with a worked example and the threshold lenders look for —
        on one page, next to your term sheet.
      </Lead>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <CheatZone title="LVR — Loan to Value Ratio">
          <KeyRow k="What it is" v="Loan ÷ asset value. As-is land value early; GRV on a completed project." />
          <KeyRow k="Example" v="$650k loan on an $1.0m site = 65% LVR." />
          <KeyRow k="Typical" v="≈65% on as-is land; higher with a DA. Commercial ≈50–65%." />
        </CheatZone>

        <CheatZone title="LCR — Loan to Cost Ratio">
          <KeyRow k="What it is" v="Loan ÷ total development cost. Often the binding constraint on a build." />
          <KeyRow k="Example" v="$8m loan on $10m total cost = 80% LCR." />
          <KeyRow k="Typical" v="Senior ≈80% of cost; stretch senior toward ≈90%." />
        </CheatZone>

        <CheatZone title="ICR — Interest Cover Ratio">
          <KeyRow k="What it is" v="Net operating income ÷ interest expense. The lead question on income-producing assets." />
          <KeyRow k="Example" v="$260k NOI ÷ $200k interest = 1.30x ICR." />
          <KeyRow k="Typical" v="≈1.25–1.50x minimum; higher for shorter leases or weaker tenants." />
        </CheatZone>

        <CheatZone title="GRV — Gross Realisation Value">
          <KeyRow k="What it is" v="Total expected sale value of completed stock, net of GST. The ceiling." />
          <KeyRow k="Example" v="10 units × $600k = $6.0m GRV (before selling costs)." />
          <KeyRow k="Typical" v="Senior debt ≈ up to 70% of GRV." />
        </CheatZone>

        <CheatZone title="TDC — Total Development Cost">
          <KeyRow k="What it is" v="Land + construction + consultants + fees + finance + contingency." />
          <KeyRow k="Example" v="$2.5m land + $6m build + $1.5m soft/finance = $10m TDC." />
          <KeyRow k="Typical" v="The denominator for LCR; lenders fund a % of this." />
        </CheatZone>

        <CheatZone title="Margin on Cost">
          <KeyRow k="What it is" v="Project profit ÷ total cost. The buffer lenders look for." />
          <KeyRow k="Example" v="$2m profit ÷ $10m cost = 20% margin on cost." />
          <KeyRow k="Typical" v="≈18–25%. Below ~15% is too thin for most non-bank credit." />
        </CheatZone>
      </div>

      <Callout>
        The trap: a deal can pass one ratio and fail another. Lenders size to
        the <em>lowest</em> of LVR, LCR and GRV cover — never just the one that
        flatters the deal.
      </Callout>
    </>
  );
}
