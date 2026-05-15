import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { CALCULATORS } from "@/lib/calculators";
import {
  Building,
  Clock,
  BarChart3,
  HardHat,
  Receipt,
  TrendingUp,
  Home,
  House,
  Landmark,
  PiggyBank,
  ScrollText,
  ArrowRightLeft,
  ArrowRight,
} from "lucide-react";

const ICONS = {
  Building,
  Clock,
  BarChart3,
  HardHat,
  Receipt,
  TrendingUp,
  Home,
  House,
  Landmark,
  PiggyBank,
  ScrollText,
  ArrowRightLeft,
};

export const metadata = {
  title: "Calculators",
  description:
    "Practical modelling tools for non-bank capital in Australia — development feasibility, DSCR, bridging cost, construction drawdown, true cost of capital and investor yield.",
};

export default function CalculatorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Calculators"
        heading="Calculators designed for clarity"
        body="Six tools that model the mechanics of a scenario the way a lender or a disciplined investor actually would. Work the numbers, then have the real conversation."
      />

      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CALCULATORS.map((calc) => {
              const Icon = ICONS[calc.icon] ?? Building;
              return (
                <Link
                  key={calc.slug}
                  href={`/calculators/${calc.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-cu-surface-vault p-8 transition-colors hover:bg-cu-surface-char"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-cu-brandy-darkest text-cu-brandy">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cu-brandy">
                    {calc.eyebrow}
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                    {calc.title}
                  </h3>
                  <p className="mt-3 flex-1 text-base text-muted-foreground">
                    {calc.short}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-cu-brandy group-hover:text-cu-brandy-light">
                    Open calculator
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              );
            })}
          </div>

          <p className="mx-auto mt-14 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
            These tools provide general information and indicative modelling
            only. They are not financial, credit, tax or investment advice.
            Capital Unique does not hold an Australian Credit Licence and
            provides services for wholesale and commercial scenarios only.
          </p>
        </div>
      </section>

      <CTABlock
        eyebrow="Beyond the numbers"
        heading="Numbers tell part of the story"
        body="Calculators give you a starting point. The real conversation begins with understanding your situation, structure and timing."
        primaryCta={{ label: "Speak with John", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />
    </>
  );
}
