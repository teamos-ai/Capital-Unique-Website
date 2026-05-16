"use client";

import Script from "next/script";
import { ghlFormId, ghlFormSrc, GHL_FORM_HOST } from "@/lib/ghl-forms";

// Embeds the GHL hosted form. The GHL form itself is configured (in
// GHL) to redirect on submit to the gated content page — so capture
// and unlock happen in one step.
export function GhlForm({ slug, formName, minHeight = 651 }) {
  const id = ghlFormId(slug);
  const src = ghlFormSrc(slug);
  if (!id || !src) return null;

  return (
    <>
      <iframe
        src={src}
        title={formName}
        id={`inline-${id}`}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={formName}
        data-height={String(minHeight)}
        data-layout-iframe-id={`inline-${id}`}
        data-form-id={id}
        style={{
          width: "100%",
          height: `${minHeight}px`,
          border: "none",
          borderRadius: "8px",
        }}
      />
      <Script
        src={`${GHL_FORM_HOST}/js/form_embed.js`}
        strategy="afterInteractive"
      />
    </>
  );
}
