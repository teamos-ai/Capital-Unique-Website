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
  Assumptions,
  fmtMoney,
  fmtPct,
  num,
} from "./ui";
import { DonutChart, AreaChart } from "./charts";

const FREQ = { monthly: 12, fortnightly: 26, weekly: 52 };

export function HomeLoanRepayment() {
  const [amount, setAmount] = useState("750000");
  const [rate, setRate] = useState("6.20");
  const [years, setYears] = useState("30");
  const [freq, setFreq] = useState("monthly");
  const [type, setType] = useState("pi");
  const [ioYears, setIoYears] = useState("3");

  const P = num(amount);
  const annual = num(rate) / 100;
  const term = num(years);
  const ppy = FREQ[freq];
  const r = annual / ppy;

  function payment(principal, periods) {
    if (periods <= 0) return 0;
    if (r === 0) return principal / periods;
    return (r * principal) / (1 - Math.pow(1 + r, -periods));
  }

  const isIO = type === "io";
  const io = Math.min(num(ioYears), term);
  const ioPeriods = io * ppy;
  const piPeriods = (term - (isIO ? io : 0)) * ppy;

  const ioRepay = P * r; // interest-only periodic payment
  const piRepay = payment(P, piPeriods || term * ppy);

  const repayNow = isIO ? ioRepay : piRepay;
  const ioInterest = isIO ? ioRepay * ioPeriods : 0;
  const piInterest = piRepay * piPeriods - P;
  const totalInterest = Math.max(ioInterest + piInterest, 0);
  const totalCost = P + totalInterest;

  // Balance per year for the chart.
  const series = [];
  {
    let bal = P;
    series.push(bal);
    for (let yr = 1; yr <= term; yr++) {
      for (let k = 0; k < ppy; k++) {
        const periodIndex = (yr - 1) * ppy + k;
        const inIO = isIO && periodIndex < ioPeriods;
        const pay = inIO ? ioRepay : piRepay;
        const interest = bal * r;
        bal = inIO ? bal : Math.max(bal + interest - pay, 0);
      }
      series.push(bal);
    }
  }

  const freqLabel =
    freq === "monthly" ? "month" : freq === "fortnightly" ? "fortnight" : "week";

  return (
    <CalcLayout
      inputs={
        <>
          <Field
            label="Loan amount"
            value={amount}
            onChange={setAmount}
            prefix="$"
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
          <SegmentedControl
            label="Repayment frequency"
            value={freq}
            onChange={setFreq}
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "fortnightly", label: "Fortnightly" },
              { value: "weekly", label: "Weekly" },
            ]}
          />
          <SegmentedControl
            label="Repayment type"
            value={type}
            onChange={setType}
            options={[
              { value: "pi", label: "Principal & interest" },
              { value: "io", label: "Interest only" },
            ]}
          />
          {isIO && (
            <Field
              label="Interest-only period"
              value={ioYears}
              onChange={setIoYears}
              suffix="years"
              hint="Repayments rise to principal & interest after this."
            />
          )}
        </>
      }
      results={
        <ResultsPanel>
          <Headline
            label={`Repayment per ${freqLabel}`}
            value={fmtMoney(repayNow, { cents: true })}
            tone="good"
            sub={
              isIO
                ? `Rises to ${fmtMoney(piRepay, {
                    cents: true,
                  })} after the interest-only period.`
                : `Over ${term} years at ${fmtPct(num(rate), 2)} p.a.`
            }
          />

          <div className="mt-7">
            <Row label="Loan amount" value={fmtMoney(P)} strong />
            <Row label="Total interest" value={fmtMoney(totalInterest)} />
            <Row label="Total to repay" value={fmtMoney(totalCost)} strong />
            {isIO && (
              <>
                <Divider />
                <Row
                  label={`Interest-only repayment / ${freqLabel}`}
                  value={fmtMoney(ioRepay, { cents: true })}
                />
                <Row
                  label={`Then P&I / ${freqLabel}`}
                  value={fmtMoney(piRepay, { cents: true })}
                />
              </>
            )}
          </div>

          <div className="mt-8">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Principal vs interest
            </p>
            <DonutChart
              data={[
                { label: "Principal", value: P },
                { label: "Interest", value: totalInterest },
              ]}
            />
          </div>

          <div className="mt-8">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Loan balance over time
            </p>
            <AreaChart
              series={series}
              xLabel="Year"
              yFormat={(v) => fmtMoney(v)}
            />
          </div>

          <Assumptions
            items={[
              "Repayments assume a constant interest rate for the full term — real rates move.",
              "Interest-only mode capitalises nothing; repayments step up to P&I over the remaining term once the IO period ends.",
              "Excludes fees, offset/redraw, lenders mortgage insurance and rate changes.",
              "General information only — not credit assistance or a loan offer.",
            ]}
          />
        </ResultsPanel>
      }
    />
  );
}
