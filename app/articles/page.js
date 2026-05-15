import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { ArrowRight } from "lucide-react";

export const metadata = {
  alternates: { canonical: "/articles" },
  title: "Articles",
  description:
    "Clear thinking for unique capital. Thoughtful perspectives on private finance, non-bank lending, and capital strategy.",
};

const ARTICLES = [
  {
    title: "When banks say no, alternatives emerge",
    body: "Understanding non-conforming lending and when it makes sense.",
    category: "Private finance",
    href: "#article-1",
  },
  {
    title: "Structuring capital for development projects",
    body: "How developers navigate complex financing across multiple stages.",
    category: "Property",
    href: "#article-2",
  },
  {
    title: "Private capital and portfolio diversification",
    body: "Why sophisticated investors consider structured lending opportunities.",
    category: "Investing",
    href: "#article-3",
  },
];

export default function ArticlesPage() {
  return (
    <>
      <PageHero
        eyebrow="Articles"
        heading="Clear Thinking for Unique Capital."
        body="Thoughtful perspectives on private finance, non-bank lending, and capital strategy—written to help you understand your options and make informed decisions."
      />

      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
              Recent writing
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Observations on capital
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Clear perspectives on private finance and complex lending
              scenarios.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {ARTICLES.map((article) => (
              <Link
                key={article.title}
                href={article.href}
                className="group flex flex-col rounded-2xl border border-border bg-cu-surface-vault p-8 transition-colors hover:bg-cu-surface-char"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-cu-brandy">
                  {article.category}
                </p>
                <h3 className="mt-4 font-serif text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 text-base text-muted-foreground">
                  {article.body}
                </p>
                <p className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-cu-brandy group-hover:text-cu-brandy-light">
                  Read article <ArrowRight size={14} />
                </p>
              </Link>
            ))}
          </div>
          {/*
            TODO: Articles are placeholder structural content. When real articles
            are written, replace ARTICLES array above with real metadata, and
            wire each href to /articles/[slug] dynamic routes (post-launch).
          */}
        </div>
      </section>

      <CTABlock
        eyebrow="Stay informed"
        heading="Stay informed on private finance"
        body="Subscribe to receive new articles as they're published—no spam, just considered writing."
        primaryCta={{ label: "Subscribe", href: "#newsletter" }}
        secondaryCta={{ label: "Speak with John", href: "/contact" }}
      />
    </>
  );
}
