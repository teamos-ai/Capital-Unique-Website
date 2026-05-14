# Capital Unique Website — Build Plan

## Goal
Build a production-grade marketing website for Capital Unique (Australian non-bank lender / capital advisory) on Vercel using Next.js 15, with GoHighLevel handling all CRM, contacts, forms, and automations behind the scenes — delivered as a 17-page hybrid architecture where the marketing experience lives on Vercel and the CRM brain stays in GHL.

## Context
Capital Unique is a client engagement: John Codrington's Australian capital advisory business that already runs its CRM/contacts/automations entirely inside GoHighLevel. The original assumption was that the marketing site had to be built inside GHL too (HTML/CSS blocks only), but the interview surfaced that what GHL actually owns is the CRM — not the marketing site host. This unlocked a much better architecture: build a real React/Next.js site on Vercel for the marketing experience, point the domain there via DNS later, and use GHL natively for everything it's good at (forms, contacts, automations, lead nurture). Source materials are mature: a complete Relume React export of all 17 pages, client-approved copy in a Google Doc, a published design system, and a brand asset library across local folders and Google Drive.

## Process Overview
1. **Scaffold** Next.js 15 App Router project, vendor design system tokens, set up Tailwind + Framer Motion, push initial commit to `teamos-ai/Capital-Unique-Website` (Private), connect Vercel.
2. **Port shared chrome** — Navbar13, Footer10, Logo3 — into `components/shared/`, build the global layout, wire up the footer newsletter (GHL iframe form #5).
3. **Build pages in priority order** — home → about → contact → get-capital → 6 sector pages → how-it-works → overview → guides → insights-and-resources → articles → calculators → charles-ai. Each page = port Relume React component to tokenized version + extract copy from Google Doc + place imagery + wire any GHL form.
4. **Image generation pipeline** — at home-page build time, inventory all existing assets, produce IMAGE-MANIFEST.md, then iterate Nano Banana 2 batches of 10 at min 2K with user approval gate, saving every prompt to IMAGE-PROMPTS.md.
5. **Calculators page** — vibe-code 3–5 Aussie finance/mortgage broker calculators as React widgets (specific list specced when we get to that page).
6. **GHL form wiring** — for each of the 5 forms (contact main, contact secondary, get-capital lead, charles-ai waitlist, footer newsletter), embed GHL native form via iframe, write CSS for John to paste into GHL's advanced styling panel for brand match.
7. **Polish + ship** — accessibility audit (WCAG AA), Lighthouse review, SEO baseline (sitemap, robots, OpenGraph, llms.txt), final preview review.
8. **Domain handoff** — when client is ready, you point the production domain DNS to Vercel.

## Detailed Steps

### Step 1: Project Scaffolding
**What happens:** Initialize the Next.js 15 App Router project structure inside `\\192.168.86.23\99 Second Brain - Tumai Meroiti\Claude_Code_Root\Capital-Unique-Website\`, install dependencies (Next.js, React, Tailwind, Framer Motion, clsx), set up `tailwind.config.js` extending the design system tokens, create `globals.css` with the design system CSS variables, create base `app/layout.jsx` shell.
**Input:** This plan, the Relume React zip extracted to a working folder, the design system source (clone of `teamos-ai/Capitaluniquedesignsystemfigma` or read from the live Vercel link).
**Output:** A scaffolded Next.js project that boots locally (`npm run dev` shows a blank page with brand fonts loaded and design system CSS variables active).
**Decisions:** None — all locked.
**Owner:** Claude
**Notes:** Use `npm.cmd` from PowerShell on the T: drive mount per the network share npm setup memory. Don't try to run npm from a UNC path directly.

### Step 2: GitHub + Vercel Wiring
**What happens:** Initialize git in the project folder, create the GitHub repo `teamos-ai/Capital-Unique-Website` as Private via `gh repo create`, push the initial commit. Connect the repo to Vercel under the `teamos-ai` team. Confirm a preview deploy fires automatically and returns a URL.
**Input:** Scaffolded project from Step 1, `gh` CLI authenticated as `teamos-ai`, Vercel team access.
**Output:** Live Vercel preview URL (something like `capital-unique-website.vercel.app`). Branch previews enabled.
**Decisions:** None — locked.
**Owner:** Claude (with user-confirmed `gh` auth).
**Notes:** Don't add any env vars yet — Gemini API key and any others added lazily as needed.

### Step 3: Design System Vendoring
**What happens:** Clone or read the design system repo, extract the relevant tokens (colors, fonts, spacing scale, button styles, component primitives). Bake them into `tailwind.config.js` (theme.extend) and `styles/globals.css` (CSS variables, font imports). Document what was vendored and from where in `DESIGN-SYSTEM-SOURCE.md`.
**Input:** Design system repo at https://github.com/teamos-ai/Capitaluniquedesignsystemfigma OR the live preview at https://capitaluniquedesignsystemfigma.vercel.app/
**Output:** A self-contained design system inside the project — no submodule, no npm dep, no ongoing sync. `DESIGN-SYSTEM-SOURCE.md` records what was copied.
**Decisions:** None — user confirmed read-once approach.
**Owner:** Claude
**Notes:** If the design system has component primitives (buttons, inputs, cards) I should port those too into `components/ui/` so the rest of the build composes from them.

### Step 4: Shared Chrome Port (Navbar, Footer, Logo)
**What happens:** Port `Navbar13.jsx`, `Footer10.jsx`, `Logo3.jsx` from the Relume React zip into `components/shared/`. Replace Relume's default Tailwind classes with design-system tokens. Update navbar links to use the renamed slugs (`/insights-and-resources`, `/charles-ai`). In the footer, add a GHL iframe form #5 — email-only newsletter subscribe.
**Input:** Relume React zip components.
**Output:** A persistent Navbar + Footer that renders on every page via `app/layout.jsx`, fully on-brand, with the newsletter form placeholder ready (real GHL iframe URL added when you create that GHL form).
**Decisions:** Newsletter form: at first scaffold, it's a styled placeholder (`<div>Newsletter form goes here</div>`) until you provide the GHL iframe URL.
**Owner:** Claude builds the shell; user creates the GHL form and provides iframe URL.
**Notes:** Navbar13 is the most-reused component (in every page), so getting this right unblocks every subsequent page.

### Step 5: Page-by-Page Build (Repeat for 17 pages)
**What happens:** For each page in the priority order below, do the following:
  1. Open the Relume React export for that page (`{slug}/index.jsx` + `{slug}/components/*.jsx`)
  2. Open the Google Doc copy tab for that page (fileId `1Xdtm4u-wam6jRcfrGtdcTsOCubtB1PbYGZ2HAAPMMIY`)
  3. Build the Next.js page at the renamed slug, porting each Relume component into `components/sections/` (or co-locate if single-use)
  4. Replace placeholder copy with real copy from the Google Doc
  5. Replace Relume's stock images with brand assets (REUSE) or generate via Nano Banana 2 (GENERATE) — see Step 6
  6. Wire any GHL form on this page (Contact, get-capital, charles-ai)
  7. Apply Standard animation level (Framer Motion: scroll-triggered fade/slide-in for sections, hover micro-interactions). On the home page hero only, apply Premium touches (parallax / animated reveal sequence).
  8. Verify the page renders correctly in `npm run dev`, screenshot at mobile/tablet/desktop, commit.
**Priority order:**
  1. home (hero sets brand impression)
  2. about (foundational story, John Codrington photo)
  3. contact (forms wiring)
  4. get-capital (highest-intent conversion page)
  5. business
  6. commercial
  7. property-development
  8. private-capital
  9. agriculture
  10. construction
  11. how-it-works
  12. overview
  13. guides
  14. insights-and-resources
  15. articles (placeholder structure for blog posts, no real content at launch)
  16. calculators (separate intensive sub-step — see Step 7)
  17. charles-ai (marketing page only, "join waitlist" GHL form)
**Input:** Relume zip per-page components, Google Doc copy, design system tokens, brand assets.
**Output:** 17 deployed pages on the Vercel preview, each fully on-brand, with real copy, real imagery, working forms.
**Decisions:** Per-page small decisions (e.g., specific image to reuse vs generate) made as we hit them.
**Owner:** Claude builds, user reviews preview, user approves before next page or surfaces edits.
**Notes:** Commit per page so we can roll back individual pages if needed. Push to GitHub after each commit so Vercel preview rebuilds.

### Step 6: Image Generation Pipeline (Triggered at Step 5 sub-step for each page)
**What happens:** Run this sub-process every time a page needs imagery:
  1. Inventory existing assets in (a) `C:\Users\tumai\Desktop\Capital Unique Final Website Assets\Image Assets`, (b) `C:\Users\tumai\Downloads\` (bento cards 4, 5, 8 + others), (c) Google Drive `4️⃣ Brand Assets` folder.
  2. For the current page, list every image slot (hero, bento tiles, gallery, testimonial avatars, sector visuals).
  3. Decide REUSE (point to existing file) vs GENERATE (Nano Banana 2 prompt).
  4. For GENERATE: write a Nano Banana 2 prompt with brand-consistent style anchor (drawn from existing Capital Unique imagery + Brand Vibe PDF). Generate batch of 10 at minimum 2K resolution.
  5. Show user the batch, get approval. If rejected, refine prompt and regenerate.
  6. Once approved, save images to `public/images/{page}/` and append the prompt to `IMAGE-PROMPTS.md`.
  7. Generate next batch of 10 if more images are needed.
**Input:** Brand assets inventory, page image slots, Nano Banana 2 MCP access.
**Output:** Approved 2K images in `public/images/`, every prompt logged in `IMAGE-PROMPTS.md` so user can re-run any in AI Studio for finer iteration.
**Decisions:** Per-image REUSE/GENERATE call, prompt approval per batch.
**Owner:** Claude generates, user approves.
**Notes:** Bento cards 1, 2, 3, 6, 7 are the first known generation gap — if not in the local folders, generate in matching style to 4, 5, 8. Next.js `<Image>` component handles AVIF/WebP conversion + responsive variants automatically; we only worry about source quality.

### Step 7: Calculators Page (Sub-project within Step 5)
**What happens:** Spec the calculator MVP at the time we hit this page, then vibe-code 3–5 Aussie finance/mortgage broker calculators as React widgets. Likely candidates: borrowing capacity, repayment (P&I and IO), stamp duty (state-aware), LMI estimator, refinance savings, equity calculator, development feasibility. Calculators are client-side React (no backend), styled with design system tokens. Each calculator has clear "talk to a broker" CTAs that drop into the contact GHL form.
**Input:** User selects which 3–5 calculators to build, provides any specific formulas or rate assumptions to use as defaults.
**Output:** Working interactive calculators on the calculators page.
**Decisions:** Which calculators, what default assumptions, whether each one is a lead magnet (gates results behind a form) or fully open.
**Owner:** Claude codes, user approves UX and formula correctness.
**Notes:** Australian state stamp duty rules vary significantly — if stamp duty calc is included, we need to encode 7 state/territory rule sets. This is the calculator with the most logic; budget extra time for it.

### Step 8: GHL Form Brand-Matching CSS
**What happens:** Once all pages are built and forms are placed (5 GHL iframes total: contact main, contact secondary, get-capital lead, charles-ai waitlist, footer newsletter), I write a CSS snippet for each form that overrides GHL's default form styling to match Capital Unique brand (fonts, colors, spacing, button radius, focus states, error states). User (or John) pastes each snippet into the corresponding GHL form's "advanced styling" panel.
**Input:** GHL form access (you/John), the design system tokens.
**Output:** All 5 forms visually consistent with the rest of the site despite being iframes.
**Decisions:** None — locked approach.
**Owner:** Claude writes CSS, user/John pastes into GHL.
**Notes:** Test each form's appearance in the live Vercel preview after CSS is applied — GHL caching can mean the change doesn't show for a few minutes.

### Step 9: Polish, Audit, SEO Baseline
**What happens:** Final pass before shipping:
  1. Accessibility audit — keyboard nav across every page, focus rings visible, alt text on every image, color contrast 4.5:1 minimum, prefers-reduced-motion respected for animations
  2. Lighthouse audit on all 17 pages — target: Performance ≥85, Accessibility ≥95, Best Practices ≥90, SEO ≥95
  3. SEO baseline: Next.js metadata API per page (title, description, OpenGraph, Twitter card), `app/sitemap.ts` generated automatically, `app/robots.ts` for robots.txt, `public/llms.txt` for AI crawlers (Perplexity, ChatGPT)
  4. Manual review of each page on real mobile devices (iOS Safari, Android Chrome)
**Input:** Completed site.
**Output:** Production-ready site that hits accessibility and SEO targets.
**Decisions:** Whether to wire analytics now (skipped by default until you provide GA4 or Plausible ID).
**Owner:** Claude runs audits and reports, user makes final approve/iterate calls.
**Notes:** Articles/Insights page indexability — at launch, since they're placeholder, mark them `noindex` until real content lands.

### Step 10: Domain Handoff
**What happens:** When client is ready, you (or John) update DNS records to point the production domain (capitalunique.com.au or whatever the actual domain is) to Vercel. Add the custom domain to the Vercel project settings. Vercel issues SSL automatically. Verify live at the production URL.
**Input:** DNS access, production domain, Vercel custom domain settings.
**Output:** Site live at the production domain with valid SSL.
**Decisions:** Timing — entirely client-driven.
**Owner:** User handles DNS; Claude assists with Vercel-side configuration if needed.
**Notes:** This step is asynchronous and out of build scope. Site can soft-launch on Vercel preview URL first if needed.

## Edge Cases and Failure Modes
- **Google Doc copy doesn't match Relume page section count** — some pages may have more or fewer sections than the copy doc anticipated. Handle by either (a) condensing/expanding sections to match copy, or (b) flagging the gap to the user for additional copy.
- **Image generation drifts in style across batches** — Nano Banana 2 outputs can shift in color, lighting, composition. Mitigate by anchoring every prompt to the same style paragraph and by reviewing batches against earlier approved images, not just in isolation.
- **GHL iframe form CSS injection has limits** — GHL may strip or override certain CSS properties. If a property doesn't take, fallback options are: (a) use `!important` in the CSS, (b) accept the GHL default for that property, (c) escalate to a webhook/API form (option C from Q7) for that specific form only.
- **Calculator math edge cases** — borrowing capacity formulas vary by lender; stamp duty state rules change occasionally. Use ASIC moneysmart.gov.au as the authoritative reference for default formulas, document the assumptions in the calculator UI ("based on standard ASIC formulas — actual lender criteria varies").
- **Bento cards 1, 2, 3, 6, 7 not findable in any folder** — generate them in matching style to 4, 5, 8 via Nano Banana 2, treating the existing 3 as the style anchor. Add a tile-by-tile review with the user.
- **Network share UNC path issues for npm** — per the network_share_npm memory: must use `T:\` drive mapping + `npm.cmd` from PowerShell, never `npm` from cmd.exe via UNC.
- **Vercel build fails on first deploy** — common causes: missing env vars (none expected at launch), Tailwind config errors, font import issues. Debug via Vercel build logs.
- **Charles AI waitlist form gets traction before phase 2** — that's a good problem; add the captured emails to a "Charles AI early interest" tag in GHL so John can email them when the real feature ships.

## Dependencies and Requirements
- **`gh` CLI** authenticated as `teamos-ai` ✓ confirmed in memory
- **Node.js 20+ and npm** ✓ available via T:\ drive
- **Vercel team access** under `teamos-ai` ✓ user confirmed set up
- **Google Drive MCP access** ✓ confirmed working in interview (copywriting doc readable)
- **Nano Banana 2 MCP** for image generation — available via `infographic-v2` skill
- **Google Doc share permissions** ✓ confirmed via shared drive
- **Local Image Assets folder access** at `C:\Users\tumai\Desktop\Capital Unique Final Website Assets\Image Assets`
- **GHL workspace access** for John (or user) to create the 5 forms and paste in custom CSS — needed at form-wiring time, not blocking initial scaffold
- **Brand domain DNS access** — needed only at Step 10, not blocking
- **Design system repo** clone or live URL access ✓ both available

## Open Questions
None blocking. All resolved during interview. Items deferred to natural decision points during the build:
- Specific calculator list (3–5 of borrowing capacity, repayment, stamp duty, LMI, refinance, equity, development feasibility) — decided when we hit calculators page in Step 5/7.
- Real article/insights blog content — placeholder at launch, real content post-launch.
- Analytics provider (GA4 vs Plausible vs none) — added when user provides ID, not before launch.
- Hard launch deadline — assumed "as fast as possible with quality" (~3–4 weeks for v1 to viewable preview); user will surface if there's a date.
- Domain name — capitalunique.com.au assumed but not explicitly confirmed; doesn't matter until Step 10.

## Success Criteria
- ✅ All 17 pages live on Vercel preview URL with real copy, real imagery, working forms
- ✅ All 5 GHL forms fire correctly into John's CRM and trigger his automations
- ✅ Lighthouse: Performance ≥85, Accessibility ≥95, Best Practices ≥90, SEO ≥95 on every page
- ✅ Site is fully responsive across mobile (375px) → wide desktop (1536px)
- ✅ All page interactions tested: navigation, forms, calculators, hover states, scroll animations
- ✅ Repo `teamos-ai/Capital-Unique-Website` (Private) on GitHub with clean commit history per page
- ✅ `IMAGE-PROMPTS.md` documents every Nano Banana 2 prompt used (so client can re-iterate)
- ✅ `DESIGN-SYSTEM-SOURCE.md` documents what was vendored from where
- ✅ John (the client) can review the preview and approve for production handoff
- ✅ DNS pointed to Vercel when client is ready; site live on production domain with valid SSL

---

*Generated by process-interviewer skill after 9 rounds of structured Q&A. Interview captured all major architectural decisions, scope boundaries, source materials, workflow preferences, and success criteria. No blocking open questions remain.*
