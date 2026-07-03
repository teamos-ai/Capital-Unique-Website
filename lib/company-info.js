// Single source of truth for Capital Unique company / contact details.
// Update here once; every page that imports from this file picks up the
// change automatically (footer, privacy, terms, disclaimer, contact, press).

export const COMPANY = {
  name: "Capital Unique",
  abn: "54 695 032 243",
  acn: "695 032 243",

  // Email
  email: "hello@capitalunique.com",
  emailHref: "mailto:hello@capitalunique.com",

  // Phone numbers (with E.164 hrefs for click-to-call)
  phoneOffice: "1300 889 789",
  phoneOfficeHref: "tel:+611300889789",
  fax: "02 9475 0169",

  // Mailing addresses
  officeAddress: {
    line1: "Level 26, 1 Bligh Street",
    line2: "Sydney NSW 2000",
    full: "Level 26, 1 Bligh Street, Sydney NSW 2000",
    label: "Sydney office",
  },
  postalAddress: {
    line1: "PO Box 984",
    line2: "Gosford NSW 2250",
    full: "PO Box 984, Gosford NSW 2250",
    label: "Postal address",
  },

  // Governing law — aligned to the NSW office addresses (Sydney +
  // Gosford). Confirmed by client 2026-05-15.
  governingLaw: {
    state: "New South Wales",
    courts: "the courts of New South Wales and the Federal Court of Australia",
  },

  // Hours
  hours: {
    short: "Mon–Fri, 9:00–18:00 AEST/AEDT",
    long: "Monday to Friday, 9:00–18:00 AEST/AEDT.",
  },

  // Social — set to a URL string when live; leave null if TBA.
  // Footer + waitlist page only render icons where the URL is non-null,
  // so TBA channels don't appear as broken "#" links.
  social: {
    linkedin: "https://www.linkedin.com/company/capital-unique/",
    instagram: "https://www.instagram.com/capital.unique/",
    facebook:
      "https://www.facebook.com/profile.php?id=61586060827845",
  },
};
