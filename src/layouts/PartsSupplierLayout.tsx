import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { PartsSellerSidebar } from "@/components/layout/PartsSellerSidebar";

export function PartsSupplierLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <PartsSellerSidebar />
        <main className="flex-1 overflow-auto bg-background p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
