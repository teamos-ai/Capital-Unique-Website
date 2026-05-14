import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { FeatureGrid } from "@/components/shared/FeatureGrid";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Overview",
  description:
    "Capital designed around your strategy. Tailored funding solutions for businesses, developers, and investors who value clarity, speed, and structure.",
};

const DIFFERENTIATORS = [
  {
    iconName: "Eye",
    eyebrow: "It's Clear",
    title: "Terms upfront",
    body: "You know where you stand early, with terms and structure explained upfront.",
  },
  {
    iconName: "Zap",
    eyebrow: "It's Fast",
    title: "Pace your opportunity demands",
    body: "Decisions move at the pace your opportunity demands, not a committee schedule.",
  },
  {
    iconName: "Compass",
    eyebrow: "It's Considered",
    title: "Assessed on its own merits",
    body: "Each deal is assessed on its own merits, with structure and risk carefully thought through.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Understand the deal",
    body: "We discuss your business objectives, timing, and structure so we can understand what you're trying to achieve.",
  },
  {
    n: "02",
    title: "Assess options",
    body: "We review the information and identify the most suitable funding approach based on your needs.",
  },
  {
    n: "03",
    title: "Confirm terms",
    body: "We clearly explain the proposed terms, costs, and conditions before anything moves forward.",
  },
  {
    n: "04",
    title: "Deploy funding",
    body: "Once agreed, we manage the process through to funding and remain involved as the capital is deployed.",
  },
];

export default function OverviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Overview"
        heading="Capital designed around your strategy."
        body="We provide tailored funding solutions for businesses, developers, and investors who value clarity, speed, and structure. Whether you're building, acquiring, or repositioning capital, we design finance to match your objectives."
        primaryCta={{ label: "Get capital", href: "/get-capital" }}
        secondaryCta={{ label: "Speak with John", href: "/contact" }}
      />

      <FeatureGrid
        eyebrow="What sets us apart"
        heading="What sets us apart from traditional lending"
        body="We approach funding with intent and discipline. Instead of rigid processes, we focus on understanding the deal, assessing risk clearly, and structuring capital that supports real commercial outcomes."
        items={DIFFERENTIATORS}
        background="abyss"
      />

      <section className="bg-background px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
            Tailored funding
          </p>
          <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Lending shaped around your situation
          </h2>
          <div className="mt-8 space-y-5 text-lg text-muted-foreground">
            <p>
              No two deals are the same. We design funding structures around
              your objectives, timelines, and risk considerations—so the capital
              supports the strategy, not the other way around.
            </p>
            <p>
              From development and acquisitions to transitional or short-term
              requirements, each solution is structured with intent, discipline,
              and clarity.
            </p>
          </div>
        </div>
      </section>

      {/* How funding works */}
      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-x-20">
            <div className="md:sticky md:top-32 md:self-start">
              <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
                The Process
              </p>
              <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                How funding works
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                We start by understanding your objectives and assessing the
                opportunity with care. From there, we structure the right
                solution and guide the process through to funding with clarity
                at every stage. The approach is deliberate, transparent, and
                designed to move forward with confidence.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {PROCESS.map((step) => (
                <div
                  key={step.n}
                  className="rounded-2xl border border-border bg-cu-surface-vault p-8"
                >
                  <span className="font-serif text-2xl font-semibold tracking-tight text-cu-neutral-light">
                    {step.n}
                  </span>
                  <h3 className="mt-3 font-serif text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our work */}
      <section className="bg-background px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
            Our work
          </p>
          <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Projects we&apos;ve funded across Australia
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A selection of recent capital deployed — anonymised, across
            property, business, and private capital scenarios.
          </p>
          <div className="mt-10">
            <Link
              href="/our-work"
              className="inline-flex items-center gap-2 rounded-md bg-cu-brandy px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-cu-brandy-light transition-colors"
            >
              See our work
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* What clients say */}
      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
            What clients say
          </p>
          <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            What clients say
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Those who&apos;ve worked with us speak to the difference clarity and
            speed make.
          </p>
          <div className="mt-10">
            <Link
              href="/our-work"
              className="inline-flex items-center gap-1 text-sm font-medium text-cu-brandy hover:text-cu-brandy-light transition-colors"
            >
              Read recent client outcomes
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <CTABlock
        eyebrow="Move forward"
        heading="Capital structured around real strategy"
        body="A conversation with Capital Unique begins with understanding your situation, without obligation or pressure."
        primaryCta={{ label: "Speak with John", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />
    </>
  );
}
