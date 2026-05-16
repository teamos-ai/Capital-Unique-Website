"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

// Interactive reference. Segmented tabs switch zones with a smooth
// transition; a "view all" mode prints the whole sheet at once.
// zones = [{ title, rows: [{ k, v }] }].
export function CheatSheet({ zones }) {
  const [tab, setTab] = useState(0);
  const [all, setAll] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <div
          role="tablist"
          aria-label="Cheat sheet sections"
          className="flex flex-1 flex-wrap gap-1.5 rounded-xl border border-border bg-cu-surface-vault p-1.5"
        >
          {zones.map((z, i) => {
            const active = !all && i === tab;
            return (
              <button
                key={i}
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setAll(false);
                  setTab(i);
                }}
                className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-colors ${
                  active
                    ? "bg-cu-brandy text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {z.title}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setAll((v) => !v)}
          aria-pressed={all}
          className={`shrink-0 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors ${
            all
              ? "border-cu-brandy bg-cu-brandy text-white"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          View all
        </button>
      </div>

      {/* Panel */}
      <div className="mt-5">
        {all ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {zones.map((z, i) => (
              <Zone key={i} zone={z} />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: reduce ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -8 }}
              transition={{ duration: reduce ? 0.12 : 0.22 }}
            >
              <Zone zone={zones[tab]} large />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function Zone({ zone, large = false }) {
  return (
    <div className="rounded-2xl border border-border bg-cu-surface-vault p-6 md:p-7">
      <p className="text-xs uppercase tracking-[0.2em] text-cu-brandy">
        {zone.title}
      </p>
      <div
        className={`mt-5 ${
          large
            ? "grid grid-cols-1 gap-x-10 gap-y-1 sm:grid-cols-2"
            : "space-y-1"
        }`}
      >
        {zone.rows.map((r, i) => (
          <div
            key={i}
            className="flex flex-col gap-1 border-b border-border py-3.5 last:border-0"
          >
            <span className="text-sm font-semibold text-foreground">
              {r.k}
            </span>
            <span className="text-sm leading-relaxed text-muted-foreground">
              {r.v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
