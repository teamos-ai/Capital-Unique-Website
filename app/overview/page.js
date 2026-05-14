import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { FeatureGrid } from "@/components/shared/FeatureGrid";

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
