import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Car, Users, Package, Gavel, Banknote,
  Wrench, Settings, BarChart3, ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/uiStore";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/dashboard/dealer", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/dealer/inventory", label: "Inventory", icon: Car },
  { to: "/dashboard/dealer/leads", label: "Leads", icon: Users },
  { to: "/dashboard/dealer/auctions", label: "Auctions", icon: Gavel },
  { to: "/dashboard/dealer/finance", label: "Finance", icon: Banknote },
  { to: "/dashboard/dealer/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/dealer/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col border-r bg-card transition-all duration-300 shrink-0",
        sidebarOpen ? "w-64" : "w-[72px]"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        {sidebarOpen && <span className="font-semibold text-sm">Dealer CRM</span>}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <ChevronLeft className={cn("h-4 w-4 transition-transform", !sidebarOpen && "rotate-180")} />
        </Button>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
