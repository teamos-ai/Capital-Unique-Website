import { Lead, Callout } from "../LeadMagnetShell";
import { CheatSheet } from "../CheatSheet";

export default function CapitalStackAtAGlance() {
  return (
    <>
      <Lead>
        Cheapest, safest money sits at the bottom and gets repaid first. Every
        layer up costs more and takes more risk. Tab through the whole stack so
        you build it deliberately, not by accident.
      </Lead>

      <CheatSheet
        zones={[
          {
            title: "1 · Senior",
            rows: [
              {
                k: "Cost",
                v: "Lowest in the stack — bank-like to modest non-bank margin.",
              },
              {
                k: "Risk / rank",
                v: "Lowest. First-ranking security, repaid first.",
              },
              {
                k: "Where it fits",
                v: "The core of every deal: site, then construction (≈70% GRV / ≈80% cost).",
              },
            ],
          },
          {
            title: "2 · Stretch",
            rows: [
              { k: "Cost", v: "Higher blended cost than plain senior." },
              {
                k: "Risk / rank",
                v: "Still senior-ranked, but at higher leverage.",
              },
              {
                k: "Where it fits",
                v: "A de-risked project needing leverage toward ≈90% of cost in one facility.",
              },
            ],
          },
          {
            title: "3 · Mezzanine",
            rows: [
              {
                k: "Cost",
                v: "Materially higher — it's filling a gap, short term.",
              },
              {
                k: "Risk / rank",
                v: "Subordinate to senior; repaid after it.",
              },
              {
                k: "Where it fits",
                v: "Bridges the gap above senior on a de-risked deal with a clear, near exit.",
              },
            ],
          },
          {
            title: "4 · Pref equity",
            rows: [
              {
                k: "Cost",
                v: "Highest fixed-style cost: a coupon and/or profit share.",
              },
              {
                k: "Risk / rank",
                v: "Sits above debt, below ordinary equity in priority.",
              },
              {
                k: "Where it fits",
                v: "Sponsor funds part of the equity; investor funds the rest on a substantially de-risked, ready project.",
              },
            ],
          },
          {
            title: "5 · Sponsor equity",
            rows: [
              {
                k: "Cost",
                v: "No coupon — paid last, takes the residual profit (or loss).",
              },
              {
                k: "Risk / rank",
                v: "Highest risk, last in line, first to absorb a shortfall.",
              },
              {
                k: "Where it fits",
                v: "The developer's own skin in the game — what every layer above relies on.",
              },
            ],
          },
          {
            title: "Residual stock",
            rows: [
              {
                k: "Cost",
                v: "Low — secured against finished, titled stock.",
              },
              {
                k: "Risk / rank",
                v: "Low; effectively a senior facility on completed assets.",
              },
              {
                k: "Where it fits",
                v: "Refinances construction debt while remaining stock sells down (≈70% LVR ex-GST/costs).",
              },
            ],
          },
        ]}
      />

      <Callout>
        The discipline: use the least expensive money the deal can safely
        carry. Stacking to the maximum leverage available is how thin margins
        become losses.
      </Callout>
    </>
  );
}
