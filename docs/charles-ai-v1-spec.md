# Charles A.I — v1 Build Spec

_Front-facing assistant at `/charles-ai`. Lightweight, cheap, shippable. For review + sign-off before build._

---

## 1. What v1 is (in one paragraph)

A streaming chat assistant, in an Australian-casual voice, that understands the five slash commands, workshops a person's finance scenario using a curated knowledge base, runs exact numbers from the site's existing calculators, and — when the person's ready — captures their name + email and pushes the full chat transcript into GHL as a contact so John can follow up. No database, no vector store. Runs on the existing Vercel/Next stack. Target cost: **~$0/month**.

---

## 2. Decisions locked

| Area | Decision |
|------|----------|
| LLM | **OpenRouter** free model, via the Vercel AI SDK (swappable later) |
| Knowledge base | **Single curated file** in the repo, injected into the system prompt (RAG-lite, no vector DB) |
| Calculators | **All 12**, run **deterministically** (real JS), not by the model |
| Conversion | Capture **name + email** → create/upsert a **GHL contact** with the transcript in the notes; a human (John) follows up |
| Persona | **Australian, casual, easygoing** — warm and plain-spoken, still credible for finance |
| Compliance | General info + workshop + hand-off only. No personal credit advice, no promised rates/approvals |

---

## 3. Architecture

```
Browser (chat UI, upgraded CharlesCommandBar)
        │  POST { messages, mode }
        ▼
app/api/charles/route.js   ── the whole "server", stateless, streaming
        │
        ├─ System prompt = persona + knowledge base + slash rules + guardrails
        ├─ Calc intent?  → run lib/charles/calc-engine.js (exact numbers) → feed back to model
        ├─ Model call    → OpenRouter (free model) via Vercel AI SDK, streamed
        └─ Lead submit?  → lib/charles/ghl.js → upsert GHL contact + note (transcript)
```

- **Stateless**: the browser sends the running message history each turn. No session store needed for v1.
- **One new API route** is the entire backend.

---

## 4. Persona & voice

Charles is **Australian, casual, easygoing — but sharp**. Think a switched-on broker mate: warm, plain-spoken, confident, never stuffy or salesy. Lightly Aussie ("no worries", "let's have a look", "fair enough", "reckon"), never bogan or gimmicky. He asks good questions, gets to the point, and respects the person's time.

**Do:** short sentences, one question at a time, curious about the deal, honest about what he can and can't do, always nudging gently toward "let's get John on this."
**Don't:** jargon dumps, hype, emoji spam, fake certainty, pressure.

_Example openers:_
> "Righto — give me the shape of the deal and I'll tell you where it could sit. What are we funding, and roughly how much?"
> "Bridging in 3 weeks — tight but doable. What's the security worth, and what's the exit?"

Voice is a touch warmer than the website's written copy, but stays on-brand (restrained, no vague advice).

---

## 5. Knowledge base

