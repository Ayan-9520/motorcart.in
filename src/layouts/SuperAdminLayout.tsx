import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { SuperAdminSidebar } from "@/dashboards/components/SuperAdminSidebar";
import { SuperAdminMobileNav } from "@/dashboards/components/SuperAdminMobileNav";
import { RouteSuspense } from "@/layouts/RouteSuspense";

export function SuperAdminLayout() {
  return (
    <div className="sa-layout flex min-h-screen flex-col">
      <Navbar />
      <div className="dashboard-shell-bar border-b border-border/50 px-4 py-2 lg:hidden">
        <SuperAdminMobileNav />
      </div>
      <div className="flex flex-1">
        <SuperAdminSidebar />
        <main className="sa-main flex-1 overflow-auto">
          <RouteSuspense>
            <Outlet />
          </RouteSuspense>
        </main>
      </div>
    </div>
  );
}
