"use client";

import { useState } from "react";
import {
  Field,
  SelectField,
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

// Indicative general transfer-duty scales (2025–26). Approximations
// for estimation only — every state revenue office is authoritative.
const SCALES = {
  NSW: [
    { t: 0, b: 0, r: 0.0125 },
    { t: 17000, b: 212, r: 0.015 },
    { t: 37000, b: 512, r: 0.0175 },
    { t: 99000, b: 1597, r: 0.035 },
    { t: 372000, b: 11152, r: 0.045 },
    { t: 1240000, b: 50212, r: 0.055 },
  ],
  QLD: [
    { t: 0, b: 0, r: 0 },
    { t: 5000, b: 0, r: 0.015 },
    { t: 75000, b: 1050, r: 0.035 },
    { t: 540000, b: 17325, r: 0.045 },
    { t: 1000000, b: 38025, r: 0.0575 },
  ],
  WA: [
    { t: 0, b: 0, r: 0.019 },
    { t: 120000, b: 2280, r: 0.0285 },
    { t: 150000, b: 3135, r: 0.038 },
    { t: 360000, b: 11115, r: 0.0475 },
    { t: 725000, b: 28452, r: 0.0515 },
  ],
  SA: [
    { t: 0, b: 0, r: 0.01 },
    { t: 12000, b: 120, r: 0.02 },
    { t: 30000, b: 480, r: 0.03 },
    { t: 50000, b: 1080, r: 0.035 },
    { t: 100000, b: 2830, r: 0.04 },
    { t: 200000, b: 6830, r: 0.0425 },
    { t: 250000, b: 8955, r: 0.0475 },
    { t: 300000, b: 11330, r: 0.05 },
    { t: 500000, b: 21330, r: 0.055 },
  ],
  TAS: [
    { t: 0, b: 50, r: 0 },
    { t: 3000, b: 50, r: 0.0175 },
    { t: 25000, b: 435, r: 0.0225 },
    { t: 75000, b: 1560, r: 0.035 },
    { t: 200000, b: 5935, r: 0.04 },
    { t: 375000, b: 12935, r: 0.0425 },
    { t: 725000, b: 27810, r: 0.045 },
  ],
  ACT: [
    { t: 0, b: 20, r: 0.0049 },
    { t: 260000, b: 1294, r: 0.022 },
    { t: 300000, b: 2174, r: 0.034 },
    { t: 500000, b: 8974, r: 0.0432 },
    { t: 750000, b: 19774, r: 0.059 },
    { t: 1000000, b: 34524, r: 0.064 },
  ],
};

function bracketDuty(scale, v) {
  let row = scale[0];
  for (const s of scale) if (v >= s.t) row = s;
  return Math.max(row.b + (v - row.t) * row.r, 0);
}

function rawDuty(state, v) {
  if (v <= 0) return 0;
  if (state === "VIC") {
    if (v <= 25000) return v * 0.014;
    if (v <= 130000) return 350 + (v - 25000) * 0.024;
    if (v <= 960000) return 2870 + (v - 130000) * 0.06;
    if (v <= 2000000) return v * 0.055;
    return 110000 + (v - 2000000) * 0.065;
  }
  if (state === "NT") {
    if (v < 525000) {
      const t = v / 1000;
      return 0.06571441 * t * t + 15 * t;
    }
    if (v <= 3000000) return v * 0.0495;
    if (v <= 5000000) return v * 0.0575;
    return v * 0.0595;
  }
  if (state === "ACT" && v > 1455000) return v * 0.0454;
  return bracketDuty(SCALES[state], v);
}

// First-home-buyer factor (0 = exempt … 1 = full). Approximate.
function fhbFactor(state, v) {
  const lerp = (lo, hi) => Math.min(Math.max((v - lo) / (hi - lo), 0), 1);
  switch (state) {
    case "NSW":
      return v <= 800000 ? 0 : v >= 1000000 ? 1 : lerp(800000, 1000000);
    case "VIC":
      return v <= 600000 ? 0 : v >= 750000 ? 1 : lerp(600000, 750000);
    case "QLD":
      return v <= 700000 ? 0 : v >= 800000 ? 1 : lerp(700000, 800000);
    case "WA":
      return v <= 430000 ? 0 : v >= 530000 ? 1 : lerp(430000, 530000);
    case "SA":
      return v <= 650000 ? 0 : v >= 700000 ? 1 : lerp(650000, 700000);
    case "TAS":
      return v <= 750000 ? 0.5 : 1;
    case "ACT":
      return v <= 1000000 ? 0 : 1;
    default:
      return 1; // NT — concessions vary; assume none for the estimate
  }
}

const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"].map(
  (s) => ({ value: s, label: s })
);

