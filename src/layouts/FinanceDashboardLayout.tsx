import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { FinanceSidebar } from "@/components/layout/FinanceSidebar";

function variantFromPath(path: string): "customer" | "dsa" | "lender" {
  if (path.includes("/dashboard/dsa")) return "dsa";
  if (path.includes("/dashboard/finance")) return "lender";
  return "customer";
}

export function FinanceDashboardLayout() {
  const { pathname } = useLocation();
  const variant = variantFromPath(pathname);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <FinanceSidebar variant={variant} />
        <main className="flex-1 overflow-auto bg-background p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
