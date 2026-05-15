import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { ArrowRight } from "lucide-react";

export const metadata = {
  alternates: { canonical: "/guides" },
  title: "Guides",
  description:
    "Get the fundamentals. Straightforward frameworks designed to help you understand structure, risk, and decision-making in non-standard capital scenarios.",
};

const GUIDES = [
  {
    title: "Understanding cost beyond interest",
    body: "A practical breakdown of total funding cost, including fees, timing, and opportunity trade-offs.",
    href: "#guide-1",
  },
  {
    title: "How private investors assess risk",
    body: "A clear framework for evaluating downside, protections, and deal structure in private lending.",
    href: "#guide-2",
  },
  {
    title: "Preparing for funding",
    body: "What information matters, how to present it clearly, and why preparation changes outcomes more than rates.",
    href: "#guide-3",
  },
];

const FAQ = [
  {
    q: "Who are these guides for?",
    a: "Our guides serve borrowers navigating non-bank lending, developers structuring complex deals, and investors building private lending portfolios. Each guide addresses real scenarios where traditional finance falls short.",
  },
  {
    q: "Do I need to register to download?",
    a: "Yes. Registration ensures we can deliver guides tailored to your situation and keep you informed of new resources. It takes a moment and opens access to our complete library.",
  },
  {
    q: "How current are these frameworks?",
    a: "Our guides reflect current Australian lending practices and regulatory environments. We update them regularly as market conditions and lending structures evolve.",
  },
  {
    q: "Can I share these with my team?",
    a: "Guides are for your personal use. If your team needs access, contact us and we can discuss options that suit your situation.",
  },
  {
    q: "What if I need specific advice?",
    a: "These guides provide education and frameworks, not personal financial advice. For scenarios specific to your circumstances, our team is ready to discuss your situation directly.",
  },
];

export default function GuidesPage() {
  return (
    <>
      <PageHero
        eyebrow="Guides"
        heading="Get the fundamentals"
        body="Straightforward frameworks designed to help you understand structure, risk, and decision-making in non-standard capital scenarios."
      />

      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {GUIDES.map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="group flex flex-col rounded-2xl border border-border bg-cu-surface-vault p-8 transition-colors hover:bg-cu-surface-char"
              >
                <h3 className="font-serif text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                  {guide.title}
                </h3>
                <p className="mt-3 flex-1 text-base text-muted-foreground">
                  {guide.body}
                </p>
                <p className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-cu-brandy group-hover:text-cu-brandy-light">
                  Download <ArrowRight size={14} />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
              Library access
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Access our complete library
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Receive curated guides, frameworks, and insights delivered
              directly to your inbox.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
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
