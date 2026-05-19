import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { GlobalSearchDialog } from "@/components/search/GlobalSearchDialog";

export function PublicLayout() {
  const { pathname } = useLocation();
  const hideDefaultFooter = pathname === "/community";

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>
      {!hideDefaultFooter && <Footer />}
      <FloatingButtons />
      <GlobalSearchDialog />
      <MobileBottomNav />
    </div>
  );
}
