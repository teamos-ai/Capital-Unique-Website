// Charles A.I chat endpoint.
//
// POST { messages: [{role, content}] } → a streamed plain-text reply.
//
// Flow: run the model once. If it asks to run a calculator (a @@CALC marker),
// we DON'T show that to the user — we run the deterministic engine and make a
// second call so Charles narrates the exact result. Otherwise we stream the
// reply straight through. Model fallback + rate limiting are handled here.

import { buildSystemPrompt, CALC_MARKER } from "@/lib/charles/persona";
import { runCalc } from "@/lib/charles/calc-engine";
import { openRouterStream, streamDeltas, extractCalcMarker } from "@/lib/charles/openrouter";
import { clientIp, makeRateLimiter } from "@/lib/charles/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30; // a calc turn chains two LLM calls

const MAX_MESSAGES = 24; // trailing turns kept from the client
const MAX_CHARS = 4000; // per message

const BUSY =
  "Sorry, I'm fielding a lot at once and can't think straight for a sec. Give it another go in a moment — or drop your name and email and I'll get John onto it directly.";

const encoder = new TextEncoder();
const limited = makeRateLimiter({ windowMs: 60_000, max: 20 });

// Keep only clean user/assistant turns; clamp counts and sizes; require the
// conversation to end on a user turn.
function sanitizeMessages(raw) {
  if (!Array.isArray(raw)) return null;
  const cleaned = raw
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim()
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))
    .slice(-MAX_MESSAGES);
  if (!cleaned.length || cleaned[cleaned.length - 1].role !== "user") return null;
  return cleaned;
}

// marker -> array of calc results (handles single calc or {calcs:[...]}).
function runMarker(marker) {
  if (!marker) return [];
  const specs = Array.isArray(marker.calcs) ? marker.calcs : [marker];
  const results = [];
  for (const s of specs) {
    if (s && typeof s.slug === "string") {
      const r = runCalc(s.slug, s.inputs || {});
      if (r) results.push(r);
    }
  }
  return results;
}

function formatCalcResult(r) {
  const lines = r.outputs.map((o) => `- ${o.label}: ${o.value}`).join("\n");
  return `[${r.title}]\n${r.summary}\n${lines}`;
}

function jsonError(status, error) {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// Stream a model response to `send`, but never let the @@CALC marker reach the
// user. Emits text as it arrives while holding back a short tail (so a marker
// forming across a chunk boundary is caught), stops emitting at the first
// marker, and always accumulates the full text for marker extraction.
async function streamSafe(response, send) {
  const keep = CALC_MARKER.length - 1;
  let full = "";
  let carry = "";
  let stopped = false;
  for await (const delta of streamDeltas(response)) {
    full += delta;
    if (stopped) continue;
    carry += delta;
    const mi = carry.indexOf(CALC_MARKER);
    if (mi >= 0) {
      send(carry.slice(0, mi)); // emit any normal text before the marker
      carry = "";
      stopped = true;
      continue;
    }
    if (carry.length > keep) {
      send(carry.slice(0, carry.length - keep));
      carry = carry.slice(carry.length - keep);
    }
  }
  if (!stopped) send(carry);
  return { full, markerHit: stopped };
}

export async function POST(req) {
  if (limited(clientIp(req))) return jsonError(429, "rate_limited");

  let body;
  try {
    body = await req.json();
  } catch {
    return jsonError(400, "invalid_json");
  }
  const history = sanitizeMessages(body?.messages);
  if (!history) return jsonError(400, "invalid_messages");

  const baseMessages = [{ role: "system", content: buildSystemPrompt() }, ...history];

  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;
      const send = (t) => {
        if (!closed && t) controller.enqueue(encoder.encode(t));
      };
      const close = () => {
        if (!closed) {
          closed = true;
          try {
            controller.close();
          } catch {
            // already closed
          }
        }
      };

      try {
        // ── Phase 1: primary generation, with the marker guarded from leaking ──
        let first;
        try {
          first = await openRouterStream(baseMessages, { signal: req.signal });
        } catch {
          send(BUSY);
          return close();
        }
        const phase1 = await streamSafe(first.response, send);
        if (!phase1.markerHit) return close();

        // ── Phase 2: run the calculator(s) and narrate the exact result ──
        const results = runMarker(extractCalcMarker(phase1.full));
        if (!results.length) {
          send(
            "Hmm, I couldn't run that one. Mind giving me the numbers again — the loan amount, the rate, and the term?"
          );
          return close();
        }

        const resultText = results.map(formatCalcResult).join("\n\n");
        const narrateMessages = [
          ...baseMessages,
          { role: "assistant", content: phase1.full.trim() },
          {
            role: "user",
            content: `CALCULATOR RESULT (from our engine — present these exact figures in your voice as an indicative estimate; don't mention this message or the calculator protocol):\n\n${resultText}`,
          },
        ];

        let second;
        try {
          second = await openRouterStream(narrateMessages, { signal: req.signal });
        } catch {
          // Model unavailable — send the deterministic summaries so the user
          // still gets correct numbers.
          send(results.map((r) => r.summary).join("\n\n"));
          return close();
        }
        // Narration shouldn't run another calc; if a marker sneaks in, the
        // guard drops it rather than leaking the protocol to the user.
        await streamSafe(second.response, send);
        close();
      } catch {
        // Client disconnect or upstream error — just close cleanly.
        close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
