"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { LightRays } from "@/components/shared/LightRays";

export function PageHero({
  eyebrow,
  heading,
  body,
  primaryCta,
  secondaryCta,
  align = "left",
}) {
  const alignClass = align === "center" ? "mx-auto text-center" : "";

  return (
    <section className="relative overflow-hidden bg-background section-pad-hero px-6 lg:px-10">
      <LightRays />
      <div
        className={`relative z-10 mx-auto max-w-5xl ${alignClass}`}
      >
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="heading-eyebrow mb-6"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="heading-hero"
        >
          {heading}
        </motion.h1>
        {body && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" }}
            className={`mt-7 reading-width-wide text-lg text-muted-foreground md:text-xl ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {body}
          </motion.p>
        )}
        {(primaryCta || secondaryCta) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: "easeOut" }}
            className={`mt-10 flex flex-wrap gap-4 ${
              align === "center" ? "justify-center" : ""
            }`}
          >
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center rounded-md bg-cu-brandy px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-cu-brandy-light transition-colors"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center rounded-md border border-border bg-cu-surface-vault px-6 py-3 text-sm font-medium text-foreground hover:bg-cu-surface-char transition-colors"
              >
                {secondaryCta.label}
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
