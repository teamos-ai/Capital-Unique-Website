import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { COMPANY } from "@/lib/company-info";

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22.675 0h-21.35C.59 0 0 .59 0 1.32v21.35C0 23.41.59 24 1.325 24H12.82V14.71h-3.13v-3.62h3.13V8.41c0-3.1 1.89-4.79 4.66-4.79 1.32 0 2.46.1 2.79.14v3.24h-1.92c-1.5 0-1.79.71-1.79 1.76v2.31h3.59l-.47 3.62h-3.12V24h6.12c.73 0 1.32-.59 1.32-1.32V1.32C24 .59 23.41 0 22.675 0z" />
    </svg>
  );
}

// Pick the first live social channel from COMPANY.social.
// Auto-adapts when more channels come online — no edit needed here.
const SOCIAL_FOLLOW = (() => {
  if (COMPANY.social.linkedin)
    return { url: COMPANY.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon };
  if (COMPANY.social.facebook)
    return { url: COMPANY.social.facebook, label: "Facebook", Icon: FacebookIcon };
  return null;
})();

export const metadata = {
  alternates: { canonical: "/charles-ai/waitlist-confirmed" },
  robots: { index: false, follow: false },
  title: "Early access requested",
  description:
    "Your request for early access to Charles A.I has been received. We'll be in touch as the first cohort opens.",
};

export default function WaitlistConfirmedPage() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-background px-6 py-20 lg:px-10">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border bg-cu-surface-vault px-8 py-16 text-center md:px-16 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, var(--cu-brandy-darkest) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10">
          <div className="mx-auto mb-8 inline-flex h-14 w-14 items-center justify-center rounded-full bg-cu-brandy-darkest text-cu-brandy">
            <CheckCircle2 size={28} strokeWidth={1.5} />
          </div>
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
            Request received
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Early access requested
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            We&apos;ll be in touch as the first cohort opens. Charles A.I is being
            built carefully — no announcement until it actually helps you do
            the thinking.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            In the meantime, if your scenario is time-sensitive, you can speak
            with John directly.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-cu-brandy px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-cu-brandy-light transition-colors"
            >
              Speak with Team now
              <ArrowRight size={16} />
            </Link>
            {SOCIAL_FOLLOW && (
              <a
                href={SOCIAL_FOLLOW.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground hover:bg-cu-surface-char transition-colors"
              >
                <SOCIAL_FOLLOW.Icon className="h-4 w-4" />
                Follow on {SOCIAL_FOLLOW.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
