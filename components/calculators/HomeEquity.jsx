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
import { StackedBar } from "./charts";

export function HomeEquity() {
  const [value, setValue] = useState("1200000");
  const [loan, setLoan] = useState("520000");
  const [lvr, setLvr] = useState("80");

  const V = num(value);
  const L = Math.min(num(loan), V);
  const maxLVR = num(lvr) / 100;

  const totalEquity = Math.max(V - L, 0);
  const lendingCeiling = V * maxLVR;
  const usableEquity = Math.max(lendingCeiling - L, 0);
  const retainedBuffer = V - lendingCeiling; // the bank's required margin
  const currentLVR = V > 0 ? (L / V) * 100 : 0;

  const tone =
    usableEquity > 0 ? "good" : currentLVR > num(lvr) ? "bad" : "warn";

  return (
    <CalcLayout
      inputs={
        <>
          <Field
            label="Property value"
            value={value}
            onChange={setValue}
            prefix="$"
            hint="A lender will use a valuation, which can differ from price."
          />
          <Field
            label="Current loan balance"
            value={loan}
            onChange={setLoan}
            prefix="$"
          />
          <Field
            label="Lending limit (LVR)"
            value={lvr}
            onChange={setLvr}
            suffix="%"
            hint="Most lenders cap usable equity at 80% without LMI."
          />
        </>
      }
      results={
        <ResultsPanel>
          <Headline
            label="Usable equity"
            value={fmtMoney(usableEquity)}
            tone={tone}
            sub={`Total equity is ${fmtMoney(
              totalEquity
            )}; usable is what sits under the ${num(lvr)}% limit.`}
          />

          <div className="mt-7">
            <Row label="Property value" value={fmtMoney(V)} strong />
            <Row label="Current loan" value={`(${fmtMoney(L)})`} />
            <Row label="Total equity" value={fmtMoney(totalEquity)} strong />
            <Divider />
            <Row
              label={`Lending ceiling at ${num(lvr)}%`}
              value={fmtMoney(lendingCeiling)}
            />
            <Row
              label="Usable equity"
              value={fmtMoney(usableEquity)}
              strong
            />
            <Row label="Current LVR" value={fmtPct(currentLVR, 1)} />
          </div>

          <div className="mt-8">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              How the property value splits
            </p>
            <StackedBar
              data={[
                { label: "Current loan", value: L },
                { label: "Usable equity", value: usableEquity },
                {
                  label: `Retained buffer (${100 - num(lvr)}%)`,
                  value: retainedBuffer,
                },
              ]}
            />
          </div>

          <Verdict tone={tone}>
            {tone === "bad" ? (
              <>
                The loan already exceeds the {num(lvr)}% limit, so there&apos;s
                no usable equity to draw. Paying down the loan or a higher
                valuation is what unlocks it.
              </>
            ) : tone === "warn" ? (
              <>
                You hold equity, but little of it sits below the {num(lvr)}%
                line. Lenders rarely release the buffer without LMI.
              </>
            ) : (
              <>
                Around {fmtMoney(usableEquity)} could be accessible, subject to
                serviceability and a lender&apos;s valuation. It&apos;s
                borrowing power, not cash — the right structure matters.
              </>
            )}
          </Verdict>

          <Assumptions
            items={[
              "Usable equity = (property value × lending limit) − current loan.",
              "The retained buffer is the lender's required margin; releasing it usually triggers LMI.",
              "Access still depends on serviceability, the lender's own valuation and policy.",
              "General information only — not credit assistance.",
            ]}
          />
        </ResultsPanel>
      }
    />
  );
}
