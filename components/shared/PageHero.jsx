"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function PageHero({
  eyebrow,
  heading,
  body,
  primaryCta,
  secondaryCta,
  align = "left",
  size = "default",
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  const headingSize =
    size === "large"
      ? "text-5xl md:text-6xl lg:text-7xl"
      : "text-4xl md:text-5xl lg:text-6xl";

  return (
    <section className="bg-background px-6 pb-16 pt-20 lg:px-10 lg:pb-24 lg:pt-32">
      <div
        className={`mx-auto max-w-4xl ${alignClass} ${
          align === "center" ? "" : "max-w-3xl"
        }`}
      >
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6 text-xs uppercase tracking-[0.25em] text-cu-brandy"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`font-serif font-semibold leading-[1.1] tracking-tight ${headingSize}`}
        >
          {heading}
        </motion.h1>
        {body && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className={`mt-8 text-lg text-muted-foreground md:text-xl ${
              align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
            }`}
          >
            {body}
          </motion.p>
        )}
        {(primaryCta || secondaryCta) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
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
