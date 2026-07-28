// Canonical custom CSS for Capital Unique GHL forms.
//
// Two themes — paste into GHL → Form → Edit → Advanced → Custom CSS:
//   GHL_FORM_CSS          → the 11 lead-magnet forms
//   GHL_DOCSEND_FORM_CSS  → the DocSend form on /deliver
//
// Both are LIGHT (grey fields, black text, natural white form
// background) so the form reads as a clean white panel wherever it's
// embedded. GHL inlines styles, so !important is required to win.
//
// Two-column layout (First/Last side by side) is set in the GHL form
// BUILDER (field width = 50% / drag onto one row) — CSS can't
// reliably reorder GHL's DOM. CSS here just styles + spaces.

const BASE_LIGHT = `
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,600&display=swap');

/* ---- White form panel (honor natural background) -------------- */
body,
.ghl-form,
.form-builder--main {
  background: #FFFFFF !important;
  font-family: 'Public Sans', -apple-system, system-ui, sans-serif !important;
  color: #0C0D0F !important;
}

/* ---- Field rhythm --------------------------------------------- */
.form-builder--main .form-group,
.field-container,
.form-control-group,
.ghl-form-group {
  margin-bottom: 16px !important;
}

/* ---- Inputs (grey box, black text, readable placeholder) ------ */
input:not([type=checkbox]):not([type=radio]):not([type=submit]),
textarea,
select,
.input-field input {
  width: 100% !important;
  background: #F1F2F4 !important;
  color: #0C0D0F !important;
  border: 1px solid rgba(12,13,15,0.16) !important;
  border-radius: 8px !important;
  padding: 13px 14px !important;
  font-family: 'Public Sans', system-ui, sans-serif !important;
  font-size: 15px !important;
  line-height: 1.4 !important;
  box-shadow: none !important;
  opacity: 1 !important;
  transition: border-color .15s ease, box-shadow .15s ease !important;
}

input::placeholder,
textarea::placeholder {
  color: #5B6470 !important;
  opacity: 1 !important;
}

.input-field svg,
.form-group svg,
.field-container svg {
  color: #5B6470 !important;
  fill: currentColor !important;
  opacity: 1 !important;
}

input:not([type=checkbox]):focus,
textarea:focus,
select:focus {
  outline: none !important;
  background: #FFFFFF !important;
  border-color: #3E5C82 !important;
  box-shadow: 0 0 0 3px rgba(62,92,130,0.18) !important;
}

/* ---- Consent checkbox ----------------------------------------- */
input[type=checkbox] {
  width: 16px !important;
  height: 16px !important;
  accent-color: #C0702A !important;
  margin-top: 3px !important;
}

.checkbox-container label,
.terms-and-condition,
.consent-label,
.checkbox-text {
  font-size: 12.5px !important;
  font-weight: 400 !important;
  line-height: 1.5 !important;
  color: #565A63 !important;
  opacity: 1 !important;
}

/* ---- Submit --------------------------------------------------- */
button[type=submit],
.submit-form-btn,
.ghl-btn,
#submit-btn,
.form-builder--submit button {
  width: 100% !important;
  background: #C0702A !important;
  color: #FFFFFF !important;
  font-family: 'Public Sans', system-ui, sans-serif !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  letter-spacing: 0.01em !important;
  border: none !important;
  border-radius: 8px !important;
  padding: 14px 20px !important;
  cursor: pointer !important;
  box-shadow: none !important;
  transition: background-color .15s ease, transform .05s ease !important;
}

button[type=submit]:hover,
.submit-form-btn:hover,
.ghl-btn:hover,
#submit-btn:hover {
  background: #A55F22 !important;
}

button[type=submit]:active,
.submit-form-btn:active {
  transform: translateY(1px) !important;
}

/* ---- Footer links --------------------------------------------- */
.form-builder--main a,
form a {
  color: #C0702A !important;
  text-decoration: none !important;
  font-size: 12.5px !important;
}
.form-builder--main a:hover,
form a:hover { text-decoration: underline !important; }

/* ---- Validation ----------------------------------------------- */
.error,
.invalid-feedback,
.field-error {
  color: #B23B2E !important;
  font-size: 12px !important;
}
`;

