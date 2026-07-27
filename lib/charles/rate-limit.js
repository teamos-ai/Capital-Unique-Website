// Tiny best-effort in-memory rate limiter. State lives per serverless
// instance, so it throttles a single hammering client on a warm instance
// rather than enforcing hard global limits — enough to deter casual abuse of
// the free LLM tier. For hard limits, back it with Vercel KV / Upstash.

export function clientIp(req) {
  // Prefer platform-set headers (Vercel writes the true client IP to x-real-ip
  // / x-vercel-forwarded-for). The leftmost x-forwarded-for token is
  // client-controllable and trivially spoofable, so it's the last resort.
  const real = req.headers.get("x-real-ip") || req.headers.get("x-vercel-forwarded-for");
  if (real) return real.split(",")[0].trim();
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
}

export function makeRateLimiter({ windowMs, max }) {
  const hits = new Map(); // ip -> timestamps[]
  return function limited(ip) {
    const now = Date.now();
    const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
    arr.push(now);
    hits.set(ip, arr);
    if (hits.size > 5000) {
      for (const [k, v] of hits) {
        if (!v.some((t) => now - t < windowMs)) hits.delete(k);
      }
    }
    return arr.length > max;
  };
}
