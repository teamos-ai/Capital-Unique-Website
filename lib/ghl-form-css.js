// Canonical custom CSS for every Capital Unique GHL lead-magnet form.
//
// Single source of truth. Paste GHL_FORM_CSS into each form:
//   GHL → Form → Edit → Advanced → Custom CSS
// Apply to all 11 lead-magnet forms so they stay consistent.
//
// Brand values mirror app/theme.css (light surface, ink text, Brandy
// primary, Inkwell focus, Source Serif 4 + Public Sans). GHL inlines
// styles, so !important is required to win.
//
// Note: the form runs in a cross-origin GHL iframe and cannot read the
// site's light/dark toggle. This is a single, premium light theme that
// sits cleanly on the embedded card, plus an optional OS-dark block.

export const GHL_FORM_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,600&display=swap');

/* ---- Canvas ---------------------------------------------------- */
body,
.ghl-form,
.form-builder--main {
  background: transparent !important;
  font-family: 'Public Sans', -apple-system, system-ui, sans-serif !important;
  color: #0C0D0F !important;
}

/* ---- Kill GHL's opacity dimming (the real label fix) ---------- */
/* GHL fades non-required field labels via opacity on an element our
   class selectors don't reach. This resets every element so labels
   like First/Last Name show at full strength regardless of markup. */
body *,
.form-builder--main *,
.ghl-form * {
  opacity: 1 !important;
}

/* ---- Field rhythm --------------------------------------------- */
.form-builder--main .form-group,
.field-container,
.form-control-group,
.ghl-form-group {
  margin-bottom: 18px !important;
}

/* ---- Labels (force black; GHL dims them via opacity) ---------- */
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
  color: #000000 !important;
  opacity: 1 !important;
  letter-spacing: 0.005em !important;
  margin-bottom: 8px !important;
}

/* ---- Inputs / selects / textareas ----------------------------- */
input:not([type=checkbox]):not([type=radio]):not([type=submit]),
textarea,
select,
.input-field input {
  width: 100% !important;
  background: #F4F5F7 !important;
  color: #0C0D0F !important;
  border: 1px solid rgba(12,13,15,0.14) !important;
  border-radius: 8px !important;
  padding: 12px 14px !important;
  font-family: 'Public Sans', system-ui, sans-serif !important;
  font-size: 15px !important;
  line-height: 1.4 !important;
  box-shadow: none !important;
  transition: border-color .15s ease, box-shadow .15s ease !important;
}

input::placeholder,
textarea::placeholder {
  color: #8A8F99 !important;
}

input:not([type=checkbox]):focus,
textarea:focus,
select:focus {
  outline: none !important;
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

/* ---- Footer links (Privacy / Terms) --------------------------- */
.form-builder--main a,
form a {
  color: #C0702A !important;
  text-decoration: none !important;
  font-size: 12.5px !important;
}
.form-builder--main a:hover,
form a:hover {
  text-decoration: underline !important;
}

/* ---- Validation ----------------------------------------------- */
.error,
.invalid-feedback,
.field-error {
  color: #B23B2E !important;
  font-size: 12px !important;
}

/* ---- Optional: adapt to the visitor's OS dark mode ------------ */
@media (prefers-color-scheme: dark) {
  body, .ghl-form, .form-builder--main { color: #F2F2F2 !important; }
  label, .form-builder-label, .field-label { color: #F2F2F2 !important; }
  input:not([type=checkbox]):not([type=radio]):not([type=submit]),
  textarea, select, .input-field input {
    background: #1A1A1A !important;
    color: #F2F2F2 !important;
    border-color: rgba(255,255,255,0.10) !important;
  }
  input::placeholder, textarea::placeholder { color: #7A7F88 !important; }
  .checkbox-container label, .terms-and-condition,
  .consent-label, .checkbox-text { color: #A8ADB6 !important; }
  button[type=submit], .submit-form-btn, .ghl-btn, #submit-btn,
  .form-builder--submit button { background: #C97A33 !important; }
  button[type=submit]:hover, .submit-form-btn:hover { background: #D98B4A !important; }
}
`;
