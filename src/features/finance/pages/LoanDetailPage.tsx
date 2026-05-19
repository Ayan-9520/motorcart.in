import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { setPageMeta } from "@/utils/seo";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useLoanApplicationDetail, useLoanApplications } from "../hooks/useLoanApplications";
import { ApplicationStatusTracker } from "../components/ApplicationStatusTracker";
import { DocumentUpload } from "../components/DocumentUpload";

export function LoanDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { application, loading } = useLoanApplicationDetail(id);
  const { uploadDoc } = useLoanApplications("customer");

  useEffect(() => {
    if (application) setPageMeta({ title: `Loan ${application.id.slice(0, 8)}` });
  }, [application]);

  if (loading) return <p className="text-muted-foreground">Loading...</p>;
  if (!application) {
    return (
      <div>
        <p>Application not found</p>
        <Button variant="link" asChild><Link to="/dashboard/customer/loans">Back</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link to="/dashboard/customer/loans"><ArrowLeft className="h-4 w-4 mr-1" /> My loans</Link>
      </Button>

      <Card>
        <CardContent className="space-y-4 p-6">
          <h1 className="text-xl font-bold">{application.bankName ?? "Loan application"}</h1>
          <p className="text-muted-foreground">
            {formatCurrency(application.loanAmount)} · {application.tenureMonths} mo
            {application.emiAmount != null && ` · EMI ${formatCurrency(application.emiAmount)}`}
          </p>
          {application.aiEligibilityScore != null && (
            <p className="text-sm">AI eligibility score: <strong>{application.aiEligibilityScore}/100</strong></p>
          )}
          <ApplicationStatusTracker status={application.status} approvalProbability={application.approvalProbability} />
        </CardContent>
      </Card>

      {user && (
        <DocumentUpload
          applicationId={application.id}
          userId={user.id}
          existing={application.documents}
          onUpload={(doc) => uploadDoc(application.id, application.documents, doc)}
        />
      )}
    </div>
  );
}
