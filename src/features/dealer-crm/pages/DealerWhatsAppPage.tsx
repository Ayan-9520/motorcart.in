import { useEffect } from "react";
import { MessageCircle, ExternalLink, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDealerCRM } from "../hooks/useDealerCRM";
import { setPageMeta } from "@/utils/seo";

export function DealerWhatsAppPage() {
  const { dealer, stats, leads } = useDealerCRM();

  useEffect(() => {
    setPageMeta({ title: "WhatsApp Integration" });
  }, []);

  const waNumber = dealer?.phone?.replace(/\D/g, "") ?? "919876543210";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MessageCircle className="h-7 w-7 text-primary" />
          WhatsApp Business
        </h1>
        <p className="text-muted-foreground">Connect WhatsApp API for instant lead responses</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle>Connection status</CardTitle>
            <CardDescription>WhatsApp Business API via Motorcart</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="font-medium">Connected</span>
              <Badge className="bg-primary text-primary-foreground border-0">Active</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Business number: +{waNumber}
            </p>
            <p className="text-2xl font-bold">{stats.whatsappChats} chats this month</p>
            <Button
              className="w-full bg-primary hover:bg-[#128C7E] text-white gap-2"
              onClick={() => window.open(`https://wa.me/${waNumber}`, "_blank")}
            >
              Open WhatsApp <ExternalLink className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick replies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              "Thanks for your interest! I'll share full details shortly.",
              "Test drive slots available tomorrow 10 AM – 6 PM.",
              "Best price for this vehicle is negotiable. Call me to discuss.",
            ].map((msg, i) => (
              <button
                key={i}
                type="button"
                className="w-full rounded-lg border bg-background p-3 text-left text-sm hover:border-primary/40"
                onClick={() => navigator.clipboard.writeText(msg)}
              >
                {msg}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent WhatsApp leads</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {leads.slice(0, 6).map((l) => (
              <li key={l.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{l.name}</p>
                  <p className="text-xs text-muted-foreground">{l.phone}</p>
                </div>
                <Button size="sm" variant="outline" className="text-primary border-primary/40" asChild>
                  <a href={`https://wa.me/91${l.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
                    Chat
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
