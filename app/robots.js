import { SITE_URL } from "@/lib/site";

const NOINDEX = [
  "/deliver",
  "/thank-you",
  "/unsubscribe",
  "/charles-ai/waitlist-confirmed",
];

// AI answer engines we explicitly welcome — being citable in
// ChatGPT / Gemini / Perplexity / Claude is the GEO objective.
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "ClaudeBot",
  "Claude-SearchBot",
  "Applebot-Extended",
];

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: NOINDEX },
      ...AI_BOTS.map((ua) => ({
        userAgent: ua,
        allow: "/",
        disallow: NOINDEX,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
