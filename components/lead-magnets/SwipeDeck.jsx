"use client";

import { useCallback, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  FileCheck2,
  MessageCircleQuestion,
  MessagesSquare,
  ShieldQuestion,
  Layers,
} from "lucide-react";

// Icons are passed as strings (component refs can't cross the
// server→client boundary), resolved here.
const ICONS = {
  ClipboardList,
  FileCheck2,
  MessageCircleQuestion,
  MessagesSquare,
  ShieldQuestion,
  Layers,
};

// A single physical, throwable playing card.
function Card({ card, index, total, icon, dir, onSwipe, atStart, atEnd }) {
  const Icon = ICONS[icon] || Layers;
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-260, 260], [-13, 13]);
  const reduce = useReducedMotion();

  const variants = {
    // Rises from the back of the stack.
    enter: { scale: 0.92, y: 26, opacity: 0 },
    center: { scale: 1, y: 0, opacity: 1, x: 0 },
    // Thrown off the page in the swipe direction.
    exit: (d) => ({
      x: d > 0 ? -720 : 720,
      rotate: d > 0 ? -16 : 16,
      opacity: 0,
      transition: { duration: reduce ? 0.15 : 0.32, ease: "easeIn" },
    }),
  };

  return (
    <motion.div
      custom={dir}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "spring", stiffness: 300, damping: 32 }}
      drag={total > 1 ? "x" : false}
      dragSnapToOrigin
      dragElastic={0.6}
      style={{ x, rotate }}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={(_, info) => {
        const flungLeft = info.offset.x < -100 || info.velocity.x < -550;
        const flungRight = info.offset.x > 100 || info.velocity.x > 550;
        if (flungLeft && !atEnd) onSwipe(1);
        else if (flungRight && !atStart) onSwipe(-1);
      }}
      className="absolute inset-0 flex cursor-grab touch-pan-y flex-col overflow-hidden rounded-[1.75rem] border border-border bg-cu-surface-vault p-7 shadow-2xl shadow-black/10 dark:shadow-black/50 md:p-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, var(--cu-brandy-darkest) 0%, transparent 60%)",
        }}
      />

      {/* Progress segments */}
      <div className="relative z-10 flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i <= index ? "bg-cu-brandy" : "bg-border"
            }`}
          />
        ))}
      </div>

      {/* Icon tile + counter */}
      <div className="relative z-10 mt-7 flex items-center justify-between">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cu-brandy-darkest text-cu-brandy">
          <Icon size={20} strokeWidth={1.6} />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Header */}
      <h3 className="relative z-10 mt-6 font-serif text-xl font-semibold leading-tight tracking-tight text-foreground md:text-2xl">
        {card.title}
      </h3>

      {/* Content */}
      <div className="relative z-10 mt-3 flex-1 overflow-y-auto pr-1 text-[0.95rem] leading-relaxed text-muted-foreground">
        {card.body}
      </div>

      {/* Footer controls */}
      <div className="relative z-10 mt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => !atStart && onSwipe(-1)}
          disabled={atStart}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => !atEnd && onSwipe(1)}
          disabled={atEnd}
          className="inline-flex items-center gap-1.5 rounded-lg bg-cu-brandy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cu-brandy-light disabled:opacity-40"
        >
          {atEnd ? "Done" : "Next"}
          {!atEnd && <ArrowRight size={15} />}
        </button>
      </div>
    </motion.div>
  );
}

export function SwipeDeck({ title, intro, cards, icon }) {
  const total = cards.length;
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
        className="relative mx-auto mt-10 w-full max-w-[24rem] outline-none"
        role="group"
        aria-roledescription="carousel"
        aria-label={title}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        {/* Stacked playing cards behind */}
        <div
          aria-hidden
          className="absolute inset-0 aspect-[5/7] origin-bottom rotate-[3deg] scale-[0.965] rounded-[1.75rem] border border-border bg-cu-surface-vault opacity-50"
        />
        <div
          aria-hidden
          className="absolute inset-0 aspect-[5/7] origin-bottom -rotate-[3.5deg] scale-[0.93] rounded-[1.75rem] border border-border bg-cu-surface-vault opacity-30"
        />

        {/* Active card */}
        <div className="relative aspect-[5/7]">
          <AnimatePresence initial={false} custom={dir}>
            <Card
              key={index}
              card={cards[index]}
              index={index}
              total={total}
              icon={icon}
              dir={dir}
              onSwipe={go}
              atStart={index === 0}
              atEnd={index === total - 1}
            />
          </AnimatePresence>
        </div>

        {/* Dots + hint */}
        <div className="mt-6 flex items-center justify-center gap-1.5" aria-hidden>
          {cards.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-5 bg-cu-brandy" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Swipe / fling the card, or use the buttons
        </p>
        <p className="sr-only" aria-live="polite">
          Card {index + 1} of {total}: {cards[index].title}
        </p>
      </div>
    </section>
  );
}
