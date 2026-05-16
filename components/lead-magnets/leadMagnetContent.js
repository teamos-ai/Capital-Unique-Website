// Maps a lead-magnet slug to its content component.
import BorrowersGuide from "./content/BorrowersGuide";
import WhenTheBankSaysNo from "./content/WhenTheBankSaysNo";
import InvestorFramework from "./content/InvestorFramework";
import DealSubmissionSwipeFile from "./content/DealSubmissionSwipeFile";
import NonBankFinanceOnOnePage from "./content/NonBankFinanceOnOnePage";
import DevelopmentFinanceReadinessChecklist from "./content/DevelopmentFinanceReadinessChecklist";
import FeasibilitySanityCheck from "./content/FeasibilitySanityCheck";
import LendingRatiosCheatSheet from "./content/LendingRatiosCheatSheet";
import CapitalStackAtAGlance from "./content/CapitalStackAtAGlance";
import LenderConversationSwipeFile from "./content/LenderConversationSwipeFile";
import ObjectionHandlingSwipeFile from "./content/ObjectionHandlingSwipeFile";

export const LEAD_MAGNET_CONTENT = {
  "borrowers-guide": BorrowersGuide,
  "when-the-bank-says-no": WhenTheBankSaysNo,
  "investor-framework": InvestorFramework,
  "deal-submission-swipe-file": DealSubmissionSwipeFile,
  "non-bank-finance-on-one-page": NonBankFinanceOnOnePage,
  "development-finance-readiness-checklist": DevelopmentFinanceReadinessChecklist,
  "feasibility-sanity-check": FeasibilitySanityCheck,
  "lending-ratios-cheat-sheet": LendingRatiosCheatSheet,
  "capital-stack-at-a-glance": CapitalStackAtAGlance,
  "lender-conversation-swipe-file": LenderConversationSwipeFile,
  "objection-handling-swipe-file": ObjectionHandlingSwipeFile,
};

export function hasContent(slug) {
  return Boolean(LEAD_MAGNET_CONTENT[slug]);
}
