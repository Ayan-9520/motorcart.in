import { NavLink } from "react-router-dom";
import { Shield } from "lucide-react";
import { SUPER_ADMIN_NAV } from "@/features/platform-admin/config/super-admin-nav";
import { cn } from "@/lib/utils";

export function SuperAdminSidebar() {
  return (
    <aside className="sa-sidebar">
      <div className="sa-sidebar__brand">
        <Shield className="h-5 w-5 text-primary" />
        <div>
          <p className="sa-sidebar__title">Motorcart</p>
          <p className="sa-sidebar__sub">Super Admin</p>
        </div>
      </div>
      <nav className="sa-sidebar__nav">
        {SUPER_ADMIN_NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => cn("sa-sidebar__link", isActive && "sa-sidebar__link--active")}
          >
            <Icon className="h-4 w-4 shrink-0 opacity-80" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
