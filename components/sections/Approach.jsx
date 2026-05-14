"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Zap } from "lucide-react";

const FADE_IN = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Approach() {
  return (
    <section className="bg-background section-pad px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Section header — left-aligned */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={FADE_IN}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="heading-eyebrow mb-5">Approach</p>
          <h2 className="heading-section">Built for those who think differently</h2>
          <p className="mt-6 text-lg text-muted-foreground reading-width-wide">
            Capital Unique exists where traditional banking ends. We understand
            complex commercial deals, unconventional scenarios, and the investors
            who fund them.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 lg:mt-16 lg:grid-cols-[1.4fr_1fr] lg:gap-6">
          {/* Top-left: Borrowers (large with image) */}
          <BentoTile
            tone="large"
            eyebrow="Borrowers"
            title="For borrowers seeking finance"
            body="Fast decisions on deals banks decline, with transparent terms and no unnecessary friction."
            imageSrc="/images/home/bento-borrowers.webp"
            imageAlt="Borrowers seeking flexible capital"
            placeholderLabel="Bento — Borrowers · 16:9"
          />

          {/* Right column with two stacked icon tiles */}
          <div className="grid grid-cols-1 gap-5 lg:gap-6">
            <BentoTile
              tone="icon"
              icon={Zap}
              eyebrow="Speed"
              title="Fast assessment on deals others decline."
              body="We move quietly, think carefully, and deliver with precision."
            />
            <BentoTile
              tone="icon"
              icon={ShieldCheck}
              eyebrow="When banks say no"
              title="Capital when banks say no"
              body="Fast assessment on deals others decline."
            />
          </div>

          {/* Bottom: Partners (large, full width) */}
          <div className="lg:col-span-2">
            <BentoTile
              tone="large-wide"
              eyebrow="Partners"
              title="Deploy capital with clarity"
              body="Structured deals, managed risk, genuine partnerships built to endure."
              imageSrc="/images/home/bento-partners.webp"
              imageAlt="Capital deployed with structure and clarity"
              placeholderLabel="Bento — Partners · 16:9"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function BentoTile({
  tone,
  eyebrow,
  title,
  body,
  imageSrc,
  imageAlt,
  placeholderLabel,
  icon: Icon,
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={FADE_IN}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-cu-surface-vault transition-colors hover:bg-cu-surface-char"
    >
      {(tone === "large" || tone === "large-wide") && (
        <BentoImage
          src={imageSrc}
          alt={imageAlt}
          placeholderLabel={placeholderLabel}
          aspect={tone === "large-wide" ? "aspect-[21/9]" : "aspect-[16/9]"}
        />
      )}
      <div className="flex flex-col gap-3 p-8 lg:p-10">
        {tone === "icon" && Icon && (
          <Icon className="mb-2 h-6 w-6 text-cu-brandy" strokeWidth={1.5} />
        )}
        <p className="heading-eyebrow">{eyebrow}</p>
        <h3 className="heading-card">{title}</h3>
        <p className="text-base text-muted-foreground">{body}</p>
      </div>
    </motion.div>
  );
}

function BentoImage({ src, alt, placeholderLabel, aspect }) {
  const [error, setError] = useState(false);
  return (
    <div
      className={`relative w-full overflow-hidden border-b border-border ${aspect}`}
    >
      {!error && src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          onError={() => setError(true)}
        />
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-cu-surface-char via-cu-surface-vault to-cu-surface-void" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at 30% 70%, var(--cu-brandy-darker) 0%, transparent 60%)",
            }}
          />
          <p className="heading-eyebrow text-muted-foreground">
            {placeholderLabel}
          </p>
        </div>
      )}
    </div>
  );
}
