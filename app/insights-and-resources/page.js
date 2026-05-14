import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { FeatureGrid } from "@/components/shared/FeatureGrid";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Insights & Resources",
  description:
    "In-depth guides, practical calculators, and calm expert articles on private finance and capital strategy.",
};

const RESOURCE_TYPES = [
  {
    iconName: "BookOpen",
    title: "In-depth guides for borrowers",
    body: "Downloadable frameworks covering loan structures, assessment criteria, and strategic capital planning.",
  },
  {
    iconName: "Calculator",
    title: "Practical calculators and tools",
    body: "Simple, functional tools to model scenarios and understand the mechanics of your financing.",
  },
  {
    iconName: "FileText",
    title: "Calm, expert articles",
    body: "Thoughtful commentary on private finance, market conditions, and strategic decision-making.",
  },
];

const GUIDES = [
  {
    title: "Non-bank lending explained",
    body: "A clear breakdown of how non-bank finance works and when it makes sense for your situation.",
    href: "/guides",
  },
  {
    title: "What lenders actually look for",
    body: "Understanding the real criteria behind lending decisions and how to present your case effectively.",
    href: "/guides",
  },
  {
    title: "Capital structure for developers",
    body: "A practical guide to layering debt, equity, and alternative capital for development projects.",
    href: "/guides",
  },
];

const CALCULATORS = [
  {
    title: "Borrowing capacity",
    body: "Test different debt arrangements and understand the impact on your position.",
    href: "/calculators",
  },
  {
    title: "Bridging finance",
    body: "See what non-bank finance actually costs and how long the process takes.",
    href: "/calculators",
  },
  {
    title: "Development feasibility",
    body: "Assess your ability to service debt across different scenarios and structures.",
    href: "/calculators",
  },
];

const ARTICLES = [
  {
    title: "When banks step back, opportunity emerges",
    body: "Understanding the cycles that create space for alternative capital solutions.",
    href: "/articles",
  },
  {
    title: "The case for layered capital structures",
    body: "Why sophisticated investors combine multiple funding sources for resilience.",
    href: "/articles",
  },
  {
    title: "Speed versus certainty in capital decisions",
    body: "How to think about the trade-offs when you need capital quickly.",
    href: "/articles",
  },
];

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights & Resources"
        heading="Three ways to get clarity"
        body="Each resource is designed to help you understand your options and make informed decisions with confidence."
      />

      <FeatureGrid items={RESOURCE_TYPES} background="abyss" />

      <CardSection
        eyebrow="Essential reading"
        heading="In-depth guides"
        body="Downloadable resources to guide your decisions."
        items={GUIDES}
        cta={{ label: "All guides", href: "/guides" }}
      />

      <CardSection
        eyebrow="Practical tools"
        heading="Model your scenarios with precision"
        body="Work through the numbers yourself. Each tool is built to clarify the mechanics of your financing without complexity or hidden assumptions."
        items={CALCULATORS}
        background="abyss"
        cta={{ label: "All calculators", href: "/calculators" }}
      />

      <CardSection
        eyebrow="Recent writing"
        heading="Observations on capital and markets"
        body="Observations on capital, markets, and the decisions that matter."
        items={ARTICLES}
        cta={{ label: "All articles", href: "/articles" }}
      />

      <CTABlock
        eyebrow="Stay informed"
        heading="Get the latest insights"
        body="Subscribe to receive new guides, calculators, and articles as they're published."
        primaryCta={{ label: "Subscribe", href: "#newsletter" }}
        secondaryCta={{ label: "Speak with John", href: "/contact" }}
      />
    </>
  );
}

function CardSection({ eyebrow, heading, body, items, background = "background", cta }) {
  const bgClass =
    background === "abyss"
      ? "bg-cu-surface-abyss"
      : "bg-background";
  return (
    <section className={`${bgClass} px-6 py-20 lg:px-10 lg:py-28`}>
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
            {eyebrow}
          </p>
          <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {heading}
          </h2>
          {body && (
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              {body}
            </p>
          )}
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-20">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex flex-col rounded-2xl border border-border bg-cu-surface-vault p-8 transition-colors hover:bg-cu-surface-char"
            >
              <h3 className="font-serif text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-base text-muted-foreground">
                {item.body}
              </p>
              <p className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-cu-brandy group-hover:text-cu-brandy-light">
                Read more <ArrowRight size={14} />
              </p>
            </Link>
          ))}
        </div>
        {cta && (
          <div className="mt-12 text-center">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-1 text-sm font-medium text-cu-brandy hover:text-cu-brandy-light transition-colors"
            >
              {cta.label} <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
