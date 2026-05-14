"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowRight, RefreshCw } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.error(error);
    }
  }, [error]);

  return (
    <section className="bg-background px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-cu-brandy">
          Something went wrong
        </p>
        <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          Unexpected error
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          The page didn&apos;t load as expected. This isn&apos;t your fault.
          Try again, or reach us directly.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-md bg-cu-brandy px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-cu-brandy-light transition-colors"
          >
            <RefreshCw size={16} />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-cu-surface-vault px-6 py-3 text-sm font-medium text-foreground hover:bg-cu-surface-char transition-colors"
          >
            Back to home
            <ArrowRight size={14} />
          </Link>
        </div>
        {process.env.NODE_ENV === "development" && error?.message && (
          <pre className="mx-auto mt-12 max-w-2xl overflow-x-auto rounded-lg border border-border bg-cu-surface-ember p-4 text-left text-xs text-muted-foreground">
            {error.message}
          </pre>
        )}
      </div>
    </section>
  );
}
