import { SITE_URL } from "@/lib/site";
import { CALCULATORS } from "@/lib/calculators";
import { FREE_TOOLS } from "@/lib/free-tools";

// Indexable routes only. Utility/no-index pages (deliver, thank-you,
// unsubscribe, charles-ai/waitlist-confirmed) are deliberately excluded.
const STATIC = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/get-capital", priority: 0.9, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
  { path: "/charles-ai", priority: 0.7, changeFrequency: "monthly" },
  { path: "/business", priority: 0.9, changeFrequency: "monthly" },
  { path: "/commercial", priority: 0.9, changeFrequency: "monthly" },
  { path: "/property-development", priority: 0.9, changeFrequency: "monthly" },
  { path: "/construction", priority: 0.9, changeFrequency: "monthly" },
  { path: "/agriculture", priority: 0.85, changeFrequency: "monthly" },
  { path: "/private-capital", priority: 0.9, changeFrequency: "monthly" },
  { path: "/overview", priority: 0.85, changeFrequency: "monthly" },
  { path: "/calculators", priority: 0.85, changeFrequency: "monthly" },
  { path: "/free-tools", priority: 0.7, changeFrequency: "monthly" },
  { path: "/articles", priority: 0.7, changeFrequency: "weekly" },
  { path: "/guides", priority: 0.7, changeFrequency: "monthly" },
  { path: "/insights-and-resources", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "yearly" },
  { path: "/our-work", priority: 0.75, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/press", priority: 0.5, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/disclaimer", priority: 0.2, changeFrequency: "yearly" },
  { path: "/sitemap", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap() {
  const now = new Date();
  const base = STATIC.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const calc = CALCULATORS.map((c) => ({
    url: `${SITE_URL}/calculators/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const tools = FREE_TOOLS.map((t) => ({
    url: `${SITE_URL}/free-tools/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.55,
  }));

  return [...base, ...calc, ...tools];
}
