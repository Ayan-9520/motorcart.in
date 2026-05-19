import { Outlet, Link } from "react-router-dom";
import { Car } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden items-center justify-center bg-secondary p-12 text-foreground lg:flex lg:w-1/2">
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
      <div className="flex flex-1 items-center justify-center bg-background p-6">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 font-bold text-xl text-foreground lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Car className="h-5 w-5" />
            </span>
            {SITE_NAME}
          </Link>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
