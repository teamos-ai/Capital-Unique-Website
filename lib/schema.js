// JSON-LD builders. Structured data is the single biggest lever for
// AI answer engines (ChatGPT, Gemini, AI Overviews) and rich results.
// Everything derives from COMPANY so it stays in sync with the site.
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "./site";
import { COMPANY } from "./company-info";

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const sameAs = [
  COMPANY.social.linkedin,
  COMPANY.social.facebook,
  COMPANY.social.instagram,
].filter(Boolean);

export function organizationSchema() {
  return {
    "@type": ["Organization", "FinancialService"],
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-square.png`,
    image: `${SITE_URL}/opengraph-image`,
    description: SITE_DESCRIPTION,
    email: COMPANY.email,
    telephone: COMPANY.phoneOfficeHref.replace("tel:", ""),
    areaServed: { "@type": "Country", name: "Australia" },
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.officeAddress.line1,
      addressLocality: "Sydney",
      addressRegion: "NSW",
      postalCode: "2000",
      addressCountry: "AU",
    },
    founder: {
      "@type": "Person",
      name: "John Codrington",
      jobTitle: "Founder & Principal",
    },
    knowsAbout: [
      "Non-bank lending",
      "Private credit",
      "Commercial property finance",
      "Property development finance",
      "Construction finance",
      "Bridging and caveat loans",
      "Agribusiness finance",
      "Private capital advisory",
    ],
    identifier: [
      { "@type": "PropertyValue", name: "ABN", value: COMPANY.abn },
      { "@type": "PropertyValue", name: "ACN", value: COMPANY.acn },
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-AU",
  };
}

export function personSchema() {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/about#john-codrington`,
    name: "John Codrington",
    jobTitle: "Founder & Principal",
    worksFor: { "@id": ORG_ID },
    url: `${SITE_URL}/about`,
    image: `${SITE_URL}/images/people/owner-seated-cafe.jpeg`,
    description:
      "Principal of Capital Unique. Decades of judgement across property, business and private capital — one decision-maker, end to end.",
  };
}

export function breadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

// Wrap one or more nodes in a single @graph document.
export function graph(...nodes) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
