"use client";

import { createContext, useContext } from "react";

// Portraits of John, rotated across calculators so the set feels
// varied rather than repetitive.
export const PERSONA_IMAGES = [
  { src: "/images/editorial/codrington-headshot-bw.jpeg", alt: "John Codrington" },
  { src: "/images/people/owner-seated-lounge.jpeg", alt: "John Codrington" },
  { src: "/images/people/owner-seated-cafe.jpeg", alt: "John Codrington" },
  { src: "/images/people/owner-handing-document.png", alt: "John Codrington" },
];

// Deterministic pick per slug — stable across renders, varied across
// the calculator set.
export function personaForSlug(slug = "") {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h + slug.charCodeAt(i)) % 997;
  return PERSONA_IMAGES[h % PERSONA_IMAGES.length];
}

const PersonaContext = createContext(PERSONA_IMAGES[0]);

export function PersonaProvider({ slug, children }) {
  return (
    <PersonaContext.Provider value={personaForSlug(slug)}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  return useContext(PersonaContext);
}
