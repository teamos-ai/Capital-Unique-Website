// Maps a Phase-1 lead-magnet slug to its content component.
// Phase-2 slugs are intentionally absent (teaser only).
import BorrowersGuide from "./content/BorrowersGuide";
import WhenTheBankSaysNo from "./content/WhenTheBankSaysNo";
import InvestorFramework from "./content/InvestorFramework";
import DealSubmissionSwipeFile from "./content/DealSubmissionSwipeFile";
import NonBankFinanceOnOnePage from "./content/NonBankFinanceOnOnePage";

export const LEAD_MAGNET_CONTENT = {
  "borrowers-guide": BorrowersGuide,
  "when-the-bank-says-no": WhenTheBankSaysNo,
  "investor-framework": InvestorFramework,
  "deal-submission-swipe-file": DealSubmissionSwipeFile,
  "non-bank-finance-on-one-page": NonBankFinanceOnOnePage,
};

export function hasContent(slug) {
  return Boolean(LEAD_MAGNET_CONTENT[slug]);
}
