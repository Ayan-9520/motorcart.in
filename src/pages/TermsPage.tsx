import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ContentDocPage, DocSection } from "@/components/marketing/ContentDocPage";
import { setPageMeta } from "@/utils/seo";

const UPDATED = "May 2026";

export function TermsPage() {
  useEffect(() => {
    setPageMeta({
      title: "Terms of Service — Motorcart.in",
      description: "Terms governing use of Motorcart marketplace, dealer tools, and community.",
    });
  }, []);

  return (
    <ContentDocPage
      eyebrow="Legal"
      title="Terms of Service"
      lead="By using Motorcart.in you agree to these terms. Please read them carefully."
      updated={UPDATED}
      compact
    >
      <DocSection title="1. Acceptance">
        <p>
          These Terms apply to all users — visitors, buyers, dealers, finance partners, and community
          members. If you do not agree, do not use the platform.
        </p>
      </DocSection>

      <DocSection title="2. Platform role">
        <p>
          Motorcart provides a technology platform connecting buyers, sellers, lenders, and service
          providers. We are not the seller of vehicles unless explicitly stated. Dealers and sellers are
          responsible for listing accuracy and fulfilment.
        </p>
      </DocSection>

      <DocSection title="3. Accounts">
        <ul className="list-disc space-y-2 pl-5">
          <li>You must provide accurate registration information and keep credentials secure</li>
          <li>Dealer and partner accounts require verification and may be suspended for policy breaches</li>
          <li>One person may not maintain multiple deceptive accounts</li>
        </ul>
      </DocSection>

      <DocSection title="4. Listings, auctions & finance">
        <p>
          Bids, offers, and loan applications are subject to partner rules and approval. Motorcart does not
          guarantee loan sanction, auction outcomes, or vehicle condition — inspect before purchase.
        </p>
      </DocSection>

      <DocSection title="5. Community">
        <p>
          Community posts must be lawful and respectful. We may remove content, suspend accounts, or report
          illegal activity. See our moderation practices in{" "}
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </DocSection>

      <DocSection title="6. Fees & subscriptions">
        <p>
          Dealer SaaS, auction fees, and promoted listings are disclosed at checkout or in your dashboard.
          Taxes apply as per Indian law.
        </p>
      </DocSection>

      <DocSection title="7. Limitation of liability">
        <p>
          To the extent permitted by law, Motorcart is not liable for indirect damages, lost profits, or
          third-party actions. Our aggregate liability is limited to fees paid to us in the prior 12 months.
        </p>
      </DocSection>

      <DocSection title="8. Governing law">
        <p>
          These Terms are governed by the laws of India. Courts in Mumbai, Maharashtra have exclusive
          jurisdiction unless otherwise required by statute.
        </p>
      </DocSection>

      <DocSection title="9. Contact">
        <p>
          Questions:{" "}
          <Link to="/contact" className="text-primary hover:underline">
            Contact page
          </Link>{" "}
          or legal@motorcart.in
        </p>
      </DocSection>
    </ContentDocPage>
  );
}
