"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { BrandIcon } from "@/components/shared/BrandIcon";

const STEPS = [
  {
    n: "01",
    title: "Understand the deal",
    body: "We discuss your business objectives, timing, and structure so we can understand what you're trying to achieve.",
    iconName: "Eye",
  },
  {
    n: "02",
    title: "Assess options",
    body: "We review the information and identify the most suitable funding approach based on your needs.",
    iconName: "Compass",
  },
  {
    n: "03",
    title: "Confirm terms",
    body: "We clearly explain the proposed terms, costs, and conditions before anything moves forward.",
    iconName: "FileCheck",
  },
  {
    n: "04",
    title: "Deploy funding",
    body: "Once agreed, we manage the process through to funding and remain involved as the capital is deployed.",
    iconName: "Send",
  },
];

export function Process() {
  return (
    <section className="bg-cu-surface-abyss section-pad px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          {/* Left: sticky header */}
          <div className="md:sticky md:top-32 md:self-start">
            <p className="heading-eyebrow mb-5">The Process</p>
            <h2 className="heading-section">How funding works</h2>
            <p className="mt-6 text-lg text-muted-foreground reading-width">
              We start by understanding your objectives and assessing the
              opportunity with care. From there, we structure the right solution
              and guide the process through to funding with clarity at every
              stage. The approach is deliberate, transparent, and designed to
              move forward with confidence.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md border border-border bg-cu-surface-vault px-5 py-2.5 text-sm font-medium text-foreground hover:bg-cu-surface-char transition-colors"
              >
                Book quick chat
              </Link>
              <Link
                href="/charles-ai"
                className="inline-flex items-center gap-1 text-sm font-medium text-cu-brandy hover:text-cu-brandy-light transition-colors"
              >
                Charles A.I
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right: stepped cards */}
          <div className="flex flex-col gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                className="rounded-2xl border border-border bg-cu-surface-vault p-7 transition-colors hover:bg-cu-surface-char"
              >
                <div className="mb-5 flex items-center gap-4">
                  <BrandIcon name={step.iconName} size="md" />
                  <span className="font-serif text-2xl font-semibold tracking-tight text-cu-neutral-light tabular-nums">
                    {step.n}
                  </span>
                </div>
                <h3 className="heading-card">{step.title}</h3>
                <p className="mt-3 text-base text-muted-foreground">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
