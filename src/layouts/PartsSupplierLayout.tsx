import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { PartsSupplierSidebar } from "@/features/parts-supplier/components/PartsSupplierSidebar";
import { PartsSupplierMobileNav } from "@/features/parts-supplier/components/PartsSupplierMobileNav";
import { RouteSuspense } from "@/layouts/RouteSuspense";

export function PartsSupplierLayout() {
  return (
    <div className="psp-layout flex min-h-screen flex-col">
      <Navbar />
      <div className="dashboard-shell-bar border-b border-border/50 px-4 py-2 lg:hidden">
        <PartsSupplierMobileNav />
      </div>
      <div className="flex flex-1">
        <PartsSupplierSidebar />
        <main className="psp-main flex-1 overflow-auto">
          <RouteSuspense>
            <Outlet />
          </RouteSuspense>
        </main>
      </div>
    </div>
  );
}
