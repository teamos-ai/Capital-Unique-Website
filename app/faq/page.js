import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { BentoSection } from "@/components/shared/BentoSection";

export const metadata = {
  alternates: { canonical: "/faq" },
  title: "Frequently Asked Questions",
  description:
    "Common questions about Capital Unique, non-bank lending, and how our capital advisory services work.",
};

const FAQ_GROUPS = [
  {
    heading: "About Capital Unique",
    items: [
      {
        q: "What is Capital Unique?",
        a: "Capital Unique is a principal-led capital advisor based in Australia. We structure non-bank lending and private capital arrangements for commercial borrowers and sophisticated investors. We do not operate in consumer or retail finance.",
      },
      {
        q: "Who runs the firm?",
        a: "John Codrington is the principal. Every engagement is overseen by John personally — there are no hand-offs, committees, or intermediaries between you and the person responsible for the structure and outcome.",
      },
      {
        q: "Where is Capital Unique based?",
        a: "Capital Unique is an Australian firm based in New South Wales. We work with clients across Australia.",
      },
    ],
  },
  {
    heading: "How we work",
    items: [
      {
        q: "What is non-bank capital?",
        a: "Non-bank capital is funding arranged outside the traditional banking system. It is structured around a specific scenario — the assets, timing, cashflow, and risk profile — rather than fitting a borrower into a fixed lending product. It typically involves private investors, family offices, or specialist funders.",
      },
      {
        q: "How is this different from a broker?",
        a: "Brokers typically introduce borrowers to lenders and earn a commission for the introduction. Capital Unique structures the capital arrangement itself — assessing the deal, designing the structure, and managing the engagement end to end. The work begins before any introduction is appropriate.",
      },
      {
        q: "What is your minimum and maximum deal size?",
        a: "Each scenario is assessed on its own merits. We typically structure capital from approximately $1M upwards, though deal complexity matters more than dollar size. If your scenario is structured well and assessable, size rarely prevents the conversation.",
      },
      {
        q: "How long does the process take?",
        a: "From first conversation to capital deployment typically takes one to four weeks, depending on scenario complexity. Bridging and time-sensitive scenarios can move faster when structure is clear and information is ready.",
      },
      {
        q: "What information do you need to start?",
        a: "Initially, brief context about the scenario, the timing, and what the capital is for. Detailed financial information is collected later in the engagement, in direct conversation, once the structure is being designed.",
      },
    ],
  },
  {
    heading: "Charles A.I",
    items: [
      {
        q: "What is Charles A.I?",
        a: "Charles A.I is an intelligent assistant designed to help you map your scenario before speaking with our team. It helps clarify structure, timing, and constraints so the conversation that follows is shorter and more decisive. It is not a substitute for our advice or for an actual capital arrangement.",
      },
      {
        q: "Is Charles A.I available now?",
        a: "Yes — Charles is live. Head to the Charles A.I page, describe your scenario or run a quick calculation, and Charles will help you get things clear before you speak with the team.",
      },
    ],
  },
  {
    heading: "Regulation and licensing",
    items: [
      {
        q: "Are you regulated by ASIC?",
        a: "Capital Unique does not hold an Australian Credit Licence and does not provide consumer credit, credit assistance, or financial product advice within the meaning of Australian financial services regulation. Our services are limited to wholesale, commercial, and business-purpose scenarios that fall outside that regulatory framework.",
      },
      {
        q: "Do you provide financial advice?",
        a: "No. Information published on this site and discussed in conversation is general in nature and does not constitute personal financial, legal, or tax advice. You should obtain advice from a qualified professional before acting on any scenario specific to your circumstances.",
      },
      {
        q: "Are conversations confidential?",
        a: "Yes. Discussions about your scenario, financial position, and commercial circumstances are treated as confidential. Personal information is handled in accordance with our Privacy Policy.",
      },
    ],
  },
  {
    heading: "Working with us",
    items: [
      {
        q: "Is there a cost to start a conversation?",
        a: "No. Initial conversations to assess scenario fit are at no cost or obligation. Fees and structure are discussed and agreed in writing before any formal engagement begins.",
      },
      {
        q: "Who are you not for?",
        a: "We are not the right firm for consumer mortgages, residential home loans, rate-driven enquiries, or speculative ideas without execution. If your scenario is straightforward retail finance, you are better served by a traditional lender or broker.",
      },
      {
        q: "Can I work with you if I'm interstate?",
        a: "Yes. We work with borrowers and investors across Australia. Most engagement is handled by phone, video, and email, with in-person meetings where appropriate.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        heading="Frequently asked questions"
        body="Common questions about Capital Unique, non-bank lending, and how our capital advisory services work. If you don't find your answer here, get in touch."
      />

      <BentoSection
        eyebrow="The approach"
        heading="Clarity, before the conversation"
        body="Straight answers to the questions that matter most."
        lead={{
          image: "/images/people/owner-seated-cafe.jpeg",
          eyebrow: "Common questions",
          title: "How it actually works",
          body: "What we do, what we don't, and how fast.",
        }}
        points={[
          {
            icon: "Scale",
            eyebrow: "What we don't do",
            title: "Wholesale & commercial only",
            body: "No consumer credit; no Australian Credit Licence.",
          },
          {
            icon: "Clock",
            eyebrow: "How fast",
            title: "Indicative timeframes, set honestly",
            body: "Speed depends on the scenario — we say so plainly.",
          },
        ]}
        wide={{
          image: "/images/editorial/codrington-headshot-bw.jpeg",
          eyebrow: "Direct",
          title: "Still unsure? Ask the Team",
          body: "A person answers — not an auto-reply.",
        }}
      />

      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-3xl">
          {FAQ_GROUPS.map((group) => (
            <div key={group.heading} className="mb-12 last:mb-0">
              <h2 className="mb-6 font-serif text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                {group.heading}
              </h2>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-2xl border border-border bg-cu-surface-vault p-6 transition-colors open:bg-cu-surface-char"
                  >
                    <summary className="flex cursor-pointer items-start justify-between gap-4 text-base font-medium text-foreground">
                      <span>{item.q}</span>
                      <span className="mt-1 flex-shrink-0 text-cu-brandy transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-base text-muted-foreground">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABlock
        eyebrow="Still have questions"
        heading="Get a direct answer"
        body="If your question isn't covered above, the fastest way to get a clear answer is a direct conversation."
        primaryCta={{ label: "Speak with Team", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />
    </>
  );
}
