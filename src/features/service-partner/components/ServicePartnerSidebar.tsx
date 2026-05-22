import { NavLink } from "react-router-dom";
import { ChevronLeft, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/uiStore";
import { Button } from "@/components/ui/button";
import { SERVICE_PARTNER_NAV } from "../config/sh-nav";

export function ServicePartnerSidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <aside className={cn("sh-sidebar hidden shrink-0 flex-col lg:flex", sidebarOpen ? "w-64" : "w-[72px]")}>
      <div className="sh-sidebar__brand">
        {sidebarOpen && (
          <div>
            <p className="sh-sidebar__title">Service Hub OS</p>
            <p className="sh-sidebar__sub">GoMechanic · Bosch-grade</p>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <ChevronLeft className={cn("h-4 w-4 transition-transform", !sidebarOpen && "rotate-180")} />
        </Button>
      </div>
      <div className="sh-sidebar__logo-row">
        <span className="sh-sidebar__logo">
          <Wrench className="h-4 w-4" />
        </span>
        {sidebarOpen && <span className="text-xs text-primary/80">Workshop ERP</span>}
      </div>
      <nav className="sh-sidebar__nav flex-1 overflow-y-auto">
        {SERVICE_PARTNER_NAV.map((group) => (
          <div key={group.label} className="sh-sidebar__group">
            {sidebarOpen && <p className="sh-sidebar__group-label">{group.label}</p>}
            {group.items.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => cn("sh-sidebar__link", isActive && "sh-sidebar__link--active")}
                title={label}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {sidebarOpen && <span>{label}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
