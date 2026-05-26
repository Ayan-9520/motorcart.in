import { Link, useLocation } from "react-router-dom";
import { Calendar, ClipboardList, LayoutDashboard, Users, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/dashboard/service", label: "Home", icon: LayoutDashboard, end: true },
  { to: "/dashboard/service/bookings", label: "Bookings", icon: ClipboardList },
  { to: "/dashboard/service/workshop/kanban", label: "Jobs", icon: Wrench },
  { to: "/dashboard/service/calendar", label: "Calendar", icon: Calendar },
  { to: "/dashboard/service/customers", label: "CRM", icon: Users },
];

export function ServicePartnerMobileNav() {
  const { pathname } = useLocation();
  return (
    <nav className="flex gap-1 overflow-x-auto">
      {tabs.map(({ to, label, icon: Icon, end }) => {
        const active = end ? pathname === to : pathname.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium",
              active ? "bg-primary/15 text-primary" : "text-muted-foreground"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
