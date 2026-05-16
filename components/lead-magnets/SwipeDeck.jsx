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
  ArrowRight,
  ImageIcon,
  ClipboardList,
  FileCheck2,
  MessageCircleQuestion,
  MessagesSquare,
  ShieldQuestion,
  Layers,
} from "lucide-react";

// Icons arrive as strings (component refs can't cross the
// server→client boundary) and are resolved here.
const ICONS = {
  ClipboardList,
  FileCheck2,
  MessageCircleQuestion,
  MessagesSquare,
  ShieldQuestion,
  Layers,
};

// One physical, throwable playing card.
function Card({
  card,
  index,
  total,
  icon,
  badge,
  dir,
  onSwipe,
  atStart,
  atEnd,
}) {
  const Icon = ICONS[icon] || Layers;
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-260, 260], [-13, 13]);
  const reduce = useReducedMotion();

  const variants = {
    enter: { scale: 0.92, y: 26, opacity: 0 },
    center: { scale: 1, y: 0, opacity: 1, x: 0 },
    // Next (d>0) flies RIGHT; Back (d<0) flies LEFT.
    exit: (d) => ({
      x: d > 0 ? 760 : -760,
      rotate: d > 0 ? 18 : -18,
      opacity: 0,
      transition: { duration: reduce ? 0.15 : 0.34, ease: "easeIn" },
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
        const right = info.offset.x > 100 || info.velocity.x > 550;
        const left = info.offset.x < -100 || info.velocity.x < -550;
        if (right && !atEnd) onSwipe(1); // drag right → Next
        else if (left && !atStart) onSwipe(-1); // drag left → Back
      }}
      className="absolute inset-0 flex cursor-grab touch-pan-y flex-col overflow-hidden rounded-[1.75rem] border border-border bg-cu-surface-vault shadow-2xl shadow-black/10 dark:shadow-black/50"
    >
      {/* Image region (placeholder until an image is supplied) */}
      <div className="relative h-[55%] w-full shrink-0 bg-cu-surface-char">
        {card.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.image}
            alt={card.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-cu-surface-char to-cu-surface-ember text-muted-foreground">
            <ImageIcon size={26} strokeWidth={1.4} />
            <span className="text-[11px] uppercase tracking-[0.2em]">
              Image
            </span>
          </div>
        )}

        {/* Badge pill — straddles the image / content seam, counts up */}
        <div className="absolute inset-x-0 -bottom-[18px] z-20 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-cu-surface-vault px-4 py-1.5 text-sm font-medium text-foreground shadow-md shadow-black/10 dark:shadow-black/40">
            <Icon size={15} strokeWidth={1.7} className="text-cu-brandy" />
            {badge} #{index + 1}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-10 text-center md:px-8">
        <h3 className="font-serif text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-[1.7rem]">
          {card.title}
        </h3>
        <div className="mt-3 flex-1 overflow-y-auto text-[0.95rem] leading-relaxed text-muted-foreground">
          {card.body}
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between">
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
      </div>
    </motion.div>
  );
}

export function SwipeDeck({ title, intro, cards, icon, badge = "Swipe" }) {
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
        className="relative mx-auto mt-10 w-full max-w-[25rem] outline-none"
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
              badge={badge}
              dir={dir}
              onSwipe={go}
              atStart={index === 0}
              atEnd={index === total - 1}
            />
          </AnimatePresence>
        </div>

        {/* Progress dots + hint */}
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
          Swipe right for next, left to go back — or use the buttons
        </p>
        <p className="sr-only" aria-live="polite">
          Card {index + 1} of {total}: {cards[index].title}
        </p>
      </div>
    </section>
  );
}
