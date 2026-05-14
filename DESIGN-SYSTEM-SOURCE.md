# Design System Source

Documents what was vendored from the Capital Unique design system into this project, when, and from where.

## Source

- **Repo:** https://github.com/teamos-ai/Capitaluniquedesignsystemfigma
- **Live preview:** https://capitaluniquedesignsystemfigma.vercel.app/
- **Original Figma:** https://www.figma.com/design/8tFKFfYYnd5RvyT7D6qBlY/Capital-Unique-Design-System
- **Theme name:** "The Vault" Dark Luxury Theme (Direction B, v2.2)

## What was vendored (2026-05-14, initial scaffold)

| Source file | Destination | Notes |
|---|---|---|
| `src/styles/theme.css` | `app/theme.css` | Full token set: brand palettes (Brandy Punch, Inkwell, Amber, Neutrals, Surfaces), semantic aliases (background, foreground, primary, etc.), spacing scale, radius scale, base layer typography, reduced-motion respect. Dark mode via `.dark` class. |
| `src/styles/fonts.css` | `app/fonts.css` | Google Fonts import for Source Serif 4 (display) + Public Sans (body). |

## What was adapted (not copied verbatim)

- `app/globals.css` — Adapted from design system's `src/styles/index.css`. Same import order (fonts → theme → tailwind) but `@source` glob updated for Next.js App Router structure (`../{app,components,lib}/**/*.{js,jsx,ts,tsx}`).
- `app/layout.js` — Adds `className="dark"` on `<html>` to enable The Vault theme by default. Brand-specific metadata.

## What was NOT vendored (intentionally)

- All Radix UI primitives, MUI, recharts, react-day-picker, etc. — design system has full shadcn-style primitive set. We add only the primitives we actually use, per-component, as we port Relume sections.
- `tw-animate-css` — Skipped initially. We use the Motion library for animations; will add `tw-animate-css` if a specific component needs CSS animation utilities.
- `next-themes` — Skipped. Site is dark-mode-first; no light/dark toggle required for v1.
- Component primitives in `src/app/components/` — Will reference at port time but won't pre-vendor.

## Sync policy

**Read-once, no ongoing sync.** Per project decision in BUILD-PLAN.md, the design system is referenced as source of truth at build time only. If tokens change in the design system after launch, this file is the authority on what to re-copy.

To re-sync:
1. Fetch latest `src/styles/theme.css` and `src/styles/fonts.css` from the design system repo
2. Overwrite `app/theme.css` and `app/fonts.css` here
3. Update this document with the new sync date and any structural deltas
