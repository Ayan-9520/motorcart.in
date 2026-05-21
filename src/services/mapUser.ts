import type { User } from "@/types";
import type { DbUser } from "@/types/database";

export function mapDbUserToAppUser(row: DbUser): User {
  return {
    id: row.id,
    email: row.email ?? "",
    phone: row.phone ?? undefined,
    fullName: row.full_name,
    avatarUrl: row.avatar_url ?? undefined,
    role: row.role,
    kycStatus: row.kyc_status,
    isVerified: row.is_verified,
    accountStatus: row.status ?? "active",
    city: row.city ?? undefined,
    state: row.state ?? undefined,
    companyName: row.company_name ?? undefined,
    createdAt: row.created_at,
  };
}
