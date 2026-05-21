import { Link } from "react-router-dom";
import { Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AccountSuspendedPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gradient-to-b from-background to-muted/20 p-6">
      <Card className="w-full max-w-md border-border/80 shadow-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
            <Ban className="h-6 w-6 text-muted-foreground" aria-hidden />
          </div>
          <CardTitle className="text-xl">Account unavailable</CardTitle>
          <CardDescription className="text-pretty">
            This account is suspended or closed. You can still browse the marketplace, but protected actions are blocked.
            Please reach out to support for reinstatement.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button variant="default" className="rounded-xl" asChild>
            <Link to="/">Browse Motorcart</Link>
          </Button>
          <Button variant="outline" className="rounded-xl" asChild>
            <Link to="/contact">Contact support</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
