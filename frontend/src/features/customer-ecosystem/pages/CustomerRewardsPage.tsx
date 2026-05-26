import { useEffect } from "react";
import { CustomerRewardsPanel } from "../components/CustomerRewardsPanel";
import { CustomerEcosystemPage } from "../components/CustomerEcosystemPage";
import { useCustomerEcosystem } from "../hooks/useCustomerEcosystem";
import { setPageMeta } from "@/utils/seo";

export function CustomerRewardsPage() {
  const { data } = useCustomerEcosystem();

  useEffect(() => {
    setPageMeta({ title: "Loyalty & Rewards" });
  }, []);

  return (
    <CustomerEcosystemPage title="Loyalty & rewards" description="Earn on service, insurance & referrals.">
      <CustomerRewardsPanel
        balance={data?.preferences.rewardPointsBalance ?? 0}
        tier={data?.preferences.loyaltyTier ?? "Bronze"}
      />
    </CustomerEcosystemPage>
  );
}
