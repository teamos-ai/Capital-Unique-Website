import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";

export const metadata = {
  title: "Sitemap",
  description:
    "Every page on the Capital Unique website, organised by section.",
};

const SITEMAP = [
  {
    heading: "Start here",
    links: [
      { label: "Home", href: "/" },
      { label: "Get capital", href: "/get-capital" },
      { label: "Overview", href: "/overview" },
      { label: "How it works", href: "/how-it-works" },
    ],
  },
  {
    heading: "Sectors",
    links: [
      { label: "Business", href: "/business" },
      { label: "Commercial", href: "/commercial" },
      { label: "Property development", href: "/property-development" },
      { label: "Private capital", href: "/private-capital" },
      { label: "Agriculture", href: "/agriculture" },
      { label: "Construction", href: "/construction" },
    ],
  },
  {
    heading: "Insights & resources",
    links: [
      { label: "Insights & resources", href: "/insights-and-resources" },
      { label: "Articles", href: "/articles" },
      { label: "Guides", href: "/guides" },
      { label: "Calculators", href: "/calculators" },
      { label: "Lead magnets", href: "/lead-magnets" },
    ],
  },
  {
    heading: "About & contact",
    links: [
      { label: "About John Codrington", href: "/about" },
      { label: "Our work", href: "/our-work" },
      { label: "Press & media", href: "/press" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Charles A.I", href: "/charles-ai" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Unsubscribe", href: "/unsubscribe" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <PageHero
        eyebrow="Sitemap"
        heading="Every page, one place"
        body="A complete index of the Capital Unique website. If you can't find what you're looking for, get in touch."
      />

      <section className="bg-cu-surface-abyss px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {SITEMAP.map((group) => (
              <div key={group.heading}>
                <h2 className="text-xs uppercase tracking-[0.25em] text-cu-brandy">
                  {group.heading}
                </h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-base text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-16 text-xs text-muted-foreground">
            For search engines, an XML sitemap is also available at{" "}
            <a
              href="/sitemap.xml"
              className="underline hover:text-foreground"
            >
              /sitemap.xml
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
