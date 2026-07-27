"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { InteractiveGridPattern } from "@/components/shared/InteractiveGridPattern";

const HEADLINE_WORDS = ["Capital", "Intelligently", "Applied."];

// Hero right-tile slideshow. Rotates every HERO_SLIDE_MS in the
// declared order. Edit/reorder by editing this array.
const HERO_SLIDES = [
  {
    src: "/images/home/hero-corporate-male-ceo-001.webp",
    alt: "Capital Unique — a mature Asian male executive in a warm timber bar interior, holding a small espresso.",
  },
  {
    src: "/images/home/hero-casual-couple-lounge-001.webp",
    alt: "Capital Unique — a couple sitting close on a sofa in a warm terracotta lounge.",
  },
  {
    src: "/images/home/hero-corporate-female-ceo-001.webp",
    alt: "Capital Unique — an Asian female executive stepping out of a cafe doorway holding a tablet.",
  },
  {
    src: "/images/home/hero-corporate-handshake-meeting-001.webp",
    alt: "Capital Unique — a handshake between two executives across a coffee table in a warm restaurant lounge.",
  },
  {
    src: "/images/home/hero-retirement-planning-couple-001.webp",
    alt: "Capital Unique — an Asian couple reviewing a tablet together on a wooden bench, plants behind.",
  },
];
const HERO_SLIDE_MS = 4000;

export function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // Rotating hero tile — advance every HERO_SLIDE_MS, pause when the
  // tab is hidden (saves CPU + avoids users coming back to a jarring
  // jump from many missed cycles).
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    let id = 0;
    const start = () => {
      stop();
      id = window.setInterval(
        () => setSlide((s) => (s + 1) % HERO_SLIDES.length),
        HERO_SLIDE_MS
      );
    };
    const stop = () => {
      if (id) window.clearInterval(id);
      id = 0;
    };
    const onVis = () => (document.hidden ? stop() : start());
    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

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

        {/* Right: rotating hero tile (parallax container, 5 slides) */}
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-cu-surface-char via-cu-surface-vault to-cu-surface-void"
          aria-roledescription="carousel"
          aria-label="Capital Unique clients and operators"
        >
          {HERO_SLIDES.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className={`object-cover transition-opacity duration-700 ease-in-out ${
                i === slide ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={i !== slide}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

