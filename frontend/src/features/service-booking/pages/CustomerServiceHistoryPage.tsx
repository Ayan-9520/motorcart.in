import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { History, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { setPageMeta } from "@/utils/seo";
import { formatCurrency } from "@/lib/utils";
import { fetchVehicleServiceHistory } from "../services/service-booking.service";
import type { VehicleServiceHistoryEntry } from "../types";

export function CustomerServiceHistoryPage() {
  const user = useAuthStore((s) => s.user);
  const [history, setHistory] = useState<VehicleServiceHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPageMeta({ title: "Service history — Motorcart" });
    if (!user?.id) return;
    void fetchVehicleServiceHistory(user.id).then((h) => {
      setHistory(h);
      setLoading(false);
    });
  }, [user?.id]);

  return (
    <div className="svc-history-page mx-auto max-w-3xl px-4 py-8">
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Your garage log</p>
        <h1 className="text-2xl font-bold flex items-center gap-2 mt-1">
          <History className="h-7 w-7" /> Service history
        </h1>
        <p className="text-muted-foreground mt-1">Completed jobs, workshops & spend across your vehicles</p>
      </header>

      <Button className="mb-6 rounded-full" asChild>
        <Link to="/services/browse">
          <Wrench className="h-4 w-4 mr-1" /> Book next service
        </Link>
      </Button>

      {loading && <p className="text-muted-foreground">Loading history…</p>}
      {!loading && !history.length && (
        <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
          No completed services yet. Book your first service from the marketplace.
        </p>
      )}
      <ul className="space-y-4">
        {history.map((h) => (
          <li key={h.id} className="svc-history-card">
            <div>
              <p className="font-semibold">{h.serviceName}</p>
              <p className="text-sm text-muted-foreground">{h.centerName ?? "Workshop"}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(h.completedAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                {h.odometerKm != null && ` · ${h.odometerKm.toLocaleString()} km`}
              </p>
            </div>
            {h.totalAmount != null && (
              <p className="font-bold text-primary">{formatCurrency(h.totalAmount)}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
