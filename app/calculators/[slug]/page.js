import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CALCULATORS, getCalculatorBySlug } from "@/lib/calculators";
import { CalculatorRenderer } from "@/components/calculators/CalculatorRenderer";
import { CTABlock } from "@/components/shared/CTABlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return CALCULATORS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);
  if (!calc) return { title: "Calculator not found" };
  return {
    title: calc.title,
    description: calc.description,
    alternates: { canonical: `/calculators/${slug}` },
  };
}

export default async function CalculatorPage({ params }) {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);
  if (!calc) notFound();

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Calculators", path: "/calculators" },
            { name: calc.title, path: `/calculators/${slug}` },
          ])
        )}
      />
      <section className="bg-background section-pad-hero px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/calculators"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            All calculators
          </Link>
          <p className="heading-eyebrow mt-8 mb-5">{calc.eyebrow}</p>
          <h1 className="heading-hero">{calc.title}</h1>
          <p className="mt-6 reading-width-wide text-lg text-muted-foreground md:text-xl">
            {calc.description}
          </p>
        </div>
      </section>

      <section className="bg-cu-surface-abyss px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <CalculatorRenderer slug={slug} />
        </div>
      </section>

      <CTABlock
        eyebrow="Beyond the numbers"
        heading="A number is a starting point, not an answer"
        body="These tools model the mechanics. The decision depends on structure, timing and the specifics of your scenario — that's the conversation worth having."
        primaryCta={{ label: "Speak with John", href: "/contact" }}
        secondaryCta={{ label: "Start with Charles A.I", href: "/charles-ai" }}
      />
    </>
  );
}
