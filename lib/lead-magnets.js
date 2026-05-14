// Lead magnet registry. Each entry powers /lead-magnets/[slug] and the
// /lead-magnets index. Add new entries here, not by writing new pages.
//
// When the actual asset (PDF) is ready, drop it in /public/lead-magnets/<slug>.pdf
// and update the assetUrl field. The form is a GHL iframe placeholder until
// John creates the corresponding lead capture form in GHL.

export const LEAD_MAGNETS = [
  {
    slug: "borrowers-guide",
    title: "The Borrower's Guide to Non-Bank Capital",
    eyebrow: "For business owners and developers",
    description:
      "A clear breakdown of how non-bank lending actually works in Australia — what it costs, when it makes sense, and what lenders look at when policy doesn't fit your scenario.",
    audience: "Business owners, property developers, and operators considering non-bank capital for the first time.",
    bullets: [
      "When non-bank lending is the right tool — and when it isn't",
      "Cost components beyond the headline rate",
      "What makes a strong scenario and a weak one",
      "Questions to ask before signing anything",
    ],
    pages: 22,
    assetUrl: null, // Drop PDF at /public/lead-magnets/borrowers-guide.pdf when ready
    ghlFormId: null, // GHL form ID once created
  },
  {
    slug: "investor-framework",
    title: "Private Lending: An Investor's Framework",
    eyebrow: "For sophisticated investors and family offices",
    description:
      "How disciplined private investors evaluate structured lending opportunities. Risk, governance, and return considerations for capital deployment outside the listed market.",
    audience: "Sophisticated investors, family office principals, and advisors considering private lending exposure.",
    bullets: [
      "How risk gets priced in private lending",
      "Governance and structural protections that matter",
      "Common pitfalls and how to avoid them",
      "What good deal flow looks like",
    ],
    pages: 18,
    assetUrl: null,
    ghlFormId: null,
  },
];

export function getLeadMagnetBySlug(slug) {
  return LEAD_MAGNETS.find((m) => m.slug === slug) || null;
}
