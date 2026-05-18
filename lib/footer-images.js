// Design-system "footerjohn" backdrop images for the CTA section.
// One is chosen deterministically per page (stable across SSR/CSR,
// varied across the site) so every page gets a different photo
// without hydration flicker.
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

export function pickFooterImage(seed = "/") {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h + seed.charCodeAt(i)) % 9973;
  return FOOTER_IMAGES[h % FOOTER_IMAGES.length];
}
