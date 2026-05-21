import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutGrid, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { SUPER_ADMIN_NAV } from "@/features/platform-admin/config/super-admin-nav";
import { cn } from "@/lib/utils";

export function SuperAdminMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="dashboard-mobile-nav lg:hidden">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-2 rounded-full"
        onClick={() => setOpen(true)}
        aria-expanded={open}
      >
        <LayoutGrid className="h-4 w-4" aria-hidden />
        Platform menu
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="dashboard-mobile-sheet left-0 top-0 h-full max-h-none w-[min(100vw,320px)] translate-x-0 translate-y-0 rounded-none border-r p-0">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <DialogTitle className="text-base font-semibold">Super Admin</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex flex-col gap-0.5 p-3">
            {SUPER_ADMIN_NAV.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
                    isActive ? "bg-primary/10 text-primary" : "hover:bg-muted/60"
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </DialogContent>
      </Dialog>
    </div>
  );
}
