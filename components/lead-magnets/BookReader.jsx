"use client";

import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { ArrowLeft, ArrowRight, BookOpen, ImageIcon } from "lucide-react";

// A real page-flip book (react-pageflip / StPageFlip). SSR-safe: the
// flip engine measures the DOM, so we render a branded static cover
// on the server / before mount, then mount the book on the client.
//
// props:
//   cover = { kicker, title, subtitle }   — branded front page
//   pages = [{ kicker?, title, body }]
export function BookReader({ cover, pages }) {
  const bookRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => setMounted(true), []);

  const sheets = [
    { type: "cover", ...cover },
    ...pages.map((p) => ({ type: "page", ...p })),
  ];
  const total = sheets.length;

  const flip = (dir) => {
    const api = bookRef.current?.pageFlip?.();
    if (!api) return;
    dir > 0 ? api.flipNext() : api.flipPrev();
  };

  // Static branded cover for SSR / pre-hydration (no layout jump).
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

  return (
    <div
      className="mx-auto w-full max-w-[26rem] select-none outline-none"
      role="group"
      aria-roledescription="book"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") flip(1);
        if (e.key === "ArrowLeft") flip(-1);
      }}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-cu-brandy transition-[width] duration-500"
            style={{ width: `${((page + 1) / total) * 100}%` }}
          />
        </div>
        <span className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {String(page + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>

      <HTMLFlipBook
        ref={bookRef}
        width={420}
        height={580}
        size="stretch"
        minWidth={300}
        maxWidth={620}
        minHeight={440}
        maxHeight={720}
        maxShadowOpacity={0.4}
        drawShadow
        showCover
        flippingTime={650}
        usePortrait
        mobileScrollSupport
        useMouseEvents
        className="cu-book"
        onFlip={(e) => setPage(e.data)}
      >
        {sheets.map((s, i) =>
          s.type === "cover" ? (
            <div key={i} className="cu-page">
              <CoverFace cover={cover} />
            </div>
          ) : (
            <div key={i} className="cu-page">
              <PageFace sheet={s} index={i} total={total} />
            </div>
          )
        )}
      </HTMLFlipBook>

      <div className="mt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => flip(-1)}
          disabled={page === 0}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
        >
          <ArrowLeft size={15} />
          Back
        </button>
        <p className="text-xs text-muted-foreground">
          Drag the corner, swipe, arrows, or the buttons
        </p>
        <button
          type="button"
          onClick={() => flip(1)}
          disabled={page >= total - 1}
          className="inline-flex items-center gap-1.5 rounded-lg bg-cu-brandy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cu-brandy-light disabled:opacity-40"
        >
          {page >= total - 1 ? "End" : "Next"}
          {page < total - 1 && <ArrowRight size={15} />}
        </button>
      </div>
    </div>
  );
}

// Branded front cover — same card language as the swipe deck.
function CoverFace({ cover }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-cu-surface-vault">
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
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.25rem] border border-border bg-cu-surface-vault">
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
