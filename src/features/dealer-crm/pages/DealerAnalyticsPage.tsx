import { useEffect } from "react";
import { BarChart3, Eye, MousePointer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "../components/StatCard";
import { useDealerCRM } from "../hooks/useDealerCRM";
import { formatCurrency } from "@/lib/utils";
import { setPageMeta } from "@/utils/seo";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const PIE_COLORS = ["#25D366", "#128C7E", "#075E54", "#ECE5DD"];

export function DealerAnalyticsPage() {
  const { stats, listingPerformance } = useDealerCRM();

  useEffect(() => {
    setPageMeta({ title: "Dealer Analytics" });
  }, []);

  const statusPie = [
    { name: "Available", value: stats.activeListings },
    { name: "Sold", value: stats.soldListings },
    { name: "Featured", value: stats.featuredListings },
  ].filter((d) => d.value > 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Listing performance, revenue & conversion metrics</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Avg. listing views" value={stats.avgListingViews} icon={Eye} />
        <StatCard label="Total listings" value={stats.totalListings} icon={BarChart3} />
        <StatCard label="Sold (MTD)" value={stats.soldListings} icon={MousePointer} />
        <StatCard label="Revenue (MTD)" value={formatCurrency(stats.revenueMtd)} icon={BarChart3} trend="up" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Inventory breakdown</CardTitle></CardHeader>
          <CardContent className="h-72">
            {statusPie.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {statusPie.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-muted-foreground py-12">Add inventory to see analytics</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Listing performance</CardTitle></CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground text-left">
                  <th className="pb-2">Vehicle</th>
                  <th className="pb-2">Views</th>
                  <th className="pb-2">Enquiries</th>
                  <th className="pb-2">WA</th>
                </tr>
              </thead>
              <tbody>
                {listingPerformance.map((p) => (
                  <tr key={p.vehicleId} className="border-t">
                    <td className="py-2 font-medium line-clamp-1 max-w-[180px]">{p.title}</td>
                    <td className="py-2">{p.views}</td>
                    <td className="py-2">{p.enquiries}</td>
                    <td className="py-2">{p.whatsappClicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
