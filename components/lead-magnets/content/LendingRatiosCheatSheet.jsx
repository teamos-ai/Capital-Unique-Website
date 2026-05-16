import { Lead, Callout } from "../LeadMagnetShell";
import { CheatSheet } from "../CheatSheet";

export default function LendingRatiosCheatSheet() {
  return (
    <>
      <Lead>
        Five ratios decide most non-bank deals. Each one in plain English, with
        a worked example and the threshold lenders look for — tab through it
        next to your term sheet.
      </Lead>

      <CheatSheet
        zones={[
          {
            title: "LVR",
            rows: [
              {
                k: "What it is",
                v: "Loan ÷ asset value. As-is land value early; GRV on a completed project.",
              },
              { k: "Example", v: "$650k loan on a $1.0m site = 65% LVR." },
              {
                k: "Typical",
                v: "≈65% on as-is land; higher with a DA. Commercial ≈50–65%.",
              },
            ],
          },
          {
            title: "LCR",
            rows: [
              {
                k: "What it is",
                v: "Loan ÷ total development cost. Often the binding constraint on a build.",
              },
              { k: "Example", v: "$8m loan on $10m total cost = 80% LCR." },
              {
                k: "Typical",
                v: "Senior ≈80% of cost; stretch senior toward ≈90%.",
              },
            ],
          },
          {
            title: "ICR",
            rows: [
              {
                k: "What it is",
                v: "Net operating income ÷ interest expense. The lead question on income-producing assets.",
              },
              {
                k: "Example",
                v: "$260k NOI ÷ $200k interest = 1.30x ICR.",
              },
              {
                k: "Typical",
                v: "≈1.25–1.50x minimum; higher for shorter leases or weaker tenants.",
              },
            ],
          },
          {
            title: "GRV",
            rows: [
              {
                k: "What it is",
                v: "Total expected sale value of completed stock, net of GST. The ceiling.",
              },
              {
                k: "Example",
                v: "10 units × $600k = $6.0m GRV (before selling costs).",
              },
              { k: "Typical", v: "Senior debt ≈ up to 70% of GRV." },
            ],
          },
          {
            title: "TDC",
            rows: [
              {
                k: "What it is",
                v: "Land + construction + consultants + fees + finance + contingency.",
              },
              {
                k: "Example",
                v: "$2.5m land + $6m build + $1.5m soft/finance = $10m TDC.",
              },
              {
                k: "Typical",
                v: "The denominator for LCR; lenders fund a % of this.",
              },
            ],
          },
          {
            title: "Margin on cost",
            rows: [
              {
                k: "What it is",
                v: "Project profit ÷ total cost. The buffer lenders look for.",
              },
              {
                k: "Example",
                v: "$2m profit ÷ $10m cost = 20% margin on cost.",
              },
              {
                k: "Typical",
                v: "≈18–25%. Below ~15% is too thin for most non-bank credit.",
              },
            ],
          },
        ]}
      />

      <Callout>
        The trap: a deal can pass one ratio and fail another. Lenders size to
        the <em>lowest</em> of LVR, LCR and GRV cover — never just the one that
        flatters the deal.
      </Callout>
    </>
  );
}
