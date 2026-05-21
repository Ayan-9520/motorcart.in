import { Outlet } from "react-router-dom";
import { RoleSidebar } from "@/dashboards/components/RoleSidebar";
import { DashboardMobileNav } from "@/dashboards/components/DashboardMobileNav";
import { Navbar } from "@/components/layout/Navbar";
import { RouteSuspense } from "@/layouts/RouteSuspense";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="dashboard-shell-bar border-b border-border/50 px-4 py-2 lg:hidden">
        <DashboardMobileNav />
      </div>
      <div className="flex flex-1">
        <RoleSidebar />
        <main className="flex-1 overflow-auto bg-background p-4 sm:p-6">
          <RouteSuspense>
            <Outlet />
          </RouteSuspense>
        </main>
      </div>
    </div>
  );
}
