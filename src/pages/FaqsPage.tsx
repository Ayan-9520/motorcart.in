import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ContentDocPage, DocSection, FaqItem } from "@/components/marketing/ContentDocPage";
import { setPageMeta } from "@/utils/seo";

export function FaqsPage() {
  useEffect(() => {
    setPageMeta({
      title: "FAQs — Motorcart.in",
      description: "Frequently asked questions about buying, selling, finance, auctions, and dealer tools.",
    });
  }, []);

  return (
    <ContentDocPage
      eyebrow="Help centre"
      title="Frequently asked questions"
      lead="Quick answers about Motorcart — buyers, dealers, and partners."
      compact
    >
      <DocSection title="Buying & selling">
        <div className="space-y-3">
          <FaqItem
            question="How do I buy a vehicle on Motorcart?"
            answer={
              <>
                Browse by category (cars, bikes, trucks, etc.) from the top bar, filter listings, and contact
                the dealer or submit an enquiry. You can also save vehicles to your{" "}
                <Link to="/wishlist" className="text-primary hover:underline">
                  wishlist
                </Link>
                .
              </>
            }
          />
          <FaqItem
            question="How do I list my vehicle for sale?"
            answer={
              <>
                Go to{" "}
                <Link to="/sell" className="text-primary hover:underline">
                  Sell
                </Link>
                , choose your vehicle type, and follow the listing flow. Dealers use Dealer OS for bulk
                inventory.
              </>
            }
          />
          <FaqItem
            question="Are listings verified?"
            answer="Dealers with verified badges complete KYC and platform checks. Always inspect the vehicle and paperwork before payment."
          />
        </div>
      </DocSection>

      <DocSection title="Finance & auctions">
        <div className="space-y-3">
          <FaqItem
            question="How do car loans work here?"
            answer={
              <>
                Use{" "}
                <Link to="/finance" className="text-primary hover:underline">
                  Finance
                </Link>{" "}
                to compare lenders, check eligibility, and apply. Approval is by the bank/NBFC, not Motorcart.
              </>
            }
          />
          <FaqItem
            question="How do I bid in auctions?"
            answer={
              <>
                Visit{" "}
                <Link to="/auctions" className="text-primary hover:underline">
                  Auctions
                </Link>
                , register for a lot, and place bids before the timer ends. Deposit rules vary per auction.
              </>
            }
          />
        </div>
      </DocSection>

      <DocSection title="Dealers & partners">
        <div className="space-y-3">
          <FaqItem
            question="What is Dealer OS?"
            answer="Dealer OS is Motorcart's CRM for dealers — inventory, leads, WhatsApp, finance, auctions, and storefront in one workspace."
          />
          <FaqItem
            question="How do I become a dealer on Motorcart?"
            answer={
              <>
                <Link to="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>{" "}
                as a dealer or{" "}
                <Link to="/contact" className="text-primary hover:underline">
                  contact sales
                </Link>{" "}
                for onboarding help.
              </>
            }
          />
        </div>
      </DocSection>

      <DocSection title="Account & community">
        <div className="space-y-3">
          <FaqItem
            question="Do I need an account to browse?"
            answer="No — browsing is open. Sign in to post in Community, save wishlist, apply for finance, or use dealer tools."
          />
          <FaqItem
            question="Is Community separate from my dealer account?"
            answer={
              <>
                Yes. Social profile lives under{" "}
                <Link to="/community" className="text-primary hover:underline">
                  Community
                </Link>
                ; business settings are under Account / Dealer OS.
              </>
            }
          />
          <FaqItem
            question="How do I delete my account?"
            answer={
              <>
                Email{" "}
                <a href="mailto:privacy@motorcart.in" className="text-primary hover:underline">
                  privacy@motorcart.in
                </a>{" "}
                or use{" "}
                <Link to="/contact" className="text-primary hover:underline">
                  Contact
                </Link>
                . See also our{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </>
            }
          />
        </div>
      </DocSection>
    </ContentDocPage>
  );
}
