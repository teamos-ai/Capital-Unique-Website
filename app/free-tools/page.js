import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { FREE_TOOLS } from "@/lib/free-tools";
import { ArrowRight } from "lucide-react";

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
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

export const metadata = {
  title: "Free Tools",
  description:
    "Free, considered guides and frameworks on non-bank capital and private lending in Australia. For borrowers and investors who want to think clearly before they act.",
};

export default function FreeToolsIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Free Tools"
        heading="Considered guides, free to read"
        body="Each guide is built to help you think clearly about a specific decision. No fluff, no upsell — just the framework, the trade-offs, and the questions to ask."
      />

      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {FREE_TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={`/free-tools/${tool.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-cu-surface-vault p-8 transition-colors hover:bg-cu-surface-char md:p-10"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-cu-brandy-darkest text-cu-brandy">
                  <FileIcon className="h-5 w-5" />
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-cu-brandy">
                  {tool.eyebrow}
                </p>
                <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                  {tool.title}
                </h2>
                <p className="mt-4 flex-1 text-base text-muted-foreground">
                  {tool.description}
                </p>
                <p className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-cu-brandy group-hover:text-cu-brandy-light">
                  Get the guide <ArrowRight size={14} />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
