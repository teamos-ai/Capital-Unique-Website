import { PageHero } from "@/components/shared/PageHero";
import { CTABlock } from "@/components/shared/CTABlock";
import { BentoSection } from "@/components/shared/BentoSection";
import { TeaserGrid } from "@/components/lead-magnets/TeaserGrid";
import { leadMagnetsByGroup } from "@/lib/lead-magnets";

export const metadata = {
  alternates: { canonical: "/free-tools" },
  title: "Free Tools",
  description:
    "Practical, free tools for non-bank finance in Australia — checklists, cheat sheets and swipe files that help borrowers and brokers prepare a deal and read a term sheet without a translator.",
};

export default function FreeToolsIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Free Tools"
        heading="Practical tools, free to use"
        body="Checklists, cheat sheets and swipe files built to be used, not filed. Each one is sent and unlocked instantly."
      />

      <BentoSection
        eyebrow="The approach"
        heading="Built to be used, not filed"
        body="Checklists, cheat sheets and swipe files for the real conversation."
        lead={{
          eyebrow: "The toolkit",
          title: "Get deal-ready",
          body: "Prepare the deal a lender will actually fund.",
        }}
        points={[
          {
            icon: "ShieldCheck",
            eyebrow: "Readiness checklists",
            title: "Self-score before you apply",
            body: "The same ground a credit team covers.",
          },
          {
            icon: "Layers",
            eyebrow: "Cheat sheets",
            title: "Decode a term sheet",
            body: "Structures, ratios and jargon, in plain English.",
          },
        ]}
        wide={{
          eyebrow: "Access",
          title: "Instant access, no fluff",
          body: "Sent and unlocked the moment you ask.",
        }}
      />

      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <TeaserGrid magnets={leadMagnetsByGroup("free-tools")} />
        </div>
      </section>

      <CTABlock
        eyebrow="Beyond the tools"
        heading="When you'd rather just talk it through"
        body="Tools get you prepared. A scenario gets decided in a conversation — with one person, end to end."
        primaryCta={{ label: "Speak with John", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />
    </>
  );
}
