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
  fmtNum,
  num,
} from "./ui";

// Monthly P&I payment for a loan.
function pmt(principal, annualRate, years) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (r * principal) / (1 - Math.pow(1 + r, -n));
}

// Largest principal whose annual P&I equals `annualService` at a rate.
function maxPrincipal(annualService, annualRate, years) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  const monthly = annualService / 12;
  if (monthly <= 0) return 0;
  if (r === 0) return monthly * n;
  return (monthly * (1 - Math.pow(1 + r, -n))) / r;
}

export function CommercialDscr() {
  const [rent, setRent] = useState("420000");
  const [vacancy, setVacancy] = useState("5"); // %
  const [opex, setOpex] = useState("48000"); // $ non-recoverable
  const [loan, setLoan] = useState("3800000");
  const [rate, setRate] = useState("7.0"); // % p.a.
  const [stress, setStress] = useState("9.5"); // % p.a.
  const [years, setYears] = useState("25");
  const target = 1.25; // lender minimum DSCR

  const gross = num(rent);
  const vac = gross * (num(vacancy) / 100);
  const noi = gross - vac - num(opex);

  const yrs = num(years);
  const svcActual = pmt(num(loan), num(rate), yrs) * 12;
  const svcStress = pmt(num(loan), num(stress), yrs) * 12;

  const dscrActual = svcActual > 0 ? noi / svcActual : NaN;
  const dscrStress = svcStress > 0 ? noi / svcStress : NaN;

  const maxLoanStress = maxPrincipal(noi / target, num(stress), yrs);
  const ioCover = num(loan) > 0 ? noi / (num(loan) * (num(rate) / 100)) : NaN;

  const pass = dscrStress >= target;
  const marginal = dscrStress >= 1.0 && dscrStress < target;

  const tone = pass ? "good" : marginal ? "warn" : "bad";

  return (
    <CalcLayout
      inputs={
        <>
          <Field
            label="Gross rental income"
            value={rent}
            onChange={setRent}
            prefix="$"
            suffix="/ yr"
            hint="Contracted annual rent across the property."
          />
          <Field
            label="Vacancy allowance"
            value={vacancy}
            onChange={setVacancy}
            suffix="%"
            hint="Lenders rarely accept 0%. 3–5% is a defensible floor."
          />
          <Field
            label="Non-recoverable outgoings"
            value={opex}
            onChange={setOpex}
            prefix="$"
            suffix="/ yr"
            hint="Costs the tenant does not reimburse (management, some rates)."
          />
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
            suffix="% p.a."
            hint="The rate you expect to actually pay."
          />
          <Field
            label="Stress / assessment rate"
            value={stress}
            onChange={setStress}
            suffix="% p.a."
            hint="What a credit committee tests against. 9–10% is common in 2026."
          />
          <Field
            label="Loan term"
            value={years}
            onChange={setYears}
            suffix="years"
            hint="Amortisation period for the P&I assessment."
          />
        </>
      }
      results={
        <ResultsPanel>
          <Headline
            label="DSCR at stress rate"
            value={fmtNum(dscrStress, 2) + "×"}
            tone={tone}
            sub={`Lenders typically require ${target.toFixed(
              2
            )}× or better at the stressed rate.`}
          />

          <div className="mt-7">
            <Row label="Gross rent" value={fmtMoney(gross)} />
            <Row label="Less vacancy" value={`(${fmtMoney(vac)})`} />
            <Row label="Less outgoings" value={`(${fmtMoney(num(opex))})`} />
            <Row label="Net operating income" value={fmtMoney(noi)} strong />
            <Divider />
            <Row
              label={`Debt service at ${fmtPct(num(rate), 1)} (P&I)`}
              value={fmtMoney(svcActual)}
            />
            <Row
              label={`Debt service at ${fmtPct(num(stress), 1)} (P&I)`}
              value={fmtMoney(svcStress)}
            />
            <Divider />
            <Row
              label="DSCR at your rate"
              value={fmtNum(dscrActual, 2) + "×"}
              strong
            />
            <Row
              label="DSCR at stress rate"
              value={fmtNum(dscrStress, 2) + "×"}
              strong
            />
            <Row
              label="Interest-only cover at your rate"
              value={fmtNum(ioCover, 2) + "×"}
            />
            <Divider />
            <Row
              label={`Max loan that services ${target.toFixed(
                2
              )}× at stress`}
              value={fmtMoney(maxLoanStress)}
              strong
            />
          </div>

          <Verdict tone={tone}>
            {pass ? (
              <>
                The deal services {target.toFixed(2)}× at the stressed rate —
                it should clear most non-bank credit teams on serviceability.
                LVR, lease covenant and WALE will still drive the final terms.
              </>
            ) : marginal ? (
              <>
                It covers debt at the stressed rate but falls short of{" "}
                {target.toFixed(2)}×. Expect a lower loan amount, a stronger
                lease requirement, or a rate concession to be needed.
              </>
            ) : (
              <>
                At the stressed rate the income does not cover the debt. The
                facility needs to be smaller — around{" "}
                {fmtMoney(maxLoanStress)} on these inputs — or the income
                profile has to improve.
              </>
            )}
          </Verdict>

          <Assumptions
            items={[
              "DSCR = net operating income ÷ annual P&I debt service.",
              "Debt service modelled as principal & interest over the term. Interest-only cover is shown separately for reference.",
              "No universal Australia-wide commercial buffer exists — the stress rate is yours to set; 9–10% reflects 2026 practice.",
              "Indicative only. Lenders also weigh LVR, lease term (WALE), tenant covenant and property type.",
            ]}
          />
        </ResultsPanel>
      }
    />
  );
}
