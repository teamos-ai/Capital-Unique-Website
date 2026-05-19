"use client";

import { motion } from "motion/react";
import { ImageIcon } from "lucide-react";
import { BrandIcon } from "@/components/shared/BrandIcon";

const FADE_IN = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

// Image-balanced bento, mirroring the home "Approach" section:
//   lead  → large image tile (top-left)
//   points → two stacked icon tiles (right)
//   wide  → full-width image tile (bottom)
// Images are empty placeholders until artwork is supplied per tile
// (pass `image` on lead/wide to fill it).
export function BentoSection({
  eyebrow,
  heading,
  body,
  lead,
  points = [],
  wide,
}) {
  return (
    <section className="bg-background section-pad px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={FADE_IN}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {eyebrow && <p className="heading-eyebrow mb-5">{eyebrow}</p>}
          <h2 className="heading-section">{heading}</h2>
          {body && (
            <p className="mt-6 text-lg text-muted-foreground reading-width-wide">
              {body}
            </p>
          )}
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:mt-16 lg:grid-cols-[1.4fr_1fr] lg:gap-6">
          {lead && <Tile tone="large" {...lead} />}

          {points.length > 0 && (
            <div className="grid grid-cols-1 gap-5 lg:gap-6">
              {points.slice(0, 2).map((p, i) => (
                <Tile key={i} tone="icon" {...p} />
              ))}
            </div>
          )}

          {wide && (
            <div className="lg:col-span-2">
              <Tile tone="large-wide" {...wide} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Tile({ tone, icon, eyebrow, title, body, image }) {
  const isImageTile = tone === "large" || tone === "large-wide";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={FADE_IN}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-cu-surface-vault transition-[background-color,border-color] duration-300 hover:border-cu-brandy-darker hover:bg-cu-surface-char"
    >
      {isImageTile && (
        <div
          className={`relative w-full overflow-hidden border-b border-border ${
            tone === "large-wide" ? "aspect-[21/9]" : "aspect-[16/9]"
          }`}
        >
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={title || ""}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-cu-surface-char via-cu-surface-vault to-cu-surface-void text-muted-foreground">
              <ImageIcon size={26} strokeWidth={1.4} />
              <span className="text-[11px] uppercase tracking-[0.2em]">
                Image
              </span>
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col gap-3 p-8 lg:p-10">
        {tone === "icon" && icon && (
          <BrandIcon name={icon} size="md" className="mb-2" />
        )}
        {eyebrow && <p className="heading-eyebrow">{eyebrow}</p>}
        <h3 className="heading-card">{title}</h3>
        {body && <p className="text-base text-muted-foreground">{body}</p>}
      </div>
    </motion.div>
  );
}
