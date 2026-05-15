// Primary nav for desktop + mobile. Each item is either:
// - A direct link (label + href)
// - A dropdown (label + children array)
// Children may include `description` for desktop dropdown subtitles.

export const PRIMARY_NAV = [
  {
    label: "Get Capital",
    children: [
      {
        label: "Get Capital",
        href: "/get-capital",
        description: "Two pathways for borrowers and investors.",
      },
      {
        label: "How it Works",
        href: "/how-it-works",
        description: "Four steps from conversation to capital.",
      },
      {
        label: "Charles A.I",
        href: "/charles-ai",
        description: "Workshop your scenario. Coming soon.",
      },
    ],
  },
  {
    label: "Services",
    children: [
      {
        label: "Business",
        href: "/business",
        description: "Capital structured for real business conditions.",
      },
      {
        label: "Commercial",
        href: "/commercial",
        description: "Finance built around how your business runs.",
      },
      {
        label: "Property Development",
        href: "/property-development",
        description: "Clear structures for complex property deals.",
      },
      {
        label: "Construction",
        href: "/construction",
        description: "Staged funding aligned to delivery risk.",
      },
      {
        label: "Agriculture",
        href: "/agriculture",
        description: "Seasonal, asset-backed rural capital.",
      },
      {
        label: "Private Capital",
        href: "/private-capital",
        description: "Discreet financing for non-standard scenarios.",
      },
    ],
  },
  { label: "For Investors", href: "/overview" },
  {
    label: "Insights",
    children: [
      {
        label: "Articles",
        href: "/articles",
        description: "Observations on capital and markets.",
      },
      {
        label: "Guides",
        href: "/guides",
        description: "Frameworks for non-standard scenarios.",
      },
      {
        label: "Calculators",
        href: "/calculators",
        description: "Practical tools for Aussie finance.",
      },
      {
        label: "Free Tools",
        href: "/free-tools",
        description: "Downloadable guides and frameworks.",
      },
    ],
  },
  {
    label: "About",
    children: [
      {
        label: "About John",
        href: "/about",
        description: "Decades of judgement, principal-led.",
      },
      {
        label: "Our Work",
        href: "/our-work",
        description: "Recent capital deployed across Australia.",
      },
      {
        label: "FAQ",
        href: "/faq",
        description: "Common questions answered directly.",
      },
      {
        label: "Press & Media",
        href: "/press",
        description: "Brand assets, quotes, press contact.",
      },
    ],
  },
];

export const FOOTER_NAV = {
  Capital: [
    { label: "Get Capital", href: "/get-capital" },
    { label: "For Investors", href: "/overview" },
    { label: "How it Works", href: "/how-it-works" },
    { label: "Charles A.I", href: "/charles-ai" },
  ],
  Services: [
    { label: "Business", href: "/business" },
    { label: "Commercial", href: "/commercial" },
    { label: "Property Development", href: "/property-development" },
    { label: "Construction", href: "/construction" },
    { label: "Agriculture", href: "/agriculture" },
    { label: "Private Capital", href: "/private-capital" },
  ],
  Resources: [
    { label: "Articles", href: "/articles" },
    { label: "Guides", href: "/guides" },
    { label: "Calculators", href: "/calculators" },
    { label: "Free Tools", href: "/free-tools" },
    { label: "Insights & Resources", href: "/insights-and-resources" },
  ],
  Connect: [
    { label: "About John", href: "/about" },
    { label: "Our Work", href: "/our-work" },
    { label: "FAQ", href: "/faq" },
    { label: "Press & Media", href: "/press" },
    { label: "Contact", href: "/contact" },
    { label: "Send Documents", href: "/deliver" },
  ],
};

export const LEGAL_NAV = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Sitemap", href: "/sitemap" },
  { label: "Unsubscribe", href: "/unsubscribe" },
];

export const PRIMARY_CTA = { label: "Contact us", href: "/contact" };
