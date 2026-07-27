"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { InteractiveGridPattern } from "@/components/shared/InteractiveGridPattern";

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
      className="relative overflow-hidden bg-background section-pad-hero px-6 lg:px-10"
    >
      <InteractiveGridPattern
        width={32}
        height={32}
        squares={[50, 25]}
        className="cu-grid-vignette"
        squaresClassName="hover:fill-cu-brandy/30"
      />
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-y-16 lg:grid-cols-[1.1fr_1fr] lg:gap-x-16 xl:gap-x-24">
        {/* Left: copy — calmer entrance, single fade-up (Hero gets the word reveal) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center max-w-2xl"
        >
          <p className="heading-eyebrow mb-6">Founder · Capital Unique</p>
          <h1 className="heading-hero">John Codrington</h1>
          <p className="mt-8 reading-width-wide text-lg text-muted-foreground md:text-xl">
            We provide non-bank lending for complex scenarios where traditional
            finance falls short. Whether you&apos;re building, investing, or
            growing, we move with clarity and speed.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-cu-brandy px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-cu-brandy-light transition-colors"
            >
              Speak with Team
            </Link>
            <Link
              href="/charles-ai"
              className="inline-flex items-center rounded-md border border-border bg-cu-surface-vault px-6 py-3 text-sm font-medium text-foreground hover:bg-cu-surface-char transition-colors"
            >
              Start with Charles A.I
            </Link>
          </div>
        </motion.div>

        {/* Right: portrait */}
        <motion.div
          style={{ y: imageY }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-cu-surface-char via-cu-surface-vault to-cu-surface-void"
        >
          {!imageError && (
            <Image
              src="/images/people/owner-seated-cafe.jpeg"
              alt="John Codrington, founder of Capital Unique"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-center"
              onError={() => setImageError(true)}
            />
          )}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="heading-eyebrow text-muted-foreground">
                Portrait · 4:5
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
