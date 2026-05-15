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

const DEFAULT_STAGES = [
  { name: "Base / slab", pct: "15", month: "1" },
  { name: "Frame", pct: "20", month: "3" },
  { name: "Lock-up", pct: "25", month: "6" },
  { name: "Fixing", pct: "20", month: "9" },
  { name: "Completion", pct: "20", month: "12" },
];

export function ConstructionDrawdown() {
  const [facility, setFacility] = useState("2500000");
  const [rate, setRate] = useState("9.0"); // % p.a.
  const [buildTerm, setBuildTerm] = useState("13"); // months
  const [lineFee, setLineFee] = useState("0.5"); // % p.a. on undrawn
  const [qsFee, setQsFee] = useState("1200"); // $ per inspection
  const [stages, setStages] = useState(DEFAULT_STAGES);

  const F = num(facility);
  const term = num(buildTerm);
  const monthlyRate = num(rate) / 100 / 12;

  function setStage(i, key, val) {
    setStages((s) =>
      s.map((st, idx) => (idx === i ? { ...st, [key]: val } : st))
    );
  }

  const pctTotal = stages.reduce((a, s) => a + num(s.pct), 0);

  // Capitalised interest: each draw accrues from its month to build end.
  let capInterest = 0;
  const rows = stages.map((s) => {
    const amt = F * (num(s.pct) / 100);
    const monthsAccruing = Math.max(term - num(s.month), 0);
    const interest = amt * monthlyRate * monthsAccruing;
    capInterest += interest;
    return { ...s, amt, interest, monthsAccruing };
  });

  // Line fee on the average undrawn balance over the build.
  const totalDrawn = F * (pctTotal / 100);
  const avgUndrawn = Math.max(F - totalDrawn / 2, 0);
  const lineFeeCost = avgUndrawn * (num(lineFee) / 100) * (term / 12);

  const qsTotal = stages.length * num(qsFee);
  const totalFinanceCost = capInterest + lineFeeCost + qsTotal;
  const peakDebt = totalDrawn + capInterest;

  const offBalance = Math.abs(pctTotal - 100) > 0.01;

  return (
    <CalcLayout
      inputs={
        <>
          <Field
            label="Total facility"
            value={facility}
            onChange={setFacility}
            prefix="$"
          />
          <Field
            label="Interest rate"
            value={rate}
            onChange={setRate}
            suffix="% p.a."
          />
          <Field
            label="Build term"
            value={buildTerm}
            onChange={setBuildTerm}
            suffix="months"
            hint="From first draw to practical completion."
          />
          <Field
            label="Line fee on undrawn"
            value={lineFee}
            onChange={setLineFee}
            suffix="% p.a."
            hint="Charged on the facility you haven't drawn yet."
          />
          <Field
            label="QS inspection fee"
            value={qsFee}
            onChange={setQsFee}
            prefix="$"
            hint="Per progress inspection — typically $500–$1,500."
          />

          <div className="mt-2">
            <p className="text-sm font-medium text-foreground/90">
              Drawdown schedule
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              % of facility and the month each stage is drawn.
            </p>
            <div className="mt-3 flex flex-col gap-2.5">
              {stages.map((s, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_4.5rem_4.5rem] items-center gap-2"
                >
                  <input
                    value={s.name}
                    onChange={(e) => setStage(i, "name", e.target.value)}
                    className="w-full rounded-md border border-border bg-input-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-cu-brandy-light"
                  />
                  <div className="relative">
                    <input
                      type="number"
                      value={s.pct}
                      onChange={(e) => setStage(i, "pct", e.target.value)}
                      className="w-full rounded-md border border-border bg-input-background py-2 pl-2.5 pr-6 text-sm tabular-nums text-foreground focus:outline-none focus:ring-2 focus:ring-cu-brandy-light"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-xs text-muted-foreground">
                      %
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={s.month}
                      onChange={(e) => setStage(i, "month", e.target.value)}
                      className="w-full rounded-md border border-border bg-input-background py-2 pl-2.5 pr-7 text-sm tabular-nums text-foreground focus:outline-none focus:ring-2 focus:ring-cu-brandy-light"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5 text-[10px] text-muted-foreground">
                      mo
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p
              className={`mt-2 text-xs ${
                offBalance ? "text-cu-amber" : "text-muted-foreground"
              }`}
            >
              Schedule totals {fmtPct(pctTotal, 0)}
              {offBalance ? " — should sum to 100%." : "."}
            </p>
          </div>
        </>
      }
      results={
        <ResultsPanel>
          <Headline
            label="Total cost of finance"
            value={fmtMoney(totalFinanceCost)}
            sub="Capitalised interest, line fees and QS inspections combined."
          />

          <div className="mt-7">
            {rows.map((r, i) => (
              <Row
                key={i}
                label={`${r.name} — ${fmtMoney(r.amt)} @ mo ${r.month}`}
                value={fmtMoney(r.interest)}
              />
            ))}
            <Divider />
            <Row
              label="Capitalised interest"
              value={fmtMoney(capInterest)}
              strong
            />
            <Row label="Line fee on undrawn" value={fmtMoney(lineFeeCost)} />
            <Row
              label={`QS inspections (${stages.length})`}
              value={fmtMoney(qsTotal)}
            />
            <Divider />
            <Row
              label="Total cost of finance"
              value={fmtMoney(totalFinanceCost)}
              strong
            />
            <Row label="Peak debt at completion" value={fmtMoney(peakDebt)} strong />
          </div>

          <Verdict tone="warn">
            Capitalised interest of {fmtMoney(capInterest)} is debt you repay
            on settlement or sale — it eats into project margin before the
            first dollar of profit. Earlier, larger draws cost more, so the
            draw schedule itself is a lever.
          </Verdict>

          <Assumptions
            items={[
              "Interest is simple on the cumulative drawn balance from each draw month to build end (a screening approximation, not a daily-rest amortisation).",
              "Line fee is charged on the average undrawn balance across the term.",
              "Assumes interest is capitalised, not serviced monthly.",
              "Indicative only. Real cost depends on QS turnaround, draw timing, variations and lender mechanics.",
            ]}
          />
        </ResultsPanel>
      }
    />
  );
}
