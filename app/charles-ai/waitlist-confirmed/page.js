import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

function LinkedInIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export const metadata = {
  title: "Waitlist confirmed",
  description:
    "You're on the Charles A.I waitlist. We'll let you know the moment it's ready.",
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
            You&apos;re in
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Waitlist confirmed
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            You&apos;ll be among the first to know when Charles A.I is ready.
            We&apos;re building it carefully — no announcement until it actually
            helps you do the thinking.
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
              Speak with John now
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground hover:bg-cu-surface-char transition-colors"
            >
              <LinkedInIcon className="h-4 w-4" />
              Follow on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
