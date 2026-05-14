import { LegalLayout } from "@/components/shared/LegalLayout";
import { COMPANY } from "@/lib/company-info";

export const metadata = {
  title: "Disclaimer",
  description:
    "General information disclaimer for the Capital Unique website. Information is general only and not personal financial advice.",
};

export default function DisclaimerPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Disclaimer"
      lastUpdated="14 May 2026"
      effectiveDate="14 May 2026"
    >
      <p>
        This Disclaimer applies to all information published on the Capital
        Unique website at capitalunique.com (the &ldquo;Site&rdquo;), operated
        by Capital Unique (ABN 54 695 032 243, ACN 695 032 243). Please read it
        carefully. Your use of the Site is also subject to our{" "}
        <a href="/terms">Terms of Use</a> and{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>1. General information only — not advice</h2>
      <p>
        The information on the Site is provided for general informational
        purposes only. It is not, and is not intended to be, personal financial
        advice, credit advice, legal advice, tax advice, or any other form of
        professional advice. It does not take into account your personal
        objectives, financial situation, or particular needs.
      </p>
      <p>
        You should not act on any information published on the Site without
        first considering its appropriateness to your circumstances, and where
        relevant, obtaining advice from a qualified professional advisor.
      </p>

      <h2>2. Capital Unique is not a licensed credit provider</h2>
      <p>
        Capital Unique does not hold an Australian Credit Licence and does not
        provide consumer credit, credit assistance, or services regulated under
        the <em>National Consumer Credit Protection Act 2009</em> (Cth). Our
        services are limited to wholesale, commercial, and business-purpose
        scenarios that are not regulated under the NCCP Act.
      </p>
      <p>
        Capital Unique does not hold an Australian Financial Services Licence
        and does not provide financial product advice or financial services
        within the meaning of the <em>Corporations Act 2001</em> (Cth). Where
        we discuss capital structures, lending, or investment scenarios, this
        is general commentary only.
      </p>

      <h2>3. Not an offer or solicitation</h2>
      <p>
        Nothing on the Site constitutes an offer or solicitation to lend, to
        borrow, to invest, to subscribe for any financial product, or to enter
        into any transaction with Capital Unique or any other party. Any such
        engagement arises only through a separate, written agreement entered
        into directly with us.
      </p>

      <h2>4. Past outcomes do not predict future results</h2>
      <p>
        Any reference on the Site to past transactions, sectors served,
        scenarios funded, or outcomes achieved is included to illustrate the
        nature and scope of our work. It is not a guarantee, prediction, or
        indication of any future outcome. Capital decisions involve risk, and
        outcomes depend on circumstances specific to each scenario.
      </p>

      <h2>5. Calculators and tools</h2>
      <p>
        Any calculators, tools, or worked examples published on the Site are
        provided for illustrative purposes only. They use simplified
        assumptions and do not account for the full set of factors that would
        be considered in an actual capital arrangement. Outputs from these
        tools should not be relied upon as a basis for any commercial decision.
        For decisions specific to your circumstances, contact us directly.
      </p>

      <h2>6. Testimonials</h2>
      <p>
        Testimonials displayed on the Site are statements provided by third
        parties about their experience working with Capital Unique. They
        appear as provided, edited only for clarity and length where necessary.
        Capital Unique does not pay for testimonials, and the people quoted
        are not affiliated with Capital Unique beyond their stated role.
      </p>
      <p>
        Each engagement is unique. The experiences described in testimonials
        are individual and may not be representative of the experience you can
        expect. Past experiences described do not guarantee or predict any
        particular outcome for your scenario.
      </p>

      <h2>7. Articles, guides, and commentary</h2>
      <p>
        Articles, guides, and other written commentary on the Site reflect the
        views and opinions of the author at the time of publication. They are
        not legal, tax, or financial advice, and they may become out of date as
        markets, regulation, and circumstances change. We do not undertake to
        update articles or commentary after their publication date.
      </p>

      <h2>8. External links</h2>
      <p>
        The Site may contain links to websites operated by third parties (for
        example, ASIC, the OAIC, or industry bodies). These links are provided
        for convenience and information only. We do not endorse, control, or
        accept responsibility for the content, privacy practices, or
        availability of any external website. You access them at your own risk.
      </p>

      <h2>9. Charles A.I and other tools</h2>
      <p>
        Tools made available on or through the Site — including Charles A.I —
        are provided to help you organise and articulate your scenario. They
        are not a substitute for personal advice, and their outputs do not
        constitute a recommendation or assessment by Capital Unique. Direct
        engagement with our team is required for any actual scenario
        consideration.
      </p>

      <h2>10. Accuracy and currency</h2>
      <p>
        We take reasonable care to ensure that information on the Site is
        accurate at the time of publication. However, we make no warranty as to
        its accuracy, completeness, or currency. Information may change without
        notice, and we are not obliged to update it. Where regulatory,
        commercial, or market conditions change, content on the Site may not
        reflect the current position.
      </p>

      <h2>11. Liability</h2>
      <p>
        To the maximum extent permitted by law, Capital Unique excludes all
        liability for any loss or damage (including indirect or consequential
        loss) arising out of reliance on any information on the Site. See our{" "}
        <a href="/terms">Terms of Use</a> for the full liability framework.
      </p>

      <h2>12. Contact</h2>
      <p>
        If you have any questions about this Disclaimer, or about the
        appropriateness of anything published on the Site to your
        circumstances, please contact us before acting on it:
      </p>
      <ul>
        <li>
          <strong>{COMPANY.name}</strong>
          <br />
          Office: {COMPANY.officeAddress.full}
          <br />
          Postal: {COMPANY.postalAddress.full}
          <br />
          Phone:{" "}
          <a href={COMPANY.phoneOfficeHref}>{COMPANY.phoneOffice}</a>
          <br />
          Email:{" "}
          <a href={COMPANY.emailHref}>{COMPANY.email}</a>
        </li>
      </ul>
    </LegalLayout>
  );
}
