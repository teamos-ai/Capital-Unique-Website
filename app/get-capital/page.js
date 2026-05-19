import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { BentoSection } from "@/components/shared/BentoSection";
import { ArrowRight, Building2, Landmark } from "lucide-react";

export const metadata = {
  alternates: { canonical: "/get-capital" },
  title: "Get Capital",
  description:
    "Capital Unique connects borrowers seeking flexible finance with investors looking to deploy capital intelligently — quietly, clearly, with intent.",
};

const PATHWAYS = [
  {
    icon: Building2,
    eyebrow: "For borrowers",
    title: "Strategic capital for complex decisions",
    body: "We work with businesses, developers, and investors who need funding structured around real-world objectives—not standardised lending models.",
    href: "/business",
    cta: "Explore borrower pathway",
  },
  {
    icon: Landmark,
    eyebrow: "For investors",
    title: "Deploy capital with structure and control",
    body: "Capital Unique works with private investors and family offices seeking governed opportunities with clear terms, defined risk, and long-term alignment.",
    href: "/private-capital",
    cta: "Explore investor pathway",
  },
];

const BORROWER_BULLETS = [
  "Speed without compromise",
  "Clarity on real terms",
  "Finance built around your deal",
];

const INVESTOR_BULLETS = [
  "Transparent deal structures",
  "Risk-aware partnerships",
  "Long-term capital alignment",
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

export default function GetCapitalPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Capital"
        heading="Capital, without the constraints of banks."
        body="Capital Unique operates where traditional lending ends. We connect borrowers seeking flexible finance with investors looking to deploy capital intelligently—quietly, clearly, and with intent."
        primaryCta={{ label: "Speak with John", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />

      <BentoSection
        eyebrow="The approach"
        heading="Built around the deal, not the bank box"
        body="Whether you're borrowing or deploying capital, the conversation starts the same way."
        lead={{
          eyebrow: "Borrowers",
          title: "Capital for complex scenarios",
          body: "Fast, considered decisions when the bank won't move.",
        }}
        points={[
          {
            icon: "Handshake",
            eyebrow: "For investors",
            title: "Structured private credit",
            body: "Security-first opportunities for wholesale investors.",
          },
          {
            icon: "Clock",
            eyebrow: "Fast & considered",
            title: "Speed when it's the constraint",
            body: "Moving quickly without skipping the thinking.",
          },
        ]}
        wide={{
          eyebrow: "Principal-led",
          title: "One principal, end to end",
          body: "From first conversation to funded outcome — same person.",
        }}
      />

      {/* Two pathways */}
      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
              Two pathways
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Two pathways. One disciplined approach.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Capital Unique exists at the intersection of borrowers seeking
              flexible finance and investors seeking structured opportunities. We
              bridge the gap traditional banking leaves behind.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 lg:mt-20 lg:grid-cols-2">
            {PATHWAYS.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group flex flex-col rounded-2xl border border-border bg-cu-surface-vault p-8 transition-colors hover:bg-cu-surface-char md:p-10"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-cu-brandy-darkest text-cu-brandy">
                  <p.icon size={20} strokeWidth={1.5} />
                </div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-cu-brandy">
                  {p.eyebrow}
                </p>
                <h3 className="font-serif text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-4 text-base text-muted-foreground">{p.body}</p>
                <ul className="mt-6 space-y-2">
                  {(p.eyebrow === "For borrowers"
                    ? BORROWER_BULLETS
                    : INVESTOR_BULLETS
                  ).map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cu-brandy" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-cu-brandy group-hover:text-cu-brandy-light">
                  {p.cta} <ArrowRight size={14} />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-background px-6 py-20 lg:px-10 lg:py-28">
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
                solution and guide the process through to funding with clarity at
                every stage.
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

      <CTABlock
        eyebrow="Get capital"
        heading="Capital designed around your strategy"
        body="Development deals, acquisitions, and complex strategies require more than standard lending models. Let's discuss what's possible."
        primaryCta={{ label: "Speak with John", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />
    </>
  );
}
