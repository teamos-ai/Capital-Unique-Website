import { AboutHero } from "@/components/sections/AboutHero";
import { AboutCycles } from "@/components/sections/AboutCycles";
import { AboutDirectAccess } from "@/components/sections/AboutDirectAccess";
import { AboutCTA } from "@/components/sections/AboutCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, personSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = {
  alternates: { canonical: "/about" },
  title: "About John Codrington",
  description:
    "Capital Unique is led by John Codrington. One decision-maker, end to end. Decades of exposure to real lending cycles across property, business, and private capital.",
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          personSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About John Codrington", path: "/about" },
          ])
        )}
      />
      <AboutHero />
      <AboutCycles />
      <AboutDirectAccess />
      <AboutCTA />
    </>
  );
}
