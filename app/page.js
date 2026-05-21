import { Hero } from "@/components/sections/Hero";
import { Approach } from "@/components/sections/Approach";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTAFinal } from "@/components/sections/CTAFinal";

export default function Home() {
  return (
    <>
      <Hero />
      <Approach />
      <Process />
      <Testimonials />
      <CTAFinal />
    </>
  );
}
