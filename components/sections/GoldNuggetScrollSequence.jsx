"use client";

// GoldNuggetScrollSequence
// ───────────────────────────────────────────────────────────────
// Scroll-linked image-sequence section, rendered to a canvas.
// A sticky 100vh canvas plays through the gold-nugget frames as
// the user scrolls through a 400vh outer section. Premium feel:
// no over-animation, no cheesy effects, subtle text fades only.
//
// ── HOW TO CHANGE ─────────────────────────────────────────────
//   Frame count, folder, prefix, extension, scroll height,
//   background colour and the copy overlays all live in the
//   constants block right below. Re-generate frames with
//   scripts/process-gold-sequence.mjs.
// ───────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// ── Configurable constants ────────────────────────────────────
const FRAME_COUNT = 26;                  // change if you add/remove frames
const FRAME_PATH = "/gold-sequence/";    // public/ subfolder
const FRAME_PREFIX = "gold_";            // gold_0001.webp
const FRAME_EXTENSION = "webp";
const FRAME_PAD = 4;                     // zero-pad width of the frame index
const SECTION_HEIGHT_VH = 400;           // outer section height; inner is 100vh
const BG_COLOR = "#FAFAF7";              // off-white matched to the source plate

// Text overlays. Each overlay fades in / holds / fades out across the
// given keyframes (all values are scroll-progress 0..1).
const OVERLAYS = [
  {
    title: "Raw value starts hidden.",
    fadeIn: 0.00, peakIn: 0.04, peakOut: 0.18, fadeOut: 0.24,
  },
  {
    title: "Pressure reveals what's inside.",
    fadeIn: 0.26, peakIn: 0.32, peakOut: 0.46, fadeOut: 0.52,
  },
  {
    title: "Every fragment has weight.",
    fadeIn: 0.54, peakIn: 0.60, peakOut: 0.74, fadeOut: 0.80,
  },
  {
    title:
      "Turn scattered potential into something worth owning.",
    fadeIn: 0.82, peakIn: 0.88, peakOut: 0.98, fadeOut: 1.0,
  },
];
// ──────────────────────────────────────────────────────────────

function framePath(i) {
  const num = String(i + 1).padStart(FRAME_PAD, "0");
  return `${FRAME_PATH}${FRAME_PREFIX}${num}.${FRAME_EXTENSION}`;
}

export function GoldNuggetScrollSequence() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]); // HTMLImageElement[]
  const currentFrameRef = useRef(-1);
  const rafRef = useRef(0);

  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);

  // Maps scroll progress to 0..1 across the sticky window of the section.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ── Preload all frames once on mount ────────────────────────
  useEffect(() => {
    let cancelled = false;
    let loaded = 0;
    const arr = new Array(FRAME_COUNT);
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i);
      arr[i] = img;
      img.onload = () => {
        if (cancelled) return;
        loaded += 1;
        setLoadedCount(loaded);
        if (loaded === FRAME_COUNT) setReady(true);
      };
      img.onerror = () => {
        if (cancelled) return;
        // Log which frame failed; carry on so one bad frame doesn't
        // block the whole section.
        // eslint-disable-next-line no-console
        console.warn(
          `[GoldNuggetScrollSequence] frame failed to load: ${img.src}`
        );
        loaded += 1;
        setLoadedCount(loaded);
        if (loaded === FRAME_COUNT) setReady(true);
      };
    }
    imagesRef.current = arr;
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Draw a frame, contain-fit, DPR-aware ────────────────────
  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[frameIndex];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    const needW = Math.round(cssW * dpr);
    const needH = Math.round(cssH * dpr);
    if (canvas.width !== needW || canvas.height !== needH) {
      canvas.width = needW;
      canvas.height = needH;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, cssW, cssH);

    // contain-fit (preserve aspect, centred)
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cssW / cssH;
    let dw, dh;
    if (ir > cr) {
      dw = cssW;
      dh = cssW / ir;
    } else {
      dh = cssH;
      dw = cssH * ir;
    }
    const dx = (cssW - dw) / 2;
    const dy = (cssH - dh) / 2;
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  // ── Subscribe to scroll progress and draw the right frame ───
  useEffect(() => {
    if (!ready) return;

    const onChange = (p) => {
      const clamped = Math.max(0, Math.min(1, p));
      const idx = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(clamped * (FRAME_COUNT - 1)))
      );
      if (idx === currentFrameRef.current) return;
      currentFrameRef.current = idx;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(idx));
    };

    onChange(scrollYProgress.get()); // initial draw at current scroll
    const unsub = scrollYProgress.on("change", onChange);
    return () => {
      unsub();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ready, scrollYProgress]);

  // ── Redraw on resize so the canvas stays crisp + fits ───────
  useEffect(() => {
    if (!ready) return;
    const onResize = () => {
      drawFrame(currentFrameRef.current >= 0 ? currentFrameRef.current : 0);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${SECTION_HEIGHT_VH}vh`, background: BG_COLOR }}
      aria-label="Gold nugget — scroll-linked sequence"
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: BG_COLOR }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ background: BG_COLOR }}
          aria-hidden="true"
        />

        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Loading · {loadedCount}/{FRAME_COUNT}
            </p>
          </div>
        )}

        {/* Subtle text overlays — fade + small y drift only */}
        <div className="pointer-events-none absolute inset-0">
          {OVERLAYS.map((o, i) => (
            <Overlay key={i} entry={o} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Overlay({ entry, scrollYProgress }) {
  const opacity = useTransform(
    scrollYProgress,
    [entry.fadeIn, entry.peakIn, entry.peakOut, entry.fadeOut],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [entry.fadeIn, entry.peakIn, entry.peakOut, entry.fadeOut],
    [32, 0, -8, -32]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 top-[14%] flex justify-center px-6"
    >
      <p
        className="max-w-3xl text-center font-serif text-3xl font-medium leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
        style={{ color: "#1A1A1A" }}
      >
        {entry.title}
      </p>
    </motion.div>
  );
}
