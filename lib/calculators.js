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

  // ── Everyday calculators ──────────────────────────────────────────
  {
    slug: "home-loan-repayment",
    icon: "Home",
    title: "Home Loan Repayment",
    eyebrow: "What it costs to hold",
    short:
      "See repayments, total interest and how the balance falls over time.",
    description:
      "Enter the loan, rate, term and frequency — see your repayment, the total interest paid, and a chart of the balance reducing year by year. Switch between principal & interest and interest-only.",
    audience: "Anyone sizing repayments on a residential or investment loan.",
  },
  {
    slug: "home-loan-borrowing",
    icon: "Landmark",
    title: "Borrowing Power",
    eyebrow: "What you could borrow",
    short:
      "Estimate borrowing capacity from income, expenses and commitments.",
    description:
      "A serviceability-style estimate: enter income, living expenses, existing repayments and card limits — see an indicative borrowing range, assessed at a buffered rate the way lenders do.",
    audience: "Buyers gauging a realistic budget before they start looking.",
  },
  {
    slug: "budget-planner",
    icon: "PiggyBank",
    title: "Budget Planner",
    eyebrow: "Where the money goes",
    short:
      "Map income against expenses and see your real monthly surplus.",
    description:
      "Enter income and expenses by category — see your surplus or shortfall, savings rate, and a breakdown of where the money goes. The foundation under every borrowing decision.",
    audience: "Anyone tightening cash flow before taking on finance.",
  },
  {
    slug: "stamp-duty",
    icon: "ScrollText",
    title: "Stamp Duty (Estimate)",
    eyebrow: "The upfront tax",
    short:
      "Estimate transfer duty and government fees by state and buyer type.",
    description:
      "Enter the property value, state and buyer type — see an indicative transfer (stamp) duty plus government fees. Includes first-home-buyer concessions where they commonly apply. Estimate only.",
    audience: "Buyers budgeting the upfront cost of a purchase.",
  },
  {
    slug: "home-equity",
    icon: "House",
    title: "Home Equity",
    eyebrow: "Equity you can use",
    short:
      "See total and usable equity, and what it could let you borrow.",
    description:
      "Enter your property value and loan balance — see total equity, the usable portion at an 80% lending limit, and the retained buffer. The starting point for any equity-release conversation.",
    audience: "Owners considering accessing equity for a next move.",
  },
  {
    slug: "foreign-exchange",
    icon: "ArrowRightLeft",
    title: "Foreign Exchange",
    eyebrow: "Convert with the spread in view",
    short:
      "Convert currencies and see the cost of the margin on the rate.",
    description:
      "Enter an amount, the pair and the rate — see the converted figure, the inverse rate, and what an FX margin costs you. Rates are indicative; set the rate from your provider for accuracy.",
    audience: "Anyone moving funds across borders for a deal or purchase.",
  },
];

export function getCalculatorBySlug(slug) {
  return CALCULATORS.find((c) => c.slug === slug) || null;
}
