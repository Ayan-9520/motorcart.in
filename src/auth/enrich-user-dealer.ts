import { fetchDealerByOwner } from "@/features/dealer-crm/services/dealer.service";
import { isDealerRole } from "@/permissions/role-matching";
import type { User } from "@/types";

/** Attach dealer profile hints used for workspace routing. */
export async function enrichUserWithDealerContext(user: User): Promise<User> {
  if (!isDealerRole(user.role) && user.role !== "dealer") {
    return user;
  }

  try {
    const dealer = await fetchDealerByOwner(user.id);
    if (!dealer) return user;
    return { ...user, dealerType: dealer.dealerType };
  } catch {
    return user;
  }
}
