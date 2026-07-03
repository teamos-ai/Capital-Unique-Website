import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  alternates: { canonical: "/thank-you" },
  robots: { index: false, follow: false },
  title: "Thank you",
  description:
    "Your message has been received. Capital Unique responds within one business day.",
};

export default function ThankYouPage() {
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
            Message received
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Thank you
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Your message has reached us. The Team reviews every enquiry personally
            and we respond within one business day.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            If your scenario is time-sensitive, you can reach us directly at{" "}
            <a
              href="mailto:hello@capitalunique.com"
              className="text-cu-brandy underline-offset-4 hover:underline"
            >
              hello@capitalunique.com
            </a>
            .
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/charles-ai"
              className="inline-flex items-center gap-2 rounded-md bg-cu-brandy px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-cu-brandy-light transition-colors"
            >
              Prepare with Charles A.I
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/our-work"
              className="inline-flex items-center rounded-md border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground hover:bg-cu-surface-char transition-colors"
            >
              See recent work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
