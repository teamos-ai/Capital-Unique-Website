import Link from "next/link";
import { ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { LEAD_MAGNET_ACCESS, accessHref } from "@/lib/ghl-forms";

// Public, indexed teaser cards. "Get instant access" → the on-brand
// landing page (/get/[slug]) which embeds the GHL form. The GHL form
// (configured in GHL) redirects on submit to the gated content page.
export function TeaserGrid({ magnets }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {magnets.map((m) => (
        <div
          key={m.slug}
          className="flex flex-col rounded-2xl border border-border bg-cu-surface-vault p-8 md:p-10"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-cu-brandy">
            {m.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
            {m.title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{m.subtitle}</p>
          <p className="mt-4 text-base text-muted-foreground">{m.summary}</p>

          <ul className="mt-5 space-y-2.5">
            {m.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2.5 text-sm text-muted-foreground"
              >
                <CheckCircle2
                  size={16}
                  strokeWidth={1.6}
                  className="mt-0.5 shrink-0 text-cu-brandy"
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex-1" />

          <Link
            href={accessHref(m.slug)}
            {...(LEAD_MAGNET_ACCESS === "direct"
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="inline-flex w-fit items-center gap-2 rounded-md bg-cu-brandy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-cu-brandy-light"
          >
            Get instant access
            <ArrowRight size={15} />
          </Link>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock size={11} className="text-cu-brandy" />
            {m.readMins} min · name + email · opens instantly
          </p>
        </div>
      ))}
    </div>
  );
}
