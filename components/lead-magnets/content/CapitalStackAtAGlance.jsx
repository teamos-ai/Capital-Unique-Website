import { Lead, CheatZone, KeyRow, Callout } from "../LeadMagnetShell";

export default function CapitalStackAtAGlance() {
  return (
    <>
      <Lead>
        Cheapest, safest money sits at the bottom and gets repaid first. Every
        layer up costs more and takes more risk. The whole stack, on one page —
        so you build it deliberately, not by accident.
      </Lead>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <CheatZone title="1 · Senior debt (the base)">
          <KeyRow k="Cost" v="Lowest in the stack — bank-like to modest non-bank margin." />
          <KeyRow k="Risk / rank" v="Lowest. First-ranking security, repaid first." />
          <KeyRow k="Where it fits" v="The core of every deal: site, then construction (≈70% GRV / ≈80% cost)." />
        </CheatZone>

        <CheatZone title="2 · Stretch senior">
          <KeyRow k="Cost" v="Higher blended cost than plain senior." />
          <KeyRow k="Risk / rank" v="Still senior-ranked, but at higher leverage." />
          <KeyRow k="Where it fits" v="A de-risked project that needs leverage toward ≈90% of cost in one facility." />
        </CheatZone>

        <CheatZone title="3 · Mezzanine">
          <KeyRow k="Cost" v="Materially higher — it's filling a gap, short term." />
          <KeyRow k="Risk / rank" v="Subordinate to senior; repaid after it." />
          <KeyRow k="Where it fits" v="Bridges the gap above senior on a de-risked deal with a clear, near exit." />
        </CheatZone>

        <CheatZone title="4 · Preferred equity">
          <KeyRow k="Cost" v="Highest fixed-style cost: a coupon and/or profit share." />
          <KeyRow k="Risk / rank" v="Sits above debt, below ordinary equity in priority." />
          <KeyRow k="Where it fits" v="Sponsor funds part of the equity; investor funds the rest on a substantially de-risked, ready project." />
        </CheatZone>

        <CheatZone title="5 · Sponsor equity">
          <KeyRow k="Cost" v="No coupon — paid last, takes the residual profit (or loss)." />
          <KeyRow k="Risk / rank" v="Highest risk, last in line, first to absorb a shortfall." />
          <KeyRow k="Where it fits" v="The developer's own skin in the game — what every layer above relies on." />
        </CheatZone>

        <CheatZone title="Residual stock (post-completion)">
          <KeyRow k="Cost" v="Low — secured against finished, titled stock." />
          <KeyRow k="Risk / rank" v="Low; effectively a senior facility on completed assets." />
          <KeyRow k="Where it fits" v="Refinances construction debt while remaining stock sells down (≈70% LVR ex-GST/costs)." />
        </CheatZone>
      </div>

      <Callout>
        The discipline: use the least expensive money the deal can safely
        carry. Stacking to the maximum leverage available is how thin margins
        become losses.
      </Callout>
    </>
  );
}
