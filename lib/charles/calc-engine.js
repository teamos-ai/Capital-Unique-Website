// Deterministic calculator engine for Charles A.I.
//
// The math here is copied VERBATIM from the site's /calculators components
// (components/calculators/*.jsx) — the single source of truth for any number
// Charles quotes. Charles never does arithmetic itself; it collects inputs,
// calls runCalc(), and narrates the exact result. Pure functions, no React,
// no dependencies, safe on the server.
//
// Each result is an indicative estimate that surfaces its own assumptions —
// Charles must present it that way, never as advice or a firm quote.

// ── Formatters (mirrors components/calculators/ui.jsx) ──────────────────
const AUD = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});
const AUD2 = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 2,
});

function fmtMoney(n, { cents = false } = {}) {
  if (!isFinite(n)) return "—";
  return (cents ? AUD2 : AUD).format(n);
}
function fmtPct(n, dp = 2) {
  if (!isFinite(n)) return "—";
  return `${n.toFixed(dp)}%`;
}
function fmtNum(n, dp = 2) {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-AU", {
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
  });
}
// Coerce a user value to a number, tolerating $ , spaces (mirrors ui.jsx num()).
function toNum(v) {
  if (v === "" || v === null || v === undefined) return 0;
  const n = parseFloat(String(v).replace(/[^0-9.\-]/g, ""));
  return isFinite(n) ? n : 0;
}

// ── Shared math helpers ─────────────────────────────────────────────────
// Monthly P&I payment for a loan (CommercialDscr).
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

// ── Currency reference (ForeignExchange) ────────────────────────────────
const PER_AUD = {
  AUD: 1, USD: 0.66, EUR: 0.61, GBP: 0.52, NZD: 1.08, JPY: 99, CAD: 0.9,
  SGD: 0.88, CNY: 4.7, HKD: 5.15, INR: 55, THB: 23, AED: 2.42,
};
const CCY_OPTIONS = Object.keys(PER_AUD).map((c) => ({ value: c, label: c }));
function midRate(from, to) {
  return PER_AUD[to] / PER_AUD[from];
}
function fxMoney(n, ccy) {
  return `${fmtNum(n, 2)} ${ccy}`;
}

// ── Stamp duty scales (StampDuty) ───────────────────────────────────────
const SD_SCALES = {
  NSW: [
    { t: 0, b: 0, r: 0.0125 }, { t: 17000, b: 212, r: 0.015 },
    { t: 37000, b: 512, r: 0.0175 }, { t: 99000, b: 1597, r: 0.035 },
    { t: 372000, b: 11152, r: 0.045 }, { t: 1240000, b: 50212, r: 0.055 },
  ],
  QLD: [
    { t: 0, b: 0, r: 0 }, { t: 5000, b: 0, r: 0.015 },
    { t: 75000, b: 1050, r: 0.035 }, { t: 540000, b: 17325, r: 0.045 },
    { t: 1000000, b: 38025, r: 0.0575 },
  ],
  WA: [
    { t: 0, b: 0, r: 0.019 }, { t: 120000, b: 2280, r: 0.0285 },
    { t: 150000, b: 3135, r: 0.038 }, { t: 360000, b: 11115, r: 0.0475 },
    { t: 725000, b: 28452, r: 0.0515 },
  ],
  SA: [
    { t: 0, b: 0, r: 0.01 }, { t: 12000, b: 120, r: 0.02 },
    { t: 30000, b: 480, r: 0.03 }, { t: 50000, b: 1080, r: 0.035 },
    { t: 100000, b: 2830, r: 0.04 }, { t: 200000, b: 6830, r: 0.0425 },
    { t: 250000, b: 8955, r: 0.0475 }, { t: 300000, b: 11330, r: 0.05 },
    { t: 500000, b: 21330, r: 0.055 },
  ],
  TAS: [
    { t: 0, b: 50, r: 0 }, { t: 3000, b: 50, r: 0.0175 },
    { t: 25000, b: 435, r: 0.0225 }, { t: 75000, b: 1560, r: 0.035 },
    { t: 200000, b: 5935, r: 0.04 }, { t: 375000, b: 12935, r: 0.0425 },
    { t: 725000, b: 27810, r: 0.045 },
  ],
  ACT: [
    { t: 0, b: 20, r: 0.0049 }, { t: 260000, b: 1294, r: 0.022 },
    { t: 300000, b: 2174, r: 0.034 }, { t: 500000, b: 8974, r: 0.0432 },
    { t: 750000, b: 19774, r: 0.059 }, { t: 1000000, b: 34524, r: 0.064 },
  ],
};
function sdBracketDuty(scale, v) {
  if (!scale || !scale.length) return 0;
  let row = scale[0];
  for (const s of scale) if (v >= s.t) row = s;
  return Math.max(row.b + (v - row.t) * row.r, 0);
}
function sdRawDuty(state, v) {
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
  return sdBracketDuty(SD_SCALES[state], v);
}
function sdFhbFactor(state, v) {
  const lerp = (lo, hi) => Math.min(Math.max((v - lo) / (hi - lo), 0), 1);
  switch (state) {
    case "NSW": return v <= 800000 ? 0 : v >= 1000000 ? 1 : lerp(800000, 1000000);
    case "VIC": return v <= 600000 ? 0 : v >= 750000 ? 1 : lerp(600000, 750000);
    case "QLD": return v <= 700000 ? 0 : v >= 800000 ? 1 : lerp(700000, 800000);
    case "WA": return v <= 430000 ? 0 : v >= 530000 ? 1 : lerp(430000, 530000);
    case "SA": return v <= 650000 ? 0 : v >= 700000 ? 1 : lerp(650000, 700000);
    case "TAS": return v <= 750000 ? 0.5 : 1;
    case "ACT": return v <= 1000000 ? 0 : 1;
    default: return 1; // NT
  }
}
const SD_STATE_OPTIONS = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"].map(
  (s) => ({ value: s, label: s })
);

