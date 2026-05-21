"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { InteractiveGridPattern } from "@/components/shared/InteractiveGridPattern";

const HEADLINE_WORDS = ["Capital", "Intelligently", "Applied."];

export function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const [imageError, setImageError] = useState(false);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background section-pad-hero px-6 lg:px-10"
    >
      <InteractiveGridPattern
        width={32}
        height={32}
        squares={[50, 25]}
        className="[mask-image:radial-gradient(60%_60%_at_50%_45%,white,transparent)]"
        squaresClassName="hover:fill-cu-brandy/30"
      />
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-y-16 lg:grid-cols-[1.1fr_1fr] lg:gap-x-16 xl:gap-x-24">
        {/* Left: copy + CTAs */}
        <div className="flex flex-col justify-center max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="heading-eyebrow mb-6"
          >
            Australian non-bank capital
          </motion.p>

          <h1 className="heading-hero">
            {HEADLINE_WORDS.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {word}
                {i < HEADLINE_WORDS.length - 1 && " "}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            className="mt-8 reading-width-wide text-lg text-muted-foreground md:text-xl"
          >
            We provide non-bank lending for complex scenarios where traditional finance
            falls short. Whether you&apos;re building, investing, or growing, we move
            with clarity and speed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.78, ease: "easeOut" }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/get-capital"
              className="inline-flex items-center rounded-md bg-cu-brandy px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-cu-brandy-light transition-colors"
            >
              Get Capital
            </Link>
            <Link
              href="/overview"
              className="inline-flex items-center rounded-md border border-border bg-cu-surface-vault px-6 py-3 text-sm font-medium text-foreground hover:bg-cu-surface-char transition-colors"
            >
              Investor Network
            </Link>
          </motion.div>
        </div>

        {/* Right: hero visual (parallax) */}
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-cu-surface-char via-cu-surface-vault to-cu-surface-void"
        >
          {!imageError && (
            <Image
              src="/images/home/hero.webp"
              alt="Capital Unique — considered Australian capital"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              onError={() => setImageError(true)}
            />
          )}
          {imageError && <BrandPlaceholder label="Hero image · 4:5" />}
        </motion.div>
      </div>
    </section>
  );
}

function BrandPlaceholder({ label }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-cu-surface-char via-cu-surface-vault to-cu-surface-void" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 70% 30%, var(--cu-brandy-darker) 0%, transparent 50%)",
        }}
      />
      <p className="heading-eyebrow text-muted-foreground">{label}</p>
    </div>
  );
}
