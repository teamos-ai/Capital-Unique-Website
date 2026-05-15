import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { FeatureGrid } from "@/components/shared/FeatureGrid";
import { StackedList } from "@/components/shared/StackedList";

export const metadata = {
  alternates: { canonical: "/construction" },
  title: "Construction",
  description:
    "Construction capital for active projects. Staged funding aligned to your build timeline, draws, and delivery risk.",
};

const ASSESS = [
  {
    iconName: "HardHat",
    title: "Project",
    body: "We structure around your build schedule. The program comes first. Price comes later.",
  },
  {
    iconName: "Layers",
    title: "Draws",
    body: "Capital releases follow progress. Milestones verified. Costs checked. Money moves when work is done.",
  },
  {
    iconName: "ShieldAlert",
    title: "Risk",
    body: "Risk is assessed before capital is committed. Delivery risk. Market risk. Execution risk. No surprises mid-build.",
  },
  {
    iconName: "UserCheck",
    title: "Judgement",
    body: "Decisions are made by people. Not models. Not algorithms. Construction experience matters.",
  },
];

const FIT = [
  {
    iconName: "CircleCheckBig",
    title: "Builders",
    body: "Live projects. Signed contracts. Draw schedules tied to progress. Delivery matters more than rates.",
  },
  {
    iconName: "Building2",
    title: "Developers",
    body: "Multi-stage builds. Complex capital stacks. Timing risk. Exit and refinance planning built in.",
  },
  {
    iconName: "CircleX",
    title: "Not suited for you",
    body: "Home loans. Pre-approvals. Rate-first enquiries. Ideas without execution.",
  },
];

// TODO: replace placeholder cards with real construction project examples
// when content is ready. Doc lists this section but no specific project items.
const PROJECT_TYPES = [
  {
    iconName: "Hammer",
    title: "Residential builds",
    body: "Single-dwelling and small multi-unit residential construction with verifiable progress milestones.",
  },
  {
    iconName: "Building",
    title: "Multi-stage developments",
    body: "Larger projects requiring layered capital across acquisition, build, and exit phases.",
  },
  {
    iconName: "Wrench",
    title: "Commercial fitouts and refurbishments",
    body: "Adaptive reuse, fitout, and refurbishment work where timing and trade coordination matter.",
  },
  {
    iconName: "Layers",
    title: "Cost-overrun and gap funding",
    body: "Capital to bridge gaps in active builds where the original lender cannot extend or move quickly enough.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Listen",
    body: "We listen and understand your operation, project structure, and what capital needs to achieve.",
  },
  {
    n: "02",
    title: "Assess",
    body: "We evaluate how capital can work within your build, cashflow timing, and operational constraints.",
  },
  {
    n: "03",
    title: "Confirm",
    body: "Once structure is clear, we confirm how the capital will be accessed, drawn, and what protections are in place.",
  },
  {
    n: "04",
    title: "Move",
    body: "Capital is deployed when terms are agreed and documentation is complete, with no unnecessary delays.",
  },
];

export default function ConstructionPage() {
  return (
    <>
      <PageHero
        eyebrow="Construction"
        heading="Construction capital for active projects"
        body="Staged funding aligned to your build timeline, draws, and delivery risk."
        primaryCta={{ label: "Speak with John", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />

      <section className="bg-cu-surface-abyss section-pad px-6 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="heading-eyebrow mb-5">How it works</p>
          <h2 className="heading-section">
            Construction capital is staged, not fixed
          </h2>
          <p className="mt-8 text-lg text-muted-foreground reading-width">
            Unlike traditional lending, construction capital moves with your
            project. Funds release in draws aligned to completion milestones,
            cost verification, and delivery risk—not approval formulas or
            credit scores alone. This is how active builds actually get funded.
          </p>
        </div>
      </section>

      <FeatureGrid
        eyebrow="What we fund"
        heading="Construction projects we fund"
        body="These are the builds we see most often. If your project sits here, we understand the timing, the risks, and the structure it needs."
        items={PROJECT_TYPES}
        columns={2}
        background="background"
      />

      <StackedList
        eyebrow="How we assess"
        heading="How we assess construction capital"
        body="We don't use formulas. We assess reality. The build. The timing. The risk—this is what guides every decision."
        items={ASSESS}
        background="abyss"
      />

      <section className="bg-background px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
              Capital in motion
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              How construction capital moves
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

      <FeatureGrid
        eyebrow="Who this works for"
        heading="Who this works for and who it doesn't"
        body="Construction capital suits real projects with real timelines. It does not suit speculation or rate-first conversations."
        items={FIT}
        background="abyss"
      />

      <CTABlock
        eyebrow="Structure your build"
        heading="Ready to structure your build"
        body="Construction capital works when timing, draws, and risk are clear from the start."
        primaryCta={{ label: "Speak with John", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />
    </>
  );
}
