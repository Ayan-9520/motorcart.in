import { Link } from "react-router-dom";
import { ShieldOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { getRoleDashboardPath } from "@/auth/get-role-dashboard-path";

export function UnauthorizedPage() {
  const user = useAuthStore((s) => s.user);
  const workspaceHref = user ? getRoleDashboardPath(user) : "/";

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gradient-to-b from-background to-muted/20 p-6">
      <Card className="w-full max-w-md border-border/80 shadow-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10">
            <ShieldOff className="h-6 w-6 text-destructive" aria-hidden />
          </div>
          <CardTitle className="text-xl">Access restricted</CardTitle>
          <CardDescription className="text-pretty">
            Your account doesn&apos;t have permission for this area. If you believe this is a mistake, contact Motorcart
            support with your registered email.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          {user ? (
            <Button variant="default" className="rounded-xl" asChild>
              <Link to={workspaceHref}>Open my workspace</Link>
            </Button>
          ) : (
            <Button variant="default" className="rounded-xl" asChild>
              <Link to="/">Back to home</Link>
            </Button>
          )}
          <Button variant="outline" className="rounded-xl" asChild>
            <Link to="/profile">Account</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
