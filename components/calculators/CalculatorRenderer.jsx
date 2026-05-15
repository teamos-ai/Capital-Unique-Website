"use client";

import { DevelopmentFeasibility } from "./DevelopmentFeasibility";
import { BridgingCost } from "./BridgingCost";
import { CommercialDscr } from "./CommercialDscr";
import { ConstructionDrawdown } from "./ConstructionDrawdown";
import { TrueCostOfCapital } from "./TrueCostOfCapital";
import { InvestorYield } from "./InvestorYield";

const MAP = {
  "development-feasibility": DevelopmentFeasibility,
  "bridging-cost": BridgingCost,
  "commercial-dscr": CommercialDscr,
  "construction-drawdown": ConstructionDrawdown,
  "true-cost-of-capital": TrueCostOfCapital,
  "investor-yield": InvestorYield,
};

export function CalculatorRenderer({ slug }) {
  const Comp = MAP[slug];
  if (!Comp) return null;
  return <Comp />;
}