// Lead-magnet forms: the base light theme.
export const GHL_FORM_CSS = BASE_LIGHT;

// DocSend: base light theme + a light-styled file-upload dropzone.
export const GHL_DOCSEND_FORM_CSS = `${BASE_LIGHT}
/* ---- File upload / dropzone (the "DocSend" field) ------------- */
.file-upload,
.file-uploader,
.upload-container,
.dropzone,
.ghl-file-upload,
[class*="upload"],
[class*="dropzone"] {
  background: #F7F8FA !important;
  border: 2px dashed rgba(12,13,15,0.20) !important;
  border-radius: 12px !important;
  color: #5B6470 !important;
  padding: 28px 16px !important;
  transition: border-color .15s ease, background-color .15s ease !important;
}
.file-upload:hover,
.file-uploader:hover,
.upload-container:hover,
.dropzone:hover,
[class*="upload"]:hover,
[class*="dropzone"]:hover {
  border-color: rgba(192,112,42,0.55) !important;
  background: #FBF6F1 !important;
}
[class*="upload"] svg,
[class*="dropzone"] svg {
  color: #C0702A !important;
  fill: currentColor !important;
}
[class*="upload"] *,
[class*="dropzone"] * { color: #5B6470 !important; }
`;

// ── "Hand Over to John" form (embedded in Charles A.I) ───────────────────
// Paste GHL_HANDOVER_FORM_CSS into GHL → Form → Edit → Styles/Advanced →
// Custom CSS, and GHL_HANDOVER_FORM_JS into Custom JS (if your plan exposes
// it). The Charles embed appends ?cu=dark|light (the live site theme); the JS
// mirrors that onto <html data-cu> and the CSS flips accordingly.
//
// DARK is the default (no JS / no attribute) because the site defaults to
// dark — so the form matches out of the box even if custom JS isn't available.
// Light mode swaps the accent Brandy-orange → Inkwell-navy, per the design
// system (theme.css maps brandy→inkwell in light).
export const GHL_HANDOVER_FORM_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600&display=swap');

