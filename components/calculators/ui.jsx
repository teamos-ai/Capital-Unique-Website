"use client";

import { useId } from "react";

// ── Formatters ──────────────────────────────────────────────────────
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

export function fmtMoney(n, { cents = false } = {}) {
  if (!isFinite(n)) return "—";
  return (cents ? AUD2 : AUD).format(n);
}

export function fmtPct(n, dp = 2) {
  if (!isFinite(n)) return "—";
  return `${n.toFixed(dp)}%`;
}

export function fmtNum(n, dp = 2) {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-AU", {
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
  });
}

// Parse a user-typed string into a number, tolerating $ , and spaces.
export function num(v) {
  if (v === "" || v === null || v === undefined) return 0;
  const n = parseFloat(String(v).replace(/[^0-9.\-]/g, ""));
  return isFinite(n) ? n : 0;
}

// ── Field ───────────────────────────────────────────────────────────
// Numeric input with a $ or % adornment, label, and optional hint.
export function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  hint,
  step = "any",
  min,
}) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground/90"
      >
        {label}
      </label>
      <div className="relative mt-2">
        {prefix && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-sm text-muted-foreground">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          min={min}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-md border border-border bg-input-background py-2.5 text-sm text-foreground tabular-nums focus:outline-none focus:ring-2 focus:ring-cu-brandy-light ${
            prefix ? "pl-8" : "pl-3.5"
          } ${suffix ? "pr-10" : "pr-3.5"}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-sm text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}

// ── Layout ──────────────────────────────────────────────────────────
// Two-column shell: inputs on the left, results panel on the right.
export function CalcLayout({ inputs, results }) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
      <div className="flex flex-col gap-5">{inputs}</div>
      <div className="lg:sticky lg:top-28 lg:self-start">{results}</div>
    </div>
  );
}

export function ResultsPanel({ children }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-cu-surface-vault p-7 md:p-9">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, var(--cu-brandy-darkest) 0%, transparent 62%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Headline result: a large figure with a label above it.
export function Headline({ label, value, tone = "default", sub }) {
  const color =
    tone === "good"
      ? "text-cu-brandy-lighter"
      : tone === "warn"
      ? "text-cu-amber"
      : tone === "bad"
      ? "text-[oklch(0.65_0.16_25)]"
      : "text-foreground";
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-cu-brandy">
        {label}
      </p>
      <p
        className={`mt-3 font-serif text-4xl font-semibold leading-none tracking-tight tabular-nums md:text-5xl ${color}`}
      >
        {value}
      </p>
      {sub && <p className="mt-3 text-sm text-muted-foreground">{sub}</p>}
    </div>
  );
}

// A line item in the results breakdown.
export function Row({ label, value, strong = false, hint }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <span
        className={`text-sm ${
          strong ? "font-medium text-foreground" : "text-muted-foreground"
        }`}
      >
        {label}
        {hint && (
          <span className="ml-1 block text-xs text-muted-foreground/70">
            {hint}
          </span>
        )}
      </span>
      <span
        className={`shrink-0 text-sm tabular-nums ${
          strong ? "font-semibold text-foreground" : "text-foreground/90"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export function Divider() {
  return <div className="my-3 border-t border-border" />;
}

// Pass / caution / fail pill driven by calculator logic.
export function Verdict({ tone, children }) {
  const styles =
    tone === "good"
      ? "border-cu-brandy/40 bg-cu-brandy-darkest text-cu-brandy-lighter"
      : tone === "warn"
      ? "border-cu-amber-dark/50 bg-cu-amber-darkest text-cu-amber"
      : "border-[oklch(0.5_0.16_25/0.45)] bg-[oklch(0.28_0.09_25/0.35)] text-[oklch(0.72_0.15_25)]";
  return (
    <div
      className={`mt-6 rounded-xl border px-4 py-3 text-sm leading-relaxed ${styles}`}
    >
      {children}
    </div>
  );
}

// Collapsible-free assumptions note. Keeps every calculator honest.
export function Assumptions({ items }) {
  return (
    <div className="mt-8 rounded-xl border border-border bg-cu-surface-abyss px-5 py-4">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
        Assumptions & method
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex gap-2.5 text-xs leading-relaxed text-muted-foreground"
          >
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cu-brandy" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
