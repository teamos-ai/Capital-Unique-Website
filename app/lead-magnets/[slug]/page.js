import { notFound } from "next/navigation";
import Link from "next/link";
import { LEAD_MAGNETS, getLeadMagnetBySlug } from "@/lib/lead-magnets";
import { CheckCircle2, ArrowRight } from "lucide-react";

function FileIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

export function generateStaticParams() {
  return LEAD_MAGNETS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const magnet = getLeadMagnetBySlug(slug);
  if (!magnet) return { title: "Guide not found" };
  return {
    title: magnet.title,
    description: magnet.description,
  };
}

export default async function LeadMagnetPage({ params }) {
  const { slug } = await params;
  const magnet = getLeadMagnetBySlug(slug);
  if (!magnet) notFound();

  return (
    <article className="bg-background">
      <header className="bg-cu-surface-abyss px-6 pb-16 pt-20 lg:px-10 lg:pb-20 lg:pt-32">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-cu-brandy">
                {magnet.eyebrow}
              </p>
              <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
                {magnet.title}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                {magnet.description}
              </p>
              <p className="mt-8 text-sm text-muted-foreground">
                <span className="text-foreground/80">Audience:</span>{" "}
                {magnet.audience}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="text-foreground/80">Length:</span>{" "}
                {magnet.pages} pages · PDF
              </p>

              <div className="mt-8 flex items-start gap-3 rounded-xl border border-border bg-cu-surface-vault p-4">
                <FileIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-cu-brandy" />
                <p className="text-sm text-muted-foreground">
                  Inside this guide:
                </p>
              </div>
              <ul className="mt-4 space-y-3">
                {magnet.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-base text-muted-foreground"
                  >
                    <CheckCircle2
                      size={18}
                      strokeWidth={1.5}
                      className="mt-1 flex-shrink-0 text-cu-brandy"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form side */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="rounded-2xl border border-border bg-cu-surface-vault p-8 md:p-10">
                <h2 className="font-serif text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                  Send it to my inbox
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  No spam, no autoresponder ladder. The guide arrives in a
                  single email. You can unsubscribe at any time.
                </p>

                {/*
                  GHL Lead Magnet Form — placeholder.
                  When the GHL form is created, replace the form below with:
                  <iframe
                    src={`https://api.leadconnectorhq.com/widget/form/${magnet.ghlFormId}`}
                    style={{ width: "100%", border: "none", minHeight: "320px" }}
                    title={`Get ${magnet.title}`}
                  />
                */}
                <form
                  className="mt-6 grid grid-cols-1 gap-3"
                  action="#"
                  method="post"
                  data-ghl-form-placeholder={`lead-magnet-${magnet.slug}`}
                >
                  <label htmlFor="lm-name" className="sr-only">
                    Full name
                  </label>
                  <input
                    id="lm-name"
                    name="name"
                    type="text"
                    placeholder="Full name"
                    required
                    className="w-full rounded-md border border-border bg-input-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cu-brandy-light"
                  />
                  <label htmlFor="lm-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="lm-email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    required
                    className="w-full rounded-md border border-border bg-input-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cu-brandy-light"
                  />
                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-cu-brandy px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-cu-brandy-light transition-colors"
                  >
                    Email me the guide
                    <ArrowRight size={14} />
                  </button>
                  <p className="mt-2 text-xs text-muted-foreground">
                    By submitting, you agree to our{" "}
                    <Link
                      href="/privacy"
                      className="underline hover:text-foreground"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-cu-brandy">
            More from Capital Unique
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            Beyond the guide
          </h2>
          <p className="mt-6 text-base text-muted-foreground">
            If you&apos;d rather have a direct conversation about your scenario,
            skip the guide. We&apos;re happy to talk.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-cu-brandy px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-cu-brandy-light transition-colors"
            >
              Speak with John
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/lead-magnets"
              className="inline-flex items-center rounded-md border border-border bg-cu-surface-vault px-6 py-3 text-sm font-medium text-foreground hover:bg-cu-surface-char transition-colors"
            >
              All guides
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
