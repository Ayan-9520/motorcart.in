import type { User } from "@/types";
import type { DbUser } from "@/types/database";

function readBusinessCategory(metadata: Record<string, unknown>): string | undefined {
  const business = metadata.business as { business_category?: string } | undefined;
  return business?.business_category;
}

export function mapDbUserToAppUser(row: DbUser): User {
  const metadata = row.metadata ?? {};
  return {
    id: row.id,
    email: row.email ?? "",
    phone: row.phone ?? undefined,
    fullName: row.full_name,
    avatarUrl: row.avatar_url ?? undefined,
    role: row.role,
    businessCategory: readBusinessCategory(metadata),
    kycStatus: row.kyc_status,
    isVerified: row.is_verified,
    accountStatus: row.status ?? "active",
    city: row.city ?? undefined,
    state: row.state ?? undefined,
    companyName: row.company_name ?? undefined,
    createdAt: row.created_at,
  };
}
