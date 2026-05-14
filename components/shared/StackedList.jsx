"use client";

// StackedList — flat list of points, no cards, dividers between items.
// Use for principles, values, or anywhere a card grid would feel busy.

import { motion } from "motion/react";
import * as LucideIcons from "lucide-react";

export function StackedList({
  eyebrow,
  heading,
  body,
  items,
  background = "background",
}) {
  const bgClass =
    background === "abyss" ? "bg-cu-surface-abyss" : "bg-background";

  return (
    <section className={`${bgClass} section-pad px-6 lg:px-10`}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Left: header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {eyebrow && <p className="heading-eyebrow mb-5">{eyebrow}</p>}
          {heading && <h2 className="heading-section">{heading}</h2>}
          {body && (
            <p className="mt-6 text-lg text-muted-foreground reading-width">
              {body}
            </p>
          )}
        </motion.div>

        {/* Right: stacked list */}
        <ol className="flex flex-col">
          {items.map((item, i) => {
            const Icon = item.iconName ? LucideIcons[item.iconName] : null;
            const isLast = i === items.length - 1;
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                className={`flex gap-5 py-7 ${
                  isLast ? "" : "border-b border-border/60"
                }`}
              >
                <div className="flex-shrink-0 pt-1">
                  {Icon ? (
                    <Icon
                      size={22}
                      strokeWidth={1.5}
                      className="text-cu-brandy"
                    />
                  ) : (
                    <span className="font-serif text-xl font-medium text-cu-brandy tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="heading-card">{item.title}</h3>
                  {item.body && (
                    <p className="mt-2 text-base text-muted-foreground reading-width">
                      {item.body}
                    </p>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
