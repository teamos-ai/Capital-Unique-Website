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
import { DonutChart } from "./charts";

// Indicative AU resident income tax (2024–25), incl. ~2% Medicare.
function netAnnual(gross) {
  const g = Math.max(gross, 0);
  let tax = 0;
  if (g > 18200) tax += (Math.min(g, 45000) - 18200) * 0.16;
  if (g > 45000) tax += (Math.min(g, 135000) - 45000) * 0.3;
  if (g > 135000) tax += (Math.min(g, 190000) - 135000) * 0.37;
  if (g > 190000) tax += (g - 190000) * 0.45;
  const medicare = g > 27222 ? g * 0.02 : 0;
  return Math.max(g - tax - medicare, 0);
}

export function HomeLoanBorrowing() {
  const [income, setIncome] = useState("120000");
  const [partner, setPartner] = useState("0");
  const [other, setOther] = useState("0");
  const [expenses, setExpenses] = useState("3200");
  const [repays, setRepays] = useState("0");
  const [cards, setCards] = useState("10000");
  const [deps, setDeps] = useState("0");
  const [rate, setRate] = useState("6.20");
  const [years, setYears] = useState("30");

  const netMonthly =
    (netAnnual(num(income)) + netAnnual(num(partner))) / 12 +
    num(other) / 12;

  const depCost = num(deps) * 350; // HEM-style add-on per dependant
  const livingTotal = num(expenses) + depCost;
  const cardServicing = num(cards) * 0.038; // 3.8% of limits / month
  const commitments = num(repays) + cardServicing;

  const surplus = netMonthly - livingTotal - commitments;
  const available = Math.max(surplus, 0);

  // Assessed at a buffered rate, as lenders do.
  const bufferRate = (num(rate) + 3) / 100 / 12;
  const n = num(years) * 12;
  const maxFromPayment = (pmt) => {
    if (pmt <= 0) return 0;
    if (bufferRate === 0) return pmt * n;
    return (pmt * (1 - Math.pow(1 + bufferRate, -n))) / bufferRate;
  };

  const indicative = maxFromPayment(available);
  const conservative = maxFromPayment(available * 0.85);

  const tone = available <= 0 ? "bad" : available < 500 ? "warn" : "good";

  return (
    <CalcLayout
      inputs={
        <>
          <Field
            label="Your annual income (gross)"
            value={income}
            onChange={setIncome}
            prefix="$"
          />
          <Field
            label="Partner income (gross)"
            value={partner}
            onChange={setPartner}
            prefix="$"
            hint="Leave at 0 for a single application."
          />
          <Field
            label="Other annual income"
            value={other}
            onChange={setOther}
            prefix="$"
            hint="Rent, dividends — entered net of tax."
          />
          <Field
            label="Monthly living expenses"
            value={expenses}
            onChange={setExpenses}
            prefix="$"
            hint="Lenders apply a minimum benchmark if you understate this."
          />
          <Field
            label="Other monthly repayments"
            value={repays}
            onChange={setRepays}
            prefix="$"
            hint="Car, personal or other loan repayments."
          />
          <Field
            label="Total credit card limits"
            value={cards}
            onChange={setCards}
            prefix="$"
            hint="Assessed at 3.8% of the limit per month, not the balance."
          />
          <Field
            label="Dependants"
            value={deps}
            onChange={setDeps}
            hint="Adds an allowance to assessed living costs."
          />
          <Field
            label="Interest rate"
            value={rate}
            onChange={setRate}
            suffix="% p.a."
          />
          <Field
            label="Loan term"
            value={years}
            onChange={setYears}
            suffix="years"
          />
        </>
      }
      results={
        <ResultsPanel>
          <Headline
            label="Indicative borrowing power"
            value={fmtMoney(indicative)}
            tone={tone}
            sub={`Conservatively, around ${fmtMoney(
              conservative
            )} — assessed at ${fmtPct(num(rate) + 3, 2)} (rate + 3% buffer).`}
          />

          <div className="mt-7">
            <Row
              label="Net monthly income"
              value={fmtMoney(netMonthly)}
              strong
            />
            <Row
              label="Living expenses"
              value={`(${fmtMoney(livingTotal)})`}
            />
            <Row
              label="Commitments (loans + cards)"
              value={`(${fmtMoney(commitments)})`}
            />
            <Divider />
            <Row
              label="Monthly surplus"
              value={fmtMoney(surplus)}
              strong
            />
          </div>

          <div className="mt-8">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Where net income goes
            </p>
            <DonutChart
              data={[
                { label: "Living expenses", value: livingTotal },
                { label: "Commitments", value: commitments },
                { label: "Available for loan", value: available },
              ]}
            />
          </div>

          <Verdict tone={tone}>
            {tone === "bad" ? (
              <>
                On these figures there&apos;s no monthly surplus to service new
                debt. Reducing expenses, card limits or existing repayments is
                where the capacity comes from.
              </>
            ) : tone === "warn" ? (
              <>
                The surplus is thin. Lenders stress-test hard — expect a
                tighter outcome than the indicative figure, and build in a
                buffer of your own.
              </>
            ) : (
              <>
                Indicative only. A lender will verify income, apply its own
                expense benchmarks (HEM) and policy — treat this as a guide to
                the conversation, not a number to bank on.
              </>
            )}
          </Verdict>

          <Assumptions
            items={[
              "Income tax is an indicative 2024–25 resident estimate incl. ~2% Medicare; offsets and deductions are ignored.",
              "Credit cards assessed at 3.8% of total limits per month — standard lender practice.",
              "Capacity solved at your rate plus a 3% serviceability buffer over the full term.",
              "Not credit assistance or a loan pre-approval. Lender policy (HEM, LVR, LMI) will change the result.",
            ]}
          />
        </ResultsPanel>
      }
    />
  );
}
