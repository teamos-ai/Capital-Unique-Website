"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { pickFooterImage, pickInkwellImage } from "@/lib/footer-images";

// Full-bleed design-system photo behind the CTA section.
//  - Dark mode  → warm "footerjohn" photo (orange).
//  - Light mode → cool "Inkwell" photo (blue/navy); calculator
//    routes use the bento layout.
// Both render; the `dark:` variant shows the right one. Deterministic
// per route → varied across the site, no hydration flicker.
export function CtaBackdrop() {
  const path = usePathname() || "/";
  const darkSrc = pickFooterImage(path);
  const lightSrc = pickInkwellImage(path);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* Light mode — Inkwell (blue) */}
      <Image
        src={lightSrc}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center dark:hidden"
      />
      {/* Dark mode — footerjohn (orange) */}
      <Image
        src={darkSrc}
        alt=""
        fill
        sizes="100vw"
        className="hidden object-cover object-center dark:block"
      />
      {/* Light touch only — let the tones show through. The opaque
          CTA card carries its own contrast; just a faint edge
          vignette to seat it on the section. */}
      <div className="absolute inset-0 bg-black/15" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35" />
    </div>
  );
}
