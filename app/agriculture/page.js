import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { BentoSection } from "@/components/shared/BentoSection";
import { FeatureGrid } from "@/components/shared/FeatureGrid";
import { StackedList } from "@/components/shared/StackedList";

export const metadata = {
  alternates: { canonical: "/agriculture" },
  title: "Agriculture",
  description:
    "Capital for rural operations. Seasonal. Asset-backed. Built for how farming actually works.",
};

const SCENARIOS = [
  {
    iconName: "Wheat",
    title: "Working",
    body: "Capital to fund planting, growth, and harvest cycles.",
  },
  {
    iconName: "MapPinned",
    title: "Land",
    body: "Capital to purchase or consolidate agricultural assets.",
  },
  {
    iconName: "Tractor",
    title: "Acquire",
    body: "Asset-backed capital secured against productive rural property.",
  },
  {
    iconName: "ArrowLeftRight",
    title: "Bridge",
    body: "Short-term capital aligned to operational or commodity timing.",
  },
];

const THINKING = [
  {
    iconName: "Calendar",
    title: "Seasonal patterns",
    body: "Capital matches planting, growth, and harvest timing.",
  },
  {
    iconName: "Boxes",
    title: "Asset assessment",
    body: "Land and equipment come first. Income follows.",
  },
  {
    iconName: "Layers",
    title: "Structure",
    body: "We design the structure before discussing price.",
  },
  {
    iconName: "UserCheck",
    title: "Judgement",
    body: "Decisions are made by people who understand rural operations.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Listen",
    body: "We listen and understand your operation, seasonal patterns, asset position, and what capital needs to achieve.",
  },
  {
    n: "02",
    title: "Assess",
    body: "We evaluate how capital can work within your farm structure, cashflow timing, and any regulatory or operational constraints.",
  },
  {
    n: "03",
    title: "Confirm",
    body: "Once structure is clear, we confirm how the capital will be accessed, repaid, and what protections are in place.",
  },
  {
    n: "04",
    title: "Move",
    body: "Capital is deployed when terms are agreed and documentation is complete, with no unnecessary delays.",
  },
];

export default function AgriculturePage() {
  return (
    <>
      <PageHero
        eyebrow="Agriculture"
        heading="Capital for rural operations"
        body="Seasonal. Asset-backed. Built for how farming actually works. Capital structured around land, stock, equipment, and timing—not bank formulas."
        primaryCta={{ label: "Speak with Team", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />

      <BentoSection
        eyebrow="The approach"
        heading="Seasonal, asset-backed rural capital"
        body="Funding that follows the agricultural cycle, secured against real rural assets — not a metro serviceability template."
        lead={{
          image: "/images/editorial/agriculture-tractor-crop-field-sunset.png",
          eyebrow: "Operators",
          title: "Built around the season",
          body: "Repayment shaped to cash flow, not a fixed calendar month.",
        }}
        points={[
          {
            icon: "Sprout",
            eyebrow: "Agribusiness",
            title: "Operations, expansion, transition",
            body: "Capital for the work actually happening on the land.",
          },
          {
            icon: "Landmark",
            eyebrow: "Asset-backed",
            title: "Conservative rural security",
            body: "Lending against the value of real rural property.",
          },
        ]}
        wide={{
          // 21:9 crop — matches the wide tile, so neither subject is cut off.
          image: "/images/people/owner-client-meeting-21x9.jpeg",
          eyebrow: "The cycle",
          title: "Capital that follows the cycle",
          body: "Structured for seasonal income and underlying asset value.",
        }}
      />

      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
            Fundamentals
          </p>
          <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            How agricultural capital works
          </h2>
          <p className="mt-8 text-lg text-muted-foreground">
            Agriculture does not run on monthly payslips. Banks assess history
            and ratios. Rural capital assesses land, assets, cycles, and
            execution.
          </p>
        </div>
      </section>

      <FeatureGrid
        eyebrow="Scenarios"
        heading="Agricultural scenarios we structure for"
        body="If one of these sounds familiar, this page is for you."
        items={SCENARIOS}
        columns={4}
      />

      <StackedList
        eyebrow="How we think"
        heading="How we think about agricultural capital"
        items={THINKING}
        background="abyss"
      />

      <section className="bg-background px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
              Capital in motion
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              How capital moves
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              No unnecessary steps. No wasted time.
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
        eyebrow="Map your scenario"
        heading="Ready to move forward"
        body="Map your agricultural scenario with clarity before committing to a conversation. Charles A.I helps agricultural operators clarify their position, timing, and capital structure."
        primaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
        secondaryCta={{ label: "Speak with Team", href: "/contact" }}
      />
    </>
  );
}
