// Master registry for every gated lead magnet.
//
// FLOW (per locked plan):
//   Public teaser card (indexed, on /guides or /free-tools)
//     → "Get instant access" button → GHL hosted form (captures
//        first name + surname + email)
//     → GHL "redirect on submit" → the full content page
//        (`${SITE_URL}${accessPath}` — noindex, unlisted).
//
// To wire a magnet live: create the GHL form, set its on-submit
// redirect to the accessPath URL, then paste the GHL form URL into
// `formUrl` below. Until then the access button shows a documented
// placeholder. Content pages render standalone regardless.
//
// `phase: 1` ships now (content built). `phase: 2` shows a
// "Coming soon" teaser only — no content page generated yet.

export const LEAD_MAGNETS = [
  // ── Guides → /guides/[slug] ──────────────────────────────────────
  {
    slug: "borrowers-guide",
    type: "guide",
    group: "guides",
    phase: 1,
    eyebrow: "For business owners & first-time non-bank borrowers",
    title: "The Borrower's Guide to Non-Bank Capital in Australia",
    subtitle:
      "How non-bank lending actually works — and when it's the right call.",
    audience:
      "Business owners and operators considering non-bank capital for the first time.",
    summary:
      "A clear, jargon-free walk-through of how non-bank lending works in Australia: what it costs, when it beats the bank, what lenders actually assess, and the questions to ask before you sign anything.",
    highlights: [
      "When non-bank is the right tool — and when it isn't",
      "The real cost of capital beyond the headline rate",
      "What makes a strong scenario vs a weak one",
      "The questions to ask before you commit",
    ],
    readMins: 9,
    formUrl: null,
  },
  {
    slug: "when-the-bank-says-no",
    type: "guide",
    group: "guides",
    phase: 1,
    eyebrow: "For property developers & builders",
    title: "When the Bank Says No",
    subtitle:
      "A developer's guide to non-bank development & construction finance.",
    audience:
      "Property developers and builders funding a project outside standard bank policy.",
    summary:
      "The bank passed, stalled, or wants more presales than the deal can carry. This guide maps the non-bank path: the capital stack, what stacks up in 2026, how lenders price risk, and how to present a project that gets a fast yes.",
    highlights: [
      "The capital stack: senior, stretch, mezzanine, preferred equity, residual stock",
      "What lenders check before they fund a development",
      "Presales, LVR, GRV and TDC — what actually moves the decision",
      "How to present a project that gets funded quickly",
    ],
    readMins: 12,
    formUrl: null,
  },
  {
    slug: "investor-framework",
    type: "guide",
    group: "guides",
    phase: 1,
    eyebrow: "For wholesale investors & family offices",
    title: "Private Lending: A Wholesale Investor's Framework",
    subtitle:
      "Income, risk and what to watch for in Australian private credit.",
    audience:
      "Wholesale and sophisticated investors, family office principals and advisers.",
    summary:
      "A disciplined framework for evaluating private credit: how risk is priced, the structural protections that matter, the seven due-diligence areas ASIC now expects, and the questions that separate a considered opportunity from a risky one.",
    highlights: [
      "How return is built — and what you're being paid to take",
      "Security, structure and the protections that actually hold",
      "The seven due-diligence areas (ASIC-aligned)",
      "Red flags and the questions to ask a manager",
    ],
    readMins: 11,
    formUrl: null,
  },

  // ── Tools → /free-tools/[slug] ───────────────────────────────────
  {
    slug: "deal-submission-swipe-file",
    type: "swipefile",
    group: "free-tools",
    phase: 1,
    eyebrow: "Swipe-through templates",
    title: "The Deal Submission Swipe File",
    subtitle: "Three decks that get you to a fast yes.",
    audience: "Borrowers and brokers preparing a deal for a non-bank lender.",
    summary:
      "Three swipe-through decks you can copy: a one-page deal summary template (5 swipes), the questions to ask a non-bank lender (8 swipes), and the deal-ready document list (12 swipes). The exact framing that gets a quick, confident decision.",
    highlights: [
      "Deck 1 — the one-page deal summary, swipe by swipe",
      "Deck 2 — the questions to ask before you engage a lender",
      "Deck 3 — the deal-ready document checklist",
    ],
    readMins: 7,
    formUrl: null,
  },
  {
    slug: "non-bank-finance-on-one-page",
    type: "cheatsheet",
    group: "free-tools",
    phase: 1,
    eyebrow: "One-page cheat sheet",
    title: "Non-Bank Finance on One Page",
    subtitle: "Structures, ratios and jargon — decoded.",
    audience: "Anyone weighing a non-bank facility who wants the fast version.",
    summary:
      "The whole landscape on one screen: the common facility types, the ratios lenders decide on (LVR, LCR, ICR, GRV, TDC), the jargon decoded, and the red flags — so you can read a term sheet without a translator.",
    highlights: [
      "Facility types at a glance",
      "The ratios that decide your deal",
      "Jargon, decoded",
      "Red flags to watch",
    ],
    readMins: 5,
    formUrl: null,
  },

  // ── Checklists, cheat sheets & swipe files (continued) ───────────
  {
    slug: "development-finance-readiness-checklist",
    type: "checklist",
    group: "free-tools",
    phase: 1,
    eyebrow: "Checklist",
    title: "The Development Finance Readiness Checklist",
    subtitle: "25 checks across 5 stages a lender runs before funding you.",
    audience: "Developers and borrowers pressure-testing a project.",
    summary:
      "Twenty-five tickable checks across five stages — site, feasibility, presales, team and documentation — the same ground a non-bank credit team covers before they commit.",
    highlights: [
      "5 stages · 5 checks each",
      "What a credit team actually verifies",
      "Self-score before you apply",
    ],
    readMins: 6,
    formUrl: null,
  },
  {
    slug: "feasibility-sanity-check",
    type: "checklist",
    group: "free-tools",
    phase: 1,
    eyebrow: "Checklist",
    title: "The Feasibility Sanity-Check",
    subtitle: "Prove your project stacks before you apply.",
    audience: "Developers stress-testing a feasibility.",
    summary:
      "A staged sanity-check on the numbers a lender will re-run anyway — margin on cost, contingency, finance costs and sales evidence — so weaknesses surface before a credit team finds them.",
    highlights: [
      "The figures lenders re-test",
      "Where feasibilities quietly break",
      "A defensible margin before you submit",
    ],
    readMins: 6,
    formUrl: null,
  },
  {
    slug: "lending-ratios-cheat-sheet",
    type: "cheatsheet",
    group: "free-tools",
    phase: 1,
    eyebrow: "Cheat sheet",
    title: "The Lending Ratios Cheat Sheet",
    subtitle: "LVR vs LCR vs ICR vs GRV vs TDC.",
    audience: "Borrowers and brokers decoding a term sheet.",
    summary:
      "Every ratio a non-bank lender decides on, defined plainly with a worked example and the typical thresholds — on one page.",
    highlights: ["Each ratio, plainly", "Worked examples", "Typical thresholds"],
    readMins: 4,
    formUrl: null,
  },
  {
    slug: "capital-stack-at-a-glance",
    type: "cheatsheet",
    group: "free-tools",
    phase: 1,
    eyebrow: "Cheat sheet",
    title: "The Capital Stack at a Glance",
    subtitle: "Senior to equity, and what each layer costs.",
    audience: "Developers structuring a project's funding.",
    summary:
      "The full capital stack on one page — senior, stretch senior, mezzanine, preferred equity and residual stock — with indicative cost, risk and where each fits.",
    highlights: ["Every layer, ranked", "Indicative cost & risk", "Where each fits"],
    readMins: 5,
    formUrl: null,
  },
  {
    slug: "lender-conversation-swipe-file",
    type: "swipefile",
    group: "free-tools",
    phase: 1,
    eyebrow: "Swipe-through scripts",
    title: "The Lender Conversation Swipe File",
    subtitle: "Scripts that get a fast yes.",
    audience: "Borrowers and brokers about to speak with a lender.",
    summary:
      "Word-for-word framing for the first lender conversation — how to open, what to lead with, and how to handle the rate question.",
    highlights: ["Opening framing", "What to lead with", "Handling price"],
    readMins: 6,
    formUrl: null,
  },
  {
    slug: "objection-handling-swipe-file",
    type: "swipefile",
    group: "free-tools",
    phase: 1,
    eyebrow: "Swipe-through responses",
    title: "The Objection-Handling Swipe File",
    subtitle: "Answers to the 10 things lenders push back on.",
    audience: "Borrowers and brokers preparing for credit questions.",
    summary:
      "The ten objections a credit team raises — thin presales, tight margin, limited track record — and a considered response to each.",
    highlights: ["The 10 common pushbacks", "A considered answer to each"],
    readMins: 7,
    formUrl: null,
  },
];

export function getLeadMagnet(slug) {
  return LEAD_MAGNETS.find((m) => m.slug === slug) || null;
}

export const PHASE1 = LEAD_MAGNETS.filter((m) => m.phase === 1);

export function leadMagnetsByGroup(group) {
  return LEAD_MAGNETS.filter((m) => m.group === group);
}

// Absolute path the GHL form should redirect to on submit.
export function accessPath(m) {
  return `/${m.group}/${m.slug}`;
}
