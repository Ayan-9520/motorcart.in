import { Outlet, Link } from "react-router-dom";
import { Car } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 gradient-brand items-center justify-center p-12 text-white">
        <div className="max-w-md space-y-6">
          <div className="flex items-center gap-3">
            <Car className="h-10 w-10" />
            <span className="text-2xl font-bold">{SITE_NAME}</span>
          </div>
          <h2 className="text-3xl font-bold">India&apos;s AI Automobile Ecosystem</h2>
          <p className="text-white/90">
            Buy, sell, finance, auction, and grow your automotive business — all in one platform.
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8 font-bold text-xl">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-brand text-white">
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
