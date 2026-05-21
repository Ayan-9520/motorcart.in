import { useEffect, useState } from "react";
import { Gavel } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DealerConsoleShell } from "../components/DealerConsoleShell";
import { useDealer } from "../hooks/useDealer";
import { fetchDealerAuctionEntries, registerDealerAuction } from "../services/dealer-enterprise.service";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "@/lib/utils";
import { setPageMeta } from "@/utils/seo";
import toast from "react-hot-toast";

export function DealerAuctionsPage() {
  const { dealer, loading } = useDealer();
  const [entries, setEntries] = useState<Record<string, unknown>[]>([]);
  const [liveAuctions, setLiveAuctions] = useState<{ id: string; title: string; status: string; current_bid: number | null }[]>([]);

  const load = async () => {
    if (!dealer) return;
    setEntries(await fetchDealerAuctionEntries(dealer.id));
    const { data } = await supabase
      .from("auctions")
      .select("id, title, status, current_bid")
      .in("status", ["live", "upcoming"])
      .limit(12);
    setLiveAuctions((data ?? []) as typeof liveAuctions);
  };

  useEffect(() => {
    setPageMeta({ title: "Auction desk" });
    void load();
  }, [dealer]);

  const join = async (auctionId: string) => {
    if (!dealer) return;
    try {
      await registerDealerAuction(dealer.id, auctionId);
      toast.success("Registered for auction");
      void load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not register");
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <DealerConsoleShell
      title="Auction participation"
      description="Register for live lots, track bids and repo inventory."
      crumbs={[{ label: "Auctions" }]}
      actions={
        <Button variant="outline" size="sm" asChild>
          <Link to="/auctions">Public auction hub</Link>
        </Button>
      }
    >
      <section className="dealer-os-card">
        <h2 className="font-semibold flex items-center gap-2">
          <Gavel className="h-5 w-5 text-primary" /> Your registrations
        </h2>
        <ul className="mt-3 space-y-2">
          {entries.map((e) => {
            const auction = e.auctions as { title?: string; status?: string } | null;
            return (
              <li key={e.id as string} className="dealer-auction-row">
                <span>{auction?.title ?? "Auction"}</span>
                <span className="dealer-os-pill">{String(e.status)}</span>
              </li>
            );
          })}
          {!entries.length && <p className="text-sm text-muted-foreground py-4">No auction registrations yet.</p>}
        </ul>
      </section>

      <section className="dealer-os-card mt-4">
        <h2 className="font-semibold">Join live auctions</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {liveAuctions.map((a) => (
            <div key={a.id} className="dealer-auction-lot">
              <p className="font-medium text-sm">{a.title}</p>
              <p className="text-xs text-muted-foreground capitalize">{a.status}</p>
              {a.current_bid != null && (
                <p className="text-sm font-semibold text-primary mt-1">{formatCurrency(a.current_bid)}</p>
              )}
              <Button size="sm" className="mt-2" onClick={() => void join(a.id)}>
                Register
              </Button>
            </div>
          ))}
        </div>
      </section>
    </DealerConsoleShell>
  );
}
