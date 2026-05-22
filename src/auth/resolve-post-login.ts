import { getPostLoginDashboardPath } from "@/auth/post-login-path";
import {
  isAccountPendingApproval,
  PENDING_APPROVAL_PATH,
} from "@/auth/ecosystem-roles";
import type { AppRole } from "@/types/database";
import type { User } from "@/types";

const AUTH_PATHS = new Set([
  "/login",
  "/signup",
  "/signup/customer",
  "/signup/business",
  "/forgot-password",
  "/reset-password",
  "/auth/callback",
]);

/** Prefer deep link from ProtectedRoute; otherwise role dashboard. */
export function resolvePostLoginPath(
  role: AppRole,
  from?: { pathname?: string; search?: string } | null,
  user?: Pick<User, "accountStatus" | "role"> | null
): string {
  if (user && isAccountPendingApproval(user)) {
    return PENDING_APPROVAL_PATH;
  }

  const pathname = from?.pathname;
  if (pathname && !AUTH_PATHS.has(pathname) && !pathname.startsWith("/auth")) {
    return `${pathname}${from?.search ?? ""}`;
  }
  return getPostLoginDashboardPath(role, user ?? undefined);
}
