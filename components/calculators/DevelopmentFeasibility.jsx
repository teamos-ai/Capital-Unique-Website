"use client";

import { useState } from "react";
import {
  Field,
  CalcLayout,
  ResultsPanel,
  Headline,
  Row,
  Divider,
  Verdict,
  Assumptions,
  fmtMoney,
  fmtPct,
  num,
} from "./ui";

export function DevelopmentFeasibility() {
  const [grv, setGrv] = useState("4200000");
  const [build, setBuild] = useState("2300000");
  const [soft, setSoft] = useState("12"); // % of construction
  const [contingency, setContingency] = useState("5"); // % of construction
  const [finance, setFinance] = useState("210000");
  const [selling, setSelling] = useState("3"); // % of GRV
  const [margin, setMargin] = useState("20"); // target % on cost (ex-land)

  const GRV = num(grv);
  const C = num(build);
  const softCost = C * (num(soft) / 100);
  const contCost = C * (num(contingency) / 100);
  const financeCost = num(finance);
  const sellingCost = GRV * (num(selling) / 100);
  const netRealisation = GRV - sellingCost;

  const devCostExLand = C + softCost + contCost + financeCost;
  const requiredProfit = devCostExLand * (num(margin) / 100);
  const residualLand = netRealisation - devCostExLand - requiredProfit;

  // Margin on total cost if land is bought at the residual figure.
  const totalCostInclLand = devCostExLand + Math.max(residualLand, 0);
  const marginOnTotalCost =
    totalCostInclLand > 0
      ? ((netRealisation - totalCostInclLand) / totalCostInclLand) * 100
      : NaN;

  const viable = residualLand > 0;
  const thin = residualLand > 0 && marginOnTotalCost < 15;

  return (
    <CalcLayout
      inputs={
        <>
          <Field
            label="Gross realisation (GRV)"
            value={grv}
            onChange={setGrv}
            prefix="$"
            hint="Total expected sale value of completed stock, net of GST."
          />
          <Field
            label="Construction cost"
            value={build}
            onChange={setBuild}
            prefix="$"
            hint="Builder's contract / hard cost."
          />
          <Field
            label="Professional & soft costs"
            value={soft}
            onChange={setSoft}
            suffix="%"
            hint="Design, council, QS, legal — as a % of construction."
          />
          <Field
            label="Contingency"
            value={contingency}
            onChange={setContingency}
            suffix="%"
            hint="Of construction. Lenders expect 5%+ on most projects."
          />
          <Field
            label="Finance costs"
            value={finance}
            onChange={setFinance}
            prefix="$"
            hint="Interest, line and establishment fees over the project."
          />
          <Field
            label="Selling & marketing"
            value={selling}
            onChange={setSelling}
            suffix="%"
            hint="Agent commission and marketing — as a % of GRV."
          />
          <Field
            label="Target profit margin"
            value={margin}
            onChange={setMargin}
            suffix="%"
            hint="On development cost excluding land. Lenders look for 18–25%."
          />
        </>
      }
      results={
        <ResultsPanel>
          <Headline
            label="Maximum land price"
            value={fmtMoney(residualLand)}
            tone={viable ? (thin ? "warn" : "good") : "bad"}
            sub="The most you can pay for the site and still hit your target margin."
          />

          <div className="mt-7">
            <Row label="Gross realisation" value={fmtMoney(GRV)} />
            <Row
              label="Less selling & marketing"
              value={`(${fmtMoney(sellingCost)})`}
            />
            <Row
              label="Net realisation"
              value={fmtMoney(netRealisation)}
              strong
            />
            <Divider />
            <Row label="Construction" value={`(${fmtMoney(C)})`} />
            <Row label="Soft costs" value={`(${fmtMoney(softCost)})`} />
            <Row label="Contingency" value={`(${fmtMoney(contCost)})`} />
            <Row label="Finance costs" value={`(${fmtMoney(financeCost)})`} />
            <Row
              label="Required profit"
              value={`(${fmtMoney(requiredProfit)})`}
            />
            <Divider />
            <Row
              label="Residual land value"
              value={fmtMoney(residualLand)}
              strong
            />
            <Row
              label="Margin on total cost (at that land price)"
              value={fmtPct(marginOnTotalCost, 1)}
              strong
            />
          </div>

          {viable ? (
            thin ? (
              <Verdict tone="warn">
                The site can carry a land price, but margin on total cost is
                under 15%. Most non-bank lenders want 18–25% — the deal is
                thin and sensitive to cost or sales movement.
              </Verdict>
            ) : (
              <Verdict tone="good">
                On these inputs the project supports the land price above
                while delivering your target margin. Pressure-test sales
                evidence and build cost before you commit.
              </Verdict>
            )
          ) : (
            <Verdict tone="bad">
              At this GRV and cost base the project cannot fund the land and
              your target margin. The site only works if end values rise,
              costs fall, or the margin expectation is reduced.
            </Verdict>
          )}

          <Assumptions
            items={[
              "Static residual method — a single-point screen, not a cashflow feasibility.",
              "Target profit is taken on development cost excluding land. Lenders sometimes measure margin on total cost (incl. land) — both figures are shown.",
              "GST is assumed handled in your GRV (net of GST). Margin scheme vs full GST is deal-specific.",
              "Indicative only. A funded feasibility requires QS-verified costs and independent sales evidence.",
            ]}
          />
        </ResultsPanel>
      }
    />
  );
}
