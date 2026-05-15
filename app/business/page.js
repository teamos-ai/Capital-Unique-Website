import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { FeatureGrid } from "@/components/shared/FeatureGrid";
import { StackedList } from "@/components/shared/StackedList";

export const metadata = {
  alternates: { canonical: "/business" },
  title: "Business",
  description:
    "Capital structured for real business conditions. Capital shaped around complexity—timing, cash flow, assets, and structure—rather than standard bank criteria.",
};

const SCENARIOS = [
  {
    iconName: "TrendingUp",
    title: "Growth funding",
    body: "Expanding operations, acquiring competitors, or entering new markets when bank appetite is limited or timing is tight.",
  },
  {
    iconName: "Waves",
    title: "Cash variability",
    body: "Seasonal businesses, project-based revenue, or cyclical operations that don't fit standard lending profiles.",
  },
  {
    iconName: "Boxes",
    title: "Asset positions",
    body: "Securing funding against business assets, equipment, or property when traditional equity or debt structures don't apply.",
  },
  {
    iconName: "Layers",
    title: "Complex structures",
    body: "Bridging funding, interim capital, or funding during restructure, ownership change, or business transition periods.",
  },
];

const APPROACH = [
  {
    iconName: "Eye",
    title: "Strategy before structure",
    body: "We understand your business first, then design capital that fits the reality.",
  },
  {
    iconName: "FileCheck",
    title: "Clarity on terms upfront",
    body: "No surprises. You know the cost, timeline, and obligations before committing.",
  },
  {
    iconName: "Clock",
    title: "Timing-aware decisions",
    body: "Speed matters when it matters. We move at the pace your business requires.",
  },
  {
    iconName: "UserCheck",
    title: "Principal-led assessment",
    body: "Experienced judgement, not algorithmic scoring. We assess what matters to your business.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Clarity",
    body: "We start by understanding what you are trying to achieve and why the capital is needed.",
  },
  {
    n: "02",
    title: "Structure",
    body: "We look at the full picture—business activity, assets, ownership, and cash movement—together.",
  },
  {
    n: "03",
    title: "Suitability",
    body: "We assess whether the structure makes sense before discussing terms or timelines.",
  },
  {
    n: "04",
    title: "Judgement",
    body: "Your scenario is reviewed personally, with experience, not automated filters or committees.",
  },
];

export default function BusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="Business"
        heading="Capital structured for real business conditions"
        body="We work with business owners and operators who need capital shaped around complexity—timing, cash flow, assets, and structure—rather than standard bank criteria."
        primaryCta={{ label: "Speak with John", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />

      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
            Why business capital
          </p>
          <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Business capital without rigid templates
          </h2>
          <div className="mt-8 space-y-5 text-lg text-muted-foreground">
            <p>
              Traditional lenders are built for predictable income and simple
              structures. Many businesses don&apos;t operate that way.
            </p>
            <p>
              Capital Unique focuses on commercial scenarios where flexibility,
              judgement, and structure matter—supporting businesses that require
              a more considered approach to capital.
            </p>
          </div>
        </div>
      </section>

      <FeatureGrid
        eyebrow="Scenarios"
        heading="Common business scenarios we support"
        body="Business capital works best when traditional lending cannot or will not move. Below are the scenarios where structured capital becomes the right answer."
        items={SCENARIOS}
        columns={2}
      />

      <StackedList
        eyebrow="How we work"
        heading="How we structure business capital"
        body="Business capital requires more than financial metrics. It demands understanding of your operation, timing constraints, and what actually works for your situation."
        items={APPROACH}
        background="abyss"
      />

      <section className="bg-background px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
              The Process
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              How business capital moves
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Every scenario is assessed on its own merits. We focus on clarity,
              structure, and suitability before moving forward.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {PROCESS.map((step) => (
              <div
                key={step.n}
                className="rounded-2xl border border-border bg-cu-surface-vault p-6"
              >
                <span className="font-serif text-2xl font-semibold tracking-tight text-cu-neutral-light">
                  {step.n}
                </span>
                <h3 className="mt-3 font-serif text-lg font-semibold leading-tight tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        eyebrow="Prepare"
        heading="Start with Charles A.I"
        body="Charles A.I helps you clarify your scenario before speaking with our team. It's preparation, not advice—a smart first step for business owners navigating complex capital decisions."
        primaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
        secondaryCta={{ label: "Speak with John", href: "/contact" }}
      />
    </>
  );
}
