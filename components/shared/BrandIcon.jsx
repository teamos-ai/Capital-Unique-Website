// BrandIcon — the canonical Capital Unique icon.
//
// One sanctioned treatment site-wide: a "squircle" tile that adapts by
// theme (elevated dark chip + Brandy-orange glyph in dark; soft white
// chip + Inkwell-blue glyph in light) driven entirely by the
// --cu-icon-* design tokens in app/theme.css. No new colours.
//
// Glyph engine is lucide-react resolved by string `name`, so this is
// safe to use from server OR client components (component refs never
// cross the server→client boundary — only the string does).
//
// Glyph spec follows the Untitled UI style: 24px grid, 2px stroke,
// round caps/joins (stroke props enforced via .cu-icon-tile svg).
//
//   <BrandIcon name="Wheat" />                 // default tile, md
//   <BrandIcon name="Clock" size="lg" />       // larger tile
//   <BrandIcon name="Layers" variant="bare" /> // glyph only, no tile

import * as LucideIcons from "lucide-react";

const SIZES = {
  sm: { tile: "h-10 w-10", glyph: 18 },
  md: { tile: "h-12 w-12", glyph: 22 },
  lg: { tile: "h-14 w-14", glyph: 26 },
  xl: { tile: "h-16 w-16", glyph: 30 },
};

const BARE_GLYPH = { sm: 18, md: 22, lg: 26, xl: 30 };

export function BrandIcon({
  name,
  size = "md",
  variant = "tile",
  className = "",
}) {
  const Icon = name ? LucideIcons[name] : null;

  // Bare: just the brand-coloured glyph (auto orange↔inkwell), no chip.
  // Used in flat lists / inline contexts where a tile would be heavy.
  if (variant === "bare") {
    if (!Icon) return null;
    return (
      <Icon
        size={BARE_GLYPH[size] ?? BARE_GLYPH.md}
        strokeWidth={2}
        className={`text-cu-brandy ${className}`}
        aria-hidden="true"
      />
    );
  }

  const s = SIZES[size] ?? SIZES.md;

  // Graceful fallback: keep the tile (preserves layout) if the name is
  // unknown, rather than throwing in a server render.
  if (!Icon) {
    return (
      <span className={`cu-icon-tile ${s.tile} ${className}`} aria-hidden="true" />
    );
  }

  return (
    <span className={`cu-icon-tile ${s.tile} ${className}`} aria-hidden="true">
      <Icon size={s.glyph} strokeWidth={2} />
    </span>
  );
}
