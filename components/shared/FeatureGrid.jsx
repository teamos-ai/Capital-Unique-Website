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
  align = "left",
  density = "default",
  variant = "card",
}) {
  const bgClass =
    background === "abyss"
      ? "bg-cu-surface-abyss"
      : background === "vault"
      ? "bg-cu-surface-vault"
      : "bg-background";

  const padClass = density === "tight" ? "section-pad-tight" : "section-pad";

  const colsClass =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : "md:grid-cols-2 lg:grid-cols-3";

  const headerAlignClass =
    align === "center" ? "mx-auto text-center max-w-2xl" : "max-w-2xl";

  return (
    <section className={`${bgClass} ${padClass} px-6 lg:px-10`}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || heading || body) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={headerAlignClass}
          >
            {eyebrow && <p className="heading-eyebrow mb-5">{eyebrow}</p>}
            {heading && <h2 className="heading-section">{heading}</h2>}
            {body && (
              <p
                className={`mt-6 text-lg text-muted-foreground reading-width-wide ${
                  align === "center" ? "mx-auto" : ""
                }`}
              >
                {body}
              </p>
            )}
          </motion.div>
        )}

        <div
          className={`mt-12 grid grid-cols-1 gap-5 ${colsClass} lg:gap-6 lg:mt-16`}
        >
          {items.map((item, i) => {
            const Icon = item.iconName ? LucideIcons[item.iconName] : null;
            return (
              <FeatureCard
                key={item.title}
                item={item}
                Icon={Icon}
                index={i}
                variant={variant}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ item, Icon, index, variant }) {
  const isFlat = variant === "flat";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: "easeOut" }}
      whileHover={isFlat ? undefined : { y: -3 }}
      className={
        isFlat
          ? "py-2"
          : "rounded-2xl border border-border bg-cu-surface-vault p-7 transition-colors hover:bg-cu-surface-char"
      }
    >
      {Icon && (
        <div
          className={
            isFlat
              ? "mb-4 inline-flex text-cu-brandy"
              : "mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-cu-brandy-darkest text-cu-brandy"
          }
        >
          <Icon size={isFlat ? 22 : 20} strokeWidth={1.5} />
        </div>
      )}
      {item.eyebrow && <p className="heading-eyebrow mb-2">{item.eyebrow}</p>}
      <h3 className="heading-card">{item.title}</h3>
      {item.body && (
        <p className="mt-3 text-base text-muted-foreground reading-width">
          {item.body}
        </p>
      )}
    </motion.div>
  );
}
