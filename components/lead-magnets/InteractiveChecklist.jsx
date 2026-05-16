"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, RotateCcw, CheckCircle2 } from "lucide-react";

// Interactive checklist with an animated overall progress ring,
// per-stage progress bars, and progress persisted per `id`.
// stages = [{ name, items: [{ do, why }] }].
export function InteractiveChecklist({ id, stages }) {
  const reduce = useReducedMotion();
  const allKeys = useMemo(
    () =>
      stages.flatMap((s, si) => s.items.map((_, ii) => `${si}.${ii}`)),
    [stages]
  );
  const total = allKeys.length;

  const [checked, setChecked] = useState(() => new Set());
  const [ready, setReady] = useState(false);

  // Restore persisted progress.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`cu-checklist-${id}`);
      if (raw) setChecked(new Set(JSON.parse(raw)));
    } catch {}
    setReady(true);
  }, [id]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(
        `cu-checklist-${id}`,
        JSON.stringify([...checked])
      );
    } catch {}
  }, [checked, id, ready]);

  const toggle = (key) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const done = checked.size;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const complete = done === total && total > 0;

  // Ring geometry
  const R = 30;
  const C = 2 * Math.PI * R;

  return (
    <div>
      {/* Overall progress */}
      <div className="flex items-center gap-5 rounded-2xl border border-border bg-cu-surface-vault p-5 md:p-6">
        <div className="relative h-[76px] w-[76px] shrink-0">
          <svg viewBox="0 0 76 76" className="h-full w-full -rotate-90">
            <circle
              cx="38"
              cy="38"
              r={R}
              fill="none"
              stroke="var(--border)"
              strokeWidth="7"
            />
            <motion.circle
              cx="38"
              cy="38"
              r={R}
              fill="none"
              stroke="var(--cu-brandy-punch)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={C}
              animate={{ strokeDashoffset: C - (C * pct) / 100 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 120, damping: 22 }
              }
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-serif text-lg font-semibold text-foreground">
            {pct}%
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-serif text-lg font-semibold tracking-tight text-foreground">
            {complete ? "All clear — you're deal-ready" : "Your readiness"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {done} of {total} checks complete
          </p>
        </div>
        {done > 0 && (
          <button
            type="button"
            onClick={() => setChecked(new Set())}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw size={13} />
            Reset
          </button>
        )}
      </div>

      {/* Completion banner */}
      {complete && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-start gap-3 rounded-xl border border-cu-brandy/30 bg-cu-brandy-darkest/40 px-5 py-4 text-sm leading-relaxed text-foreground/90"
        >
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-cu-brandy" />
          <span>
            Every check is ticked. That&apos;s the same ground a non-bank
            credit team covers — you&apos;re ready to present. The next step
            is the conversation.
          </span>
        </motion.div>
      )}

      {/* Stages */}
      <div className="mt-6 space-y-5">
        {stages.map((stage, si) => {
          const items = stage.items.map((_, ii) => `${si}.${ii}`);
          const sDone = items.filter((k) => checked.has(k)).length;
          const sPct = (sDone / items.length) * 100;
          const sComplete = sDone === items.length;

          return (
            <section
              key={si}
              className="overflow-hidden rounded-2xl border border-border bg-cu-surface-vault"
            >
              <div className="flex items-center gap-3 px-6 pt-5">
                <span
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-md font-mono text-xs transition-colors ${
                    sComplete
                      ? "bg-cu-brandy text-white"
                      : "bg-cu-brandy-darkest text-cu-brandy"
                  }`}
                >
                  {sComplete ? <Check size={14} /> : si + 1}
                </span>
                <h3 className="flex-1 font-serif text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  {stage.name}
                </h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {sDone}/{items.length}
                </span>
              </div>

              <div className="mt-4 h-1 bg-border">
                <motion.div
                  className="h-full bg-cu-brandy"
                  animate={{ width: `${sPct}%` }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 200, damping: 28 }
                  }
                />
              </div>

              <ul className="divide-y divide-border">
                {stage.items.map((it, ii) => {
                  const key = `${si}.${ii}`;
                  const on = checked.has(key);
                  return (
                    <li key={ii}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={on}
                        onClick={() => toggle(key)}
                        className="flex w-full items-start gap-3.5 px-6 py-4 text-left transition-colors hover:bg-cu-surface-char/40"
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border transition-colors ${
                            on
                              ? "border-cu-brandy bg-cu-brandy text-white"
                              : "border-cu-brandy/50 bg-transparent"
                          }`}
                        >
                          <motion.span
                            initial={false}
                            animate={{ scale: on ? 1 : 0 }}
                            transition={{
                              duration: reduce ? 0 : 0.18,
                              ease: "backOut",
                            }}
                          >
                            <Check size={13} strokeWidth={3} />
                          </motion.span>
                        </span>
                        <span>
                          <span
                            className={`block text-sm font-medium transition-colors ${
                              on
                                ? "text-muted-foreground line-through"
                                : "text-foreground"
                            }`}
                          >
                            {it.do}
                          </span>
                          <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                            {it.why}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
