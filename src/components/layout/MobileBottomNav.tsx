import { NavLink } from "react-router-dom";
import { Car, Gavel, Home, Landmark, LayoutDashboard, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { getRoleDashboardPath } from "@/auth/get-role-dashboard-path";
import type { AppRole } from "@/types/database";

export function MobileBottomNav() {
  const user = useAuthStore((s) => s.user);
  const homeTo = user ? getRoleDashboardPath(user.role as AppRole) : "/";
  const HomeIcon = user ? LayoutDashboard : Home;
  const homeLabel = user ? "Workspace" : "Home";

  const items = [
    { to: homeTo, label: homeLabel, icon: HomeIcon, end: user ? false : true },
    { to: "/buy", label: "Buy", icon: Car },
    { to: "/auctions", label: "Auctions", icon: Gavel },
    { to: "/finance", label: "Loans", icon: Landmark },
    { to: user ? "/profile" : "/login", label: "Account", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 pb-safe backdrop-blur-md md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={`${to}-${label}`}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
