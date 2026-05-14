"use client";

import { motion } from "motion/react";
import * as LucideIcons from "lucide-react";

export function FeatureGrid({
  eyebrow,
  heading,
  body,
  items,
  columns = 3,
  background = "background",
}) {
  const bgClass =
    background === "abyss"
      ? "bg-cu-surface-abyss"
      : background === "vault"
      ? "bg-cu-surface-vault"
      : "bg-background";

  const colsClass =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className={`${bgClass} px-6 py-20 lg:px-10 lg:py-28`}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || heading || body) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            {eyebrow && (
              <p className="mb-5 text-xs uppercase tracking-[0.25em] text-cu-brandy">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                {heading}
              </h2>
            )}
            {body && (
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                {body}
              </p>
            )}
          </motion.div>
        )}

        <div
          className={`mt-14 grid grid-cols-1 gap-5 ${colsClass} lg:gap-6 lg:mt-20`}
        >
          {items.map((item, i) => {
            const Icon = item.iconName ? LucideIcons[item.iconName] : null;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-border bg-cu-surface-vault p-8 transition-colors hover:bg-cu-surface-char"
              >
                {Icon && (
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-cu-brandy-darkest text-cu-brandy">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                )}
                {item.eyebrow && (
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-cu-brandy">
                    {item.eyebrow}
                  </p>
                )}
                <h3 className="font-serif text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                  {item.title}
                </h3>
                {item.body && (
                  <p className="mt-3 text-base text-muted-foreground">
                    {item.body}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
