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
      {/* Light touch only — let the warm tones show through. The
          opaque CTA card carries its own contrast, so just a faint
          edge vignette to seat it on the section. */}
      <div className="absolute inset-0 bg-black/15" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35" />
    </div>
  );
}