/* ---- Panel (dark default = surface-vault) --------------------- */
body, .ghl-form, .form-builder--main {
  background: #111111 !important;
  font-family: 'Public Sans', -apple-system, system-ui, sans-serif !important;
  color: #F2F2F2 !important;
}
.form-builder--main .form-group, .field-container, .form-control-group, .ghl-form-group {
  margin-bottom: 16px !important;
}
label, .form-builder--main label { color: #F2F2F2 !important; font-weight: 500 !important; }

/* ---- Inputs (surface-ember, light text) ----------------------- */
input:not([type=checkbox]):not([type=radio]):not([type=submit]),
textarea, select, .input-field input {
  width: 100% !important;
  background: #222222 !important;
  color: #F2F2F2 !important;
  border: 1px solid rgba(255,255,255,0.10) !important;
  border-radius: 8px !important;
  padding: 13px 14px !important;
  font-family: 'Public Sans', system-ui, sans-serif !important;
  font-size: 15px !important; line-height: 1.4 !important;
  box-shadow: none !important; opacity: 1 !important;
  transition: border-color .15s ease, box-shadow .15s ease !important;
}
input::placeholder, textarea::placeholder { color: #878787 !important; opacity: 1 !important; }
.input-field svg, .form-group svg, .field-container svg { color: #878787 !important; fill: currentColor !important; }
input:not([type=checkbox]):focus, textarea:focus, select:focus {
  outline: none !important; background: #1A1A1A !important;
  border-color: #C0702A !important; box-shadow: 0 0 0 3px rgba(192,112,42,0.25) !important;
}

/* ---- Consent checkboxes --------------------------------------- */
input[type=checkbox] { width: 16px !important; height: 16px !important; accent-color: #C0702A !important; margin-top: 3px !important; }
.checkbox-container label, .terms-and-condition, .consent-label, .checkbox-text {
  font-size: 12.5px !important; font-weight: 400 !important; line-height: 1.5 !important; color: #B5B5B5 !important; opacity: 1 !important;
}

/* ---- Submit (Brandy in dark) ---------------------------------- */
button[type=submit], .submit-form-btn, .ghl-btn, #submit-btn, .form-builder--submit button {
  width: 100% !important; background: #C0702A !important; color: #FFFFFF !important;
  font-family: 'Public Sans', system-ui, sans-serif !important;
  font-size: 15px !important; font-weight: 600 !important; letter-spacing: 0.01em !important;
  border: none !important; border-radius: 8px !important; padding: 14px 20px !important;
  cursor: pointer !important; box-shadow: none !important;
  transition: background-color .15s ease, transform .05s ease !important;
}
button[type=submit]:hover, .submit-form-btn:hover, .ghl-btn:hover, #submit-btn:hover { background: #D0895A !important; }
button[type=submit]:active, .submit-form-btn:active { transform: translateY(1px) !important; }

/* ---- Links + validation --------------------------------------- */
.form-builder--main a, form a { color: #D0895A !important; text-decoration: none !important; font-size: 12.5px !important; }
.form-builder--main a:hover, form a:hover { text-decoration: underline !important; }
.error, .invalid-feedback, .field-error, .hl-error, .error-message { color: #E0836F !important; font-size: 12px !important; }

/* ============================================================== */
/* LIGHT THEME — site in light mode (?cu=light). Accent → Inkwell  */
/* ============================================================== */
html[data-cu="light"] body,
html[data-cu="light"] .ghl-form,
html[data-cu="light"] .form-builder--main { background: #FFFFFF !important; color: #0C0D0F !important; }
html[data-cu="light"] label { color: #0C0D0F !important; }
html[data-cu="light"] input:not([type=checkbox]):not([type=radio]):not([type=submit]),
html[data-cu="light"] textarea, html[data-cu="light"] select, html[data-cu="light"] .input-field input {
  background: #F3F4F6 !important; color: #0C0D0F !important; border: 1px solid rgba(12,13,15,0.14) !important;
}
html[data-cu="light"] input::placeholder, html[data-cu="light"] textarea::placeholder { color: #565A63 !important; }
html[data-cu="light"] .input-field svg, html[data-cu="light"] .form-group svg { color: #565A63 !important; }
html[data-cu="light"] input:not([type=checkbox]):focus,
html[data-cu="light"] textarea:focus, html[data-cu="light"] select:focus {
  background: #FFFFFF !important; border-color: #3E5C82 !important; box-shadow: 0 0 0 3px rgba(62,92,130,0.20) !important;
}
html[data-cu="light"] input[type=checkbox] { accent-color: #3E5C82 !important; }
html[data-cu="light"] .checkbox-container label, html[data-cu="light"] .consent-label, html[data-cu="light"] .checkbox-text { color: #565A63 !important; }
html[data-cu="light"] button[type=submit], html[data-cu="light"] .submit-form-btn, html[data-cu="light"] .ghl-btn,
html[data-cu="light"] #submit-btn, html[data-cu="light"] .form-builder--submit button { background: #3E5C82 !important; }
html[data-cu="light"] button[type=submit]:hover, html[data-cu="light"] .submit-form-btn:hover { background: #2F4766 !important; }
html[data-cu="light"] .form-builder--main a, html[data-cu="light"] form a { color: #3E5C82 !important; }
`;

// Reads ?cu=dark|light from the embed URL and mirrors it onto <html data-cu>
// so the CSS above can flip. Paste into GHL → Form → Custom JS (if available).
export const GHL_HANDOVER_FORM_JS = `(function(){try{var t=new URLSearchParams(window.location.search).get('cu');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-cu',t);}}catch(e){}})();`;
