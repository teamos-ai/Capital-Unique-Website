// Charles A.I lead capture endpoint.
//
// POST { name, email, messages, summary } → creates/updates a GHL contact
// with the transcript in a note so John and the team follow up.

import { upsertLead } from "@/lib/charles/ghl";
import { clientIp, makeRateLimiter } from "@/lib/charles/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const limited = makeRateLimiter({ windowMs: 60_000, max: 6 });
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(status, obj) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function formatTranscript(messages) {
  if (!Array.isArray(messages)) return "";
  return messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim()
    )
    .slice(-40)
    .map((m) => `${m.role === "user" ? "Client" : "Charles"}: ${m.content.trim()}`)
    .join("\n\n")
    .slice(0, 10000);
}

export async function POST(req) {
  if (limited(clientIp(req))) return json(429, { error: "rate_limited" });

  let body;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "invalid_json" });
  }

  const name = String(body?.name || "").trim().slice(0, 120);
  const email = String(body?.email || "").trim().slice(0, 200);
  if (!name) return json(400, { error: "name_required" });
  if (!EMAIL_RE.test(email)) return json(400, { error: "invalid_email" });

  const transcript = formatTranscript(body?.messages);
  const summary = String(body?.summary || "").slice(0, 500);

  try {
    await upsertLead({ name, email, transcript, summary });
    return json(200, { ok: true });
  } catch (e) {
    console.error("[charles/lead] upsert failed:", e?.message || e);
    return json(502, { error: "capture_failed" });
  }
}