**File:** `lib/charles/knowledge.js` (or `.md` imported as a string). Curated, not scraped. Injected wholesale into the system prompt each turn (it's small — a few thousand tokens).

**Contents (distilled from what's already in the repo):**
- Who Capital Unique is, how they work (principal-led, wholesale/commercial, non-bank).
- What they fund: property development, construction, business, commercial, agriculture, private capital.
- The five real scenarios (from `/our-work`) as reference patterns for workshopping.
- FAQ answers (from `/faq`), key lending concepts (LVR, LCR, GRV, DSCR — from the lead magnets).
- Process (enquiry → structure → funding), typical size ("from ~$1M upwards"), timing ranges.
- Contact + disclaimer language.

**Upgrade path (not v1):** if the KB grows past ~1–2k tokens of "always relevant" content, split into topic chunks + simple keyword retrieval, then a vector store only if truly needed.

---

## 6. Calculators — deterministic tools

**Why deterministic:** free OpenRouter models don't reliably support tool/function-calling, and LLMs are bad at arithmetic. So Charles never does the maths.

**How it works:** when the user hits `/calculate`, `/compare`, or asks a number-heavy question, the route detects the calc + collects the needed inputs (Charles asks for any missing ones), runs the **real calculator function**, and hands the **exact result** to the model to explain in plain English.

**Work needed:** extract the pure calc logic out of the `components/calculators/*.jsx` components into plain functions in `lib/charles/calc-engine.js` (many are already close to pure). All **12** are in scope:
`development-feasibility`, `bridging-cost`, `commercial-dscr`, `construction-drawdown`, `true-cost-of-capital`, `investor-yield`, `home-loan-repayment`, `home-loan-borrowing` (borrowing power), `budget-planner`, `stamp-duty`, `home-equity`, `foreign-exchange`.

> ⚠️ The consumer-flavoured ones (home loan, stamp duty, borrowing power, budget) are included per your call — the guardrails (§8) must be firm that these are **general estimates, not personal credit advice**.

---

## 7. Slash commands (behaviours)

| Command | v1 behaviour |
|---------|--------------|
| `/deal` | Workshop a live deal → capture details → nudge to lead capture |
| `/scenario` | "What-if" workshop using the real scenarios as reference patterns |
| `/calculate` | Guided calculator run (deterministic) |
| `/compare` | Run two structures/options side by side (e.g. bridging vs term) |
| `/stack` | Talk through a capital stack (senior / mezz / equity) at a concept level |

Free-text (no slash) → normal conversation, with Charles inferring the right mode.

---

## 8. Conversion & lead capture (the point of it all)

1. Charles workshops the scenario, then offers: _"Want John to take this further? Pop your name and email and I'll send it straight to the team."_
2. A small inline form (or Charles collects name + email in chat).
3. On submit → `lib/charles/ghl.js` **upserts a GHL contact** (Capital Unique location) with:
   - name, email
   - tag: `charles-ai-lead`
   - a **note** containing the full transcript + any calc results + a one-line scenario summary
   - source: `Charles A.I`
4. Existing GHL workflows take over (notify hello@capitalunique.com, etc.).
5. Person sees a confirmation: _"You're in — the team will be in touch. You always reach a person here."_

**Consent line** (near the input): _"By continuing, you agree the team may contact you about your enquiry."_ Standard, keeps you clean given you're capturing PII + storing transcripts.

**Optional:** if you later add a GHL calendar link, Charles can offer "book a time now" as an alternative to the follow-up.

---

## 9. Compliance & guardrails (non-negotiable)

Baked into the system prompt:
- **Lane:** general education + scenario workshop + hand-off to the team. Nothing binding.
- **Never:** give personal credit/financial advice, promise a rate or an approval, state a specific bank will approve a specific deal, or represent an outcome.
- **Calculators:** always framed as **estimates/illustrations**, not advice — especially the consumer ones.
- **Wholesale/commercial framing** consistent with the site's disclaimer; consumer enquiries get a gentle "this is general info, the team will confirm."
- **Escalate to human** for anything specific, binding, or outside scope.
- **Abuse/rate limiting:** basic per-IP rate limit on the API route so a free tier can't be drained; strip prompt-injection attempts (treat user text as data).

---

## 10. Technical implementation

**New files**
- `app/api/charles/route.js` — streaming chat endpoint
- `lib/charles/knowledge.js` — knowledge base
- `lib/charles/persona.js` — system prompt + few-shot examples
- `lib/charles/calc-engine.js` — pure calculator functions (extracted)
- `lib/charles/ghl.js` — GHL contact upsert
- Upgrade `components/charles/CharlesCommandBar.jsx` → chat thread (it already has the input + response state to build on)

**Dependencies**
- `ai` (Vercel AI SDK) + an OpenRouter provider (`@openrouter/ai-sdk-provider`, or the OpenAI-compatible provider pointed at OpenRouter)

**Env vars (Vercel)**
- `OPENROUTER_API_KEY`
- `GHL_LOCATION_ID_CAPITAL_UNIQUE`, `GHL_PIT_CAPITAL_UNIQUE` (contacts write scope)
- `CHARLES_MODEL` (so the free model is swappable without a redeploy of code)

**Model:** pick a current free OpenRouter model (e.g. a free Llama/Qwen/DeepSeek instruct model). Because calcs are deterministic, tool-calling support isn't required — keeps model choice flexible.

---

## 11. Build order (v1)

1. **Chat plumbing** — API route + AI SDK/OpenRouter + streaming; turn the command bar into a chat thread. Charles talks with persona + KB.
2. **Calculators** — extract calc functions; wire `/calculate` + `/compare` deterministically.
3. **Scenario workshop** — `/scenario`, `/deal`, `/stack` guided flows using the real scenarios.
4. **Lead capture** — name/email → GHL contact + transcript note + confirmation + consent line.
5. **Guardrails + QA** — compliance rails, rate limiting, mobile/desktop QA, then ship.

Each phase is independently shippable and QA'd.

---

## 12. Roadmap — where this goes after v1 (your bigger vision)

Scoped as later phases so v1 stays lightweight:

- **v2 — Risk + lender appetite.** A curated **Australian lender knowledge base** (banks + non-bank/private lenders: appetite by asset class, LVR/LCR/GRV ranges, loan sizes, speed, quirks) that Charles references to say _"this shape suits a lender profile like X — let's get John to place it."_ Plus a **risk-scoring heuristic** from the scenario inputs (LVR, exit, timing, borrower profile). This is the "deep research on AU bank lenders" deliverable — a structured data-gathering task.
  - _Compliance note:_ describe lender **types/profiles** and general appetite in educational terms; never claim a named bank will approve a specific deal.
- **v3 — Live market/news awareness.** Keep Charles current on rates/market/news via a periodic digest fed into the KB (a scheduled job writing a "current conditions" snippet), rather than live web calls per message (cheaper, safer).
- **Later:** retrieval/vector store once the KB is large; conversation analytics + a learning loop to improve responses; the GHL calendar for instant booking.

---

## 13. What I need from you to build v1

- **OpenRouter API key** (and a preferred free model, or I'll pick one).
- **GHL Capital Unique location ID + a Private Integration Token** with contacts write scope (you already have the GHL API tooling).
- Sign-off on the **persona voice** (§4) and the **consent line** (§8).
- Confirmation on **which GHL tag/workflow** the new leads should trigger (or I default to `charles-ai-lead`).

---

## 14. Cost

Free OpenRouter model · GHL (already paid) · file-based KB · existing Vercel/Next stack. **No new recurring cost.** Only build time.
