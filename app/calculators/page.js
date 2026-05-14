import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { Wallet, Clock, Building, Unlock, BarChart3 } from "lucide-react";

export const metadata = {
  title: "Calculators",
  description:
    "Calculators designed for clarity. Practical tools to model finance scenarios for non-bank lending in Australia.",
};

const CALCULATORS = [
  {
    icon: Wallet,
    title: "Borrowing Capacity",
    eyebrow: "Understand your true capacity",
    body: "Get a realistic view of what may be possible outside traditional banks, based on assets, structure, and timing—not rigid formulas. This helps you assess feasibility before progressing further.",
    href: "#borrowing-capacity",
    cta: "Open calculator",
  },
  {
    icon: Clock,
    title: "Bridging Finance",
    eyebrow: "The real cost of speed",
    body: "Explore the true cost of short-term and bridging finance across different timeframes. Designed to help you decide whether speed creates advantage—or unnecessary pressure.",
    href: "#bridging-finance",
    cta: "Open calculator",
  },
  {
    icon: Building,
    title: "Development Feasibility",
    eyebrow: "Pressure-test your project",
    body: "Run a high-level feasibility check to understand funding balance, equity contribution, and margin sensitivity. Ideal for early-stage clarity before deeper assessment.",
    href: "#development-feasibility",
    cta: "Open calculator",
  },
  {
    icon: Unlock,
    title: "Equity Release",
    eyebrow: "Unlock capital strategically",
    body: "See how much equity may be accessible under non-bank structures and what that means for risk and leverage. Built to support thoughtful capital planning, not overextension.",
    href: "#equity-release",
    cta: "Open calculator",
  },
  {
    icon: BarChart3,
    title: "Risk vs Return Scenario",
    eyebrow: "Balance risk and return",
    body: "Compare lending scenarios across different risk and yield profiles to understand trade-offs clearly. Designed for disciplined investors who prioritise structure over headline returns.",
    href: "#risk-return",
    cta: "Open calculator",
  },
];

export default function CalculatorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Calculators"
        heading="Calculators designed for clarity"
        body="Each tool is built to help you understand the mechanics of your financial scenario. Work through the numbers at your own pace."
      />

      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CALCULATORS.map((calc) => (
              <div
                key={calc.title}
                className="group flex flex-col rounded-2xl border border-border bg-cu-surface-vault p-8 transition-colors hover:bg-cu-surface-char"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-cu-brandy-darkest text-cu-brandy">
                  <calc.icon size={20} strokeWidth={1.5} />
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-cu-brandy">
                  {calc.eyebrow}
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                  {calc.title}
                </h3>
                <p className="mt-3 flex-1 text-base text-muted-foreground">
                  {calc.body}
                </p>
                <span className="mt-6 inline-flex w-fit items-center rounded-md border border-border bg-cu-surface-ember px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  Calculator coming soon
                </span>
              </div>
            ))}
          </div>
          {/*
            TODO: Calculators are descriptive cards only at this stage.
            Per BUILD-PLAN.md Step 7, the actual calculator widgets will be
            vibe-coded as React components in components/calculators/
            and embedded inline. State (Aussie-specific):
            - Borrowing Capacity: serviceability inputs, ASIC-style formula
            - Bridging Finance: rate + term + setup + exit cost calc
            - Development Feasibility: GRV, total cost, profit margin %, hurdle
            - Equity Release: LVR-based releasable equity calc
            - Risk vs Return: side-by-side scenario comparison
          */}
        </div>
      </section>

      <CTABlock
        eyebrow="Beyond the numbers"
        heading="Numbers tell part of the story"
        body="Calculators give you a starting point. The real conversation begins with understanding your situation, structure, and timing."
        primaryCta={{ label: "Speak with John", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />
    </>
  );
}
