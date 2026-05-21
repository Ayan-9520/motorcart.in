import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setPageMeta } from "@/utils/seo";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useLoanApplications } from "../hooks/useLoanApplications";
import {
  fetchApplicationById,
  fetchVerifications,
  fetchStatusHistory,
} from "../services/finance.service";
import { ApplicationStatusTracker } from "../components/ApplicationStatusTracker";
import { VerificationTracker } from "../components/VerificationTracker";
import { DocumentUpload } from "../components/DocumentUpload";
import type { LoanApplication, FinanceVerification, FinanceStatusHistoryEntry } from "../types";

export function LoanDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { uploadDoc } = useLoanApplications("customer");
  const [application, setApplication] = useState<LoanApplication | null>(null);
  const [verifications, setVerifications] = useState<FinanceVerification[]>([]);
  const [history, setHistory] = useState<FinanceStatusHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    void (async () => {
      const app = await fetchApplicationById(id);
      setApplication(app);
      if (app) {
        setVerifications(await fetchVerifications(app.id));
        setHistory(await fetchStatusHistory(app.id));
      }
      setLoading(false);
    })();
  }, [id]);

  useEffect(() => {
    if (application) setPageMeta({ title: `Loan · ${application.bankName ?? "Motorcart"}` });
  }, [application]);

  if (loading) return <p className="text-muted-foreground p-8">Loading application…</p>;
  if (!application) {
    return (
      <div className="p-8">
        <p>Application not found</p>
        <Button variant="link" asChild>
          <Link to="/dashboard/customer/loans">Back</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="fin-detail mx-auto max-w-3xl space-y-6 px-4 py-8">
      <Button variant="ghost" size="sm" asChild>
        <Link to="/dashboard/customer/loans">
          <ArrowLeft className="h-4 w-4 mr-1" /> My loans
        </Link>
      </Button>

      <article className="fin-detail__hero">
        <h1 className="text-2xl font-bold">{application.bankName ?? "Loan application"}</h1>
        <p className="fin-detail__amount">{formatCurrency(application.loanAmount)}</p>
        <p className="text-muted-foreground">
          {application.tenureMonths} months
          {application.emiAmount != null && ` · EMI ${formatCurrency(application.emiAmount)}`}
        </p>
        {application.aiEligibilityScore != null && (
          <p className="fin-detail__score">AI score {application.aiEligibilityScore}/100</p>
        )}
      </article>

      <section className="fin-detail__card">
        <h2 className="fin-section__title">Approval stages</h2>
        <ApplicationStatusTracker
          status={application.status}
          approvalProbability={application.approvalProbability}
        />
      </section>

      {history.length > 0 && (
        <section className="fin-detail__card">
          <h2 className="fin-section__title">Status timeline</h2>
          <ul className="fin-timeline">
            {history.map((h) => (
              <li key={h.id}>
                <span className="fin-timeline__dot" />
                <div>
                  <p className="font-medium text-sm">
                    {h.fromStatus ?? "—"} → {h.toStatus}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(h.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="fin-detail__card">
        <h2 className="fin-section__title">Verification</h2>
        <VerificationTracker verifications={verifications} />
      </section>

      {user && (
        <section className="fin-detail__card">
          <h2 className="fin-section__title">Documents</h2>
          <DocumentUpload
            applicationId={application.id}
            userId={user.id}
            existing={application.documents}
            onUpload={(doc) => uploadDoc(application.id, application.documents, doc)}
          />
        </section>
      )}
    </div>
  );
}
