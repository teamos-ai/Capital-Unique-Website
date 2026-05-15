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

export function InvestorYield() {
  const [capital, setCapital] = useState("500000");
  const [grossRate, setGrossRate] = useState("9.0"); // % p.a.
  const [term, setTerm] = useState("12"); // months
  const [fee, setFee] = useState("1.5"); // % p.a. fund/mgmt
  const [tax, setTax] = useState("47"); // marginal %
  const [benchmark, setBenchmark] = useState("4.5"); // term deposit % p.a.

  const C = num(capital);
  const years = num(term) / 12;

  const grossReturn = C * (num(grossRate) / 100) * years;
  const feeCost = C * (num(fee) / 100) * years;
  const netPreTax = grossReturn - feeCost;
  const netRate = C > 0 && years > 0 ? (netPreTax / C / years) * 100 : NaN;

  const taxPaid = netPreTax * (num(tax) / 100);
  const afterTax = netPreTax - taxPaid;
  const afterTaxRate = C > 0 && years > 0 ? (afterTax / C / years) * 100 : NaN;

  const tdReturn = C * (num(benchmark) / 100) * years;
  const tdAfterTax = tdReturn * (1 - num(tax) / 100);
  const uplift = afterTax - tdAfterTax;

  return (
    <CalcLayout
      inputs={
        <>
          <Field
            label="Capital deployed"
            value={capital}
            onChange={setCapital}
            prefix="$"
          />
          <Field
            label="Target gross rate"
            value={grossRate}
            onChange={setGrossRate}
            suffix="% p.a."
            hint="Headline rate before fees. AU private credit is often 8–14%."
          />
          <Field
            label="Term"
            value={term}
            onChange={setTerm}
            suffix="months"
          />
          <Field
            label="Fund / management fee"
            value={fee}
            onChange={setFee}
            suffix="% p.a."
            hint="What the manager takes before you see a return."
          />
          <Field
            label="Marginal tax rate"
            value={tax}
            onChange={setTax}
            suffix="%"
            hint="Your rate. 47% includes the Medicare levy at the top bracket."
          />
          <Field
            label="Term deposit benchmark"
            value={benchmark}
            onChange={setBenchmark}
            suffix="% p.a."
            hint="A comparison floor for the risk you're taking on."
          />
        </>
      }
      results={
        <ResultsPanel>
          <Headline
            label="Net yield (after fees)"
            value={fmtPct(netRate, 2)}
            tone="good"
            sub={`After-tax: ${fmtPct(afterTaxRate, 2)} at a ${fmtPct(
              num(tax),
              0
            )} marginal rate.`}
          />

          <div className="mt-7">
            <Row
              label={`Gross return at ${fmtPct(num(grossRate), 2)}`}
              value={fmtMoney(grossReturn)}
            />
            <Row label="Less fund / management fee" value={`(${fmtMoney(feeCost)})`} />
            <Row
              label="Net return (pre-tax)"
              value={fmtMoney(netPreTax)}
              strong
            />
            <Row label="Less tax" value={`(${fmtMoney(taxPaid)})`} />
            <Row
              label="Net return (after tax)"
              value={fmtMoney(afterTax)}
              strong
            />
            <Divider />
            <Row label="Net yield p.a. (pre-tax)" value={fmtPct(netRate, 2)} strong />
            <Row
              label="Net yield p.a. (after tax)"
              value={fmtPct(afterTaxRate, 2)}
              strong
            />
            <Divider />
            <Row
              label={`Term deposit at ${fmtPct(num(benchmark), 2)} (after tax)`}
              value={fmtMoney(tdAfterTax)}
            />
            <Row
              label="After-tax uplift vs term deposit"
              value={fmtMoney(uplift)}
              strong
            />
          </div>

          <Verdict tone="good">
            On these inputs the position returns {fmtMoney(uplift)} more
            after tax than a term deposit over the term. That uplift is the
            compensation for capital risk, illiquidity and security quality —
            judge whether the loan book justifies it.
          </Verdict>

          <Assumptions
            items={[
              "Simple interest over the term — not compounded or reinvested.",
              "Assumes the loan performs in full with no capital loss or arrears. Private credit risk is real and borne by the investor.",
              "Tax is applied as a flat marginal rate on net income; structure (trust, company, SMSF) will change the actual outcome.",
              "General information only — not financial product, tax or investment advice. Wholesale / sophisticated investors only.",
            ]}
          />
        </ResultsPanel>
      }
    />
  );
}
