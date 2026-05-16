import { Lead, CheatZone, KeyRow, Callout } from "../LeadMagnetShell";

export default function NonBankFinanceOnOnePage() {
  return (
    <>
      <Lead>
        The whole landscape, decoded. Keep this one open next to any term
        sheet — it&apos;s the translator between what a lender says and what it
        means.
      </Lead>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <CheatZone title="Facility types">
          <KeyRow
            k="Site acquisition / equity release"
            v="Against as-is land (≈65% LVR, more with a DA). Bridges to construction."
          />
          <KeyRow
            k="Senior construction debt"
            v="The core build facility. ≈70% of GRV or ≈80% of total cost. Low/no presale hurdle."
          />
          <KeyRow
            k="Stretch senior"
            v="Higher leverage (≈90% of cost) on a de-risked project, higher blended cost."
          />
          <KeyRow
            k="Mezzanine"
            v="Fills the gap above senior. Short term, de-risked deals, clear exit."
          />
          <KeyRow
            k="Preferred equity"
            v="Investor funds most of the equity for a coupon / profit share. Substantially de-risked deals."
          />
          <KeyRow
            k="Residual stock"
            v="Against completed, individually-titled stock once built."
          />
          <KeyRow
            k="Bridging / caveat"
            v="Fast, short-term, priced per month. For genuine timing plays."
          />
        </CheatZone>

        <CheatZone title="The ratios that decide it">
          <KeyRow
            k="LVR — Loan to Value"
            v="Loan ÷ asset value. As-is value early; GRV on a finished project."
          />
          <KeyRow
            k="LCR — Loan to Cost"
            v="Loan ÷ total development cost. Often the binding constraint on a build."
          />
          <KeyRow
            k="ICR — Interest Cover"
            v="Net income ÷ interest. The lead question on income-producing assets (≈1.3x+)."
          />
          <KeyRow
            k="GRV — Gross Realisation Value"
            v="Total expected sale value of completed stock, net of GST. The ceiling."
          />
          <KeyRow
            k="TDC — Total Development Cost"
            v="Land + construction + consultants + fees + finance + contingency."
          />
          <KeyRow
            k="Margin on cost"
            v="Profit ÷ cost. Lenders look for ≈18–25% on development."
          />
        </CheatZone>

        <CheatZone title="Jargon, decoded">
          <KeyRow k="Capitalised interest" v="Interest added to the loan, not paid monthly — repaid at the end." />
          <KeyRow k="Line fee" v="Ongoing fee on the facility limit (drawn or undrawn)." />
          <KeyRow k="Establishment fee" v="Upfront fee to set up the loan, typically 1–3%." />
          <KeyRow k="Default rate" v="The (much higher) rate if loan terms are breached." />
          <KeyRow k="Presales" v="Qualifying pre-commitments before/at funding. Lower for non-bank." />
          <KeyRow k="Shovel-ready" v="DA approved, builder and contract in place, ready to start." />
          <KeyRow k="Exit" v="How the loan is repaid — sale or refinance. Must be evidenced." />
        </CheatZone>

        <CheatZone title="Red flags">
          <KeyRow k="Headline-rate selling" v="A low rate quoted with the fees kept vague. Ask for all-in cost." />
          <KeyRow k="No clear exit" v="A repayment that 'should' happen. Lenders fund evidenced exits only." />
          <KeyRow k="Thin contingency" v="Under ~5% on a build invites cost overrun risk." />
          <KeyRow k="Uncommitted funding" v="A lender whose own capital isn't certain. Ask directly." />
          <KeyRow k="Surprises late" v="Undisclosed issues found mid-process — the fastest way to a decline." />
        </CheatZone>
      </div>

      <Callout>
        One rule that survives every deal: compare the effective all-in cost
        over your actual term, never the headline rate. Everything else is
        detail around that.
      </Callout>
    </>
  );
}
