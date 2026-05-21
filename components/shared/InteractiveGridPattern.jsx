"use client";

// Magic UI-style interactive grid pattern, adapted for Capital Unique.
//
// Design choices vs. the upstream demo:
// • CSS-only :hover (no useState, no per-rect handlers). A large grid
//   (~1500 squares) stays cheap because we never re-render on hover.
// • SVG wrapper is pointer-events-none and each <rect> opts back in
//   with pointer-events-auto. That way, hero text, buttons and the
//   CharlesCommandBar remain fully interactive while the grid still
//   lights up under the cursor.
// • Stroke + hover fill use --cu-brandy-* tokens, which auto-flip to
//   Inkwell-blue in light mode and Brandy-orange in dark mode. One
//   class set, both themes on-brand.

import { cn } from "@/lib/utils";

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  ...props
}) {
  const [horizontal, vertical] = squares;
  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      )}
      aria-hidden="true"
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width;
        const y = Math.floor(index / horizontal) * height;
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              // .cu-grid-square (globals.css) drives stroke + hover fill
              // through var(--cu-brandy-punch) so the colour flips
              // Brandy-orange ↔ Inkwell-blue with the theme. Tailwind's
              // stroke-cu-brandy/12 inlines the value at build time and
              // breaks the runtime flip — see globals.css for the note.
              "cu-grid-square pointer-events-auto",
              squaresClassName
            )}
          />
        );
      })}
    </svg>
  );
}
