export type SubscriptionPlanCode = "free" | "premium" | "enterprise";

export interface SubscriptionPlan {
  code: SubscriptionPlanCode;
  name: string;
  priceMonthly: number;
  maxListings: number;
  maxTeamMembers: number;
  features: string[];
  highlighted?: boolean;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    code: "free",
    name: "Free",
    priceMonthly: 0,
    maxListings: 25,
    maxTeamMembers: 2,
    features: ["25 active listings", "Basic lead inbox", "Public storefront", "Email support"],
  },
  {
    code: "premium",
    name: "Premium",
    priceMonthly: 4999,
    maxListings: 150,
    maxTeamMembers: 10,
    features: [
      "150 listings",
      "Pipeline CRM & reminders",
      "Bulk Excel upload",
      "WhatsApp deep links",
      "Analytics & AI pricing",
    ],
    highlighted: true,
  },
  {
    code: "enterprise",
    name: "Enterprise",
    priceMonthly: 14999,
    maxListings: 9999,
    maxTeamMembers: 50,
    features: [
      "Unlimited listings",
      "Team permissions",
      "Auction desk",
      "API & webhooks",
      "Dedicated success manager",
    ],
  },
];

export function planFromTier(tier: string): SubscriptionPlan {
  const code = (["free", "premium", "enterprise"].includes(tier) ? tier : "free") as SubscriptionPlanCode;
  return SUBSCRIPTION_PLANS.find((p) => p.code === code) ?? SUBSCRIPTION_PLANS[0];
}
