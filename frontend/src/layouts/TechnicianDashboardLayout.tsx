import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { TechnicianSidebar } from "@/components/layout/TechnicianSidebar";

export function TechnicianDashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <TechnicianSidebar />
        <main className="flex-1 overflow-auto bg-background p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
