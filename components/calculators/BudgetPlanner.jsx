"use client";

import { useState } from "react";
import {
  Field,
  SegmentedControl,
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

const EXPENSE_KEYS = [
  ["housing", "Housing (rent / mortgage)"],
  ["utilities", "Utilities & bills"],
  ["groceries", "Groceries"],
  ["transport", "Transport & fuel"],
  ["insurance", "Insurance"],
  ["lifestyle", "Lifestyle & entertainment"],
  ["savings", "Savings & investments"],
  ["other", "Other"],
];

const SCALE = { weekly: 12 / 52, monthly: 1, annual: 12 };

export function BudgetPlanner() {
  const [view, setView] = useState("monthly");
  const [salary, setSalary] = useState("7000");
  const [otherInc, setOtherInc] = useState("0");
  const [exp, setExp] = useState({
    housing: "2200",
    utilities: "400",
    groceries: "900",
    transport: "500",
    insurance: "300",
    lifestyle: "700",
    savings: "600",
    other: "300",
  });

  const setE = (k, v) => setExp((s) => ({ ...s, [k]: v }));

  const incomeM = num(salary) + num(otherInc);
  const expenseM = EXPENSE_KEYS.reduce((a, [k]) => a + num(exp[k]), 0);
  const surplusM = incomeM - expenseM;
  const savingsRate = incomeM > 0 ? (surplusM / incomeM) * 100 : 0;

  const s = SCALE[view];
  const unit =
    view === "weekly" ? "week" : view === "annual" ? "year" : "month";
  const tone = surplusM < 0 ? "bad" : savingsRate < 10 ? "warn" : "good";

  return (
    <CalcLayout
      inputs={
        <>
          <SegmentedControl
            label="Show figures per"
            value={view}
            onChange={setView}
            options={[
              { value: "weekly", label: "Week" },
              { value: "monthly", label: "Month" },
              { value: "annual", label: "Year" },
            ]}
            hint="Enter values monthly; the view only changes how results display."
          />
          <Field
            label="Salary & wages (monthly, after tax)"
            value={salary}
            onChange={setSalary}
            prefix="$"
          />
          <Field
            label="Other income (monthly)"
            value={otherInc}
            onChange={setOtherInc}
            prefix="$"
            hint="Rent, side income, government payments."
          />
          {EXPENSE_KEYS.map(([k, label]) => (
            <Field
              key={k}
              label={`${label} (monthly)`}
              value={exp[k]}
              onChange={(v) => setE(k, v)}
              prefix="$"
            />
          ))}
        </>
      }
      results={
        <ResultsPanel>
          <Headline
            label={`${
              surplusM >= 0 ? "Surplus" : "Shortfall"
            } per ${unit}`}
            value={fmtMoney(Math.abs(surplusM) * s)}
            tone={tone}
            sub={`Savings rate: ${fmtPct(savingsRate, 1)} of income.`}
          />

          <div className="mt-7">
            <Row
              label={`Income / ${unit}`}
              value={fmtMoney(incomeM * s)}
              strong
            />
            <Row
              label={`Expenses / ${unit}`}
              value={fmtMoney(expenseM * s)}
            />
            <Divider />
            <Row
              label={`${surplusM >= 0 ? "Left over" : "Over budget"} / ${unit}`}
              value={fmtMoney(surplusM * s)}
              strong
            />
          </div>

          <div className="mt-8">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Where it goes
            </p>
            <DonutChart
              centerLabel={`Total / ${unit}`}
              centerValue={fmtMoney(expenseM * s)}
              data={EXPENSE_KEYS.filter(([k]) => num(exp[k]) > 0).map(
                ([k, label]) => ({ label, value: num(exp[k]) * s })
              )}
            />
          </div>

          <Verdict tone={tone}>
            {tone === "bad" ? (
              <>
                Spending exceeds income. Before taking on any finance, this gap
                needs to close — it&apos;s the first thing a lender will see.
              </>
            ) : tone === "warn" ? (
              <>
                You&apos;re in front, but the buffer is slim. A savings rate
                under 10% leaves little room for rate rises or surprises.
              </>
            ) : (
              <>
                A healthy surplus. This is the capacity that supports
                borrowing — and the cushion that gets you through rate moves.
              </>
            )}
          </Verdict>

          <Assumptions
            items={[
              "Enter every value as a monthly figure; the week/month/year toggle only rescales the display.",
              "Income should be after-tax (take-home) for a true picture.",
              "Categories are a guide — fold anything not listed into ‘Other’.",
              "General information only — not financial advice.",
            ]}
          />
        </ResultsPanel>
      }
    />
  );
}
