// LLM plumbing for Charles: model fallback, SSE streaming, and the @@CALC
// marker parser. Provider-agnostic — works against any OpenAI-compatible chat
// endpoint (OpenRouter, Google Gemini's OpenAI endpoint, a local Ollama, ...).
// Just fetch + Web streams.

import { CALC_MARKER } from "@/lib/charles/persona";

// Base URL + key are env-configurable so the provider can be swapped without a
// code change. Defaults to OpenRouter for backward compatibility.
//   OpenRouter: CHARLES_API_BASE=https://openrouter.ai/api/v1
//   Gemini:     CHARLES_API_BASE=https://generativelanguage.googleapis.com/v1beta/openai
const BASE = (process.env.CHARLES_API_BASE || "https://openrouter.ai/api/v1").replace(/\/+$/, "");
const CHAT_URL = `${BASE}/chat/completions`;
const IS_OPENROUTER = BASE.includes("openrouter.ai");

// Extra free OpenRouter models appended after the env-configured ones (only
// when actually on OpenRouter). Free-tier limits are per-model, so more
// fallbacks = more escape hatches. All instruct/chat (reasoning disabled).
const EXTRA_FREE_FALLBACKS = [
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "google/gemma-4-26b-a4b-it:free",
  "nvidia/nemotron-nano-9b-v2:free",
];

// Primary model + comma-separated fallbacks from env, so provider/models swap
// without a code change. Falls through the whole list on failure.
export function charlesModels() {
  const primary =
    process.env.CHARLES_MODEL ||
    (IS_OPENROUTER ? "nvidia/nemotron-3-super-120b-a12b:free" : "gemini-flash-lite-latest");
  const fallbacks = (process.env.CHARLES_MODEL_FALLBACKS || (IS_OPENROUTER ? "" : "gemini-flash-latest"))
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const extra = IS_OPENROUTER ? EXTRA_FREE_FALLBACKS : [];
  // Dedupe, preserving order.
  return [...new Set([primary, ...fallbacks, ...extra])];
}

// Open a streaming completion, walking the fallback list until one answers
// 200. Returns { model, response }; throws (with .status) if all fail.
export async function openRouterStream(messages, { signal, maxTokens = 1200, temperature = 0.3 } = {}) {
  const key = process.env.CHARLES_API_KEY || process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("No LLM API key set (CHARLES_API_KEY / OPENROUTER_API_KEY)");

  let lastStatus = 0;
  for (const model of charlesModels()) {
    let res;
    try {
      // Bound each attempt so a hung upstream can't tie up the function.
      const timeout = AbortSignal.timeout(25_000);
      res = await fetch(CHAT_URL, {
        method: "POST",
        signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          // OpenRouter-only attribution headers.
          ...(IS_OPENROUTER
            ? {
                "HTTP-Referer": "https://www.capitalunique.com",
                "X-Title": "Capital Unique — Charles A.I",
              }
            : {}),
        },
        body: JSON.stringify({
          model,
          messages,
          stream: true,
          max_tokens: maxTokens,
          temperature,
          // OpenRouter-specific flag to force direct (non-reasoning) replies.
          ...(IS_OPENROUTER ? { reasoning: { enabled: false } } : {}),
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
