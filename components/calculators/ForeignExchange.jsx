"use client";

import { useEffect, useState } from "react";
import {
  Field,
  SelectField,
  CalcLayout,
  ResultsPanel,
  Headline,
  Row,
  Divider,
  Assumptions,
  fmtPct,
  fmtNum,
  num,
} from "./ui";
import { DonutChart } from "./charts";

// Indicative units per 1 AUD. NOT live — a reference baseline only.
const PER_AUD = {
  AUD: 1,
  USD: 0.66,
  EUR: 0.61,
  GBP: 0.52,
  NZD: 1.08,
  JPY: 99,
  CAD: 0.9,
  SGD: 0.88,
  CNY: 4.7,
  HKD: 5.15,
  INR: 55,
  THB: 23,
  AED: 2.42,
};
const CCY = Object.keys(PER_AUD).map((c) => ({ value: c, label: c }));

function midRate(from, to) {
  return PER_AUD[to] / PER_AUD[from];
}

function money(n, ccy) {
  return `${fmtNum(n, 2)} ${ccy}`;
}

export function ForeignExchange() {
  const [amount, setAmount] = useState("10000");
  const [from, setFrom] = useState("AUD");
  const [to, setTo] = useState("USD");
  const [rate, setRate] = useState(midRate("AUD", "USD").toFixed(4));
  const [margin, setMargin] = useState("2.5");

  // Reset the rate to the indicative mid whenever the pair changes.
  useEffect(() => {
    setRate(midRate(from, to).toFixed(4));
  }, [from, to]);

  const amt = num(amount);
  const r = num(rate);
  const m = num(margin) / 100;

  const atMid = amt * r;
  const effRate = r * (1 - m);
  const received = amt * effRate;
  const marginCost = atMid - received;
  const inverse = r > 0 ? 1 / r : 0;

  return (
    <CalcLayout
      inputs={
        <>
          <Field
            label="Amount to convert"
            value={amount}
            onChange={setAmount}
            suffix={from}
          />
          <SelectField
            label="From currency"
            value={from}
            onChange={setFrom}
            options={CCY}
          />
          <SelectField
            label="To currency"
            value={to}
            onChange={setTo}
            options={CCY}
          />
          <Field
            label="Exchange rate"
            value={rate}
            onChange={setRate}
            suffix={`${to}/${from}`}
            step="0.0001"
            hint="Pre-filled with an indicative rate — overwrite with your provider's."
          />
          <Field
            label="FX margin / markup"
            value={margin}
            onChange={setMargin}
            suffix="%"
            hint="Banks build a spread into the rate. Typical retail: 2–4%."
          />
        </>
      }
      results={
        <ResultsPanel>
          <Headline
            label={`You receive`}
            value={money(received, to)}
            tone="good"
            sub={`At an effective rate of ${fmtNum(effRate, 4)} ${to}/${from}.`}
          />

          <div className="mt-7">
            <Row
              label={`Amount`}
              value={money(amt, from)}
              strong
            />
            <Row
              label={`At the quoted rate (${fmtNum(r, 4)})`}
              value={money(atMid, to)}
            />
            <Row
              label={`Less ${fmtPct(num(margin), 1)} margin`}
              value={`(${money(marginCost, to)})`}
            />
            <Divider />
            <Row
              label="You receive"
              value={money(received, to)}
              strong
            />
            <Row
              label={`Inverse rate`}
              value={`${fmtNum(inverse, 4)} ${from}/${to}`}
            />
          </div>

          {marginCost > 0 && (
            <div className="mt-8">
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                What the margin costs you
              </p>
              <DonutChart
                centerLabel="Margin cost"
                centerValue={money(marginCost, to)}
                data={[
                  {
                    label: "You receive",
                    value: received,
                    display: money(received, to),
                  },
                  {
                    label: "Lost to margin",
                    value: marginCost,
                    display: money(marginCost, to),
                  },
                ]}
              />
            </div>
          )}

          <Assumptions
            items={[
              "Indicative rates are a static reference baseline — they are NOT live and will not match the market.",
              "Always set the rate from your bank or FX provider for an accurate figure.",
              "The margin reduces the rate you transact at; some providers also add fixed transfer fees, not modelled here.",
              "General information only — not financial or FX advice.",
            ]}
          />
        </ResultsPanel>
      }
    />
  );
}
