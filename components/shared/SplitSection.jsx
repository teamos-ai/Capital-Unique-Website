"use client";

import { motion } from "motion/react";

export function SplitSection({
  eyebrow,
  heading,
  body,
  bullets,
  feature,
  reverse = false,
  background = "abyss",
}) {
  const bgClass =
    background === "abyss"
      ? "bg-cu-surface-abyss"
      : background === "vault"
      ? "bg-cu-surface-vault"
      : "bg-background";

  return (
    <section className={`${bgClass} px-6 py-20 lg:px-10 lg:py-28`}>
      <div className="mx-auto max-w-6xl">
        <div
          className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-x-20 ${
            reverse ? "lg:[direction:rtl]" : ""
          }`}
        >
          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-cu-surface-vault [direction:ltr]"
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
                {feature.icon && (
                  <feature.icon
                    size={48}
                    strokeWidth={1.2}
                    className="text-cu-brandy"
                  />
                )}
                {feature.title && (
                  <p className="font-serif text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                    {feature.title}
                  </p>
                )}
              </div>
            )}
          </motion.div>

          {/* Copy side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="[direction:ltr]"
          >
            {eyebrow && (
              <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
                {eyebrow}
              </p>
            )}
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {heading}
            </h2>
            {body && (
              <p className="mt-6 text-lg text-muted-foreground">{body}</p>
            )}
            {bullets && bullets.length > 0 && (
              <ul className="mt-6 space-y-3">
                {bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-base text-muted-foreground"
                  >
                    <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cu-brandy" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
