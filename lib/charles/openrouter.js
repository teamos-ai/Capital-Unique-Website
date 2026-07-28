// OpenRouter plumbing for Charles: model fallback, SSE streaming, and the
// @@CALC marker parser. Framework-agnostic — just fetch + Web streams.

import { CALC_MARKER } from "@/lib/charles/persona";

const OR_URL = "https://openrouter.ai/api/v1/chat/completions";

// Extra free models appended after the env-configured ones. Free-tier limits
// are per-model, so a burst of 429s on the primary/fallback has more escape
// hatches. All are instruct/chat models (reasoning is disabled on the request).
const EXTRA_FREE_FALLBACKS = [
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "google/gemma-4-26b-a4b-it:free",
  "nvidia/nemotron-nano-9b-v2:free",
];

// Primary model + comma-separated fallbacks, both from env so they can be
// swapped without a code change (e.g. to a paid model for reliability). Free
// tiers rate-limit, so we fall through the whole list.
export function charlesModels() {
  const primary = process.env.CHARLES_MODEL || "nvidia/nemotron-3-super-120b-a12b:free";
  const fallbacks = (process.env.CHARLES_MODEL_FALLBACKS || "google/gemma-4-31b-it:free")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  // Dedupe, preserving order.
  return [...new Set([primary, ...fallbacks, ...EXTRA_FREE_FALLBACKS])];
}

// Open a streaming completion, walking the fallback list until one answers
// 200. Returns { model, response }; throws (with .status) if all fail.
export async function openRouterStream(messages, { signal, maxTokens = 700, temperature = 0.3 } = {}) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("OPENROUTER_API_KEY is not set");

  let lastStatus = 0;
  for (const model of charlesModels()) {
    let res;
    try {
      // Bound each attempt so a hung upstream can't tie up the function.
      const timeout = AbortSignal.timeout(25_000);
      res = await fetch(OR_URL, {
        method: "POST",
        signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          // OpenRouter attribution headers — help ranking and analytics.
          "HTTP-Referer": "https://www.capitalunique.com",
          "X-Title": "Capital Unique — Charles A.I",
        },
        body: JSON.stringify({
          model,
          messages,
          stream: true,
          max_tokens: maxTokens,
          temperature,
          reasoning: { enabled: false }, // reasoning models -> fast, direct replies
        }),
      });
    } catch {
      if (signal?.aborted) throw new Error("client aborted"); // stop the whole request
      continue; // timeout or network error — try the next model
    }
    if (res.ok && res.body) return { model, response: res };
    lastStatus = res.status; // 429 / 5xx — try the next model
  }
  const err = new Error(`All Charles models failed (last status ${lastStatus})`);
  err.status = lastStatus;
  throw err;
}

// Async generator of content deltas from an OpenRouter SSE stream.
export async function* streamDeltas(response) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      let nl;
      while ((nl = buf.indexOf("\n")) >= 0) {
        const line = buf.slice(0, nl).trim();
        buf = buf.slice(nl + 1);
        if (!line || line.startsWith(":")) continue; // keepalive / comment
        if (!line.startsWith("data:")) continue;
        const data = line.slice(5).trim();
        if (data === "[DONE]") return;
        try {
          const json = JSON.parse(data);
          const delta = json.choices?.[0]?.delta?.content;
          if (delta) yield delta;
        } catch {
          // ignore partial or non-JSON keepalive frames
        }
      }
    }
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // already released
    }
  }
}

// Find a @@CALC marker anywhere in `text` and brace-match its JSON payload.
// Returns the parsed object ({slug,inputs} or {calcs:[...]}) or null.
export function extractCalcMarker(text) {
  const i = text.indexOf(CALC_MARKER);
  if (i < 0) return null;
  const open = text.indexOf("{", i);
  if (open < 0) return null;
  let depth = 0;
  for (let k = open; k < text.length; k++) {
    const ch = text[k];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        try {
          return JSON.parse(text.slice(open, k + 1));
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}
