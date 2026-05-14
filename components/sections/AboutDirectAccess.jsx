"use client";

// AboutDirectAccess — flat stacked list (no cards) for the principal-led pillars.
// Demonstrates the new StackedList pattern without importing it directly,
// to keep the section's specific layout under our control.

import { motion } from "motion/react";
import { UserCheck, MessageSquare, Scale } from "lucide-react";

const PILLARS = [
  {
    icon: UserCheck,
    title: "One decision-maker",
    body: "John personally oversees every engagement. There are no hand-offs, committees, or intermediaries.",
  },
  {
    icon: MessageSquare,
    title: "Direct communication",
    body: "Every borrower and investor deals directly with the person responsible for judgement, structure, and outcomes.",
  },
  {
    icon: Scale,
    title: "Accountability that holds",
    body: "Faster understanding, clearer communication, and accountability that does not diffuse across teams.",
  },
];

export function AboutDirectAccess() {
  return (
    <section className="bg-background section-pad px-6 lg:px-10">
      <div className="mx-auto max-w-6xl grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Left: heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="heading-eyebrow mb-5">Principal-led</p>
          <h2 className="heading-section">One decision-maker. End to end.</h2>
          <p className="mt-6 text-lg text-muted-foreground reading-width">
            Capital Unique is led by John Codrington, who personally oversees
            every engagement. There are no hand-offs, committees, or
            intermediaries.
          </p>
        </motion.div>

        {/* Right: stacked pillars (no cards) */}
        <ol className="flex flex-col">
          {PILLARS.map((pillar, i) => (
            <motion.li
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
              className={`flex gap-5 py-7 ${
                i === PILLARS.length - 1 ? "" : "border-b border-border/60"
              }`}
            >
              <div className="flex-shrink-0 pt-1">
                <pillar.icon
                  size={22}
                  strokeWidth={1.5}
                  className="text-cu-brandy"
                />
              </div>
              <div className="flex-1">
                <h3 className="heading-card">{pillar.title}</h3>
                <p className="mt-2 text-base text-muted-foreground reading-width">
                  {pillar.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
