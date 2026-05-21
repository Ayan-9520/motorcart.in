import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Car,
  Gavel,
  IndianRupee,
  Landmark,
  MessageCircle,
  Phone,
  TrendingUp,
  Users,
  ArrowRight,
  Shield,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "../components/StatCard";
import { LeadTable } from "../components/LeadTable";
import { DealerConsoleShell } from "../components/DealerConsoleShell";
import { useDealerCRM } from "../hooks/useDealerCRM";
import { useDealer } from "../hooks/useDealer";
import {
  buildAnalyticsFromData,
  fetchDealerAuctionEntries,
  fetchDealerEnterprise,
  fetchDealerFinanceStats,
} from "../services/dealer-enterprise.service";
import { planFromTier } from "../data/subscription-plans";
import { DEALER_TYPE_LABELS, type DealerType } from "../types";
import { formatCurrency } from "@/lib/utils";
import { setPageMeta } from "@/utils/seo";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const QUICK_LINKS = [
  { label: "Inventory", href: "/dashboard/dealer/inventory", icon: Car },
  { label: "Lead CRM", href: "/dashboard/dealer/leads", icon: Users },
  { label: "Finance", href: "/dashboard/dealer/finance", icon: Landmark },
  { label: "Auctions", href: "/dashboard/dealer/auctions", icon: Gavel },
  { label: "Verification", href: "/dashboard/dealer/verification", icon: Shield },
  { label: "Plans", href: "/dashboard/dealer/subscription", icon: Crown },
];

export function DealerOverviewPage() {
  const { dealer: crmDealer, stats, leads, listingPerformance, loading, refetch } = useDealerCRM();
  const { dealer } = useDealer();
  const [tier, setTier] = useState("free");
  const [analytics, setAnalytics] = useState<ReturnType<typeof buildAnalyticsFromData> | null>(null);

  useEffect(() => {
    setPageMeta({ title: "Dealer OS" });
    if (!dealer) return;
    void (async () => {
      const ent = await fetchDealerEnterprise(dealer.id);
      if (ent) setTier(ent.subscriptionTier);
      const finance = await fetchDealerFinanceStats(dealer.id);
      const auctions = await fetchDealerAuctionEntries(dealer.id);
      setAnalytics(
        buildAnalyticsFromData(
          leads.map((l) => ({ status: l.status, created_at: l.createdAt })),
          [],
          finance,
          auctions.length
        )
      );
    })();
  }, [dealer, leads]);

  if (loading) {
    return <p className="text-muted-foreground">Loading dealer OS…</p>;
  }

  const typeLabel = crmDealer?.dealerType
    ? DEALER_TYPE_LABELS[crmDealer.dealerType as DealerType] ?? crmDealer.dealerType
    : "Dealer";
  const plan = planFromTier(tier);
  const chartLeads = analytics?.monthlyLeads ?? [];
  const chartRevenue = analytics?.monthlyRevenue ?? [];

  return (
    <DealerConsoleShell
      title={crmDealer?.name ?? "Dealer OS"}
      description={`${typeLabel} · ${crmDealer?.city}, ${crmDealer?.state} · ${plan.name} plan`}
      actions={
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/dealers/${crmDealer?.slug ?? ""}`} target="_blank">
              Storefront
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/dashboard/dealer/leads">Open CRM</Link>
          </Button>
        </div>
      }
    >
      <div className="dealer-os-quick-grid">
        {QUICK_LINKS.map((q) => (
          <Link key={q.href} to={q.href} className="dealer-os-quick-link">
            <q.icon className="h-5 w-5 text-primary" />
            <span>{q.label}</span>
            <ArrowRight className="h-4 w-4 ml-auto opacity-40" />
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active listings" value={stats.activeListings} icon={Car} change={`${stats.totalListings} total`} />
        <StatCard label="New leads" value={stats.newLeads} icon={Users} trend="up" change={`${stats.conversionRate}% conv.`} />
        <StatCard label="Revenue (MTD)" value={formatCurrency(stats.revenueMtd)} icon={IndianRupee} />
        <StatCard label="Sold units" value={stats.soldListings} icon={TrendingUp} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Finance in progress" value={analytics?.financePending ?? 0} icon={Landmark} />
        <StatCard label="Loans approved" value={analytics?.financeApproved ?? 0} icon={Landmark} />
        <StatCard label="Auction lots" value={analytics?.auctionActive ?? 0} icon={Gavel} />
        <StatCard label="Calls tracked" value={stats.callsTracked} icon={Phone} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="dealer-os-card">
          <h2 className="font-semibold text-lg mb-4">Lead pipeline</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartLeads}>
                <XAxis dataKey="month" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Bar dataKey="leads" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="dealer-os-card">
          <h2 className="font-semibold text-lg mb-4">Sales trend (₹ Lakhs)</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartRevenue}>
                <XAxis dataKey="month" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="dealer-os-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" /> Recent leads
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard/dealer/leads">View pipeline</Link>
          </Button>
        </div>
        <LeadTable leads={leads.slice(0, 6)} onStatusChange={() => refetch()} />
      </div>

      <div className="dealer-os-card">
        <h2 className="font-semibold mb-3">Listing performance</h2>
        <table className="dealer-os-table">
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Views</th>
              <th>Enquiries</th>
              <th>WhatsApp</th>
            </tr>
          </thead>
          <tbody>
            {listingPerformance.slice(0, 5).map((p) => (
              <tr key={p.vehicleId}>
                <td className="font-medium max-w-[200px] truncate">{p.title}</td>
                <td>{p.views.toLocaleString()}</td>
                <td>{p.enquiries}</td>
                <td>{p.whatsappClicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dealer-os-card flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm">
          <MessageCircle className="h-4 w-4 text-primary" />
          <span>{stats.whatsappChats} WhatsApp conversations (est.)</span>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard/dealer/whatsapp">WhatsApp desk</Link>
        </Button>
      </div>
    </DealerConsoleShell>
  );
}
