import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, Truck, Upload, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/uiStore";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/dashboard/parts", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/parts/inventory", label: "Inventory & stock", icon: Package },
  { to: "/dashboard/parts/upload", label: "Add product", icon: Upload },
  { to: "/dashboard/parts/orders", label: "Orders", icon: Truck },
];

export function PartsSellerSidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <aside
      className={cn(
        "sidebar-shell hidden shrink-0 flex-col transition-all duration-300 lg:flex",
        sidebarOpen ? "w-64" : "w-[72px]"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        {sidebarOpen && <span className="font-semibold text-sm">Parts supplier</span>}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <ChevronLeft className={cn("h-4 w-4 transition-transform", !sidebarOpen && "rotate-180")} />
        </Button>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/dashboard/parts"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ? "sidebar-link-active" : "sidebar-link"
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
