import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BarChart3, Bot, Gavel, Landmark, MessageSquare, Settings, Store, Users } from "lucide-react";
import { DashboardPageShell } from "@/shared/layout/DashboardPageShell";
import { setPageMeta } from "@/utils/seo";

const LINKS = [
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Dealers", href: "/dashboard/admin/dealers", icon: Store },
  { label: "Finance OS", href: "/dashboard/admin/finance", icon: Landmark },
  { label: "Auctions", href: "/dashboard/auction", icon: Gavel },
  { label: "CRM", href: "/dashboard/admin/crm", icon: MessageSquare },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  { label: "AI agents", href: "/dashboard/admin/ai", icon: Bot },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

export function AdminOpsHomePage() {
  useEffect(() => {
    setPageMeta({ title: "Operations — Admin" });
  }, []);

  return (
    <DashboardPageShell
      title="Operations"
      description="Platform admin — users, dealers, finance desk, auctions & AI."
    >
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {LINKS.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            to={href}
            className="flex items-center gap-3 rounded-xl border border-border/70 bg-card p-4 hover:border-primary/30 hover:bg-primary/5"
          >
            <Icon className="h-5 w-5 text-primary" />
            <span className="font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </DashboardPageShell>
  );
}
