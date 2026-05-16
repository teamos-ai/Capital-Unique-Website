"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Physically swipeable card deck. Drag left → next, right → previous.
// Buttons, dots and ←/→ keys provided for accessibility. Cards are
// ~4:3, spacious and on-brand (light + dark via design tokens).
export function SwipeDeck({ title, intro, cards }) {
  const total = cards.length;
  const [[index, dir], set] = useState([0, 0]);
  const reduce = useReducedMotion();
  const dist = reduce ? 0 : 320;

  const go = useCallback(
    (delta) =>
      set(([i]) => {
        const next = Math.min(Math.max(i + delta, 0), total - 1);
        return [next, next === i ? 0 : delta];
      }),
    [total]
  );

  const variants = {
    enter: (d) => ({ x: d >= 0 ? dist : -dist, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d) => ({ x: d >= 0 ? -dist : dist, opacity: 0, scale: 0.95 }),
  };

  const card = cards[index];

  return (
    <section className="mb-16">
      <h2 className="font-serif text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {intro}
        </p>
      )}

      <div
        className="relative mx-auto mt-8 w-full max-w-[34rem] outline-none"
        role="group"
        aria-roledescription="carousel"
        aria-label={title}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        {/* Subtle deck depth behind the active card */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-4 top-3 aspect-[4/3] rounded-2xl border border-border bg-cu-surface-vault opacity-40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-6 aspect-[4/3] rounded-2xl border border-border bg-cu-surface-vault opacity-20"
        />

        {/* Active card */}
        <div className="relative aspect-[4/3]">
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              drag={total > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.35}
              onDragEnd={(_, info) => {
                if (info.offset.x < -90) go(1);
                else if (info.offset.x > 90) go(-1);
              }}
              whileTap={{ cursor: "grabbing" }}
              className="absolute inset-0 flex cursor-grab flex-col overflow-hidden rounded-2xl border border-border bg-cu-surface-vault p-8 shadow-xl shadow-black/5 dark:shadow-black/40 md:p-10"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, var(--cu-brandy-darkest) 0%, transparent 62%)",
                }}
              />
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-cu-brandy-darkest font-mono text-xs text-cu-brandy">
                  {index + 1}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {index + 1} / {total}
                </span>
              </div>
              <h3 className="relative z-10 mt-7 font-serif text-xl font-semibold leading-tight tracking-tight text-foreground md:text-2xl">
                {card.title}
              </h3>
              <div className="relative z-10 mt-4 flex-1 overflow-y-auto pr-1 text-base leading-relaxed text-muted-foreground">
                {card.body}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Previous card"
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3.5 py-2 text-sm text-foreground transition-colors hover:bg-cu-surface-char disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ArrowLeft size={15} />
            Prev
          </button>

          <div className="flex items-center gap-1.5" aria-hidden>
            {cards.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-5 bg-cu-brandy" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            disabled={index === total - 1}
            aria-label="Next card"
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3.5 py-2 text-sm text-foreground transition-colors hover:bg-cu-surface-char disabled:cursor-not-allowed disabled:opacity-35"
          >
            Next
            <ArrowRight size={15} />
          </button>
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Swipe the card, or use the arrows
        </p>

        {/* Screen-reader announcement */}
        <p className="sr-only" aria-live="polite">
          Card {index + 1} of {total}: {card.title}
        </p>
      </div>
    </section>
  );
}
