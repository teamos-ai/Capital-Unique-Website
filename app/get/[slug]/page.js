import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lock } from "lucide-react";
import { LEAD_MAGNETS, getLeadMagnet } from "@/lib/lead-magnets";
import { ghlFormId } from "@/lib/ghl-forms";
import { GhlForm } from "@/components/lead-magnets/GhlForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return LEAD_MAGNETS.filter((m) => ghlFormId(m.slug)).map((m) => ({
    slug: m.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const m = getLeadMagnet(slug);
  if (!m) return { title: "Resource not found" };
  return {
    title: `Get: ${m.title}`,
    description: m.summary,
    alternates: { canonical: `/get/${slug}` },
  };
}

export default async function GetLeadMagnetPage({ params }) {
  const { slug } = await params;
  const m = getLeadMagnet(slug);
  if (!m || !ghlFormId(slug)) notFound();

  const groupLabel = m.group === "guides" ? "Guides" : "Free Tools";
  const groupPath = m.group === "guides" ? "/guides" : "/free-tools";

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: groupLabel, path: groupPath },
            { name: m.title, path: `/get/${slug}` },
          ])
        )}
      />
      <section className="bg-cu-surface-abyss px-6 pb-16 pt-20 lg:px-10 lg:pb-20 lg:pt-28">
        <div className="mx-auto max-w-5xl">
          <Link
            href={groupPath}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            All {groupLabel.toLowerCase()}
          </Link>

          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            {/* Teaser */}
            <div>
              <p className="heading-eyebrow mb-5">{m.eyebrow}</p>
              <h1 className="heading-hero">{m.title}</h1>
              <p className="mt-5 text-lg text-muted-foreground md:text-xl">
                {m.subtitle}
              </p>
              <p className="mt-6 text-base text-muted-foreground">
                {m.summary}
              </p>

              <p className="mt-8 text-xs uppercase tracking-[0.2em] text-cu-brandy">
                What&apos;s inside
              </p>
              <ul className="mt-4 space-y-2.5">
                {m.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-base text-muted-foreground"
                  >
                    <CheckCircle2
                      size={18}
                      strokeWidth={1.6}
                      className="mt-0.5 shrink-0 text-cu-brandy"
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm text-muted-foreground">
                <span className="text-foreground/80">For:</span> {m.audience}
                <span className="mx-2 text-border">·</span>
                {m.readMins} min read
              </p>
            </div>

            {/* Form */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-border bg-cu-surface-vault p-6 md:p-7">
                <h2 className="font-serif text-xl font-semibold tracking-tight md:text-2xl">
                  Get instant access
                </h2>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Lock size={11} className="text-cu-brandy" />
                  Name &amp; email — opens immediately, yours to revisit.
                </p>
                <div className="mt-5">
                  <GhlForm slug={slug} formName={`LM — ${m.title}`} />
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  General information only — not financial, credit, tax or
                  investment advice. By submitting you agree to our{" "}
                  <Link
                    href="/privacy"
                    className="underline hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
