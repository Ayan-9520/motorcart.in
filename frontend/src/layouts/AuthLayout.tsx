import { Outlet } from "react-router-dom";
import { Car } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { AuthSurface } from "@/components/auth/AuthSurface";
import { Navbar } from "@/components/layout/Navbar";
import { GlobalSearchDialog } from "@/components/search/GlobalSearchDialog";

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <GlobalSearchDialog />
      <div className="relative flex flex-1 flex-col lg:flex-row">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,_rgba(22,163,74,0.14),transparent_55%),radial-gradient(ellipse_at_80%_100%,_rgba(22,163,74,0.08),transparent_50%)]" />
      <div className="relative hidden items-center justify-center bg-card/40 p-12 text-foreground lg:flex lg:w-1/2 lg:border-r lg:border-border/60">
        <div className="max-w-md space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Car className="h-6 w-6 text-primary-foreground" />
            </span>
            <span className="text-2xl font-bold">{SITE_NAME}</span>
          </div>
          <h2 className="text-3xl font-bold">India&apos;s AI Automobile Ecosystem</h2>
          <p className="text-muted-foreground">
            Buy, sell, finance, auction, and grow your automotive business — all in one premium platform.
          </p>
        </div>
      </div>
      <div className="relative flex flex-1 items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          <AuthSurface>
            <Outlet />
          </AuthSurface>
        </div>
      </div>
      </div>
    </div>
  );
}
