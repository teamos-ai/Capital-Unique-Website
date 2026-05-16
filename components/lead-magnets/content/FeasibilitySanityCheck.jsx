import { Lead, ChecklistGroup, Callout } from "../LeadMagnetShell";

export default function FeasibilitySanityCheck() {
  return (
    <>
      <Lead>
        A lender re-runs your feasibility before they fund it. This is that
        re-run — five stages, five checks each — so the weaknesses surface on
        your desk, not in their credit committee.
      </Lead>

      <ChecklistGroup
        n="1"
        stage="The revenue line"
        items={[
          { do: "GRV is built from independent comparable sales, dated and relevant.", why: "Optimistic revenue is the single most common reason a feasibility fails review." },
          { do: "GST treatment (margin scheme vs full) is correct for the project.", why: "It materially changes net realisation." },
          { do: "Selling and marketing costs are deducted (≈2–4% of GRV).", why: "Net realisation, not gross, funds the deal." },
          { do: "The sell-down timeline is realistic against absorption evidence.", why: "Slower sales = more finance cost = thinner margin." },
          { do: "A downside revenue case (−10%) still leaves the project viable.", why: "Lenders price the downside, not the base case." },
        ]}
      />

      <ChecklistGroup
        n="2"
        stage="The cost base"
        items={[
          { do: "Construction cost is QS-verified or contract-based, not estimated.", why: "An unverified build cost is an unfunded one." },
          { do: "Consultant, council, and statutory fees are itemised.", why: "Soft costs are routinely understated." },
          { do: "Holding and statutory outgoings during the build are included.", why: "They run the whole term whether you budget them or not." },
          { do: "Contingency is ≥5% of construction (more for complex builds).", why: "It's the buffer the whole deal leans on." },
          { do: "An upside cost case (+10%) has been tested.", why: "Cost overrun is the most common way margin disappears." },
        ]}
      />

      <ChecklistGroup
        n="3"
        stage="Finance costs"
        items={[
          { do: "Interest is modelled on the actual draw profile, not the full loan day one.", why: "Capitalised interest compounds the longer money is out." },
          { do: "Establishment, line and exit fees are in the feasibility.", why: "These are real costs that reduce margin directly." },
          { do: "A finance cost for time overrun (3–6 months) is tested.", why: "Delay is the most expensive risk in a development." },
          { do: "The capital stack assumed is actually achievable at those costs.", why: "A feasibility on unobtainable terms isn't a feasibility." },
          { do: "Peak debt is identified and within sensible leverage.", why: "It's what the lender is truly exposed to." },
        ]}
      />

      <ChecklistGroup
        n="4"
        stage="The margin"
        items={[
          { do: "Margin on cost is calculated on total cost including land and finance.", why: "Margin on a partial cost base flatters the result." },
          { do: "It lands in the ~18–25% band lenders expect.", why: "Below ~15% the deal is too thin for most non-bank credit." },
          { do: "Margin survives the combined downside (sales −10%, cost +10%, time +3mo).", why: "If it doesn't, the deal has no real buffer." },
          { do: "Profit is reasonable for the risk and effort taken.", why: "A wafer-thin margin isn't worth the exposure." },
          { do: "You can explain every assumption behind the margin in one sentence each.", why: "If you can't, a credit team will find the one you can't defend." },
        ]}
      />

      <ChecklistGroup
        n="5"
        stage="The story"
        items={[
          { do: "The feasibility fits on a page a lender can follow.", why: "Clarity is itself a credibility signal." },
          { do: "Assumptions are sourced, not asserted.", why: "Sourced numbers get believed; asserted ones get discounted." },
          { do: "The exit is evidenced inside the feasibility.", why: "Numbers without an exit are just arithmetic." },
          { do: "The weakest assumption is named, not buried.", why: "Lenders trust feasibilities that disclose their own soft spots." },
          { do: "An independent set of eyes has pressure-tested it.", why: "You can't see the assumption you're attached to." },
        ]}
      />

      <Callout>
        If the project still stacks after every downside is applied at once,
        you have a fundable deal. If it only works in the base case, you have a
        hope — and lenders don&apos;t fund hope.
      </Callout>
    </>
  );
}
