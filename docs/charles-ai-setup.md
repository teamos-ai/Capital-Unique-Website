# Charles A.I — setup & operations

Charles A.I is live in code on `/charles-ai`. To make it run in production you need to add the environment variables below in Vercel. **No secret values live in this repo** — they're in your local `.env.local` (git-ignored) and must be added to Vercel by hand.

## 1. Environment variables (Vercel → Project → Settings → Environment Variables)

Add these for **Production** (and Preview if you want it working on preview deploys):

| Variable | What it is |
|----------|-----------|
| `OPENROUTER_API_KEY` | Your OpenRouter key (`sk-or-v1-…`). Powers the chat. |
| `CHARLES_MODEL` | Primary model. Default: `nvidia/nemotron-3-super-120b-a12b:free` |
| `CHARLES_MODEL_FALLBACKS` | Comma-separated fallback models. Default: `google/gemma-4-31b-it:free` |
| `GHL_LOCATION_ID` | Capital Unique GHL location id. |
| `GHL_PRIVATE_INTEGRATION_TOKEN` | GHL Private Integration Token (`pit-…`), contacts write scope. |
| `GHL_LEAD_TAG` | Tag applied to captured leads. Default: `charles-ai-lead` |

The exact values are the ones you supplied — copy them from your `.env.local` (or the message where you sent them) into Vercel. After adding them, **redeploy** (Vercel → Deployments → Redeploy) so the functions pick them up.

## 2. Important: OpenRouter free-tier limits

Free models on OpenRouter are rate-limited. In testing we regularly saw HTTP 429s under rapid use. Two things to know:
- **The app handles it gracefully** — it falls through the model list, and if all are busy it tells the person to try again or leave their details.
- **To lift the daily cap**, add a small credit balance to your OpenRouter account (OpenRouter raises the free-model daily limit substantially once you hold ≥ ~$10). Recommended before any real traffic. You can also swap `CHARLES_MODEL` to a cheap paid model at any time — no code change, just the env var.

## 3. How it works (for future you)

- **Chat**: `app/api/charles/route.js` calls OpenRouter streaming directly and re-streams plain text to the browser. No AI SDK dependency.
- **Calculators**: Charles never does maths. When it wants a number it emits a hidden `@@CALC {json}` marker; the route runs the real calculator in `lib/charles/calc-engine.js` (math copied verbatim from the site's 12 `/calculators`) and has Charles narrate the exact result.
- **Knowledge**: `lib/charles/knowledge.js` is a single prompt-injected brief, composed from the real scenarios, company info and calculator list already in the repo (so it can't drift).
- **Persona / rules**: `lib/charles/persona.js` — Aussie-casual voice + compliance guardrails. This is the "training"; edit it to tune behaviour.
- **Lead capture**: the chat's "Hand this to John" form posts to `app/api/charles/lead/route.js`, which upserts a GHL contact (tag `charles-ai-lead`) with the transcript in a note. Your existing GHL workflows take it from there.

## 4. Smoke test after deploy

On the live `/charles-ai`:
1. Say `G'day, do you fund construction?` → expect a natural Aussie reply.
2. Say `run bridging on 2 million, 1.2% a month, 6 months` → expect exact numbers (≈ $187,500 cost, ≈ 18.8% p.a.).
3. Click **Hand this to John**, enter a name + a test email, tick consent, send → expect the "you're in" confirmation, and a new contact tagged `charles-ai-lead` in GHL with the transcript in a note (delete the test contact after).

## 5. Where it goes next (from the v1 spec)

See `docs/charles-ai-v1-spec.md` §12: risk scoring, an Australian lender-appetite knowledge base, and live market/news awareness — all deliberately out of scope for v1.
