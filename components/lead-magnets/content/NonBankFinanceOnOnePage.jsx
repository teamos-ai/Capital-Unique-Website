import { Lead, Callout } from "../LeadMagnetShell";
import { CheatSheet } from "../CheatSheet";

export default function NonBankFinanceOnOnePage() {
  return (
    <>
      <Lead>
        The whole landscape, decoded. Tab through it next to any term sheet —
        it&apos;s the translator between what a lender says and what it means.
      </Lead>

      <CheatSheet
        zones={[
          {
            title: "Facility types",
            rows: [
              {
                k: "Site acquisition / equity release",
                v: "Against as-is land (≈65% LVR, more with a DA). Bridges to construction.",
              },
              {
                k: "Senior construction debt",
                v: "The core build facility. ≈70% of GRV or ≈80% of total cost. Low/no presale hurdle.",
              },
              {
                k: "Stretch senior",
                v: "Higher leverage (≈90% of cost) on a de-risked project, higher blended cost.",
              },
              {
                k: "Mezzanine",
                v: "Fills the gap above senior. Short term, de-risked deals, clear exit.",
              },
              {
                k: "Preferred equity",
                v: "Investor funds most of the equity for a coupon / profit share. Substantially de-risked deals.",
              },
              {
                k: "Residual stock",
                v: "Against completed, individually-titled stock once built.",
              },
              {
                k: "Bridging / caveat",
                v: "Fast, short-term, priced per month. For genuine timing plays.",
              },
            ],
          },
          {
            title: "The ratios that decide it",
            rows: [
              {
                k: "LVR — Loan to Value",
                v: "Loan ÷ asset value. As-is value early; GRV on a finished project.",
              },
              {
                k: "LCR — Loan to Cost",
                v: "Loan ÷ total development cost. Often the binding constraint on a build.",
              },
              {
                k: "ICR — Interest Cover",
                v: "Net income ÷ interest. The lead question on income-producing assets (≈1.3x+).",
              },
              {
                k: "GRV — Gross Realisation Value",
                v: "Total expected sale value of completed stock, net of GST. The ceiling.",
              },
              {
                k: "TDC — Total Development Cost",
                v: "Land + construction + consultants + fees + finance + contingency.",
              },
              {
                k: "Margin on cost",
                v: "Profit ÷ cost. Lenders look for ≈18–25% on development.",
              },
            ],
          },
          {
            title: "Jargon, decoded",
            rows: [
              {
                k: "Capitalised interest",
                v: "Interest added to the loan, not paid monthly — repaid at the end.",
              },
              {
                k: "Line fee",
                v: "Ongoing fee on the facility limit (drawn or undrawn).",
              },
              {
                k: "Establishment fee",
                v: "Upfront fee to set up the loan, typically 1–3%.",
              },
              {
                k: "Default rate",
                v: "The (much higher) rate if loan terms are breached.",
              },
              {
                k: "Presales",
                v: "Qualifying pre-commitments before/at funding. Lower for non-bank.",
              },
              {
                k: "Shovel-ready",
                v: "DA approved, builder and contract in place, ready to start.",
              },
              {
                k: "Exit",
                v: "How the loan is repaid — sale or refinance. Must be evidenced.",
              },
            ],
          },
          {
            title: "Red flags",
            rows: [
              {
                k: "Headline-rate selling",
                v: "A low rate quoted with the fees kept vague. Ask for all-in cost.",
              },
              {
                k: "No clear exit",
                v: "A repayment that ‘should’ happen. Lenders fund evidenced exits only.",
              },
              {
                k: "Thin contingency",
                v: "Under ~5% on a build invites cost-overrun risk.",
              },
              {
                k: "Uncommitted funding",
                v: "A lender whose own capital isn't certain. Ask directly.",
              },
              {
                k: "Surprises late",
                v: "Undisclosed issues found mid-process — the fastest way to a decline.",
              },
            ],
          },
        ]}
      />

      <Callout>
        One rule that survives every deal: compare the effective all-in cost
        over your actual term, never the headline rate. Everything else is
        detail around that.
      </Callout>
    </>
  );
}
