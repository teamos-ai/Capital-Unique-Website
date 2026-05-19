import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { BentoSection } from "@/components/shared/BentoSection";
import { FeatureGrid } from "@/components/shared/FeatureGrid";
import { Eye, Compass, FileCheck, Send } from "lucide-react";

export const metadata = {
  alternates: { canonical: "/how-it-works" },
  title: "How it works",
  description:
    "Four clear steps from conversation to capital deployment. No surprises, no hidden stages.",
};

const STEPS = [
  {
    n: "01",
    title: "Understand the deal",
    body: "We discuss your business objectives, timing, and structure so we can understand what you're trying to achieve.",
    icon: Eye,
  },
  {
    n: "02",
    title: "Assess options",
    body: "We review the information and identify the most suitable funding approach based on your needs.",
    icon: Compass,
  },
  {
    n: "03",
    title: "Confirm terms",
    body: "We clearly explain the proposed terms, costs, and conditions before anything moves forward.",
    icon: FileCheck,
  },
  {
    n: "04",
    title: "Deploy funding",
    body: "Once agreed, we manage the process through to funding and remain involved as the capital is deployed.",
    icon: Send,
  },
];

const EXPECTATIONS = [
  {
    iconName: "Clock",
    title: "Timeline",
    body: "From enquiry to capital deployment typically takes one to four weeks, depending on scenario complexity.",
  },
  {
    iconName: "FileText",
    title: "What we need",
    body: "Business background, scenario details, and supporting documentation allow us to assess properly.",
  },
  {
    iconName: "Brain",
    title: "How we decide",
    body: "Each scenario receives structured, experienced judgement from our team, not algorithmic scoring.",
  },
  {
    iconName: "X",
    title: "When it's not a fit",
    body: "We provide clarity quickly if a scenario cannot proceed, without wasting your time.",
  },
];

const FIT = [
  {
    title: "Complex capital needs",
    body: "Scenarios traditional banks decline or cannot accommodate quickly.",
  },
  {
    title: "Time-sensitive situations",
    body: "Business growth, development, or investment opportunities with real timing constraints.",
  },
  {
    title: "Structured solutions",
    body: "Borrowers seeking flexible terms aligned with their specific business or project structure.",
  },
  {
    title: "Business and commercial focus",
    body: "We serve businesses, developers, and investors, not consumer or retail lending.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        heading="Understanding the path forward"
        body="Non-bank capital works differently than traditional lending. This page explains how Capital Unique approaches complex scenarios with structure and discipline."
        primaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
        secondaryCta={{ label: "Speak with John", href: "/contact" }}
      />

      {/* Process */}
      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-x-20">
            <div className="md:sticky md:top-32 md:self-start">
              <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
                Four clear steps
              </p>
              <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                From conversation to capital
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Four clear steps from conversation to capital deployment. No
                surprises, no hidden stages.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {STEPS.map((step) => (
                <div
                  key={step.n}
                  className="rounded-2xl border border-border bg-cu-surface-vault p-8"
                >
                  <div className="mb-5 flex items-center gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-cu-brandy-darkest text-cu-brandy">
                      <step.icon size={20} strokeWidth={1.5} />
                    </div>
                    <span className="font-serif text-2xl font-semibold tracking-tight text-cu-neutral-light">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold leading-tight tracking-tight md:text-2xl">
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

      {/* Charles AI prep */}
      <section className="bg-background px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
            Prepare
          </p>
          <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Start with Charles A.I for clarity
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Charles A.I maps your scenario and readies you for conversation. It
            clarifies what you need and what we need to know. Think of it as
            structured preparation, not automated assessment.
          </p>
          <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 text-left md:grid-cols-3">
            {[
              "Scenario mapping",
              "Understand your capital needs clearly",
              "Information readiness",
            ].map((item) => (
              <li
                key={item}
                className="rounded-xl border border-border bg-cu-surface-vault p-5 text-sm text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FeatureGrid
        eyebrow="What to expect"
        heading="When you engage with us"
        body="Capital Unique moves with purpose and transparency. Here is what you can expect from the moment you reach out."
        items={EXPECTATIONS}
        columns={4}
        background="abyss"
      />

      <FeatureGrid
        eyebrow="Built for"
        heading="This is built for specific scenarios"
        body="Capital Unique serves borrowers with complex needs and structured ambitions. This is not for everyone, and that is intentional."
        items={FIT}
        columns={4}
      />

      <BentoSection
        eyebrow="In practice"
        heading="From conversation to capital"
        body="A clear path — four steps, one decision-maker, no surprises."
        lead={{
          eyebrow: "The process",
          title: "Describe the scenario",
          body: "Plain language, no forms to wade through.",
        }}
        points={[
          {
            icon: "Compass",
            eyebrow: "Map the structure",
            title: "Frame options and constraints",
            body: "What's possible, what isn't, and why.",
          },
          {
            icon: "Handshake",
            eyebrow: "Explore options",
            title: "Take a clear summary forward",
            body: "Into a focused, decisive conversation.",
          },
        ]}
        wide={{
          eyebrow: "Clarity",
          title: "Arrive already clear",
          body: "Shorter calls, sharper decisions, less wasted time.",
        }}
      />

      <CTABlock
        eyebrow="Move forward"
        heading="Ready to move forward"
        body="Start with Charles A.I to map your scenario, or speak directly with our team for guidance."
        primaryCta={{ label: "Speak with John", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />
    </>
  );
}
