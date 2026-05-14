"use client";

// EditorialSplit — left content / right visual or stat block.
// Replaces FeatureGrid for sections that benefit from a more
// magazine-like, asymmetric composition.

import { motion } from "motion/react";
import * as LucideIcons from "lucide-react";

export function EditorialSplit({
  eyebrow,
  heading,
  body,
  bullets,
  feature,
  reverse = false,
  background = "background",
}) {
  const bgClass =
    background === "abyss" ? "bg-cu-surface-abyss" : "bg-background";

  const FeatureIcon = feature?.iconName
    ? LucideIcons[feature.iconName]
    : null;

  return (
    <section className={`${bgClass} section-pad px-6 lg:px-10`}>
      <div className="mx-auto max-w-6xl">
        <div
          className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 ${
            reverse ? "lg:[direction:rtl]" : ""
          }`}
        >
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="[direction:ltr]"
          >
            {eyebrow && <p className="heading-eyebrow mb-5">{eyebrow}</p>}
            <h2 className="heading-section">{heading}</h2>
            {body && (
              <p className="mt-6 text-lg text-muted-foreground reading-width">
                {body}
              </p>
            )}
            {bullets && bullets.length > 0 && (
              <ul className="mt-7 space-y-3">
                {bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-base text-muted-foreground"
                  >
                    <span className="mt-2 inline-block h-1 w-4 flex-shrink-0 bg-cu-brandy" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          {/* Feature card / visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="[direction:ltr] relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-cu-surface-vault"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cu-surface-char via-cu-surface-vault to-cu-surface-void" />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 70%, var(--cu-brandy-darker) 0%, transparent 60%)",
              }}
            />
            {feature && (
              <div className="relative z-10 flex h-full flex-col items-start justify-end gap-6 p-10">
                {FeatureIcon && (
                  <FeatureIcon
                    size={44}
                    strokeWidth={1.2}
                    className="text-cu-brandy"
                  />
                )}
                {feature.title && (
                  <p className="heading-section text-foreground">
                    {feature.title}
                  </p>
                )}
                {feature.body && (
                  <p className="text-base text-muted-foreground">
                    {feature.body}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
