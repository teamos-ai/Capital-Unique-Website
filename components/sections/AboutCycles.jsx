"use client";

// AboutCycles — long-form story section, no card chrome.
// Replaces the previous bordered-card composition with editorial column layout.

import { motion } from "motion/react";

export function AboutCycles() {
  return (
    <section className="bg-cu-surface-abyss section-pad px-6 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="heading-eyebrow mb-5">Background</p>
          <h2 className="heading-section">Built through cycles, not trends</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="mt-10 space-y-6 text-lg text-muted-foreground reading-width"
        >
          <p>Capital markets reward judgement earned over time.</p>
          <p>
            Capital Unique is shaped by decades of exposure to real lending
            cycles—growth, contraction, volatility, and recovery—across
            property, business, and private capital.
          </p>
          <p className="text-foreground">The focus has never been volume.</p>
          <p>
            It has always been understanding risk, structure, and timing well
            enough to act with confidence.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
