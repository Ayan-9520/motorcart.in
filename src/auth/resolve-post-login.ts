import { getPostLoginDashboardPath } from "@/auth/post-login-path";
import type { AppRole } from "@/types/database";

const AUTH_PATHS = new Set(["/login", "/signup", "/forgot-password", "/reset-password", "/auth/callback"]);

/** Prefer deep link from ProtectedRoute; otherwise role dashboard. */
export function resolvePostLoginPath(
  role: AppRole,
  from?: { pathname?: string; search?: string } | null
): string {
  const pathname = from?.pathname;
  if (pathname && !AUTH_PATHS.has(pathname) && !pathname.startsWith("/auth")) {
    return `${pathname}${from?.search ?? ""}`;
  }
  return getPostLoginDashboardPath(role);
}
