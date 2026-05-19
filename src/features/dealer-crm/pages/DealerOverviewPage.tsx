import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Car, Users, IndianRupee, TrendingUp, MessageCircle, Phone, Calendar, BarChart3, ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "../components/StatCard";
import { LeadTable } from "../components/LeadTable";
import { useDealerCRM } from "../hooks/useDealerCRM";
import { DEALER_TYPE_LABELS, type DealerType } from "../types";
import { formatCurrency } from "@/lib/utils";
import { setPageMeta } from "@/utils/seo";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const chartData = [
  { month: "Jan", leads: 42, revenue: 32 },
  { month: "Feb", leads: 58, revenue: 41 },
  { month: "Mar", leads: 65, revenue: 48 },
  { month: "Apr", leads: 72, revenue: 52 },
  { month: "May", leads: 89, revenue: 61 },
];

export function DealerOverviewPage() {
  const { dealer, stats, leads, listingPerformance, loading } = useDealerCRM();

  useEffect(() => {
    setPageMeta({ title: "Dealer CRM Overview" });
  }, []);

  if (loading) {
    return <p className="text-muted-foreground">Loading dashboard...</p>;
  }

  const typeLabel = dealer?.dealerType
    ? DEALER_TYPE_LABELS[dealer.dealerType as DealerType] ?? dealer.dealerType
    : "Dealer";

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">{dealer?.name ?? "Dealer CRM"}</h1>
          <p className="text-muted-foreground mt-1">
            {typeLabel} · {dealer?.city}, {dealer?.state}
            {dealer?.isVerified && <span className="ml-2 text-primary font-medium">✓ Verified</span>}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild><Link to="/dashboard/dealer/inventory">Inventory</Link></Button>
          <Button variant="default" asChild><Link to="/dashboard/dealer/leads">View leads</Link></Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Listings" value={stats.activeListings} icon={Car} change="+12% this month" trend="up" />
        <StatCard label="New Leads" value={stats.newLeads} icon={Users} change={`${stats.totalLeads} total`} />
        <StatCard label="Revenue (MTD)" value={formatCurrency(stats.revenueMtd)} icon={IndianRupee} trend="up" change="+8%" />
        <StatCard label="Conversion" value={`${stats.conversionRate}%`} icon={TrendingUp} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Test Drives" value={stats.testDriveRequests} icon={Calendar} />
        <StatCard label="Enquiries" value={stats.enquiries} icon={MessageCircle} />
        <StatCard label="WhatsApp Chats" value={stats.whatsappChats} icon={MessageCircle} />
        <StatCard label="Calls Tracked" value={stats.callsTracked} icon={Phone} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-lg">Lead pipeline</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="leads" fill="#25D366" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Revenue trend (₹ Lakhs)</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#128C7E" strokeWidth={2} dot={{ fill: "#25D366" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent leads</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard/dealer/leads" className="gap-1">View all <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </CardHeader>
        <CardContent><LeadTable leads={leads.slice(0, 5)} /></CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Top listing performance
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard/dealer/analytics">Full analytics</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="pb-2">Vehicle</th>
                <th className="pb-2">Views</th>
                <th className="pb-2">Enquiries</th>
                <th className="pb-2">WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              {listingPerformance.slice(0, 5).map((p) => (
                <tr key={p.vehicleId} className="border-t">
                  <td className="py-2 font-medium line-clamp-1 max-w-[200px]">{p.title}</td>
                  <td className="py-2">{p.views.toLocaleString()}</td>
                  <td className="py-2">{p.enquiries}</td>
                  <td className="py-2">{p.whatsappClicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
