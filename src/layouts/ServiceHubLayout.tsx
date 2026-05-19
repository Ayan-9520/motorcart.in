import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { ServiceHubSidebar } from "@/components/layout/ServiceHubSidebar";

export function ServiceHubLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <ServiceHubSidebar />
        <main className="flex-1 overflow-auto bg-background p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
