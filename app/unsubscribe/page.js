import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

export const metadata = {
  alternates: { canonical: "/unsubscribe" },
  robots: { index: false, follow: false },
  title: "Unsubscribe",
  description:
    "Unsubscribe from Capital Unique marketing emails and newsletters.",
};

export default function UnsubscribePage() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-background px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-cu-brandy">
          Unsubscribe
        </p>
        <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          Unsubscribe from communications
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          You can stop receiving Capital Unique emails at any time. No friction.
        </p>

        <div className="mt-12 rounded-2xl border border-border bg-cu-surface-vault p-8 text-left md:p-10">
          {/*
            GHL handles the actual unsubscribe action via the link in marketing
            emails (one-click, Spam Act compliant). This page exists as a
            branded fallback for users who arrive here directly, and as the
            destination GHL can redirect to after processing.

            When wired:
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/<UNSUBSCRIBE_FORM_ID>"
              style={{ width: "100%", border: "none", minHeight: "240px" }}
              title="Unsubscribe from Capital Unique"
            />
          */}
          <h2 className="font-serif text-xl font-semibold leading-tight">
            One-click unsubscribe
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            The fastest way to unsubscribe is via the link at the bottom of any
            email you&apos;ve received from us. That removes you from the list
            immediately.
          </p>

          <div className="my-8 h-px bg-border" />

          <h2 className="font-serif text-xl font-semibold leading-tight">
            Or email us
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            If you can&apos;t find an email or the link isn&apos;t working,
            email us with the address you want unsubscribed and we&apos;ll
            action it within one business day.
          </p>
          <a
            href="mailto:hello@capitalunique.com?subject=Unsubscribe"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-cu-brandy px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-cu-brandy-light transition-colors"
          >
            <Mail size={16} />
            Email to unsubscribe
          </a>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Unsubscribing only affects marketing communications. We may still
          contact you about an active engagement or in response to a direct
          enquiry. See our{" "}
          <Link href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </Link>{" "}
          for detail.
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-1 text-sm font-medium text-cu-brandy hover:text-cu-brandy-light transition-colors"
        >
          Back to home <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
