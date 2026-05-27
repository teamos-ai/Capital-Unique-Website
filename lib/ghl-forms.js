// GHL hosted form IDs per lead-magnet slug (from the Capital Unique
// GHL sub-account on link.teamos.ai).
//
// IMPORTANT — set the redirect in GHL, not here:
// each form's "On submit → Redirect" must point at the gated content
// page so the lead is captured *then* unlocked. Targets:
//   guides:     https://www.capitalunique.com/guides/<slug>
//   free-tools: https://www.capitalunique.com/free-tools/<slug>
export const GHL_FORM_HOST = "https://link.teamos.ai";

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
  // DocSend — embedded on /deliver (file upload → CRM).
  // GHL: set this form's On Submit → Redirect → /thank-you.
  docsend: "Z7Y7Q8aXojPqMNa2DEMI",
};

export function ghlFormId(slug) {
  return GHL_FORM_IDS[slug] || null;
}

export function ghlFormSrc(slug) {
  const id = ghlFormId(slug);
  return id ? `${GHL_FORM_HOST}/widget/form/${id}` : null;
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