export function StampDuty() {
  const [value, setValue] = useState("950000");
  const [state, setState] = useState("NSW");
  const [buyer, setBuyer] = useState("ownerOccupier");
  const [fhb, setFhb] = useState("no");

  const V = num(value);
  const isFHB = fhb === "yes" && buyer === "ownerOccupier";
  const base = rawDuty(state, V);
  const factor = isFHB ? fhbFactor(state, V) : 1;
  const duty = base * factor;
  const govFees = 350; // transfer + mortgage registration (est.)
  const totalUpfront = duty + govFees;
  const effRate = V > 0 ? (duty / V) * 100 : 0;
  const saved = base - duty;

  return (
    <CalcLayout
      inputs={
        <>
          <Field
            label="Property value"
            value={value}
            onChange={setValue}
            prefix="$"
          />
          <SelectField
            label="State or territory"
            value={state}
            onChange={setState}
            options={STATES}
          />
          <SegmentedControl
            label="Buyer type"
            value={buyer}
            onChange={setBuyer}
            options={[
              { value: "ownerOccupier", label: "Owner-occupier" },
              { value: "investor", label: "Investor" },
            ]}
          />
          <SegmentedControl
            label="First home buyer"
            value={fhb}
            onChange={setFhb}
            options={[
              { value: "no", label: "No" },
              { value: "yes", label: "Yes" },
            ]}
            hint="Concessions apply to owner-occupiers only and vary by state."
          />
        </>
      }
      results={
        <ResultsPanel>
          <Headline
            label="Estimated stamp duty"
            value={fmtMoney(duty)}
            tone={isFHB && saved > 0 ? "good" : "default"}
            sub={`About ${fmtPct(effRate, 2)} of the property value in ${state}.`}
          />

          <div className="mt-7">
            <Row
              label="Transfer (stamp) duty"
              value={fmtMoney(duty)}
              strong
            />
            {isFHB && saved > 0 && (
              <Row
                label="First-home-buyer saving"
                value={`− ${fmtMoney(saved)}`}
              />
            )}
            <Row label="Government fees (est.)" value={fmtMoney(govFees)} />
            <Divider />
            <Row
              label="Total upfront (est.)"
              value={fmtMoney(totalUpfront)}
              strong
            />
          </div>

          <div className="mt-8">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Upfront cost breakdown
            </p>
            <DonutChart
              centerLabel="Total upfront"
              centerValue={fmtMoney(totalUpfront)}
              data={[
                { label: "Stamp duty", value: duty },
                { label: "Government fees", value: govFees },
              ]}
            />
          </div>

          <Verdict tone="warn">
            This is an estimate using indicative 2025–26 scales. Concessions,
            surcharges (e.g. foreign buyer), and exact fees differ by state and
            change at budget time. Confirm with the {state} revenue office or a
            conveyancer before you rely on a figure.
          </Verdict>

          <Assumptions
            items={[
              "General transfer-duty scales, approximated — not the authoritative state schedules.",
              "First-home-buyer concessions are simplified thresholds and apply to owner-occupiers only; eligibility (income, residency, new vs established) is not modelled.",
              "Government fees are a flat $350 estimate (transfer + mortgage registration); actual fees vary by state.",
              "Foreign-purchaser and absentee surcharges are not included.",
            ]}
          />
        </ResultsPanel>
      }
    />
  );
}