// ── Income tax (HomeLoanBorrowing) ──────────────────────────────────────
// Indicative AU resident income tax (2024–25) incl. ~2% Medicare.
function netAnnual(gross) {
  const g = Math.max(gross, 0);
  let tax = 0;
  if (g > 18200) tax += (Math.min(g, 45000) - 18200) * 0.16;
  if (g > 45000) tax += (Math.min(g, 135000) - 45000) * 0.3;
  if (g > 135000) tax += (Math.min(g, 190000) - 135000) * 0.37;
  if (g > 190000) tax += (g - 190000) * 0.45;
  const medicare = g > 27222 ? g * 0.02 : 0;
  return Math.max(g - tax - medicare, 0);
}

// ── Construction default draw schedule ──────────────────────────────────
const CONSTRUCTION_STAGES = [
  { name: "Base / slab", pct: 15, month: 1 },
  { name: "Frame", pct: 20, month: 3 },
  { name: "Lock-up", pct: 25, month: 6 },
  { name: "Fixing", pct: 20, month: 9 },
  { name: "Completion", pct: 20, month: 12 },
];

const REPAY_FREQ = { monthly: 12, fortnightly: 26, weekly: 52 };

// ════════════════════════════════════════════════════════════════════════
// The engine. Each entry: inputs (what Charles collects) + compute (verbatim
// math) → { outputs: [{label,value}], raw: {...}, summary: "one sentence" }.
// ════════════════════════════════════════════════════════════════════════

