// Canonical custom CSS for Capital Unique GHL forms.
//
// Two themes — paste into GHL → Form → Edit → Advanced → Custom CSS:
//   GHL_FORM_CSS          → the 11 lead-magnet forms (LIGHT, on the
//                            white /get/[slug] card; labels removed,
//                            placeholder doubles as the label)
//   GHL_DOCSEND_FORM_CSS  → the DocSend form (DARK, on the near-black
//                            /deliver page; keeps labels + a styled
//                            file-upload dropzone)
//
// GHL inlines styles, so !important is required to win.

export const GHL_FORM_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,600&display=swap');

/* ---- Canvas --------------------------------------------------- */
body,
.ghl-form,
.form-builder--main {
  background: transparent !important;
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

/* ---- Inputs (light box, black text, readable placeholder) ----- */
input:not([type=checkbox]):not([type=radio]):not([type=submit]),
textarea,
select,
.input-field input {
  width: 100% !important;
  background: #F1F2F4 !important;
  color: #0C0D0F !important;
  border: 1px solid rgba(12,13,15,0.18) !important;
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

// ────────────────────────────────────────────────────────────────
// DARK theme — DocSend form on the /deliver page (matches image 1).
// ────────────────────────────────────────────────────────────────
export const GHL_DOCSEND_FORM_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,600&display=swap');

/* ---- Canvas (transparent — sits on the dark card) ------------- */
body,
.ghl-form,
.form-builder--main {
  background: transparent !important;
  font-family: 'Public Sans', -apple-system, system-ui, sans-serif !important;
  color: #F2F2F2 !important;
}

/* Kill GHL's opacity dimming so optional labels (Short Note) show */
body *,
.form-builder--main *,
.ghl-form * { opacity: 1 !important; }

/* ---- Field rhythm --------------------------------------------- */
.form-builder--main .form-group,
.field-container,
.form-control-group,
.ghl-form-group {
  margin-bottom: 18px !important;
}

/* ---- Labels (light on dark) ----------------------------------- */
.form-builder--main label,
.form-builder--main .form-group label,
label,
.form-builder-label,
.field-label,
.input-label,
.ghl-form-label,
[class*="label"] {
  font-family: 'Public Sans', system-ui, sans-serif !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  color: #E8E8E8 !important;
  opacity: 1 !important;
  letter-spacing: 0.005em !important;
  margin-bottom: 8px !important;
}

/* ---- Inputs (dark Vault box, light text) ---------------------- */
input:not([type=checkbox]):not([type=radio]):not([type=submit]),
textarea,
select,
.input-field input {
  width: 100% !important;
  background: #17181B !important;
  color: #F2F2F2 !important;
  border: 1px solid rgba(255,255,255,0.10) !important;
  border-radius: 8px !important;
  padding: 13px 14px !important;
  font-family: 'Public Sans', system-ui, sans-serif !important;
  font-size: 15px !important;
  line-height: 1.4 !important;
  box-shadow: none !important;
  transition: border-color .15s ease, box-shadow .15s ease !important;
}

input::placeholder,
textarea::placeholder {
  color: #8B8F98 !important;
  opacity: 1 !important;
}

.input-field svg,
.form-group svg,
.field-container svg {
  color: #8B8F98 !important;
  fill: currentColor !important;
}

input:not([type=checkbox]):focus,
textarea:focus,
select:focus {
  outline: none !important;
  border-color: #C0702A !important;
  box-shadow: 0 0 0 3px rgba(192,112,42,0.20) !important;
}

/* ---- File upload / dropzone (the "DocSend" field) ------------- */
.file-upload,
.file-uploader,
.upload-container,
.dropzone,
.ghl-file-upload,
[class*="upload"],
[class*="dropzone"] {
  background: #141518 !important;
  border: 2px dashed rgba(255,255,255,0.16) !important;
  border-radius: 12px !important;
  color: #C9CCD2 !important;
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
  background: #17181C !important;
}
[class*="upload"] svg,
[class*="dropzone"] svg {
  color: #C0702A !important;
  fill: currentColor !important;
}
[class*="upload"] *,
[class*="dropzone"] * { color: #C9CCD2 !important; }

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
  color: #A8ADB6 !important;
  opacity: 1 !important;
}

/* ---- Submit ("Send Documentation") ---------------------------- */
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
  padding: 15px 20px !important;
  cursor: pointer !important;
  box-shadow: none !important;
  transition: background-color .15s ease, transform .05s ease !important;
}
button[type=submit]:hover,
.submit-form-btn:hover,
.ghl-btn:hover,
#submit-btn:hover { background: #A55F22 !important; }
button[type=submit]:active,
.submit-form-btn:active { transform: translateY(1px) !important; }

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
  color: #E0846B !important;
  font-size: 12px !important;
}
`;
