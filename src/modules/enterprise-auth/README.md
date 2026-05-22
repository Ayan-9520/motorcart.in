# Enterprise auth & role dashboards

Production RBAC layer for Motorcart.in — extends existing auth without replacing marketplace or homepage flows.

## Roles (stored in Supabase `app_role`)

| Spec name | DB `app_role` | Dashboard |
|-----------|---------------|-----------|
| customer | `customer` | `/dashboard/customer` |
| dealer | `dealer` | `/dashboard/dealer` |
| preowned_dealer | `used_car_dealer` | `/dashboard/dealer` (alias `/dashboard/preowned-dealer`) |
| new_car_dealer | `new_car_dealer` | `/dashboard/dealer` (alias `/dashboard/newcar-dealer`) |
| dsa_agent | `dsa_agent` | `/dashboard/dsa` |
| parts_seller | `parts_seller` | `/dashboard/parts` |
| service_partner | `service_center` | `/dashboard/service` |
| admin | `admin` | `/dashboard/admin` |

`super_admin` uses `/dashboard/super-admin` (platform owner).

## Auth routes

- `/login` — email, phone OTP, Google
- `/signup/customer` — buyer account + email verification
- `/signup/business` — GST, company, docs, admin approval queue
- `/signup` — legacy business dropdown (unchanged)
- `/pending-approval` — business users with `status = pending_verification`

## Guards

- `src/guards/ProtectedRoute.tsx` — auth, suspended, role list, pending business redirect
- `src/permissions/role-matching.ts` — `DEALER_ROLES`, `userHasAnyRole`
- `src/auth/ecosystem-roles.ts` — business approval helpers

## Layouts

- `DashboardLayout` + `RoleSidebar` — customer, admin ops
- `DealerDashboardLayout` — dealer CRM
- `PartsSupplierLayout`, `ServiceHubLayout`, `FinanceDashboardLayout`, `SuperAdminLayout`

## Database

- `public.users` — `role`, `status`, `onboarding_status`, `approval_status`, `profile_completion`, `metadata`
- `public.dealers` — dealer stub on business signup
- Migration: `supabase/migrations/00024_business_onboarding.sql`

## Services

- `src/services/auth.service.ts` — Supabase auth + profile
- `src/services/business-signup.service.ts` — post-signup business profile + dealer row
