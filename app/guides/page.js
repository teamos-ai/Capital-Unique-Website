import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { BentoSection } from "@/components/shared/BentoSection";
import { TeaserGrid } from "@/components/lead-magnets/TeaserGrid";
import { leadMagnetsByGroup } from "@/lib/lead-magnets";

export const metadata = {
  alternates: { canonical: "/guides" },
  title: "Guides",
  description:
    "Free, considered guides on non-bank capital, development finance and private credit in Australia. Written for borrowers, developers and wholesale investors who want to think clearly before they act.",
};

const FAQ = [
  {
    q: "Who are these guides for?",
    a: "Borrowers navigating non-bank lending, developers structuring complex deals, and wholesale investors assessing private credit. Each guide addresses real scenarios where traditional finance falls short.",
  },
  {
    q: "Why do I enter my details to read one?",
    a: "Each guide is sent and unlocked instantly after a short form. It also lets us keep you across new resources. It takes about twenty seconds and there's no autoresponder ladder.",
  },
  {
    q: "How current are these frameworks?",
    a: "They reflect current Australian non-bank lending practice and the 2025–26 regulatory environment. We update them as market conditions and structures change.",
  },
  {
    q: "Is this financial advice?",
    a: "No. These guides are general information and education only — not personal financial, credit, tax or investment advice. For your specific scenario, speak with John directly.",
  },
];

export default function GuidesPage() {
  return (
    <>
      <PageHero
        eyebrow="Guides"
        heading="Get the fundamentals"
        body="Considered frameworks for non-standard capital decisions. Each one is built to help you think clearly — the trade-offs, the structure, and the questions to ask."
      />

      <BentoSection
        eyebrow="The approach"
        heading="Frameworks worth keeping"
        body="Considered reading for borrowers, developers and wholesale investors."
        lead={{
          eyebrow: "The library",
          title: "Think clearly before you act",
          body: "The trade-offs, the structure, and the questions to ask.",
        }}
        points={[
          {
            icon: "FileText",
            eyebrow: "For borrowers",
            title: "How non-bank capital works",
            body: "When it beats the bank, and what it really costs.",
          },
          {
            icon: "TrendingUp",
            eyebrow: "For investors",
            title: "A disciplined private-credit lens",
            body: "How risk is priced and what to watch for.",
          },
        ]}
        wide={{
          eyebrow: "Access",
          title: "Sent and unlocked instantly",
          body: "Twenty seconds, no autoresponder ladder.",
        }}
      />

      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <TeaserGrid magnets={leadMagnetsByGroup("guides")} />
        </div>
      </section>

      <section className="bg-cu-surface-abyss px-6 pb-20 lg:px-10 lg:pb-28">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
              Questions
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Clarity on guides, access, and approach
            </h2>
          </div>
          <div className="mt-14 space-y-4">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-border bg-cu-surface-vault p-6 transition-colors open:bg-cu-surface-char"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 text-base font-medium text-foreground">
                  <span>{item.q}</span>
                  <span className="mt-1 text-cu-brandy transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-base text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        eyebrow="Beyond the framework"
        heading="When your scenario doesn't fit a guide"
        body="Frameworks help you think. Real scenarios deserve a direct conversation. We're ready when you are."
        primaryCta={{ label: "Speak with John", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />
    </>
  );
}
