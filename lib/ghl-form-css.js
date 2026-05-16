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
