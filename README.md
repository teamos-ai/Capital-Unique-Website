# Capital Unique Website

Australian non-bank lending and capital advisory marketing site. Built on Next.js 16 + Tailwind 4, deployed on Vercel, integrated with GoHighLevel for CRM and forms.

## Stack

- **Framework:** Next.js 16.2.6 (App Router, Turbopack)
- **Runtime:** React 19.2.4
- **Styling:** Tailwind CSS 4 (CSS-first config via `@theme inline`)
- **Animation:** Motion (`motion` v12)
- **Design system:** Vendored from [teamos-ai/Capitaluniquedesignsystemfigma](https://github.com/teamos-ai/Capitaluniquedesignsystemfigma) — see [DESIGN-SYSTEM-SOURCE.md](./DESIGN-SYSTEM-SOURCE.md)
- **Hosting:** Vercel (preview deploys per branch)
- **CRM / Forms:** GoHighLevel (iframe form embeds with brand-matched custom CSS)

## Architecture

Hybrid model:
- **Vercel** owns the marketing site (all 17 pages)
- **GHL** owns CRM, contacts, automations, and forms (embedded as iframes on the marketing site)

See [BUILD-PLAN.md](./BUILD-PLAN.md) for the full plan, page list, image pipeline, and step sequence.

## Local development

This project lives on a network share, which creates path-resolution conflicts with Next.js 16's Turbopack dev server. The Vercel production build is unaffected (Linux, no UNC).

### Recommended: clone to local SSD for dev

```powershell
git clone git@github.com:teamos-ai/Capital-Unique-Website.git C:\dev\capital-unique-website
cd C:\dev\capital-unique-website
npm install
npm run dev
```

Then open http://localhost:3000. Push commits back to the repo when done.

### Why not run dev directly from the network share

Turbopack canonicalizes paths to UNC form (`\\?\UNC\192.168...\...`) but treats the project root as the mapped drive (`T:\Claude_Code_Root\...`). It then rejects every file as "outside the root directory" and serves 500s for every request. Webpack mode (`next dev --webpack`) may avoid this — untested. The cleanest fix is local-SSD clone.

### Why not use a Windows junction

Tried — Windows junctions (`mklink /J`) don't support mapped-drive targets. Symbolic links (`mklink /D`) do, but require admin or developer mode.

## Project structure

```
app/                    # Next.js App Router pages and layout
  layout.js             # Root layout — applies "dark" class for The Vault theme
  page.js               # Home page (placeholder until home build)
  globals.css           # Tailwind + design system imports
  fonts.css             # Source Serif 4 + Public Sans (Google Fonts)
  theme.css             # Design system tokens (vendored, see DESIGN-SYSTEM-SOURCE.md)
components/             # (created as needed during page build)
lib/                    # (created as needed)
public/                 # Static assets and generated images
BUILD-PLAN.md           # The plan — start here
DESIGN-SYSTEM-SOURCE.md # Provenance for vendored design tokens
IMAGE-PROMPTS.md        # Every Nano Banana 2 prompt used for imagery
```

## Build status

- ✅ Scaffold complete
- ⏳ Page-by-page build in progress (see BUILD-PLAN.md Step 5 priority order)
