import { Outlet } from "react-router-dom";
import { DealerSidebar } from "@/components/layout/DealerSidebar";
import { Navbar } from "@/components/layout/Navbar";

export function DealerDashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <DealerSidebar />
        <main className="flex-1 overflow-auto bg-background p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
