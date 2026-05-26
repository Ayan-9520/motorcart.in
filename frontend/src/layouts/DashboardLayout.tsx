import { Outlet } from "react-router-dom";
import { RoleSidebar } from "@/dashboards/components/RoleSidebar";
import { CustomerSidebar } from "@/dashboards/components/CustomerSidebar";
import { CustomerBottomNav } from "@/dashboards/components/CustomerBottomNav";
import { DashboardMobileNav } from "@/dashboards/components/DashboardMobileNav";
import { CustomerMobileNav } from "@/dashboards/components/CustomerMobileNav";
import { Navbar } from "@/components/layout/Navbar";
import { RouteSuspense } from "@/layouts/RouteSuspense";
import { useAuthStore } from "@/store/authStore";

export function DashboardLayout() {
  const role = useAuthStore((s) => s.user?.role ?? "customer");
  const isCustomer = role === "customer";

  return (
    <div className={isCustomer ? "cos-layout flex min-h-screen flex-col" : "flex min-h-screen flex-col"}>
      <Navbar />
      <div className="dashboard-shell-bar border-b border-border/50 px-4 py-2 lg:hidden">
        {isCustomer ? <CustomerMobileNav /> : <DashboardMobileNav />}
      </div>
      <div className="flex flex-1">
        {isCustomer ? <CustomerSidebar /> : <RoleSidebar />}
        <main
          className={
            isCustomer
              ? "cos-main cos-main--with-bottom-nav flex-1 overflow-auto pb-20 lg:pb-0"
              : "flex-1 overflow-auto bg-background p-4 sm:p-6"
          }
        >
          <RouteSuspense>
            <Outlet />
          </RouteSuspense>
        </main>
      </div>
      {isCustomer ? <CustomerBottomNav /> : null}
    </div>
  );
}
