"use client";

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
    <section className="bg-background px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
            Principal-led
          </p>
          <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            One decision-maker. End to end.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Capital Unique is led by John Codrington, who personally oversees
            every engagement. There are no hand-offs, committees, or
            intermediaries.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-border bg-cu-surface-vault p-8 transition-colors hover:bg-cu-surface-char"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-cu-brandy-darkest text-cu-brandy">
                <pillar.icon size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                {pillar.title}
              </h3>
              <p className="mt-3 text-base text-muted-foreground">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
