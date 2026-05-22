import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { NewCarDealerSidebar } from "@/features/new-car-dealer/components/NewCarDealerSidebar";
import { NewCarDealerMobileNav } from "@/features/new-car-dealer/components/NewCarDealerMobileNav";
import { RouteSuspense } from "@/layouts/RouteSuspense";

export function NewCarDealerLayout() {
  return (
    <div className="ncd-layout flex min-h-screen flex-col">
      <Navbar />
      <div className="dashboard-shell-bar border-b border-border/50 px-4 py-2 lg:hidden">
        <NewCarDealerMobileNav />
      </div>
      <div className="flex flex-1">
        <NewCarDealerSidebar />
        <main className="ncd-main flex-1 overflow-auto">
          <RouteSuspense>
            <Outlet />
          </RouteSuspense>
        </main>
      </div>
    </div>
  );
}
