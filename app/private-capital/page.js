import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { BentoSection } from "@/components/shared/BentoSection";
import { FeatureGrid } from "@/components/shared/FeatureGrid";
import { StackedList } from "@/components/shared/StackedList";

export const metadata = {
  alternates: { canonical: "/private-capital" },
  title: "Private Capital",
  description:
    "Private capital for complex scenarios. Structured, discreet financing for non-standard requirements that fall outside traditional bank lending.",
};

const DIFFERENTIATORS = [
  {
    iconName: "Layers",
    title: "Structure over policy",
    body: "Banks assess whether you fit their lending policy. Private capital assesses how to structure your situation to work and be compliant.",
  },
  {
    iconName: "Clock",
    title: "Timing over process",
    body: "Banks follow fixed approval timelines. Private capital moves according to your requirements and market conditions.",
  },
  {
    iconName: "Lock",
    title: "Discretion over standardisation",
    body: "Banks apply uniform criteria to all borrowers. Private capital treats each situation on its merits with confidentiality.",
  },
  {
    iconName: "UserCheck",
    title: "Judgement over committees",
    body: "Banks require committee approval. Private capital relies on principal assessment and direct decision-making.",
  },
];

const STRUCTURE = [
  {
    title: "Structure before solution",
    body: "We understand your situation first, then design the arrangement that works.",
  },
  {
    title: "Discretion and confidentiality",
    body: "Your circumstances remain private. We assess and advise without unnecessary disclosure.",
  },
  {
    title: "Clear terms before commitment",
    body: "You know exactly what you are agreeing to before anything moves forward.",
  },
  {
    title: "Principal-led assessment",
    body: "Decisions are made by experienced principals, not committees or automated systems.",
  },
];

const FIT = [
  {
    title: "Suitable for",
    body: "Complex personal or entity structures where traditional banks cannot assess your situation fairly. You value clarity and discretion over speed.",
  },
  {
    title: "Not suitable for",
    body: "Simple retail lending scenarios or rate-driven enquiries. Standard residential mortgages are better served by traditional lenders.",
  },
  {
    title: "Asset-backed situations",
    body: "Your capital need is backed by real assets and a clear structure. You understand what you own and what you need.",
  },
  {
    title: "Borrowers seeking discretion",
    body: "You prefer confidentiality and direct assessment over standardised processes and multiple approvals.",
  },
];

export default function PrivateCapitalPage() {
  return (
    <>
      <PageHero
        eyebrow="Private Capital"
        heading="Private capital for complex scenarios"
        body="Structured, discreet financing designed for non-standard requirements that fall outside traditional bank lending. Capital Unique assesses your situation on its merits, not policy."
        primaryCta={{ label: "Speak with John", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />

      <BentoSection
        eyebrow="The approach"
        heading="How private capital works here"
        body="Bespoke capital where structure, timing and discretion matter more than policy."
        lead={{
          image: "/images/people/clients-chess-garden-001.png",
          eyebrow: "Principals",
          title: "Structure over policy",
          body: "Decided on merit by a person — not a credit template.",
        }}
        points={[
          {
            icon: "Lock",
            eyebrow: "Discreet",
            title: "Considered quietly",
            body: "Handled personally, with confidentiality assumed.",
          },
          {
            icon: "Compass",
            eyebrow: "Bespoke",
            title: "Built around the scenario",
            body: "A structure designed for the deal, not a product.",
          },
        ]}
        wide={{
          image: "/images/people/clients-couple-laptop-lounge-001.png",
          eyebrow: "Access",
          title: "One decision-maker, end to end",
          body: "No committees, no hand-offs — just judgement.",
        }}
      />

      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
            What it is
          </p>
          <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            What private capital actually is
          </h2>
          <p className="mt-8 text-lg text-muted-foreground">
            Private capital is structured funding arranged around your assets,
            timing, and specific constraints rather than standardised lending
            criteria. It exists precisely where traditional banks cannot or will
            not lend because your situation falls outside their policy and
            legislative framework.
          </p>
        </div>
      </section>

      <StackedList
        eyebrow="How it differs"
        heading="How private capital differs from bank lending"
        body="Banks operate within policy. Private capital operates within structure. The distinction matters when your circumstances demand flexibility, discretion, or assessment beyond standard lending rules."
        items={DIFFERENTIATORS}
        background="background"
      />

      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
            When it makes sense
          </p>
          <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            When private capital makes sense
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">
            Your wealth sits in trusts, companies, or family structures. Banks
            struggle with these arrangements. Private capital is built for them.
          </p>
        </div>
      </section>

      <FeatureGrid
        eyebrow="How we structure"
        heading="How we structure private capital"
        body="Private capital requires a different mindset. We start with your constraints, not our criteria."
        items={STRUCTURE}
        columns={2}
      />

      <FeatureGrid
        eyebrow="Is it right for you"
        heading="Is private capital right for you"
        body="Private capital is not for everyone. It works best when your situation demands structure, discretion, and flexibility beyond what traditional lending offers."
        items={FIT}
        columns={2}
        background="abyss"
      />

      <section className="bg-background px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
            When complexity demands it
          </p>
          <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            This works when complexity demands it
          </h2>
          <p className="mt-8 text-lg text-muted-foreground">
            Your situation sits outside standard lending frameworks. You hold
            assets in structures banks cannot easily assess. You need discretion
            and direct assessment, not standardised processes.
          </p>
        </div>
      </section>

      <CTABlock
        eyebrow="Begin with structure"
        heading="Clarity begins with structure"
        body="Private capital works when traditional lending cannot. Start with Charles A.I to clarify your fit."
        primaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
        secondaryCta={{ label: "Speak with John", href: "/contact" }}
      />
    </>
  );
}
