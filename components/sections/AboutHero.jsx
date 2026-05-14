"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const NAME_WORDS = ["John", "Codrington"];

export function AboutHero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const [imageError, setImageError] = useState(false);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-16 px-6 pb-20 pt-20 md:pt-28 lg:grid-cols-[1.1fr_1fr] lg:gap-x-16 lg:px-10 lg:pb-28 lg:pt-32 xl:gap-x-24">
        {/* Left: copy */}
        <div className="flex flex-col justify-center max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 text-xs uppercase tracking-[0.25em] text-cu-brandy"
          >
            Founder · Capital Unique
          </motion.p>

          <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            {NAME_WORDS.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {word}
                {i < NAME_WORDS.length - 1 && " "}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
            className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl"
          >
            We provide non-bank lending for complex scenarios where traditional
            finance falls short. Whether you&apos;re building, investing, or growing,
            we move with clarity and speed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-cu-brandy px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-cu-brandy-light transition-colors"
            >
              Speak with John
            </Link>
            <Link
              href="/charles-ai"
              className="inline-flex items-center rounded-md border border-border bg-cu-surface-vault px-6 py-3 text-sm font-medium text-foreground hover:bg-cu-surface-char transition-colors"
            >
              Start with Charles A.I
            </Link>
          </motion.div>
        </div>

        {/* Right: portrait */}
        <motion.div
          style={{ y: imageY }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-cu-surface-char via-cu-surface-vault to-cu-surface-void"
        >
          {!imageError && (
            <Image
              src="/images/about/john-codrington.jpg"
              alt="John Codrington, founder of Capital Unique"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              onError={() => setImageError(true)}
            />
          )}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Portrait · 4:5
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
