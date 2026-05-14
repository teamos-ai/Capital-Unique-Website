"use client";

import { motion } from "motion/react";
import { Compass } from "lucide-react";

const FADE_IN = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function AboutCycles() {
  return (
    <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-x-20">
          {/* Left: visual placeholder (subtle) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={FADE_IN}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-cu-surface-vault"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cu-surface-char via-cu-surface-vault to-cu-surface-void" />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 70%, var(--cu-brandy-darker) 0%, transparent 60%)",
              }}
            />
            <div className="relative z-10 flex h-full flex-col items-start justify-end gap-6 p-10">
              <Compass
                size={48}
                strokeWidth={1.2}
                className="text-cu-brandy"
              />
              <p className="font-serif text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                Decades, not quarters.
              </p>
            </div>
          </motion.div>

          {/* Right: copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={FADE_IN}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
              Background
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Built through cycles, not trends
            </h2>
            <div className="mt-8 space-y-5 text-lg text-muted-foreground">
              <p>Capital markets reward judgement earned over time.</p>
              <p>
                Capital Unique is shaped by decades of exposure to real lending
                cycles—growth, contraction, volatility, and recovery—across
                property, business, and private capital.
              </p>
              <p className="text-foreground">The focus has never been volume.</p>
              <p>
                It has always been understanding risk, structure, and timing
                well enough to act with confidence.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
