import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Car,
  LifeBuoy,
  ShieldCheck,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { setPageMeta } from "@/utils/seo";
import { fetchPlatformOverview } from "../services/platform-admin.service";
import type { PlatformOverview } from "../types";
import { SuperAdminShell } from "../components/SuperAdminShell";
import { SuperAdminStatGrid } from "../components/SuperAdminStatGrid";

const QUICK_LINKS = [
  { to: "/dashboard/super-admin/users", label: "User management", icon: Users },
  { to: "/dashboard/super-admin/dealers", label: "Dealer approvals", icon: Store },
  { to: "/dashboard/super-admin/kyc", label: "KYC queue", icon: ShieldCheck },
  { to: "/dashboard/super-admin/tickets", label: "Support tickets", icon: LifeBuoy },
  { to: "/dashboard/super-admin/fraud", label: "Fraud desk", icon: AlertTriangle },
  { to: "/dashboard/super-admin/ai", label: "AI controls", icon: TrendingUp },
];

export function SuperAdminOverviewPage() {
  const [overview, setOverview] = useState<PlatformOverview | null>(null);

  useEffect(() => {
    setPageMeta({ title: "Super Admin — Motorcart" });
    void fetchPlatformOverview().then(setOverview);
  }, []);

  const o = overview;

  return (
    <SuperAdminShell
      title="Platform overview"
      description="Full ecosystem control — users, dealers, finance, auctions, and AI."
      actions={
        <Button size="sm" variant="outline" asChild>
          <Link to="/">View site</Link>
        </Button>
      }
    >
      {o ? (
        <SuperAdminStatGrid
          stats={[
            { label: "Total users", value: o.totalUsers.toLocaleString("en-IN"), icon: Users },
            { label: "Active users", value: o.activeUsers.toLocaleString("en-IN"), hint: "Last 30d proxy" },
            { label: "Pending KYC", value: o.pendingKyc, icon: ShieldCheck },
            { label: "Dealer approvals", value: o.pendingDealers, icon: Store },
            { label: "Live listings", value: o.listingsLive.toLocaleString("en-IN"), icon: Car },
            { label: "Est. MRR", value: o.mrrEstimate, format: "currency", icon: TrendingUp },
            { label: "Open tickets", value: o.openTickets, icon: LifeBuoy },
            { label: "Fraud alerts", value: o.fraudOpen, icon: AlertTriangle },
          ]}
        />
      ) : (
        <p className="text-sm text-muted-foreground animate-pulse">Loading metrics…</p>
      )}

      <section className="sa-section">
        <h2 className="sa-section__title">Modules</h2>
        <div className="sa-quick-grid">
          {QUICK_LINKS.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} className="sa-quick-card">
              <Icon className="h-5 w-5 text-primary" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </section>
    </SuperAdminShell>
  );
}
