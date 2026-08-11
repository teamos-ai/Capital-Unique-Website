// GHL hosted form IDs per lead-magnet slug (from the Capital Unique
// GHL sub-account on link.teamos.ai).
//
// IMPORTANT — set the redirect in GHL, not here:
// each form's "On submit → Redirect" must point at the gated content
// page so the lead is captured *then* unlocked. Targets:
//   guides:     https://www.capitalunique.com/guides/<slug>
//   free-tools: https://www.capitalunique.com/free-tools/<slug>
export const GHL_FORM_HOST = "https://link.teamos.ai";

// Per-slug host overrides. Forms rebuilt on Capital Unique's own
// white-label GHL domain live here; everything else falls back to
// GHL_FORM_HOST. Keep the origin only — no trailing slash.
export const GHL_FORM_HOST_OVERRIDES = {
  docsend: "https://book.capitalunique.com",
  // Not a lead-magnet slug — the key HANDOVER_FORM resolves its host by.
  handover: "https://book.capitalunique.com",
};

export const GHL_FORM_IDS = {
  "borrowers-guide": "nOL9uLStVTz5zWJmlVrj",
  "when-the-bank-says-no": "OXVYPineEruNXo336KLt",
  "investor-framework": "i4YYIHhZklgIsvvlQrdu",
  "deal-submission-swipe-file": "ueOrHAmhPDI9vD4AhDam",
  "non-bank-finance-on-one-page": "MBbCVCTAsywdMUm041ox",
  "development-finance-readiness-checklist": "27h3rrn9WRa85TShP4KD",
  "feasibility-sanity-check": "Ifz3AXXgzRppBbVtAN2L",
  "lending-ratios-cheat-sheet": "6KEh8dRWA6dHgE9XpoJs",
  "capital-stack-at-a-glance": "3lvWhQAEIr42sY7bh85U",
  "lender-conversation-swipe-file": "a34QjQw7mvCcHLbWvkD9",
  "objection-handling-swipe-file": "cSnTiagMsPVUtws0iHit",
  // DocSend — embedded on /deliver (file upload → CRM). Rebuilt on
  // book.capitalunique.com (see GHL_FORM_HOST_OVERRIDES); replaced the
  // earlier link.teamos.ai form Z7Y7Q8aXojPqMNa2DEMI.
  // GHL: set this form's On Submit → Redirect → /thank-you.
  docsend: "STxUG9f4sDxHMYdiHw5V",
};

// "Charles AI + Hand Off" — the form behind Charles A.I's hand-off button,
// for booking a call with John. Triggered (in GHL) by form submission →
// John's follow-up workflow. Rebuilt on book.capitalunique.com (see
// GHL_FORM_HOST_OVERRIDES.handover); replaced the earlier link.teamos.ai
// form 4QpLNP0k5KOkCI9QSw2G.
//
// NOTE: the ?cu= theme bridge and ?conversation= transcript below only work
// if this form carries GHL_HANDOVER_FORM_JS (Custom JS) and a hidden field
// with query key "conversation". Both are GHL-side config, not code — they
// do not carry across from the old form.
export const HANDOVER_FORM = {
  id: "Zsd0oXZuOyw70gEtp6Ss",
  name: "Charles AI + Hand Off",
  height: 584,
};

// Build the embed URL. We pass the current site theme (?cu=) and a short
// conversation summary (?conversation=) as query params — a tiny custom-JS
// snippet in the GHL form reads ?cu to flip its theme, and a hidden field with
// query key "conversation" (if added in the form builder) receives the chat.
export function handoverFormSrc({ theme = "dark", conversation = "" } = {}) {
  const p = new URLSearchParams();
  p.set("cu", theme === "light" ? "light" : "dark");
  if (conversation) p.set("conversation", conversation.slice(0, 1200));
  return `${ghlFormHost("handover")}/widget/form/${HANDOVER_FORM.id}?${p.toString()}`;
}

export function ghlFormId(slug) {
  return GHL_FORM_IDS[slug] || null;
}

// The GHL origin serving this slug's form — and its form_embed.js.
export function ghlFormHost(slug) {
  return GHL_FORM_HOST_OVERRIDES[slug] || GHL_FORM_HOST;
}

export function ghlFormSrc(slug) {
  const id = ghlFormId(slug);
  return id ? `${ghlFormHost(slug)}/widget/form/${id}` : null;
}

// Access strategy (chosen: "embed").
//  - "embed"  → "Get instant access" opens the on-brand /get/[slug]
//               landing page with the GHL form embedded (on-domain,
//               indexed, higher conversion). Recommended.
//  - "direct" → button links straight to the GHL-hosted form URL
//               (use only if iframe redirect ever misbehaves on the
//               GHL plan). One-line switch, no other changes needed.
export const LEAD_MAGNET_ACCESS = "embed";

// Where the "Get instant access" button should point for a magnet.
export function accessHref(slug) {
  return LEAD_MAGNET_ACCESS === "direct"
    ? ghlFormSrc(slug)
    : `/get/${slug}`;
}
