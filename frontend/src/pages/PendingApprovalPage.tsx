import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, FileCheck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { DashboardPageShell } from "@/shared/layout/DashboardPageShell";
import { ROLE_DISPLAY_NAMES } from "@/auth/ecosystem-roles";
import { isDealerRole } from "@/permissions/role-matching";
import type { AppRole } from "@/types/database";
import { setPageMeta } from "@/utils/seo";

export function PendingApprovalPage() {
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    setPageMeta({
      title: "Pending approval",
      description: "Your business application is under Motorcart review.",
    });
  }, []);

  const roleLabel = user ? ROLE_DISPLAY_NAMES[user.role as AppRole] ?? user.role : "Business";

  return (
    <DashboardPageShell
      title="Application under review"
      description={`${roleLabel} account — our operations team typically reviews within 24–48 business hours.`}
    >
      <div className="mx-auto max-w-2xl space-y-6">
        <Card className="border-primary/20 bg-card/90 shadow-card backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                <Clock className="h-6 w-6" />
              </span>
              <div>
                <CardTitle>Pending admin approval</CardTitle>
                <CardDescription>
                  Status: <strong className="text-foreground">pending_verification</strong>
                  {user?.companyName ? ` · ${user.companyName}` : null}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              You can complete KYC documents while you wait. Full CRM, inventory, and lead tools unlock after an admin
              approves your profile.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <FileCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Upload GST, PAN, and trade license in verification.
              </li>
              <li className="flex items-start gap-2">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Motorcart fraud checks run automatically on every dealer application.
              </li>
            </ul>
            <div className="flex flex-wrap gap-2 pt-2">
              {user && isDealerRole(user.role as AppRole) && (
                <Button className="rounded-xl" asChild>
                  <Link to="/dashboard/dealer/verification">Complete verification</Link>
                </Button>
              )}
              <Button variant="outline" className="rounded-xl" asChild>
                <Link to="/profile">View profile</Link>
              </Button>
              <Button variant="ghost" className="rounded-xl" asChild>
                <Link to="/?site=1">Back to marketplace</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardPageShell>
  );
}
