"use client";

// Dependency-free SVG charts. Colours are CSS variables so they
// auto-flip with the theme (brandy → inkwell in light mode).
// Palette is chosen to stay distinct in both themes.
export const CHART_COLORS = [
  "var(--cu-brandy-punch)",
  "var(--cu-amber)",
  "var(--muted-foreground)",
  "var(--cu-inkwell-light)",
  "var(--cu-surface-smoke)",
];

function fmtAUD(n) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(n || 0);
}

// ── Donut ───────────────────────────────────────────────────────────
export function DonutChart({ data, centerLabel, centerValue }) {
  const total = data.reduce((a, d) => a + Math.max(d.value, 0), 0) || 1;
  const r = 56;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-7">
      <svg viewBox="0 0 140 140" className="h-36 w-36 shrink-0 -rotate-90">
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth="16"
        />
        {data.map((d, i) => {
          const frac = Math.max(d.value, 0) / total;
          const seg = (
            <circle
              key={i}
              cx="70"
              cy="70"
              r={r}
              fill="none"
              stroke={CHART_COLORS[i % CHART_COLORS.length]}
              strokeWidth="16"
              strokeDasharray={`${frac * c} ${c}`}
              strokeDashoffset={-offset * c}
              strokeLinecap="butt"
            />
          );
          offset += frac;
          return seg;
        })}
      </svg>
      <div className="min-w-0 flex-1">
        {(centerValue || centerLabel) && (
          <div className="mb-3">
            {centerLabel && (
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {centerLabel}
              </p>
            )}
            {centerValue && (
              <p className="font-serif text-2xl font-semibold tabular-nums text-foreground">
                {centerValue}
              </p>
            )}
          </div>
        )}
        <ul className="space-y-2">
          {data.map((d, i) => (
            <li
              key={i}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-sm"
                  style={{
                    backgroundColor:
                      CHART_COLORS[i % CHART_COLORS.length],
                  }}
                />
                <span className="truncate text-muted-foreground">
                  {d.label}
                </span>
              </span>
              <span className="shrink-0 tabular-nums text-foreground">
                {d.display ?? fmtAUD(d.value)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Stacked horizontal bar ──────────────────────────────────────────
export function StackedBar({ data }) {
  const total = data.reduce((a, d) => a + Math.max(d.value, 0), 0) || 1;
  return (
    <div>
      <div className="flex h-5 w-full overflow-hidden rounded-full bg-[var(--border)]">
        {data.map((d, i) => {
          const pct = (Math.max(d.value, 0) / total) * 100;
          if (pct <= 0) return null;
          return (
            <div
              key={i}
              style={{
                width: `${pct}%`,
                backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
              }}
              className="h-full first:rounded-l-full last:rounded-r-full"
            />
          );
        })}
      </div>
      <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {data.map((d, i) => (
          <li
            key={i}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="flex min-w-0 items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{
                  backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
                }}
              />
              <span className="truncate text-muted-foreground">
                {d.label}
              </span>
            </span>
            <span className="shrink-0 tabular-nums text-foreground">
              {d.display ?? fmtAUD(d.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Area / line over time ───────────────────────────────────────────
// `series` = array of numbers (e.g. loan balance per year).
export function AreaChart({ series, xLabel, yFormat }) {
  if (!series || series.length < 2) return null;
  const W = 560;
  const H = 200;
  const pad = { l: 8, r: 8, t: 12, b: 22 };
  const max = Math.max(...series, 1);
  const n = series.length - 1;
  const x = (i) => pad.l + (i / n) * (W - pad.l - pad.r);
  const y = (v) => pad.t + (1 - v / max) * (H - pad.t - pad.b);
  const line = series.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const area = `${pad.l},${y(0)} ${line} ${x(n)},${y(0)}`;

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-44 w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="cu-area" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--cu-brandy-punch)"
              stopOpacity="0.35"
            />
            <stop
              offset="100%"
              stopColor="var(--cu-brandy-punch)"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#cu-area)" />
        <polyline
          points={line}
          fill="none"
          stroke="var(--cu-brandy-punch)"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>{xLabel ? `${xLabel} 0` : "Start"}</span>
        <span>
          {yFormat ? yFormat(series[series.length - 1]) : ""}
          {xLabel ? ` · ${xLabel} ${n}` : " End"}
        </span>
      </div>
    </div>
  );
}
