"use client";

import { useCallback, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// A page-turn "book" reader. Turn forward/back by swipe, buttons or
// ←/→ keys. One page at a time (best for web + mobile reading).
// pages = [{ kicker?, title, body }].
export function BookReader({ pages }) {
  const total = pages.length;
  const [[index, dir], set] = useState([0, 0]);

  const go = useCallback(
    (delta) =>
      set(([i]) => {
        const next = Math.min(Math.max(i + delta, 0), total - 1);
        return next === i ? [i, 0] : [next, delta];
      }),
    [total]
  );

  return (
    <div
      className="relative mx-auto w-full max-w-2xl outline-none"
      role="group"
      aria-roledescription="book"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      {/* Top progress */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full rounded-full bg-cu-brandy"
            animate={{ width: `${((index + 1) / total) * 100}%` }}
            transition={{ type: "spring", stiffness: 220, damping: 30 }}
          />
        </div>
        <span className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Stacked page edges (a book) */}
      <div className="relative" style={{ perspective: 1600 }}>
        <div
          aria-hidden
          className="absolute inset-y-2 -right-1.5 w-3 rounded-r-xl border border-border bg-cu-surface-vault"
        />
        <div
          aria-hidden
          className="absolute inset-y-1 -right-0.5 w-2 rounded-r-xl border border-border bg-cu-surface-vault"
        />

        <div className="relative min-h-[30rem] md:min-h-[34rem]">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <Page
              key={index}
              page={pages[index]}
              index={index}
              total={total}
              dir={dir}
              onTurn={go}
              atStart={index === 0}
              atEnd={index === total - 1}
            />
          </AnimatePresence>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Turn the page — swipe, arrow keys, or the buttons
      </p>
      <p className="sr-only" aria-live="polite">
        Page {index + 1} of {total}: {pages[index].title}
      </p>
    </div>
  );
}

function Page({ page, index, total, dir, onTurn, atStart, atEnd }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const turn = useTransform(x, [-300, 300], [reduce ? 0 : 18, reduce ? 0 : -18]);

  const variants = {
    enter: (d) => ({
      rotateY: reduce ? 0 : d > 0 ? 28 : -28,
      x: d > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { rotateY: 0, x: 0, opacity: 1 },
    exit: (d) => ({
      rotateY: reduce ? 0 : d > 0 ? -32 : 32,
      x: d > 0 ? -90 : 90,
      opacity: 0,
      transition: { duration: reduce ? 0.15 : 0.4, ease: "easeInOut" },
    }),
  };

  return (
    <motion.div
      custom={dir}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      drag={total > 1 ? "x" : false}
      dragSnapToOrigin
      dragElastic={0.55}
      style={{ x, rotateY: turn, transformOrigin: "left center" }}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={(_, info) => {
        const right = info.offset.x > 90 || info.velocity.x > 520;
        const left = info.offset.x < -90 || info.velocity.x < -520;
        if (right && !atEnd) onTurn(1);
        else if (left && !atStart) onTurn(-1);
      }}
      className="absolute inset-0 flex cursor-grab touch-pan-y flex-col overflow-hidden rounded-[1.5rem] border border-border bg-cu-surface-vault shadow-2xl shadow-black/10 dark:shadow-black/50"
    >
      {/* Spine accent */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-cu-brandy/40 via-cu-brandy/10 to-transparent"
      />

      <div className="flex min-h-0 flex-1 flex-col px-7 pb-6 pt-8 md:px-12 md:pt-12">
        {page.kicker && (
          <p className="shrink-0 text-xs uppercase tracking-[0.22em] text-cu-brandy">
            {page.kicker}
          </p>
        )}
        <h2 className="mt-3 shrink-0 font-serif text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl">
          {page.title}
        </h2>
        <div className="mt-5 min-h-0 flex-1 space-y-4 overflow-y-auto pr-1 text-[0.975rem] leading-relaxed text-muted-foreground [scrollbar-width:thin]">
          {page.body}
        </div>

        <div className="mt-6 flex shrink-0 items-center justify-between border-t border-border pt-4">
          <button
            type="button"
            onClick={() => !atStart && onTurn(-1)}
            disabled={atStart}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          >
            <ArrowLeft size={15} />
            Back
          </button>
          <span className="font-serif text-sm italic text-muted-foreground">
            {index + 1}
          </span>
          <button
            type="button"
            onClick={() => !atEnd && onTurn(1)}
            disabled={atEnd}
            className="inline-flex items-center gap-1.5 rounded-lg bg-cu-brandy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cu-brandy-light disabled:opacity-40"
          >
            {atEnd ? "End" : "Next"}
            {!atEnd && <ArrowRight size={15} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
