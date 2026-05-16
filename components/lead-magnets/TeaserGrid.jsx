import { ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { accessPath } from "@/lib/lead-magnets";
import { SITE_URL } from "@/lib/site";

// Public, indexed teaser cards. The "Get instant access" button points
// to the GHL hosted form (set `formUrl` in lib/lead-magnets.js). Wire
// each GHL form's on-submit redirect to:  SITE_URL + accessPath(m)
// (e.g. https://www.capitalunique.com/guides/borrowers-guide).
export function TeaserGrid({ magnets }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {magnets.map((m) => {
        const comingSoon = m.phase !== 1;
        return (
          <div
            key={m.slug}
            className="flex flex-col rounded-2xl border border-border bg-cu-surface-vault p-8 md:p-10"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.2em] text-cu-brandy">
                {m.eyebrow}
              </p>
              {comingSoon && (
                <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                  Coming soon
                </span>
              )}
            </div>
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

            {comingSoon ? (
              <span className="inline-flex w-fit items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium text-muted-foreground">
                Coming soon
              </span>
            ) : (
              <a
                href={m.formUrl || "#"}
                {...(m.formUrl
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : { "data-ghl-form-placeholder": `lead-magnet-${m.slug}` })}
                className="inline-flex w-fit items-center gap-2 rounded-md bg-cu-brandy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-cu-brandy-light"
              >
                Get instant access
                <ArrowRight size={15} />
              </a>
            )}
            {!comingSoon && (
              <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lock size={11} className="text-cu-brandy" />
                {m.readMins} min · name + email · sent &amp; unlocked instantly
              </p>
            )}
            {/* GHL: redirect on submit → {SITE_URL}{accessPath(m)} */}
            <span hidden data-redirect={`${SITE_URL}${accessPath(m)}`} />
          </div>
        );
      })}
    </div>
  );
}
