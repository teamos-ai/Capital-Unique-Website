// Pulls the prospect's contact details out of a Charles conversation so the
// hand-off form can be pre-filled (see GHL_HANDOVER_FIELDS in lib/ghl-forms).
//
// Deliberately conservative: a WRONG value in a pre-filled field is worse than
// a blank one, because the prospect is expected to glance and hit submit. When
// a field can't be identified with confidence it's left empty for them to type.
//
// Runs on the client off the existing transcript — no extra model call, so
// opening the hand-off panel stays instant.

const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

// Australian numbers: 04xx xxx xxx, 0[2378] xxxx xxxx, +61 ... — allowing
// spaces, hyphens, dots and brackets as separators.
const PHONE_RE = /(?:\+?61[\s.-]?|0)[\s.-]?\d(?:[\s.-]?\d){8}/g;

// Assistant turns that are asking for a name.
const NAME_ASK_RE =
  /\b(your|the)\s+(first\s+name|full\s+name|name)\b|\bwhat'?s\s+your\s+name\b|\bwho\s+am\s+i\s+speaking\s+(to|with)\b/i;

// "I'm Jane Smith" / "my name is Jane Smith" / "this is Jane Smith"
const NAME_STATEMENT_RE =
  /\b(?:i'?m|i am|my name'?s|my name is|this is|it'?s)\s+([A-Za-z][A-Za-z'’-]{1,20}(?:\s+[A-Za-z][A-Za-z'’-]{1,20}){0,2})\b/i;

// Words that look like a name token but never are.
const NOT_A_NAME = new Set([
  "looking", "after", "keen", "trying", "just", "not", "sure", "here", "good",
  "fine", "ok", "okay", "yes", "no", "thanks", "cheers", "mate", "the", "a",
  "an", "and", "but", "with", "for", "about", "from", "chasing", "wanting",
  "hoping", "needing", "interested", "still", "actually", "probably", "really",
]);

function userMessages(messages) {
  return (messages || []).filter(
    (m) => m && m.role === "user" && !m.error && typeof m.content === "string"
  );
}

function normalisePhone(raw) {
  const digits = raw.replace(/[^\d+]/g, "");
  // +61412345678 -> 0412345678
  if (digits.startsWith("+61")) return "0" + digits.slice(3);
  if (digits.startsWith("61") && digits.length === 11) return "0" + digits.slice(2);
  return digits;
}

// Rejects figures that merely look phone-shaped: money, percentages, years.
function looksLikeMoneyOrRate(text, index, matchLength) {
  const before = text.slice(Math.max(0, index - 2), index);
  const after = text.slice(index + matchLength, index + matchLength + 2);
  if (/[$]/.test(before)) return true;
  if (/^\s*%/.test(after)) return true;
  if (/[.,]\d/.test(after)) return true; // part of a longer decimal
  return false;
}

export function extractEmail(messages) {
  let found = null;
  for (const m of userMessages(messages)) {
    const hits = m.content.match(EMAIL_RE);
    if (hits && hits.length) found = hits[hits.length - 1];
  }
  return found ? found.trim() : "";
}

export function extractPhone(messages) {
  let found = null;
  for (const m of userMessages(messages)) {
    const text = m.content;
    let match;
    PHONE_RE.lastIndex = 0;
    while ((match = PHONE_RE.exec(text)) !== null) {
      if (looksLikeMoneyOrRate(text, match.index, match[0].length)) continue;
      const norm = normalisePhone(match[0]);
      // Australian numbers are 10 digits starting 0.
      if (/^0\d{9}$/.test(norm)) found = norm;
    }
  }
  return found || "";
}

function cleanNameTokens(raw) {
  return raw
    .trim()
    .replace(/[.,!?]+$/, "")
    .split(/\s+/)
    .filter((w) => /^[A-Za-z][A-Za-z'’-]*$/.test(w))
    .filter((w) => !NOT_A_NAME.has(w.toLowerCase()))
    .slice(0, 3);
}

function titleCase(w) {
  return w.charAt(0).toUpperCase() + w.slice(1);
}

// Returns { firstName, lastName } — either may be "".
export function extractName(messages) {
  const list = messages || [];
  let tokens = null;

  // 1. An explicit statement anywhere ("I'm Jane Smith") is the strongest signal.
  for (const m of userMessages(list)) {
    const hit = NAME_STATEMENT_RE.exec(m.content);
    if (hit) {
      const t = cleanNameTokens(hit[1]);
      if (t.length) tokens = t;
    }
  }

  // 2. Otherwise: the user turn immediately after Charles asked for a name,
  //    but only if it's short enough to plausibly BE a name.
  if (!tokens) {
    for (let i = 0; i < list.length - 1; i++) {
      const a = list[i];
      const u = list[i + 1];
      if (!a || a.role !== "assistant" || typeof a.content !== "string") continue;
      if (!u || u.role !== "user" || typeof u.content !== "string") continue;
      if (!NAME_ASK_RE.test(a.content)) continue;
      const words = u.content.trim().split(/\s+/);
      if (words.length > 4) continue; // a sentence, not a name
      if (/[@\d]/.test(u.content)) continue; // email or phone, not a name
      const t = cleanNameTokens(u.content);
      if (t.length) tokens = t;
    }
  }

  if (!tokens || !tokens.length) return { firstName: "", lastName: "" };
  return {
    firstName: titleCase(tokens[0]),
    lastName: tokens.slice(1).map(titleCase).join(" "),
  };
}

export function extractLead(messages) {
  const { firstName, lastName } = extractName(messages);
  return {
    firstName,
    lastName,
    email: extractEmail(messages),
    phone: extractPhone(messages),
  };
}

export default extractLead;
