import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { FeatureGrid } from "@/components/shared/FeatureGrid";

export const metadata = {
  title: "Commercial",
  description:
    "Commercial finance for operating businesses. Capital structured around how your business actually runs.",
};

const APPROACH = [
  {
    iconName: "Building2",
    title: "Business first",
    body: "We assess what your business generates and what it can service, not what lending policies permit.",
  },
  {
    iconName: "Layers",
    title: "Structure before solution",
    body: "The right capital structure depends on your cash flow, assets, and timeline. We confirm this before moving forward.",
  },
  {
    iconName: "FileCheck",
    title: "Clear terms",
    body: "You understand exactly what is required, what is expected, and what happens next. No ambiguity.",
  },
  {
    iconName: "UserCheck",
    title: "Principal judgement",
    body: "Decisions are made by experienced operators who understand commercial business, not automated systems or rigid criteria.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Understand your business",
    body: "We listen to your operation, the scenario, and what you need to move forward.",
  },
  {
    n: "02",
    title: "Assess structure and fit",
    body: "We evaluate your cash flow, assets, and constraints to confirm whether commercial capital makes sense.",
  },
  {
    n: "03",
    title: "Confirm terms",
    body: "We outline exactly what the structure looks like, what you service, and what the timeline is.",
  },
  {
    n: "04",
    title: "Move to funding",
    body: "Once terms are confirmed and you are ready, we move to execution with clarity and speed.",
  },
];

export default function CommercialPage() {
  return (
    <>
      <PageHero
        eyebrow="Commercial"
        heading="Commercial finance for operating businesses"
        body="Capital structured around how your business actually runs. When banks stall, we focus on what can move."
        primaryCta={{ label: "Speak with John", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />

      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
            What it means
          </p>
          <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            What commercial finance means
          </h2>
          <div className="mt-8 space-y-5 text-lg text-muted-foreground">
            <p>
              Commercial finance is capital built around operations, assets, and
              cash flow. Not products. Not templates. It looks at reality, not
              policy.
            </p>
            <p className="text-foreground">
              Banks assess risk through rules. We assess whether your business
              can service capital.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
            How we differ
          </p>
          <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Policy rules versus operating reality
          </h2>
          <p className="mt-8 text-lg text-muted-foreground">
            Banks follow policy. Commercial capital follows business. The
            difference matters when your operation doesn&apos;t fit standard
            lending templates. Banks apply fixed lending criteria regardless of
            industry or business model. We assess the actual cash flow and asset
            position of your operation.
          </p>
        </div>
      </section>

      <FeatureGrid
        eyebrow="How we approach"
        heading="How we approach commercial capital"
        body="Commercial capital works when assessment is grounded in business reality, not policy. We structure solutions around what your operation can actually service."
        items={APPROACH}
        columns={2}
        background="abyss"
      />

      <section className="bg-background px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
              The Process
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              How commercial capital moves
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Commercial capital works in stages. Each step builds clarity and
              reduces friction.
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
        eyebrow="Move forward"
        heading="Ready to structure your commercial capital"
        body="Capital structured around how your business actually runs. Let's discuss your scenario."
        primaryCta={{ label: "Speak with John", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />
    </>
  );
}
