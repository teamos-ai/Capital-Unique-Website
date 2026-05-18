"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { pickFooterImage } from "@/lib/footer-images";

// Full-bleed design-system photo behind the CTA section, with a dark
// scrim + vignette so the opaque bento card stands clearly in front.
// Deterministic per route → different photo per page, no flicker.
export function CtaBackdrop() {
  const path = usePathname() || "/";
  const src = pickFooterImage(path);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Dark tint so the front CTA box stands out (both themes) */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/70" />
    </div>
  );
}
