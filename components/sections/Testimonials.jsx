"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Star } from "lucide-react";

// TODO: Replace with real client testimonials when available.
// Per BUILD-PLAN.md, current set is structural placeholder using Relume's
// fictional names. Real testimonials should come from John before launch.
const TESTIMONIALS_LEFT = [
  {
    quote: "Capital Unique moved with precision where others moved with hesitation.",
    name: "James Morrison",
    role: "Property developer, Melbourne",
  },
  {
    quote: "The process was transparent from start to finish, no hidden costs or surprises.",
    name: "Sarah Winters",
    role: "Business owner, Brisbane",
  },
  {
    quote: "Real partnership, not just a transaction, that's what we found here.",
    name: "Victoria Lane",
    role: "Real estate investor, Hobart",
  },
  {
    quote: "They delivered exactly what they promised, on time and with integrity.",
    name: "Marcus Webb",
    role: "Construction company owner, Gold Coast",
  },
];

const TESTIMONIALS_RIGHT = [
  {
    quote: "They understood the deal when banks wouldn't even look at it.",
    name: "Michael Chen",
    role: "Developer, Sydney",
  },
  {
    quote: "Fast decisions without cutting corners, that's what sets them apart.",
    name: "Emma Chen",
    role: "Entrepreneur, Perth",
  },
  {
    quote: "They treated our capital with the same care we do, which is rare.",
    name: "David Rothschild",
    role: "Investor, Sydney",
  },
  {
    quote: "Capital Unique proved that speed and thoughtfulness aren't mutually exclusive.",
    name: "Nicole Hartley",
    role: "Investment advisor, Canberra",
  },
  {
    quote: "They listened more than they talked, which told me everything I needed to know.",
    name: "Robert Keane",
    role: "Family office director, Adelaide",
  },
];

export function Testimonials() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const leftY = useTransform(scrollYProgress, [0, 1], ["8rem", "-8rem"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["-8rem", "8rem"]);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-background section-pad px-6 lg:px-10"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-x-16">
        {/* Left: section heading */}
        <div className="flex flex-col justify-center">
          <p className="heading-eyebrow mb-5">Testimonials</p>
          <h2 className="heading-section">What clients say</h2>
          <p className="mt-6 reading-width text-lg text-muted-foreground">
            Those who&apos;ve worked with us speak to the difference clarity and
            speed make.
          </p>
        </div>

        {/* Right: parallax columns */}
        <div className="relative grid h-[80vh] grid-cols-1 gap-4 overflow-hidden md:grid-cols-2 md:gap-6">
          <motion.div
            style={{ y: leftY }}
            className="flex flex-col gap-4 md:gap-6"
          >
            {TESTIMONIALS_LEFT.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </motion.div>
          <motion.div
            style={{ y: rightY }}
            className="flex flex-col gap-4 md:gap-6"
          >
            {TESTIMONIALS_RIGHT.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ quote, name, role }) {
  return (
    <div className="rounded-2xl border border-border bg-cu-surface-vault p-6 md:p-8">
      <div className="mb-5 flex gap-0.5 text-cu-brandy">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <blockquote className="text-base leading-relaxed text-foreground/90">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-6">
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>
    </div>
  );
}
