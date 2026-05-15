import { CTABlock } from "@/components/shared/CTABlock";
import { FeatureGrid } from "@/components/shared/FeatureGrid";
import { CharlesCommandBar } from "@/components/charles/CharlesCommandBar";

export const metadata = {
  title: "Charles A.I",
  description:
    "Workshop your deal with Charles A.I. Map structure, timing, and constraints before speaking with Capital Unique.",
};

const VALUE = [
  {
    iconName: "Brain",
    title: "Non-conforming deals",
    body: "Scenarios where banks move slowly or decline outright.",
  },
  {
    iconName: "Clock",
    title: "Time-sensitive transactions",
    body: "Situations where speed and clarity matter before formal conversations begin.",
  },
  {
    iconName: "Layers",
    title: "Complex structures",
    body: "Multi-layered deals requiring careful thinking about sequencing and constraints.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Describe your scenario",
    body: "Walk through your deal, objectives, timing, and constraints in plain language.",
  },
  {
    n: "02",
    title: "Clarify structure",
    body: "The assistant maps key considerations, risks, and structural options specific to your situation.",
  },
  {
    n: "03",
    title: "Explore options",
    body: "Take your structured summary into a focused conversation with Capital Unique.",
  },
];

export default function CharlesAIPage() {
  return (
    <>
      <section className="bg-background section-pad-hero px-6 lg:px-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-cu-surface-vault py-1.5 pl-2 pr-4">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cu-brandy opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cu-brandy" />
            </span>
            <span className="text-xs font-medium tracking-wide text-foreground/85">
              Charles A.I
            </span>
            <span className="text-xs text-muted-foreground">
              In active development
            </span>
          </div>
          <h1 className="heading-hero">Your shortcut to the right capital.</h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
            No vague advice. No forms to wade through. Describe your scenario —
            Charles maps the structure, timing and constraints before you speak
            with John.
          </p>
          <CharlesCommandBar />
        </div>
      </section>

      {/* What it does */}
      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
            Clarity for complex lending
          </p>
          <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            What Charles A.I does
          </h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-5 text-lg text-muted-foreground">
            <p>
              Charles A.I is an intelligent assistant designed to help borrowers
              and investors navigate complex capital decisions.
            </p>
            <p>
              It helps clarify structure, timing, constraints, and next
              steps—so you&apos;re prepared before engaging with our team.
            </p>
            <p className="text-foreground">
              Charles A.I does not replace advice. It prepares you to have a
              better conversation.
            </p>
          </div>
        </div>
      </section>

      <FeatureGrid
        eyebrow="Where it creates real value"
        heading="Where Charles A.I works best"
        body="Charles A.I works best when deals sit outside traditional banking frameworks. If structure is complex, timing is tight, or the scenario doesn't fit standard criteria, Charles A.I helps you map the path forward before formal discussions begin."
        items={VALUE}
      />

      {/* How it works */}
      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
              Three clear steps
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              How Charles A.I works
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Describe what you&apos;re working with, let Charles A.I map the
              structure and constraints, then take your summary to a
              conversation with our specialists.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-20">
            {STEPS.map((step) => (
              <div
                key={step.n}
                className="rounded-2xl border border-border bg-cu-surface-vault p-8"
              >
                <span className="font-serif text-3xl font-semibold tracking-tight text-cu-neutral-light">
                  {step.n}
                </span>
                <h3 className="mt-4 font-serif text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-base text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        eyebrow="Start informed"
        heading="Decide with confidence"
        body="Charles A.I helps you do the thinking upfront—so calls are shorter, clearer, and more decisive. Use it to explore options, test assumptions, and understand what's possible before committing time to a formal discussion."
        primaryCta={{ label: "Request early access", href: "#early-access" }}
        secondaryCta={{ label: "Speak with John", href: "/contact" }}
      />
    </>
  );
}
