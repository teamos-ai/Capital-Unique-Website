import { AboutHero } from "@/components/sections/AboutHero";
import { AboutCycles } from "@/components/sections/AboutCycles";
import { AboutDirectAccess } from "@/components/sections/AboutDirectAccess";
import { AboutCTA } from "@/components/sections/AboutCTA";

export const metadata = {
  title: "About John Codrington",
  description:
    "Capital Unique is led by John Codrington. One decision-maker, end to end. Decades of exposure to real lending cycles across property, business, and private capital.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutCycles />
      <AboutDirectAccess />
      <AboutCTA />
    </>
  );
}
