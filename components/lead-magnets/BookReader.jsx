"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowLeft, ArrowRight, BookOpen, ImageIcon } from "lucide-react";

// Desktop: a real horizontal page-flip book (react-pageflip).
// Mobile (< 768px): a vertical up/down page-turn that fills the tall
// screen properly. SSR-safe: render a branded static cover until
// mounted, then pick the layout for the viewport.
//
//   cover = { kicker, title, subtitle }
//   pages = [{ kicker?, title, body }]
export function BookReader({ cover, pages }) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const sheets = [
    { type: "cover", ...cover },
    ...pages.map((p) => ({ type: "page", ...p })),
  ];

  if (!mounted) {
    return (
      <div className="mx-auto w-full max-w-[26rem]">
        <CoverFace cover={cover} />
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Opening the book…
        </p>
      </div>
    );
  }

  return isMobile ? (
    <VerticalBook cover={cover} sheets={sheets} />
  ) : (
    <HorizontalBook cover={cover} sheets={sheets} />
  );
}

/* ── Desktop: horizontal two-page flip book ───────────────────── */
function HorizontalBook({ cover, sheets }) {
  const bookRef = useRef(null);
  const [page, setPage] = useState(0);
  const total = sheets.length;

  const flip = (dir) => {
    const api = bookRef.current?.pageFlip?.();
    if (!api) return;
    dir > 0 ? api.flipNext() : api.flipPrev();
  };

  return (
    <div
      className="mx-auto w-full max-w-4xl select-none outline-none"
      role="group"
      aria-roledescription="book"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") flip(1);
        if (e.key === "ArrowLeft") flip(-1);
      }}
    >
      <Progress page={page} total={total} />

      <HTMLFlipBook
        ref={bookRef}
        width={420}
        height={560}
        size="stretch"
        minWidth={315}
        maxWidth={460}
        minHeight={460}
        maxHeight={680}
        maxShadowOpacity={0.5}
        drawShadow
        showCover
        flippingTime={650}
        usePortrait
        mobileScrollSupport
        useMouseEvents
        className="cu-book"
        onFlip={(e) => setPage(e.data)}
      >
        {sheets.map((s, i) => (
          <div key={i} className="cu-page">
            {s.type === "cover" ? (
              <CoverFace cover={cover} />
            ) : (
              <PageFace sheet={s} index={i} total={total} />
            )}
          </div>
        ))}
      </HTMLFlipBook>

      <Controls
        atStart={page === 0}
        atEnd={page >= total - 1}
        onPrev={() => flip(-1)}
        onNext={() => flip(1)}
        hint="Drag the corner, swipe, arrows, or the buttons"
      />
    </div>
  );
}

/* ── Mobile: vertical up/down page-turn ────────────────────────── */
function VerticalBook({ cover, sheets }) {
  const total = sheets.length;
  const [[index, dir], set] = useState([0, 0]);

  const go = useCallback(
    (delta) =>
      set(([i]) => {
        const next = Math.min(Math.max(i + delta, 0), total - 1);
        return next === i ? [i, 0] : [next, delta];
      }),
    [total]
  );

  const sheet = sheets[index];

  return (
    <div
      className="mx-auto w-full max-w-[26rem] select-none outline-none"
      role="group"
      aria-roledescription="book"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown" || e.key === "ArrowRight") go(1);
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") go(-1);
      }}
    >
      <Progress page={index} total={total} />

      <div
        className="relative h-[72vh] max-h-[640px] min-h-[440px]"
        style={{ perspective: 1600 }}
      >
        {/* stacked sheet behind */}
        <div
          aria-hidden
          className="absolute inset-x-2 top-2 bottom-0 rounded-2xl border border-border bg-cu-surface-vault shadow-xl shadow-black/10 dark:shadow-black/40"
        />
        <AnimatePresence initial={false} custom={dir}>
          <VPage
            key={index}
            sheet={sheet}
            cover={cover}
            index={index}
            total={total}
            dir={dir}
            onTurn={go}
            atStart={index === 0}
            atEnd={index === total - 1}
          />
        </AnimatePresence>
      </div>

      <Controls
        atStart={index === 0}
        atEnd={index === total - 1}
        onPrev={() => go(-1)}
        onNext={() => go(1)}
        hint="Swipe up for next, down to go back — or the buttons"
      />
    </div>
  );
}

