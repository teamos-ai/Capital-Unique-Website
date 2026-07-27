// GoHighLevel (LeadConnector) lead capture for Charles.
//
// Upserts a contact (dedupes on email within the location) and attaches the
// chat transcript as a note, tagged so the client's existing GHL workflows
// pick it up and notify hello@capitalunique.com.
//
// NOTE: GHL sits behind Cloudflare bot-management that 403s a browser-like or
// python User-Agent. Node's fetch (undici) default UA passes — so do NOT set
// a custom User-Agent header here.

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

function ghlHeaders() {
  return {
    Authorization: `Bearer ${process.env.GHL_PRIVATE_INTEGRATION_TOKEN}`,
    Version: GHL_VERSION,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

function splitName(name) {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  return { firstName: parts[0] || "", lastName: parts.slice(1).join(" ") };
}

function buildNote({ summary, transcript }) {
  const parts = ["Lead captured via Charles A.I."];
  if (summary) parts.push(`\nScenario: ${summary}`);
  parts.push(`\n\n— Conversation —\n${transcript || "(no transcript captured)"}`);
  return parts.join("").slice(0, 12000);
}

export async function upsertLead({ name, email, transcript, summary } = {}) {
  const locationId = process.env.GHL_LOCATION_ID;
  if (!locationId || !process.env.GHL_PRIVATE_INTEGRATION_TOKEN) {
    throw new Error("GHL is not configured (GHL_LOCATION_ID / GHL_PRIVATE_INTEGRATION_TOKEN)");
  }
  const tag = process.env.GHL_LEAD_TAG || "charles-ai-lead";
  const { firstName, lastName } = splitName(name);

  // Each call is bounded by its own timeout — and deliberately NOT tied to the
  // client's request signal, so a captured lead still saves even if the person
  // closes the tab right after hitting send.
  // 1. Upsert the contact (dedupes on email).
  const upsertRes = await fetch(`${GHL_BASE}/contacts/upsert`, {
    method: "POST",
    signal: AbortSignal.timeout(10_000),
    headers: ghlHeaders(),
    body: JSON.stringify({
      locationId,
      name: name || undefined,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      email,
      tags: [tag],
      source: "Charles A.I",
    }),
  });
  if (!upsertRes.ok) {
    const detail = (await upsertRes.text()).slice(0, 200);
    throw new Error(`GHL upsert failed: ${upsertRes.status} ${detail}`);
  }
  const data = await upsertRes.json();
  const contactId = data?.contact?.id || data?.id;
  if (!contactId) throw new Error("GHL upsert returned no contact id");

  // 2. Attach the transcript as a note. A note failure must not lose the lead.
  let noteOk = false;
  try {
    const noteRes = await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
      method: "POST",
      signal: AbortSignal.timeout(10_000),
      headers: ghlHeaders(),
      body: JSON.stringify({ body: buildNote({ summary, transcript }) }),
    });
    noteOk = noteRes.ok;
  } catch {
    noteOk = false;
  }

  return { contactId, isNew: !!data?.new, noteOk };
}
