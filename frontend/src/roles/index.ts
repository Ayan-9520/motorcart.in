/**
 * Role & access control — single import surface for guards + permission matrix.
 * Domain RBAC logic lives in `permissions/` and `guards/`; this barrel keeps imports tidy.
 */
export { userHasAnyRole, DEALER_ROLES, isDealerRole } from "@/permissions/role-matching";
export { ROLE_CAPABILITIES } from "@/permissions/matrix";
export { usePermissions } from "@/hooks/usePermissions";
export { ProtectedRoute } from "@/guards/ProtectedRoute";
export { RoleGuard } from "@/guards/RoleGuard";
