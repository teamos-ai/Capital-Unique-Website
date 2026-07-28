// TEMPORARY diagnostic — reports env-var PRESENCE and LENGTH only (never the
// actual secret values), plus the non-secret config values, so we can confirm
// the running function actually received the Vercel env vars. DELETE once
// Charles is confirmed live.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const len = (k) => (process.env[k] || "").trim().length;
  return Response.json({
    build: "charles-diag-1",
    OPENROUTER_API_KEY: { present: !!process.env.OPENROUTER_API_KEY, length: len("OPENROUTER_API_KEY") },
    CHARLES_MODEL: { present: !!process.env.CHARLES_MODEL, value: process.env.CHARLES_MODEL || null },
    CHARLES_MODEL_FALLBACKS: { present: !!process.env.CHARLES_MODEL_FALLBACKS, value: process.env.CHARLES_MODEL_FALLBACKS || null },
    GHL_LOCATION_ID: { present: !!process.env.GHL_LOCATION_ID, length: len("GHL_LOCATION_ID") },
    GHL_PRIVATE_INTEGRATION_TOKEN: { present: !!process.env.GHL_PRIVATE_INTEGRATION_TOKEN, length: len("GHL_PRIVATE_INTEGRATION_TOKEN") },
    GHL_LEAD_TAG: { present: !!process.env.GHL_LEAD_TAG, value: process.env.GHL_LEAD_TAG || null },
  });
}
