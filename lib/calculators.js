// Calculator registry. Each entry powers /calculators/[slug] and the
// /calculators index. The `component` key maps to a client component
// rendered by the dynamic route.
//
// These are indicative modelling tools only — not financial product
// advice. Capital Unique is NCCP exempt (wholesale/commercial). Every
// calculator surfaces its assumptions and a general-information note.

export const CALCULATORS = [
  {
    slug: "development-feasibility",
    icon: "Building",
    title: "Development Feasibility",
    eyebrow: "Residual land value",
    short:
      "Work backwards from end value to the maximum you should pay for a site.",
    description:
      "The static residual model AU developers and lenders use to screen a site. Enter your end sales, build cost, and target margin — see the maximum land price the deal can carry and the margin it actually returns.",
    audience: "Property developers and operators screening a site before committing.",
  },
  {
    slug: "bridging-cost",
    icon: "Clock",
    title: "Bridging & Caveat Cost",
    eyebrow: "The real cost of speed",
    short:
      "See what short-term capital actually costs once fees are in the number.",
    description:
      "Bridging and caveat finance is quoted per month, which hides the true cost. Enter the loan, monthly rate, term and fees — see total cost in dollars and the effective annualised rate.",
    audience: "Borrowers weighing fast, short-term capital against the cost of speed.",
  },
  {
    slug: "commercial-dscr",
    icon: "BarChart3",
    title: "Commercial DSCR & Stress Test",
    eyebrow: "Does the deal stack?",
    short:
      "Test a commercial property against the serviceability a credit committee will apply.",
    description:
      "Lenders size commercial debt on debt service coverage at a stressed rate, not the headline rate. Enter income, outgoings and the facility — see DSCR at your rate and stressed, plus the maximum loan that still services.",
    audience: "Commercial property buyers and investors pressure-testing a purchase.",
  },
  {
    slug: "construction-drawdown",
    icon: "HardHat",
    title: "Construction Drawdown",
    eyebrow: "Capitalised interest, exposed",
    short:
      "Model staged drawdowns and the interest most builders underestimate.",
    description:
      "Construction facilities draw in stages and capitalise interest as you go. Enter the facility, your draw schedule and rate — see capitalised interest by stage, line fees, QS costs and peak debt.",
    audience: "Builders and developers planning a staged construction facility.",
  },
  {
    slug: "true-cost-of-capital",
    icon: "Receipt",
    title: "True Cost of Capital",
    eyebrow: "Beyond the headline rate",
    short:
      "Convert a headline rate plus fees into one honest effective rate.",
    description:
      "A lower headline rate with heavier fees often costs more than a higher one. Enter the rate plus establishment, line, brokerage and exit fees — see the effective annual rate and total cost over the term.",
    audience: "Any borrower comparing facilities that look different on paper.",
  },
  {
    slug: "investor-yield",
    icon: "TrendingUp",
    title: "Investor Yield",
    eyebrow: "Private lending returns",
    short:
      "Model gross, net and after-tax yield on deployed private credit.",
    description:
      "Private lending headline rates are gross. Enter capital deployed, target rate, term, fund fees and your marginal tax rate — see net and after-tax yield, and how it compares to a term deposit.",
    audience: "Sophisticated investors and family offices evaluating private credit.",
  },
];

export function getCalculatorBySlug(slug) {
  return CALCULATORS.find((c) => c.slug === slug) || null;
}