export const CALC_ENGINE = {
  "bridging-cost": {
    slug: "bridging-cost",
    title: "Bridging & Caveat Cost",
    summaryHint: "what short-term capital actually costs once fees are in",
    inputs: [
      { key: "loan", label: "Loan amount", type: "number", unit: "$", default: 750000 },
      { key: "rate", label: "Interest rate", type: "number", unit: "% / month", default: 1.25 },
      { key: "term", label: "Term", type: "number", unit: "months", default: 6 },
      { key: "estab", label: "Establishment fee", type: "number", unit: "% of loan", default: 2 },
      { key: "exit", label: "Exit / discharge fee", type: "number", unit: "$", default: 0 },
      { key: "legal", label: "Legal & valuation", type: "number", unit: "$", default: 3500 },
    ],
    compute(v) {
      const L = v.loan, months = v.term, monthlyRate = v.rate / 100;
      const interest = L * monthlyRate * months;
      const estabFee = L * (v.estab / 100);
      const exitFee = v.exit;
      const legalFee = v.legal;
      const totalCost = interest + estabFee + exitFee + legalFee;
      const totalPayable = L + totalCost;
      const effAnnual = L > 0 && months > 0 ? (totalCost / L / (months / 12)) * 100 : NaN;
      const outputs = [
        { label: "Effective annualised rate", value: fmtPct(effAnnual, 1) },
        { label: "Interest over term", value: fmtMoney(interest) },
        { label: "Establishment fee", value: fmtMoney(estabFee) },
      ];
      if (exitFee > 0) outputs.push({ label: "Exit / discharge fee", value: fmtMoney(exitFee) });
      outputs.push({ label: "Legal & valuation", value: fmtMoney(legalFee) });
      outputs.push({ label: "Total cost of finance", value: fmtMoney(totalCost) });
      outputs.push({ label: "Total payable on repayment", value: fmtMoney(totalPayable) });
      return {
        outputs,
        raw: { interest, estabFee, exitFee, legalFee, totalCost, totalPayable, effAnnual },
        summary: `On ${fmtMoney(L)} over ${months} months at ${fmtNum(v.rate, 2)}%/month with fees, the bridging costs about ${fmtMoney(totalCost)} — an effective ${fmtPct(effAnnual, 1)} p.a. Total to repay is ${fmtMoney(totalPayable)}.`,
      };
    },
  },

  "development-feasibility": {
    slug: "development-feasibility",
    title: "Development Feasibility",
    summaryHint: "the most you can pay for a site and still hit your margin",
    inputs: [
      { key: "grv", label: "Gross realisation (GRV, net of GST)", type: "number", unit: "$", default: 4200000 },
      { key: "build", label: "Construction cost", type: "number", unit: "$", default: 2300000 },
      { key: "soft", label: "Professional & soft costs", type: "number", unit: "% of construction", default: 12 },
      { key: "contingency", label: "Contingency", type: "number", unit: "% of construction", default: 5 },
      { key: "finance", label: "Finance costs", type: "number", unit: "$", default: 210000 },
      { key: "selling", label: "Selling & marketing", type: "number", unit: "% of GRV", default: 3 },
      { key: "margin", label: "Target profit margin", type: "number", unit: "% on cost ex-land", default: 20 },
    ],
    compute(v) {
      const GRV = v.grv, C = v.build;
      const softCost = C * (v.soft / 100);
      const contCost = C * (v.contingency / 100);
      const financeCost = v.finance;
      const sellingCost = GRV * (v.selling / 100);
      const netRealisation = GRV - sellingCost;
      const devCostExLand = C + softCost + contCost + financeCost;
      const requiredProfit = devCostExLand * (v.margin / 100);
      const residualLand = netRealisation - devCostExLand - requiredProfit;
      const totalCostInclLand = devCostExLand + Math.max(residualLand, 0);
      const marginOnTotalCost =
        totalCostInclLand > 0 ? ((netRealisation - totalCostInclLand) / totalCostInclLand) * 100 : NaN;
      return {
        outputs: [
          { label: "Maximum land price", value: fmtMoney(residualLand) },
          { label: "Net realisation", value: fmtMoney(netRealisation) },
          { label: "Development cost (ex-land)", value: fmtMoney(devCostExLand) },
          { label: "Required profit", value: fmtMoney(requiredProfit) },
          { label: "Margin on total cost (at that land price)", value: fmtPct(marginOnTotalCost, 1) },
        ],
        raw: { residualLand, netRealisation, devCostExLand, requiredProfit, marginOnTotalCost },
        summary:
          residualLand > 0
            ? `On a ${fmtMoney(GRV)} GRV with ${fmtMoney(C)} of construction, the site can carry up to about ${fmtMoney(residualLand)} of land and still return your ${fmtNum(v.margin, 0)}% margin — roughly a ${fmtPct(marginOnTotalCost, 1)} margin on total cost at that land price.`
            : `At this GRV (${fmtMoney(GRV)}) and cost base the project can't fund the land and a ${fmtNum(v.margin, 0)}% margin — it only works if end values rise, costs fall, or the margin expectation drops.`,
      };
    },
  },

  "commercial-dscr": {
    slug: "commercial-dscr",
    title: "Commercial DSCR & Stress Test",
    summaryHint: "whether a commercial property services debt at a stressed rate",
    inputs: [
      { key: "rent", label: "Gross rental income", type: "number", unit: "$ / yr", default: 420000 },
      { key: "vacancy", label: "Vacancy allowance", type: "number", unit: "%", default: 5 },
      { key: "opex", label: "Non-recoverable outgoings", type: "number", unit: "$ / yr", default: 48000 },
      { key: "loan", label: "Loan amount", type: "number", unit: "$", default: 3800000 },
      { key: "rate", label: "Interest rate", type: "number", unit: "% p.a.", default: 7.0 },
      { key: "stress", label: "Stress / assessment rate", type: "number", unit: "% p.a.", default: 9.5 },
      { key: "years", label: "Loan term", type: "number", unit: "years", default: 25 },
    ],
    compute(v) {
      const target = 1.25;
      const gross = v.rent;
      const vac = gross * (v.vacancy / 100);
      const noi = gross - vac - v.opex;
      const yrs = v.years;
      const svcActual = pmt(v.loan, v.rate, yrs) * 12;
      const svcStress = pmt(v.loan, v.stress, yrs) * 12;
      const dscrActual = svcActual > 0 ? noi / svcActual : NaN;
      const dscrStress = svcStress > 0 ? noi / svcStress : NaN;
      const maxLoanStress = maxPrincipal(noi / target, v.stress, yrs);
      const ioCover = v.loan > 0 ? noi / (v.loan * (v.rate / 100)) : NaN;
      return {
        outputs: [
          { label: "DSCR at stress rate", value: fmtNum(dscrStress, 2) + "×" },
          { label: "DSCR at your rate", value: fmtNum(dscrActual, 2) + "×" },
          { label: "Net operating income", value: fmtMoney(noi) },
          { label: `Debt service at ${fmtPct(v.rate, 1)} (P&I)`, value: fmtMoney(svcActual) },
          { label: `Debt service at ${fmtPct(v.stress, 1)} (P&I)`, value: fmtMoney(svcStress) },
          { label: "Max loan that services 1.25× at stress", value: fmtMoney(maxLoanStress) },
        ],
        raw: { noi, svcActual, svcStress, dscrActual, dscrStress, maxLoanStress, ioCover, target },
        summary: `Net operating income of ${fmtMoney(noi)} covers the debt ${fmtNum(dscrStress, 2)}× at the ${fmtNum(v.stress, 1)}% stress rate (${fmtNum(dscrActual, 2)}× at ${fmtNum(v.rate, 1)}%). Lenders want about 1.25×${dscrStress >= target ? " — it clears on serviceability" : `; the max loan that services 1.25× at stress is about ${fmtMoney(maxLoanStress)}`}.`,
      };
    },
  },

  "construction-drawdown": {
    slug: "construction-drawdown",
    title: "Construction Drawdown",
    summaryHint: "capitalised interest and total finance cost on a staged build",
    inputs: [
      { key: "facility", label: "Total facility", type: "number", unit: "$", default: 2500000 },
      { key: "rate", label: "Interest rate", type: "number", unit: "% p.a.", default: 9.0 },
      { key: "buildTerm", label: "Build term", type: "number", unit: "months", default: 13 },
      { key: "lineFee", label: "Line fee on undrawn", type: "number", unit: "% p.a.", default: 0.5 },
      { key: "qsFee", label: "QS inspection fee", type: "number", unit: "$ per inspection", default: 1200 },
    ],
    compute(v) {
      const stages = (Array.isArray(v.stages) ? v.stages : CONSTRUCTION_STAGES).filter(
        (s) => s && typeof s === "object"
      );
      const F = v.facility, term = v.buildTerm, monthlyRate = v.rate / 100 / 12;
      const pctTotal = stages.reduce((a, s) => a + toNum(s.pct), 0);
      let capInterest = 0;
      for (const s of stages) {
        const amt = F * (toNum(s.pct) / 100);
        const monthsAccruing = Math.max(term - toNum(s.month), 0);
        capInterest += amt * monthlyRate * monthsAccruing;
      }
      const totalDrawn = F * (pctTotal / 100);
      const avgUndrawn = Math.max(F - totalDrawn / 2, 0);
      const lineFeeCost = avgUndrawn * (v.lineFee / 100) * (term / 12);
      const qsTotal = stages.length * v.qsFee;
      const totalFinanceCost = capInterest + lineFeeCost + qsTotal;
      const peakDebt = totalDrawn + capInterest;
      return {
        outputs: [
          { label: "Total cost of finance", value: fmtMoney(totalFinanceCost) },
          { label: "Capitalised interest", value: fmtMoney(capInterest) },
          { label: "Line fee on undrawn", value: fmtMoney(lineFeeCost) },
          { label: `QS inspections (${stages.length})`, value: fmtMoney(qsTotal) },
          { label: "Peak debt at completion", value: fmtMoney(peakDebt) },
        ],
        raw: { capInterest, lineFeeCost, qsTotal, totalFinanceCost, peakDebt },
        summary: `On a ${fmtMoney(F)} facility over ${term} months (standard 5-stage draw), capitalised interest is about ${fmtMoney(capInterest)}, plus ${fmtMoney(lineFeeCost)} line fees and ${fmtMoney(qsTotal)} QS — a total finance cost near ${fmtMoney(totalFinanceCost)}, with peak debt around ${fmtMoney(peakDebt)}.`,
      };
    },
  },

  "true-cost-of-capital": {
    slug: "true-cost-of-capital",
    title: "True Cost of Capital",
    summaryHint: "a headline rate plus fees turned into one effective rate",
    inputs: [
      { key: "loan", label: "Loan amount", type: "number", unit: "$", default: 1500000 },
      { key: "term", label: "Term", type: "number", unit: "months", default: 12 },
      { key: "headline", label: "Headline rate", type: "number", unit: "% p.a.", default: 8.95 },
      { key: "estab", label: "Establishment fee", type: "number", unit: "% of loan", default: 1.5 },
      { key: "brokerage", label: "Brokerage / advisory", type: "number", unit: "% of loan", default: 1.0 },
      { key: "lineFee", label: "Line / ongoing fee", type: "number", unit: "% p.a.", default: 0 },
      { key: "exit", label: "Exit / discharge fee", type: "number", unit: "$", default: 5000 },
    ],
    compute(v) {
      const L = v.loan, months = v.term, years = months / 12;
      const interest = L * (v.headline / 100) * years;
      const estabFee = L * (v.estab / 100);
      const brokerFee = L * (v.brokerage / 100);
      const lineFeeCost = L * (v.lineFee / 100) * years;
      const exitFee = v.exit;
      const feesTotal = estabFee + brokerFee + lineFeeCost + exitFee;
      const totalCost = interest + feesTotal;
      const effRate = L > 0 && years > 0 ? (totalCost / L / years) * 100 : NaN;
      const gap = effRate - v.headline;
      return {
        outputs: [
          { label: "Effective annual rate", value: fmtPct(effRate, 2) },
          { label: "Headline rate", value: fmtPct(v.headline, 2) },
          { label: "Interest over term", value: fmtMoney(interest) },
          { label: "Total fees", value: fmtMoney(feesTotal) },
          { label: "Total cost over term", value: fmtMoney(totalCost) },
        ],
        raw: { interest, feesTotal, totalCost, effRate, gap },
        summary: `A ${fmtPct(v.headline, 2)} headline becomes an effective ${fmtPct(effRate, 2)} p.a. once fees are in — the fees add ${fmtPct(gap, 2)} a year over the ${months}-month term, a total cost of about ${fmtMoney(totalCost)}.`,
      };
    },
  },

  "investor-yield": {
    slug: "investor-yield",
    title: "Investor Yield",
    summaryHint: "net and after-tax yield on deployed private credit",
    inputs: [
      { key: "capital", label: "Capital deployed", type: "number", unit: "$", default: 500000 },
      { key: "grossRate", label: "Target gross rate", type: "number", unit: "% p.a.", default: 9.0 },
      { key: "term", label: "Term", type: "number", unit: "months", default: 12 },
      { key: "fee", label: "Fund / management fee", type: "number", unit: "% p.a.", default: 1.5 },
      { key: "tax", label: "Marginal tax rate", type: "number", unit: "%", default: 47 },
      { key: "benchmark", label: "Term deposit benchmark", type: "number", unit: "% p.a.", default: 4.5 },
    ],
    compute(v) {
      const C = v.capital, years = v.term / 12;
      const grossReturn = C * (v.grossRate / 100) * years;
      const feeCost = C * (v.fee / 100) * years;
      const netPreTax = grossReturn - feeCost;
      const netRate = C > 0 && years > 0 ? (netPreTax / C / years) * 100 : NaN;
      const taxPaid = netPreTax * (v.tax / 100);
      const afterTax = netPreTax - taxPaid;
      const afterTaxRate = C > 0 && years > 0 ? (afterTax / C / years) * 100 : NaN;
      const tdReturn = C * (v.benchmark / 100) * years;
      const tdAfterTax = tdReturn * (1 - v.tax / 100);
      const uplift = afterTax - tdAfterTax;
      return {
        outputs: [
          { label: "Net yield p.a. (after fees)", value: fmtPct(netRate, 2) },
          { label: "Net yield p.a. (after tax)", value: fmtPct(afterTaxRate, 2) },
          { label: "Gross return", value: fmtMoney(grossReturn) },
          { label: "Net return (after tax)", value: fmtMoney(afterTax) },
          { label: "After-tax uplift vs term deposit", value: fmtMoney(uplift) },
        ],
        raw: { grossReturn, feeCost, netPreTax, netRate, afterTax, afterTaxRate, tdAfterTax, uplift },
        summary: `On ${fmtMoney(C)} at ${fmtNum(v.grossRate, 1)}% for ${v.term} months, the net yield after fees is about ${fmtPct(netRate, 2)} (${fmtPct(afterTaxRate, 2)} after tax at a ${fmtNum(v.tax, 0)}% rate) — roughly ${fmtMoney(uplift)} more after tax than a ${fmtNum(v.benchmark, 1)}% term deposit.`,
      };
    },
  },

  "home-loan-repayment": {
    slug: "home-loan-repayment",
    title: "Home Loan Repayment",
    summaryHint: "repayments and total interest on a home or investment loan",
    inputs: [
      { key: "amount", label: "Loan amount", type: "number", unit: "$", default: 750000 },
      { key: "rate", label: "Interest rate", type: "number", unit: "% p.a.", default: 6.2 },
      { key: "years", label: "Loan term", type: "number", unit: "years", default: 30 },
      { key: "freq", label: "Repayment frequency", type: "select", default: "monthly", options: [
        { value: "monthly", label: "Monthly" }, { value: "fortnightly", label: "Fortnightly" }, { value: "weekly", label: "Weekly" },
      ] },
      { key: "type", label: "Repayment type", type: "select", default: "pi", options: [
        { value: "pi", label: "Principal & interest" }, { value: "io", label: "Interest only" },
      ] },
      { key: "ioYears", label: "Interest-only period", type: "number", unit: "years", default: 3 },
    ],
    compute(v) {
      const P = v.amount, annual = v.rate / 100, term = v.years;
      const ppy = REPAY_FREQ[v.freq] || 12;
      const r = annual / ppy;
      const payment = (principal, periods) => {
        if (periods <= 0) return 0;
        if (r === 0) return principal / periods;
        return (r * principal) / (1 - Math.pow(1 + r, -periods));
      };
      const isIO = v.type === "io";
      const io = Math.min(v.ioYears, term);
      const ioPeriods = io * ppy;
      const piPeriods = (term - (isIO ? io : 0)) * ppy;
      const ioRepay = P * r;
      const piRepay = payment(P, piPeriods || term * ppy);
      const repayNow = isIO ? ioRepay : piRepay;
      const ioInterest = isIO ? ioRepay * ioPeriods : 0;
      const piInterest = piRepay * piPeriods - P;
      const totalInterest = Math.max(ioInterest + piInterest, 0);
      const totalCost = P + totalInterest;
      const freqLabel = v.freq === "monthly" ? "month" : v.freq === "fortnightly" ? "fortnight" : "week";
      const outputs = [
        { label: `Repayment per ${freqLabel}`, value: fmtMoney(repayNow, { cents: true }) },
        { label: "Total interest", value: fmtMoney(totalInterest) },
        { label: "Total to repay", value: fmtMoney(totalCost) },
      ];
      if (isIO) outputs.push({ label: `Then P&I per ${freqLabel}`, value: fmtMoney(piRepay, { cents: true }) });
      return {
        outputs,
        raw: { repayNow, piRepay, ioRepay, totalInterest, totalCost },
        summary: `Repayments of about ${fmtMoney(repayNow, { cents: true })} per ${freqLabel} on ${fmtMoney(P)} at ${fmtNum(v.rate, 2)}% over ${term} years${isIO ? `, stepping up to ${fmtMoney(piRepay, { cents: true })} after the interest-only period` : ""}. Total interest is about ${fmtMoney(totalInterest)}, total to repay ${fmtMoney(totalCost)}.`,
      };
    },
  },

  "home-loan-borrowing": {
    slug: "home-loan-borrowing",
    title: "Borrowing Power",
    summaryHint: "indicative borrowing capacity from income and expenses",
    inputs: [
      { key: "income", label: "Your annual income (gross)", type: "number", unit: "$", default: 120000 },
      { key: "partner", label: "Partner income (gross)", type: "number", unit: "$", default: 0 },
      { key: "other", label: "Other annual income (net)", type: "number", unit: "$", default: 0 },
      { key: "expenses", label: "Monthly living expenses", type: "number", unit: "$", default: 3200 },
      { key: "repays", label: "Other monthly repayments", type: "number", unit: "$", default: 0 },
      { key: "cards", label: "Total credit card limits", type: "number", unit: "$", default: 10000 },
      { key: "deps", label: "Dependants", type: "number", default: 0 },
      { key: "rate", label: "Interest rate", type: "number", unit: "% p.a.", default: 6.2 },
      { key: "years", label: "Loan term", type: "number", unit: "years", default: 30 },
    ],
    compute(v) {
      const netMonthly = (netAnnual(v.income) + netAnnual(v.partner)) / 12 + v.other / 12;
      const depCost = v.deps * 350;
      const livingTotal = v.expenses + depCost;
      const cardServicing = v.cards * 0.038;
      const commitments = v.repays + cardServicing;
      const surplus = netMonthly - livingTotal - commitments;
      const available = Math.max(surplus, 0);
      const bufferRate = (v.rate + 3) / 100 / 12;
      const n = v.years * 12;
      const maxFromPayment = (p) => {
        if (p <= 0) return 0;
        if (bufferRate === 0) return p * n;
        return (p * (1 - Math.pow(1 + bufferRate, -n))) / bufferRate;
      };
      const indicative = maxFromPayment(available);
      const conservative = maxFromPayment(available * 0.85);
      return {
        outputs: [
          { label: "Indicative borrowing power", value: fmtMoney(indicative) },
          { label: "Conservative estimate", value: fmtMoney(conservative) },
          { label: "Net monthly income", value: fmtMoney(netMonthly) },
          { label: "Monthly surplus", value: fmtMoney(surplus) },
        ],
        raw: { netMonthly, livingTotal, commitments, surplus, indicative, conservative },
        summary: `On these figures the monthly surplus is about ${fmtMoney(surplus)}, supporting an indicative borrowing power near ${fmtMoney(indicative)} (conservatively ${fmtMoney(conservative)}), assessed at ${fmtPct(v.rate + 3, 2)} — the rate plus a 3% buffer, the way lenders do.`,
      };
    },
  },

  "budget-planner": {
    slug: "budget-planner",
    title: "Budget Planner",
    summaryHint: "monthly surplus and savings rate from income vs expenses",
    inputs: [
      { key: "salary", label: "Salary & wages (monthly, after tax)", type: "number", unit: "$", default: 7000 },
      { key: "otherInc", label: "Other income (monthly)", type: "number", unit: "$", default: 0 },
      { key: "housing", label: "Housing (rent / mortgage)", type: "number", unit: "$", default: 2200 },
      { key: "utilities", label: "Utilities & bills", type: "number", unit: "$", default: 400 },
      { key: "groceries", label: "Groceries", type: "number", unit: "$", default: 900 },
      { key: "transport", label: "Transport & fuel", type: "number", unit: "$", default: 500 },
      { key: "insurance", label: "Insurance", type: "number", unit: "$", default: 300 },
      { key: "lifestyle", label: "Lifestyle & entertainment", type: "number", unit: "$", default: 700 },
      { key: "savings", label: "Savings & investments", type: "number", unit: "$", default: 600 },
      { key: "other", label: "Other", type: "number", unit: "$", default: 300 },
    ],
    compute(v) {
      const incomeM = v.salary + v.otherInc;
      const expenseM = v.housing + v.utilities + v.groceries + v.transport + v.insurance + v.lifestyle + v.savings + v.other;
      const surplusM = incomeM - expenseM;
      const savingsRate = incomeM > 0 ? (surplusM / incomeM) * 100 : 0;
      return {
        outputs: [
          { label: "Monthly income", value: fmtMoney(incomeM) },
          { label: "Monthly expenses", value: fmtMoney(expenseM) },
          { label: surplusM >= 0 ? "Monthly surplus" : "Monthly shortfall", value: fmtMoney(surplusM) },
          { label: "Savings rate", value: fmtPct(savingsRate, 1) },
        ],
        raw: { incomeM, expenseM, surplusM, savingsRate },
        summary: `Income of ${fmtMoney(incomeM)}/month against ${fmtMoney(expenseM)}/month of expenses leaves a ${surplusM >= 0 ? "surplus" : "shortfall"} of ${fmtMoney(Math.abs(surplusM))}/month — a savings rate of ${fmtPct(savingsRate, 1)}.`,
      };
    },
  },

  "stamp-duty": {
    slug: "stamp-duty",
    title: "Stamp Duty (Estimate)",
    summaryHint: "an indicative transfer duty estimate by state and buyer type",
    inputs: [
      { key: "value", label: "Property value", type: "number", unit: "$", default: 950000 },
      { key: "state", label: "State or territory", type: "select", default: "NSW", options: SD_STATE_OPTIONS },
      { key: "buyer", label: "Buyer type", type: "select", default: "ownerOccupier", options: [
        { value: "ownerOccupier", label: "Owner-occupier" }, { value: "investor", label: "Investor" },
      ] },
      { key: "fhb", label: "First home buyer", type: "select", default: "no", options: [
        { value: "no", label: "No" }, { value: "yes", label: "Yes" },
      ] },
    ],
    compute(v) {
      const V = v.value;
      const isFHB = v.fhb === "yes" && v.buyer === "ownerOccupier";
      const base = sdRawDuty(v.state, V);
      const factor = isFHB ? sdFhbFactor(v.state, V) : 1;
      const duty = base * factor;
      const govFees = 350;
      const totalUpfront = duty + govFees;
      const effRate = V > 0 ? (duty / V) * 100 : 0;
      const saved = base - duty;
      const outputs = [
        { label: "Estimated stamp duty", value: fmtMoney(duty) },
      ];
      if (isFHB && saved > 0) outputs.push({ label: "First-home-buyer saving", value: `− ${fmtMoney(saved)}` });
      outputs.push({ label: "Government fees (est.)", value: fmtMoney(govFees) });
      outputs.push({ label: "Total upfront (est.)", value: fmtMoney(totalUpfront) });
      return {
        outputs,
        raw: { duty, saved, govFees, totalUpfront, effRate },
        summary: `Estimated stamp duty in ${v.state} on a ${fmtMoney(V)} property is about ${fmtMoney(duty)} (~${fmtPct(effRate, 2)} of value), plus around ${fmtMoney(govFees)} in government fees — roughly ${fmtMoney(totalUpfront)} upfront. This is an estimate using indicative 2025–26 scales; the state revenue office is authoritative.`,
      };
    },
  },

  "home-equity": {
    slug: "home-equity",
    title: "Home Equity",
    summaryHint: "total and usable equity in a property",
    inputs: [
      { key: "value", label: "Property value", type: "number", unit: "$", default: 1200000 },
      { key: "loan", label: "Current loan balance", type: "number", unit: "$", default: 520000 },
      { key: "lvr", label: "Lending limit (LVR)", type: "number", unit: "%", default: 80 },
    ],
    compute(v) {
      const V = v.value, L = Math.min(v.loan, V), maxLVR = v.lvr / 100;
      const totalEquity = Math.max(V - L, 0);
      const lendingCeiling = V * maxLVR;
      const usableEquity = Math.max(lendingCeiling - L, 0);
      const retainedBuffer = V - lendingCeiling;
      const currentLVR = V > 0 ? (L / V) * 100 : 0;
      return {
        outputs: [
          { label: "Usable equity", value: fmtMoney(usableEquity) },
          { label: "Total equity", value: fmtMoney(totalEquity) },
          { label: `Lending ceiling at ${fmtNum(v.lvr, 0)}%`, value: fmtMoney(lendingCeiling) },
          { label: "Current LVR", value: fmtPct(currentLVR, 1) },
        ],
        raw: { totalEquity, lendingCeiling, usableEquity, retainedBuffer, currentLVR },
        summary: `On a ${fmtMoney(V)} property with ${fmtMoney(L)} owing, total equity is ${fmtMoney(totalEquity)} and usable equity under an ${fmtNum(v.lvr, 0)}% limit is about ${fmtMoney(usableEquity)}. Current LVR is ${fmtPct(currentLVR, 1)} — it's borrowing power, not cash.`,
      };
    },
  },

  "foreign-exchange": {
    slug: "foreign-exchange",
    title: "Foreign Exchange",
    summaryHint: "a currency conversion with the FX margin made visible",
    inputs: [
      { key: "amount", label: "Amount to convert", type: "number", default: 10000 },
      { key: "from", label: "From currency", type: "select", default: "AUD", options: CCY_OPTIONS },
      { key: "to", label: "To currency", type: "select", default: "USD", options: CCY_OPTIONS },
      { key: "rate", label: "Exchange rate (blank = indicative)", type: "number", default: 0 },
      { key: "margin", label: "FX margin / markup", type: "number", unit: "%", default: 2.5 },
    ],
    compute(v) {
      const amt = v.amount;
      const r = v.rate > 0 ? v.rate : midRate(v.from, v.to);
      const m = v.margin / 100;
      const atMid = amt * r;
      const effRate = r * (1 - m);
      const received = amt * effRate;
      const marginCost = atMid - received;
      const inverse = r > 0 ? 1 / r : 0;
      return {
        outputs: [
          { label: "You receive", value: fxMoney(received, v.to) },
          { label: `At the quoted rate (${fmtNum(r, 4)})`, value: fxMoney(atMid, v.to) },
          { label: `Cost of the ${fmtNum(v.margin, 1)}% margin`, value: fxMoney(marginCost, v.to) },
          { label: "Effective rate", value: `${fmtNum(effRate, 4)} ${v.to}/${v.from}` },
          { label: "Inverse rate", value: `${fmtNum(inverse, 4)} ${v.from}/${v.to}` },
        ],
        raw: { atMid, effRate, received, marginCost, inverse, rate: r },
        summary: `${fxMoney(amt, v.from)} converts to about ${fxMoney(received, v.to)} at an effective ${fmtNum(effRate, 4)} ${v.to}/${v.from} — the ${fmtNum(v.margin, 1)}% margin costs roughly ${fxMoney(marginCost, v.to)}. The rate is indicative; set your provider's for accuracy.`,
      };
    },
  },
};