function VPage({ sheet, cover, index, total, dir, onTurn, atStart, atEnd }) {
  const reduce = useReducedMotion();
  const y = useMotionValue(0);
  const rotateX = useTransform(
    y,
    [-300, 300],
    [reduce ? 0 : -14, reduce ? 0 : 14]
  );

  const variants = {
    enter: (d) => ({
      y: d > 0 ? 70 : -70,
      rotateX: reduce ? 0 : d > 0 ? -22 : 22,
      opacity: 0,
    }),
    center: { y: 0, rotateX: 0, opacity: 1 },
    exit: (d) => ({
      y: d > 0 ? "-108%" : "108%",
      rotateX: reduce ? 0 : d > 0 ? 30 : -30,
      opacity: 0,
      transition: { duration: reduce ? 0.15 : 0.42, ease: "easeInOut" },
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
      drag="y"
      dragSnapToOrigin
      dragElastic={0.5}
      style={{ y, rotateX, transformOrigin: "center top" }}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={(_, info) => {
        const up = info.offset.y < -90 || info.velocity.y < -500;
        const down = info.offset.y > 90 || info.velocity.y > 500;
        if (up && !atEnd) onTurn(1);
        else if (down && !atStart) onTurn(-1);
      }}
      className="absolute inset-0 cursor-grab touch-pan-x"
    >
      {sheet.type === "cover" ? (
        <CoverFace cover={cover} />
      ) : (
        <PageFace sheet={sheet} index={index} total={total} />
      )}
    </motion.div>
  );
}

/* ── Shared bits ──────────────────────────────────────────────── */
function Progress({ page, total }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-cu-brandy transition-[width] duration-500"
          style={{ width: `${((page + 1) / total) * 100}%` }}
        />
      </div>
      <span className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {String(page + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}

function Controls({ atStart, atEnd, onPrev, onNext, hint }) {
  return (
    <div className="mt-5 flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onPrev}
        disabled={atStart}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
      >
        <ArrowLeft size={15} />
        Back
      </button>
      <p className="hidden flex-1 text-center text-xs text-muted-foreground sm:block">
        {hint}
      </p>
      <button
        type="button"
        onClick={onNext}
        disabled={atEnd}
        className="inline-flex items-center gap-1.5 rounded-lg bg-cu-brandy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cu-brandy-light disabled:opacity-40"
      >
        {atEnd ? "End" : "Next"}
        {!atEnd && <ArrowRight size={15} />}
      </button>
    </div>
  );
}

// Branded front cover — same card language as the swipe deck.
function CoverFace({ cover }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-cu-surface-vault">
      <div className="relative h-[52%] w-full shrink-0 bg-gradient-to-b from-cu-surface-char to-cu-surface-ember">
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
          <ImageIcon size={28} strokeWidth={1.4} />
          <span className="text-[11px] uppercase tracking-[0.2em]">Image</span>
        </div>
        <div className="absolute inset-x-0 -bottom-[18px] z-10 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-cu-surface-vault px-4 py-1.5 text-xs font-medium text-foreground shadow-md shadow-black/10 dark:shadow-black/40">
            <BookOpen size={14} strokeWidth={1.7} className="text-cu-brandy" />
            {cover?.kicker || "Guide"}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-7 pb-8 pt-10 text-center md:px-9">
        <h2 className="font-serif text-[1.7rem] font-semibold leading-tight tracking-tight text-foreground md:text-3xl">
          {cover?.title}
        </h2>
        {cover?.subtitle && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {cover.subtitle}
          </p>
        )}
        <span className="mt-7 inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground">
          Open the book
          <ArrowRight size={13} />
        </span>
      </div>
    </div>
  );
}

function PageFace({ sheet, index, total }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-border bg-cu-surface-vault">
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-cu-brandy/40 via-cu-brandy/10 to-transparent"
      />
      <div className="flex min-h-0 flex-1 flex-col px-7 pb-6 pt-8 md:px-9 md:pt-10">
        {sheet.kicker && (
          <p className="shrink-0 text-xs uppercase tracking-[0.2em] text-cu-brandy">
            {sheet.kicker}
          </p>
        )}
        <h2 className="mt-3 shrink-0 font-serif text-xl font-semibold leading-tight tracking-tight text-foreground md:text-2xl">
          {sheet.title}
        </h2>
        <div className="mt-4 min-h-0 flex-1 space-y-3.5 overflow-y-auto pr-1 text-[0.92rem] leading-relaxed text-muted-foreground [scrollbar-width:thin]">
          {sheet.body}
        </div>
        <div className="mt-4 shrink-0 border-t border-border pt-3 text-right font-serif text-sm italic text-muted-foreground">
          {index} / {total - 1}
        </div>
      </div>
    </div>
  );
}
