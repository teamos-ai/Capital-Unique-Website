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

export function TrueCostOfCapital() {
  const [loan, setLoan] = useState("1500000");
  const [term, setTerm] = useState("12"); // months
  const [headline, setHeadline] = useState("8.95"); // % p.a.
  const [estab, setEstab] = useState("1.5"); // % of loan
  const [brokerage, setBrokerage] = useState("1.0"); // % of loan
  const [lineFee, setLineFee] = useState("0"); // % p.a.
  const [exit, setExit] = useState("5000"); // $ flat

  const L = num(loan);
  const months = num(term);
  const years = months / 12;

  const interest = L * (num(headline) / 100) * years;
  const estabFee = L * (num(estab) / 100);
  const brokerFee = L * (num(brokerage) / 100);
  const lineFeeCost = L * (num(lineFee) / 100) * years;
  const exitFee = num(exit);

  const feesTotal = estabFee + brokerFee + lineFeeCost + exitFee;
  const totalCost = interest + feesTotal;

  const effRate = L > 0 && years > 0 ? (totalCost / L / years) * 100 : NaN;
  const gap = effRate - num(headline);

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
            label="Term"
            value={term}
            onChange={setTerm}
            suffix="months"
          />
          <Field
            label="Headline rate"
            value={headline}
            onChange={setHeadline}
            suffix="% p.a."
            hint="The rate the facility is advertised at."
          />
          <Field
            label="Establishment fee"
            value={estab}
            onChange={setEstab}
            suffix="%"
            hint="Of the loan amount."
          />
          <Field
            label="Brokerage / advisory"
            value={brokerage}
            onChange={setBrokerage}
            suffix="%"
            hint="Of the loan amount, if applicable."
          />
          <Field
            label="Line / ongoing fee"
            value={lineFee}
            onChange={setLineFee}
            suffix="% p.a."
            hint="Annual fee on the facility, if any."
          />
          <Field
            label="Exit / discharge fee"
            value={exit}
            onChange={setExit}
            prefix="$"
            hint="Flat fee on repayment."
          />
        </>
      }
      results={
        <ResultsPanel>
          <Headline
            label="Effective annual rate"
            value={fmtPct(effRate, 2)}
            tone={gap >= 2 ? "warn" : "default"}
            sub={`Headline is ${fmtPct(num(headline), 2)} — fees add ${fmtPct(
              gap,
              2
            )} a year.`}
          />

          <div className="mt-7">
            <Row
              label={`Interest at ${fmtPct(num(headline), 2)}`}
              value={fmtMoney(interest)}
            />
            <Row label="Establishment fee" value={fmtMoney(estabFee)} />
            <Row label="Brokerage / advisory" value={fmtMoney(brokerFee)} />
            {lineFeeCost > 0 && (
              <Row label="Line / ongoing fee" value={fmtMoney(lineFeeCost)} />
            )}
            <Row label="Exit / discharge fee" value={fmtMoney(exitFee)} />
            <Divider />
            <Row label="Total fees" value={fmtMoney(feesTotal)} strong />
            <Row
              label="Total cost over term"
              value={fmtMoney(totalCost)}
              strong
            />
            <Divider />
            <Row label="Headline rate" value={fmtPct(num(headline), 2)} />
            <Row
              label="Effective annual rate"
              value={fmtPct(effRate, 2)}
              strong
            />
          </div>

          <Verdict tone={gap >= 2 ? "warn" : "good"}>
            {gap >= 2 ? (
              <>
                Fees lift the real cost by {fmtPct(gap, 2)} a year over a{" "}
                {months}-month term. A facility quoting a higher headline with
                lighter fees can easily be cheaper — compare on this number,
                not the rate.
              </>
            ) : (
              <>
                Fees add {fmtPct(gap, 2)} a year here. Shorter terms amplify
                upfront fees — always re-run this when the term changes, and
                use the effective rate to compare offers like for like.
              </>
            )}
          </Verdict>

          <Assumptions
            items={[
              "Interest is modelled interest-only on the full balance — typical for short non-bank facilities. Amortising loans will differ.",
              "Effective annual rate = total cost ÷ loan ÷ (term in years). It is a cost ratio, not a regulated comparison rate (which uses a fixed ASIC reference loan).",
              "Government charges (stamp duty, registration) are excluded — they are not a cost of the facility itself.",
              "Indicative only. Confirm the full fee schedule with the lender before comparing offers.",
            ]}
          />
        </ResultsPanel>
      }
    />
  );
}
