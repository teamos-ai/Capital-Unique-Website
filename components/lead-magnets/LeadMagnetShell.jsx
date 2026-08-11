import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Lock, CheckCircle2 } from "lucide-react";
import { GROUP_HERO } from "@/lib/lead-magnet-images";

// Gated content-page shell. Reached only via the GHL form redirect
// (page is noindex + unlisted). Renders standalone regardless.
export function LeadMagnetShell({ magnet, children }) {
  const backHref = magnet.group === "guides" ? "/guides" : "/free-tools";
  const backLabel = magnet.group === "guides" ? "All guides" : "All free tools";
  const hero = GROUP_HERO[magnet.group];

  return (
    <article className="bg-background">
      {/* Access bar */}
      <div className="border-b border-border bg-cu-surface-abyss">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-6 py-3 text-xs text-muted-foreground lg:px-10">
          <Lock size={12} className="text-cu-brandy" />
          <span>
            Instant access — Capital Unique resource. Yours to revisit any time.
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="bg-background px-6 pt-16 lg:px-10 lg:pt-24">
        <div className="mx-auto max-w-3xl">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            {backLabel}
          </Link>
          <p className="heading-eyebrow mt-8 mb-5">{magnet.eyebrow}</p>
          <h1 className="heading-hero">{magnet.title}</h1>
          <p className="mt-5 text-lg text-muted-foreground md:text-xl">
            {magnet.subtitle}
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            <span className="text-foreground/80">For:</span> {magnet.audience}
            <span className="mx-2 text-border">·</span>
            {magnet.readMins} min read
          </p>
        </div>
      </header>

      {/* Body */}
      <div className="px-6 py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl">{children}</div>
      </div>

      {/* Compliance */}
      <div className="px-6 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-border bg-cu-surface-vault px-6 py-5">
            <p className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground/85">
                General information only.
              </span>{" "}
              This resource is general in nature and does not constitute
              personal financial, credit, tax or investment advice. Capital
              Unique does not hold an Australian Credit Licence and provides
              services for wholesale and commercial scenarios only. Consider
              your own circumstances and seek independent advice before acting.
            </p>
          </div>
        </div>
      </div>

      {/* CTA — carries the group hero. Both heroes are full-length 4:5
          portraits (the subjects run to the bottom of the frame), so the
          box is held at 4:5 and width-capped rather than letterboxed. */}
      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-cu-surface-vault p-8 md:p-12">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-10">
            {hero && (
              <div className="relative aspect-[4/5] w-full max-w-[14rem] shrink-0 overflow-hidden rounded-xl border border-border md:w-60 md:max-w-none">
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  fill
                  sizes="(max-width: 768px) 224px, 240px"
                  className="object-cover"
                />
              </div>
            )}

            <div className="text-center md:flex-1 md:text-left">
              <p className="heading-eyebrow mb-4">Next step</p>
              <h2 className="heading-card">Have the real conversation</h2>
              <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground md:mx-0">
                A framework gets you ready. A scenario gets decided in a
                conversation — with one person, end to end.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-cu-brandy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-cu-brandy-light"
                >
                  Speak with Team
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/charles-ai"
                  className="inline-flex items-center rounded-md border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-cu-surface-char"
                >
                  Workshop it with Charles A.I
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

// ── Content primitives (server-safe, theme-aware) ───────────────────

export function Lead({ children }) {
  return (
    <p className="mb-10 text-lg leading-relaxed text-foreground/90 md:text-xl">
      {children}
    </p>
  );
}

export function Section({ kicker, title, children }) {
  return (
    <section className="mb-12">
      {kicker && (
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-cu-brandy">
          {kicker}
        </p>
      )}
      <h2 className="font-serif text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export function Callout({ children }) {
  return (
    <div className="my-7 rounded-xl border border-cu-brandy/30 bg-cu-brandy-darkest/40 px-5 py-4 text-sm leading-relaxed text-foreground/90">
      {children}
    </div>
  );
}

export function List({ items, numbered = false }) {
  const Tag = numbered ? "ol" : "ul";
  return (
    <Tag
      className={`mt-2 space-y-2.5 ${
        numbered ? "list-decimal pl-5" : "list-none"
      }`}
    >
      {items.map((it, i) => (
        <li
          key={i}
          className={`text-base leading-relaxed text-muted-foreground ${
            numbered ? "" : "flex items-start gap-3"
          }`}
        >
          {!numbered && (
            <CheckCircle2
              size={18}
              strokeWidth={1.6}
              className="mt-0.5 shrink-0 text-cu-brandy"
            />
          )}
          <span>{it}</span>
        </li>
      ))}
    </Tag>
  );
}

// (SwipeDeck moved to ./SwipeDeck.jsx — interactive, client-side.)

// Cheat-sheet zone + key/value rows.
export function CheatZone({ title, children }) {
  return (
    <div className="rounded-2xl border border-border bg-cu-surface-vault p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-cu-brandy">
        {title}
      </p>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

export function KeyRow({ k, v }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border pb-3 last:border-0 last:pb-0">
      <span className="text-sm font-medium text-foreground">{k}</span>
      <span className="text-sm leading-relaxed text-muted-foreground">{v}</span>
    </div>
  );
}

// Staged checklist — each item is a tickable action + a one-line why.
export function ChecklistGroup({ stage, n, items }) {
  return (
    <section className="mb-8 rounded-2xl border border-border bg-cu-surface-vault p-6 md:p-7">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-cu-brandy-darkest font-mono text-xs text-cu-brandy">
          {n}
        </span>
        <h2 className="font-serif text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {stage}
        </h2>
      </div>
      <ul className="mt-5 space-y-4">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3">
            <span
              aria-hidden
              className="mt-0.5 h-4 w-4 shrink-0 rounded-[4px] border border-cu-brandy/60"
            />
            <span>
              <span className="block text-sm font-medium text-foreground">
                {it.do}
              </span>
              <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                {it.why}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
