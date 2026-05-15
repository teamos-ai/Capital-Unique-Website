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

export function BridgingCost() {
  const [loan, setLoan] = useState("750000");
  const [rate, setRate] = useState("1.25"); // % per month
  const [term, setTerm] = useState("6"); // months
  const [estab, setEstab] = useState("2"); // % of loan
  const [exit, setExit] = useState("0"); // $ flat
  const [legal, setLegal] = useState("3500"); // $ flat

  const L = num(loan);
  const months = num(term);
  const monthlyRate = num(rate) / 100;

  const interest = L * monthlyRate * months; // simple, as quoted
  const estabFee = L * (num(estab) / 100);
  const exitFee = num(exit);
  const legalFee = num(legal);
  const totalCost = interest + estabFee + exitFee + legalFee;
  const totalPayable = L + totalCost;

  const effAnnual =
    L > 0 && months > 0 ? (totalCost / L / (months / 12)) * 100 : NaN;

  const heavy = effAnnual >= 20;

  return (
    <CalcLayout
      inputs={
        <>
          <Field
            label="Loan amount"
            value={loan}
            onChange={setLoan}
            prefix="$"
          />
          <Field
            label="Interest rate"
            value={rate}
            onChange={setRate}
            suffix="% / mo"
            hint="Bridging and caveat finance is quoted per month. 0.95%–2.5% is typical."
          />
          <Field
            label="Term"
            value={term}
            onChange={setTerm}
            suffix="months"
            hint="Caveat loans are usually 1–6 months; bridging up to 12."
          />
          <Field
            label="Establishment fee"
            value={estab}
            onChange={setEstab}
            suffix="%"
            hint="Of the loan amount. 1%–3% is common."
          />
          <Field
            label="Exit / discharge fee"
            value={exit}
            onChange={setExit}
            prefix="$"
            hint="Flat fee charged when the facility is repaid, if any."
          />
          <Field
            label="Legal & valuation"
            value={legal}
            onChange={setLegal}
            prefix="$"
            hint="Lender legals and valuation, typically borrower-paid."
          />
        </>
      }
      results={
        <ResultsPanel>
          <Headline
            label="Effective annualised rate"
            value={fmtPct(effAnnual, 1)}
            tone={heavy ? "warn" : "default"}
            sub="What the facility actually costs once every fee is in the number."
          />

          <div className="mt-7">
            <Row label="Interest over term" value={fmtMoney(interest)} />
            <Row label="Establishment fee" value={fmtMoney(estabFee)} />
            {exitFee > 0 && (
              <Row label="Exit / discharge fee" value={fmtMoney(exitFee)} />
            )}
            <Row label="Legal & valuation" value={fmtMoney(legalFee)} />
            <Divider />
            <Row
              label="Total cost of finance"
              value={fmtMoney(totalCost)}
              strong
            />
            <Row
              label="Total payable on repayment"
              value={fmtMoney(totalPayable)}
              strong
            />
          </div>

          <Verdict tone={heavy ? "warn" : "good"}>
            {heavy ? (
              <>
                At an effective {fmtPct(effAnnual, 1)} this is expensive money.
                It can still be the right call when speed unlocks a larger
                gain — but the exit (sale or refinance) needs to be certain
                and near-term.
              </>
            ) : (
              <>
                Short-term finance always looks dearer than a term facility
                annualised. The question is whether speed creates more value
                than it costs — make sure the repayment event is locked in.
              </>
            )}
          </Verdict>

          <Assumptions
            items={[
              "Interest is simple (rate × term), the way bridging and caveat loans are quoted — not compounding.",
              "Assumes interest is capitalised or prepaid, not serviced monthly.",
              "Effective annualised rate = total cost ÷ loan ÷ (term in years). It is a cost ratio, not a regulated comparison rate.",
              "Indicative only. Actual pricing depends on security, LVR, exit strength and lender.",
            ]}
          />
        </ResultsPanel>
      }
    />
  );
}
