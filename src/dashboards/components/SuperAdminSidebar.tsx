import { NavLink } from "react-router-dom";
import { LayoutGrid } from "lucide-react";
import { ADMIN_ERP_NAV } from "@/features/platform-admin/config/admin-erp-nav";
import { cn } from "@/lib/utils";

export function SuperAdminSidebar() {
  return (
    <aside className="erp-sidebar sa-sidebar">
      <div className="erp-sidebar__brand sa-sidebar__brand">
        <div className="erp-sidebar__logo">
          <LayoutGrid className="h-5 w-5" />
        </div>
        <div>
          <p className="sa-sidebar__title">Motorcart</p>
          <p className="sa-sidebar__sub">Admin ERP</p>
        </div>
      </div>
      <nav className="sa-sidebar__nav erp-sidebar__nav">
        {ADMIN_ERP_NAV.map((group) => (
          <div key={group.label ?? "root"} className="erp-sidebar__group">
            {group.label ? <p className="erp-sidebar__group-label">{group.label}</p> : null}
            {group.items.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn("sa-sidebar__link erp-sidebar__link", isActive && "sa-sidebar__link--active erp-sidebar__link--active")
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
