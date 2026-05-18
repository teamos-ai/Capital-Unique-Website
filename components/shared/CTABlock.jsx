"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { CtaBackdrop } from "./CtaBackdrop";

export function CTABlock({
  eyebrow = "Next step",
  heading,
  body,
  primaryCta = { label: "Contact us", href: "/contact" },
  secondaryCta,
  background = "abyss",
}) {
  const bgClass =
    background === "abyss"
      ? "bg-cu-surface-abyss"
      : background === "void"
      ? "bg-background"
      : "bg-cu-surface-vault";

  return (
    <section
      className={`relative overflow-hidden ${bgClass} section-pad px-6 lg:px-10`}
    >
      <CtaBackdrop />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-cu-surface-vault px-8 py-14 text-center md:px-16 md:py-16"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, var(--cu-brandy-darkest) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10">
          <p className="heading-eyebrow mb-5">{eyebrow}</p>
          <h2 className="heading-section">{heading}</h2>
          {body && (
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              {body}
            </p>
          )}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-2 rounded-md bg-cu-brandy px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-cu-brandy-light transition-colors"
            >
              {primaryCta.label}
              <ArrowRight size={16} />
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center rounded-md border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground hover:bg-cu-surface-char transition-colors"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
