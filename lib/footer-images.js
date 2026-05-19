// Backdrop images for the CTA section.
//  - DARK mode  → warm "footerjohn" photos (orange).
//  - LIGHT mode → cool "Inkwell" set (blue / navy).
// One is chosen deterministically per page (stable across SSR/CSR,
// varied across the site) so every page gets a different photo
// without hydration flicker. CtaBackdrop renders both and shows the
// theme-appropriate one via the `dark:` variant.
export const FOOTER_IMAGES = [
  "/images/footer/footerjohn-wave.jpeg",
  "/images/footer/footerjohn-pressure.jpeg",
  "/images/footer/footerjohn-shuffle-cards.jpeg",
  "/images/footer/footerjohn-cards.jpeg",
  "/images/footer/footerjohn-ribbons.png",
  "/images/footer/footerjohn-fan.png",
  "/images/footer/footerjohn-panels.png",
  "/images/footer/footerjohn-bloom.png",
  "/images/footer/footerjohn-curtain.png",
  "/images/footer/footerjohn-pinwheel.png",
];

export const INKWELL_IMAGES = [
  "/images/footer/Inkwell_WaveBands_TopographicFlow.png",
  "/images/footer/Inkwell_FanCards_ShuffleStack.png",
  "/images/footer/Inkwell_ArchForms_PressureStack.png",
  "/images/footer/Inkwell_SpiralPetals_Bloom.png",
  "/images/footer/Inkwell_Waves_LayeredFlow.png",
  "/images/footer/Inkwell_PetalCluster_HalfBloom.png",
  "/images/footer/Inkwell_CurvedPanels_Accordion.png",
  "/images/footer/Inkwell_FanPetals_RadialSpread.png",
  "/images/footer/Inkwell_LightBars_VerticalGlow.png",
  "/images/footer/Inkwell_GlassPetals_TranslucentBloom.png",
];

// Calculator pages get this specific Inkwell image in light mode.
export const INKWELL_BENTO =
  "/images/footer/Inkwell_DeskObjects_BentoLayout.png";

function hash(seed = "/") {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h + seed.charCodeAt(i)) % 9973;
  return h;
}

export function pickFooterImage(seed = "/") {
  return FOOTER_IMAGES[hash(seed) % FOOTER_IMAGES.length];
}

export function pickInkwellImage(seed = "/") {
  // Calculator routes always use the bento layout in light mode.
  if (seed.startsWith("/calculators")) return INKWELL_BENTO;
  return INKWELL_IMAGES[hash(seed) % INKWELL_IMAGES.length];
}
