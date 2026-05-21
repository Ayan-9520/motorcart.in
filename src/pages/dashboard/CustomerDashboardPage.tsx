import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Car,
  ClipboardList,
  Gavel,
  Heart,
  Landmark,
  Search,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { useVehicleMarketStore } from "@/store/vehicleMarketStore";
import { DashboardPageShell } from "@/shared/layout/DashboardPageShell";
import { setPageMeta } from "@/utils/seo";

const QUICK = [
  { label: "Browse cars", href: "/buy?hub=cars", icon: Car, hint: "New & used" },
  { label: "Wishlist", href: "/wishlist", icon: Heart, hint: "Saved vehicles" },
  { label: "Loan applications", href: "/dashboard/customer/loans", icon: Landmark, hint: "Track EMI" },
  { label: "Service bookings", href: "/services/my-bookings", icon: Wrench, hint: "Garage visits" },
  { label: "Service history", href: "/services/history", icon: ClipboardList, hint: "Past jobs" },
  { label: "Auction bids", href: "/auctions/browse", icon: Gavel, hint: "Live lots" },
  { label: "Smart search", href: "/search", icon: Search, hint: "⌘K global" },
];

export function CustomerDashboardPage() {
  const user = useAuthStore((s) => s.user);
  const wishlistCount = useVehicleMarketStore((s) => s.wishlist.length);

  useEffect(() => {
    setPageMeta({ title: "My Motorcart", description: "Your vehicles, loans, services & bids." });
  }, []);

  return (
    <DashboardPageShell
      title="My Motorcart"
      description={
        user
          ? `Welcome back, ${user.fullName} — manage wishlist, loans, services & auctions.`
          : "Your personal automotive hub."
      }
      actions={
        <Button variant="outline" size="sm" className="rounded-xl" asChild>
          <Link to="/?site=1">Browse marketplace</Link>
        </Button>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/80 shadow-card">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Wishlist</p>
            <p className="mt-1 text-2xl font-bold tabular-nums">{wishlistCount}</p>
          </CardContent>
        </Card>
        <Card className="border-border/80 shadow-card">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">KYC</p>
            <p className="mt-1 text-lg font-semibold capitalize">{user?.kycStatus ?? "—"}</p>
          </CardContent>
        </Card>
        <Card className="border-border/80 shadow-card sm:col-span-2">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Account</p>
              <p className="mt-1 font-medium">{user?.email}</p>
            </div>
            <Button size="sm" className="rounded-xl" asChild>
              <Link to="/profile">
                Profile <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Quick actions</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK.map(({ label, href, icon: Icon, hint }) => (
            <Link
              key={href}
              to={href}
              className="flex items-center gap-3 rounded-xl border border-border/70 bg-card/80 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-medium">{label}</span>
                <span className="text-xs text-muted-foreground">{hint}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </DashboardPageShell>
  );
}
