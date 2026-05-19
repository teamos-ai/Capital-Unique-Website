import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { BentoSection } from "@/components/shared/BentoSection";
import { FeatureGrid } from "@/components/shared/FeatureGrid";
import { StackedList } from "@/components/shared/StackedList";

export const metadata = {
  alternates: { canonical: "/property-development" },
  title: "Property Development",
  description:
    "Capital for development. Clear structures for complex property deals. Structure matters more than rates when your deal doesn't fit a standard box.",
};

const SCENARIOS = [
  {
    iconName: "Building",
    title: "Development",
    body: "Projects that need funding aligned to stages, delivery, and exit—not bank templates.",
  },
  {
    iconName: "HardHat",
    title: "Construction",
    body: "Cost overruns, timing gaps, or lender issues that must be solved fast.",
  },
  {
    iconName: "ArrowLeftRight",
    title: "Bridging",
    body: "Short-term capital to acquire, refinance, or exit before delays cost you the deal.",
  },
  {
    iconName: "Layers",
    title: "Complexity",
    body: "Assets, valuations, or exits that don't fit standard lending rules.",
  },
];

const APPROACH = [
  {
    iconName: "Clock",
    title: "Timing",
    body: "Capital matched to acquisition, build, and exit.",
  },
  {
    iconName: "Target",
    title: "Value",
    body: "End value assessed first. Structure follows.",
  },
  {
    iconName: "Eye",
    title: "Clarity",
    body: "All terms confirmed before commitment.",
  },
  {
    iconName: "UserCheck",
    title: "Judgement",
    body: "Principal-led decisions. No committees.",
  },
];

const PROCESS = [
  { n: "01", title: "Understand", body: "We review the deal, timeline, and exit." },
  { n: "02", title: "Assess", body: "We test feasibility, value, and downside." },
  { n: "03", title: "Confirm", body: "Terms are agreed before moving forward." },
  { n: "04", title: "Execute", body: "Capital is deployed and structured." },
];

export default function PropertyDevelopmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Property Development"
        heading="Capital for development"
        body="Clear structures for complex property deals. Capital designed to move when timing matters."
        primaryCta={{ label: "Speak with John", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />

      <BentoSection
        eyebrow="The approach"
        heading="Funding from site to settlement"
        body="Clear structures for complex property deals — when the bank won't move on timing or presales."
        lead={{
          image: "/images/editorial/construction-executive-site-overlook-sunset.png",
          eyebrow: "Developers",
          title: "When the bank won't move",
          body: "Non-bank capital that reads feasibilities for a living.",
        }}
        points={[
          {
            icon: "Layers",
            eyebrow: "The capital stack",
            title: "Senior to equity, used deliberately",
            body: "The least expensive money the deal can safely carry.",
          },
          {
            icon: "Clock",
            eyebrow: "Staged to delivery",
            title: "Drawdowns aligned to the program",
            body: "Funding that tracks the build, not the calendar.",
          },
        ]}
        wide={{
          image: "/images/people/codrington-presenting-chart.jpeg",
          eyebrow: "Presentation",
          title: "Presented to get a fast yes",
          body: "Conservative numbers, an evidenced exit, risks named first.",
        }}
      />

      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
            How non-bank property capital works
          </p>
          <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Banks fund formulas. We fund reality.
          </h2>
          <div className="mt-8 space-y-5 text-lg text-muted-foreground">
            <p>
              Non-bank property capital is built around timing, value, and
              risk—not rigid policy. If your deal doesn&apos;t fit a standard box,
              structure matters more than rates.
            </p>
            <p className="text-foreground">
              This is capital designed to move when timing matters.
            </p>
          </div>
        </div>
      </section>

      <FeatureGrid
        eyebrow="Where we work"
        heading="Property situations we support"
        body="These are the kinds of property and development scenarios where Capital Unique typically structures capital. If your situation resembles one of these, you're likely a fit for our approach."
        items={SCENARIOS}
        columns={2}
      />

      <StackedList
        eyebrow="How we structure"
        heading="How we structure property capital"
        body="Good capital removes friction. Bad capital creates it. We structure funding around what actually limits your project—time, value, and risk."
        items={APPROACH}
        background="abyss"
      />

      <section className="bg-background px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
              Scenario to funding
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Simple. Direct. No wasted steps.
            </h2>
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
        eyebrow="Property in motion"
        heading="Development deals structured for reality"
        body="Charles A.I helps you map your deal first. Structure. Timing. Fit. Arrive prepared. Have better conversations."
        primaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
        secondaryCta={{ label: "Speak with John", href: "/contact" }}
      />
    </>
  );
}
