import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { ServicePartnerSidebar } from "@/features/service-partner/components/ServicePartnerSidebar";
import { ServicePartnerMobileNav } from "@/features/service-partner/components/ServicePartnerMobileNav";
import { RouteSuspense } from "@/layouts/RouteSuspense";

export function ServiceHubLayout() {
  return (
    <div className="sh-layout flex min-h-screen flex-col">
      <Navbar />
      <div className="dashboard-shell-bar border-b border-border/50 px-4 py-2 lg:hidden">
        <ServicePartnerMobileNav />
      </div>
      <div className="flex flex-1">
        <ServicePartnerSidebar />
        <main className="sh-main flex-1 overflow-auto">
          <RouteSuspense>
            <Outlet />
          </RouteSuspense>
        </main>
      </div>
    </div>
  );
}
