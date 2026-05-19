import { useEffect } from "react";
import { Phone, PhoneMissed, Voicemail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDealerCRM } from "../hooks/useDealerCRM";
import { setPageMeta } from "@/utils/seo";

const outcomeIcon = {
  answered: Phone,
  missed: PhoneMissed,
  voicemail: Voicemail,
};

export function DealerCallsPage() {
  const { calls } = useDealerCRM();

  useEffect(() => {
    setPageMeta({ title: "Call Tracking" });
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Call Tracking</h1>
        <p className="text-muted-foreground">Log and review sales calls linked to leads</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Recent calls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {calls.map((c) => {
            const Icon = outcomeIcon[c.outcome];
            return (
              <article key={c.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <div>
                    <p className="font-medium">{c.leadName}</p>
                    <p className="text-sm text-muted-foreground">{c.phone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="capitalize">{c.outcome}</Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {c.duration ? `${Math.floor(c.duration / 60)}m ${c.duration % 60}s` : "—"} ·{" "}
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </div>
              </article>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
