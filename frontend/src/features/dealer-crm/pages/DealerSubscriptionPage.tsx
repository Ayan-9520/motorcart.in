import { useEffect, useState } from "react";
import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DealerConsoleShell } from "../components/DealerConsoleShell";
import { useDealer } from "../hooks/useDealer";
import { SUBSCRIPTION_PLANS, planFromTier } from "../data/subscription-plans";
import { changeSubscriptionTier, fetchDealerEnterprise } from "../services/dealer-enterprise.service";
import { formatCurrency } from "@/lib/utils";
import { setPageMeta } from "@/utils/seo";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export function DealerSubscriptionPage() {
  const { dealer, loading } = useDealer();
  const [tier, setTier] = useState("free");
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    setPageMeta({ title: "Subscription plans" });
    if (dealer) {
      void fetchDealerEnterprise(dealer.id).then((e) => {
        if (e) setTier(e.subscriptionTier);
      });
    }
  }, [dealer]);

  const upgrade = async (code: string) => {
    if (!dealer) return;
    setBusy(code);
    const { error } = await changeSubscriptionTier(dealer.id, code);
    setBusy(null);
    if (error) toast.error(error.message);
    else {
      setTier(code);
      toast.success(`Plan updated to ${code}`);
    }
  };

  const current = planFromTier(tier);

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <DealerConsoleShell
      title="Subscription plans"
      description="Free, Premium and Enterprise — listing caps, team seats and CRM features."
      crumbs={[{ label: "Plans" }]}
    >
      <p className="text-sm text-muted-foreground">
        Current plan: <strong className="text-foreground">{current.name}</strong> · up to{" "}
        {current.maxListings} listings · {current.maxTeamMembers} team seats
      </p>

      <div className="dealer-plans-grid">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <article
            key={plan.code}
            className={cn(
              "dealer-plan-card",
              plan.highlighted && "dealer-plan-card-featured",
              tier === plan.code && "dealer-plan-card-active"
            )}
          >
            {plan.highlighted && (
              <span className="dealer-plan-badge">
                <Crown className="h-3 w-3" /> Popular
              </span>
            )}
            <h3 className="text-lg font-bold">{plan.name}</h3>
            <p className="dealer-plan-price">
              {plan.priceMonthly === 0 ? "Free" : formatCurrency(plan.priceMonthly)}
              {plan.priceMonthly > 0 && <span className="text-xs font-normal text-muted-foreground">/mo</span>}
            </p>
            <ul className="dealer-plan-features">
              {plan.features.map((f) => (
                <li key={f}>
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              className="w-full mt-4"
              variant={tier === plan.code ? "secondary" : "default"}
              disabled={tier === plan.code || busy === plan.code}
              onClick={() => void upgrade(plan.code)}
            >
              {tier === plan.code ? "Current plan" : busy === plan.code ? "Updating…" : "Select plan"}
            </Button>
          </article>
        ))}
      </div>
    </DealerConsoleShell>
  );
}
