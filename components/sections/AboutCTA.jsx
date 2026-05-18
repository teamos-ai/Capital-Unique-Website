"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { CtaBackdrop } from "@/components/shared/CtaBackdrop";

export function AboutCTA() {
  return (
    <section className="relative overflow-hidden bg-cu-surface-abyss section-pad px-6 lg:px-10">
      <CtaBackdrop />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-cu-surface-vault px-8 py-16 text-center md:px-16 md:py-20"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, var(--cu-brandy-darkest) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10">
          <p className="heading-eyebrow mb-5">Direct conversation</p>
          <h2 className="heading-section">Ready to speak with John</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A conversation with Capital Unique begins with understanding your
            situation, without obligation or pressure.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-cu-brandy px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-cu-brandy-light transition-colors"
            >
              Book a quick call
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/charles-ai"
              className="inline-flex items-center rounded-md border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground hover:bg-cu-surface-char transition-colors"
            >
              Start with Charles A.I
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
