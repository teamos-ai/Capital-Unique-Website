import { Lead, Callout } from "../LeadMagnetShell";
import { InteractiveChecklist } from "../InteractiveChecklist";

export default function DevelopmentFinanceReadinessChecklist() {
  return (
    <>
      <Lead>
        Before a non-bank credit team commits, they run the same ground every
        time. Tick these twenty-five checks across five stages. Watch your
        readiness climb — at 100% you&apos;re fundable, and you&apos;ll get a
        faster, better-priced decision for it.
      </Lead>

      <InteractiveChecklist
        id="development-finance-readiness-checklist"
        stages={[
          {
            name: "Site & control",
            items: [
              {
                do: "You control the site (owned, or an exchanged contract with adequate settlement runway).",
                why: "Lenders fund control, not intentions.",
              },
              {
                do: "Planning status is clear — DA approved, lodged, or a defined pathway with timing.",
                why: "Approval risk is priced heavily; certainty unlocks leverage.",
              },
              {
                do: "As-is valuation basis is defensible (recent, independent, or strong comparables).",
                why: "Early LVR is set against this number, not the price you paid.",
              },
              {
                do: "Any existing debt on the site is quantified with payout figures.",
                why: "It defines how much new capital actually has to do.",
              },
              {
                do: "Site constraints (easements, contamination, heritage) are identified and costed.",
                why: "Surprises found in diligence stall or kill a deal.",
              },
            ],
          },
          {
            name: "Feasibility",
            items: [
              {
                do: "GRV is supported by independent sales evidence, not aspiration.",
                why: "It's the ceiling everything is sized against.",
              },
              {
                do: "Total development cost includes consultants, fees, holding and finance costs.",
                why: "Omitted costs quietly erase the margin.",
              },
              {
                do: "Contingency is at least ~5% of construction.",
                why: "Below this, cost-overrun risk is uninsured.",
              },
              {
                do: "Margin on cost lands in the ~18–25% range.",
                why: "Thinner than this and lenders see no buffer for things going wrong.",
              },
              {
                do: "The feasibility has been stress-tested (sales down, costs up, time out).",
                why: "Lenders re-run it anyway; do it first.",
              },
            ],
          },
          {
            name: "Presales & demand",
            items: [
              {
                do: "You know your qualifying presale position (and what counts as qualifying).",
                why: "Non-bank hurdles are lower, not always zero.",
              },
              {
                do: "Sales / marketing strategy and agent are defined.",
                why: "Demonstrates the exit isn't theoretical.",
              },
              {
                do: "Comparable absorption evidence supports the sell-down timeline.",
                why: "Time-on-market drives finance cost and risk.",
              },
              {
                do: "Deposits are held appropriately and contracts are unconditional where claimed.",
                why: "Soft presales don't count.",
              },
              {
                do: "A residual-stock plan exists if not all stock sells before completion.",
                why: "Lenders want the exit's plan B.",
              },
            ],
          },
          {
            name: "Team & structure",
            items: [
              {
                do: "Developer track record on comparable completed projects is documented.",
                why: "Track record is one of the first things assessed.",
              },
              {
                do: "Builder is identified, with a fixed-price (or defined) contract and capacity.",
                why: "Build risk sits squarely with the builder.",
              },
              {
                do: "The borrowing entity and ownership chart are clean and clear.",
                why: "Opaque structures slow credit and security.",
              },
              {
                do: "Guarantors and their position are identified.",
                why: "Recourse is part of how the deal is priced.",
              },
              {
                do: "Professional team (QS, planner, lawyer) is engaged.",
                why: "Signals a deliverable, well-run project.",
              },
            ],
          },
          {
            name: "Documentation & exit",
            items: [
              {
                do: "A one-page deal summary exists (ask, security, numbers, exit, risks).",
                why: "It sets the tone and speed of the whole assessment.",
              },
              {
                do: "Financials reconcile and are current.",
                why: "Numbers that don't tie erode trust fast.",
              },
              {
                do: "The exit is evidenced — refinance indication or contracts of sale.",
                why: "An asserted exit is a declined exit.",
              },
              {
                do: "Known risks are written down with how each is managed.",
                why: "Lenders fund disclosed risk; they decline hidden risk.",
              },
              {
                do: "You've engaged finance before it's urgent.",
                why: "Time pressure narrows options and worsens terms.",
              },
            ],
          },
        ]}
      />

      <Callout>
        Score yourself honestly. Every unticked item is a question a credit
        team will ask — answer them before they do, and the conversation
        becomes a formality rather than an interrogation.
      </Callout>
    </>
  );
}
