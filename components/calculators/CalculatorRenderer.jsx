"use client";

import { DevelopmentFeasibility } from "./DevelopmentFeasibility";
import { BridgingCost } from "./BridgingCost";
import { CommercialDscr } from "./CommercialDscr";
import { ConstructionDrawdown } from "./ConstructionDrawdown";
import { TrueCostOfCapital } from "./TrueCostOfCapital";
import { InvestorYield } from "./InvestorYield";
import { HomeLoanRepayment } from "./HomeLoanRepayment";
import { HomeLoanBorrowing } from "./HomeLoanBorrowing";
import { BudgetPlanner } from "./BudgetPlanner";
import { StampDuty } from "./StampDuty";
import { HomeEquity } from "./HomeEquity";
import { ForeignExchange } from "./ForeignExchange";
import { PersonaProvider } from "./persona";

const MAP = {
  "development-feasibility": DevelopmentFeasibility,
  "bridging-cost": BridgingCost,
  "commercial-dscr": CommercialDscr,
  "construction-drawdown": ConstructionDrawdown,
  "true-cost-of-capital": TrueCostOfCapital,
  "investor-yield": InvestorYield,
  "home-loan-repayment": HomeLoanRepayment,
  "home-loan-borrowing": HomeLoanBorrowing,
  "budget-planner": BudgetPlanner,
  "stamp-duty": StampDuty,
  "home-equity": HomeEquity,
  "foreign-exchange": ForeignExchange,
};

export function CalculatorRenderer({ slug }) {
  const Comp = MAP[slug];
  if (!Comp) return null;
  return (
    <PersonaProvider slug={slug}>
      <Comp />
    </PersonaProvider>
  );
}