// Match a select value to one of its options (by value or label, case-
// insensitively) so compute() never sees a bad enum; fall back to the default.
function normalizeSelect(given, inp) {
  if (given === undefined || given === null || given === "") return inp.default;
  const g = String(given).trim().toLowerCase();
  const hit = inp.options?.find(
    (o) => o.value.toLowerCase() === g || o.label.toLowerCase() === g
  );
  return hit ? hit.value : inp.default;
}

// Fill defaults, coerce/normalise types, run the calc. Returns null for an
// unknown slug or if compute() throws on malformed inputs (fail closed).
export function runCalc(slug, values = {}) {
  const c = CALC_ENGINE[slug];
  if (!c) return null;
  const filled = {};
  for (const inp of c.inputs) {
    const given = values[inp.key];
    const missing = given === undefined || given === null || given === "";
    if (inp.type === "number") {
      filled[inp.key] = missing ? inp.default : toNum(given);
    } else if (inp.type === "select") {
      filled[inp.key] = normalizeSelect(given, inp);
    } else {
      filled[inp.key] = missing ? inp.default : given;
    }
  }
  // Pass through any extra structured inputs (e.g. construction stages).
  if (Array.isArray(values.stages)) filled.stages = values.stages;
  let result;
  try {
    result = c.compute(filled);
  } catch {
    return null; // bad inputs slipped through — don't crash the caller
  }
  return { slug, title: c.title, inputsUsed: filled, ...result };
}

export const CALC_SLUGS = Object.keys(CALC_ENGINE);

// A compact catalogue for the system prompt / intent matching. Select inputs
// list their allowed values so the model uses valid enums (e.g. state codes).
export const CALC_CATALOGUE = CALC_SLUGS.map((slug) => {
  const c = CALC_ENGINE[slug];
  return {
    slug,
    title: c.title,
    summaryHint: c.summaryHint,
    inputs: c.inputs.map((i) => {
      if (i.type === "select" && i.options) {
        return `${i.key} (${i.options.map((o) => o.value).join("|")})`;
      }
      // Surface the unit so the model passes the value in the right unit
      // (e.g. a "% of loan" fee is 2, not the dollar amount).
      return i.unit ? `${i.key} [${i.unit}]` : i.key;
    }),
  };
});
