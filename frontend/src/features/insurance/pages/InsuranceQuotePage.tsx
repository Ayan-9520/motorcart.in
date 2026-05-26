import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { setPageMeta } from "@/utils/seo";
import { InsuranceSubpageShell } from "../components/InsuranceSubpageShell";
import { InsuranceVehicleToggle } from "../components/InsuranceVehicleToggle";
import { InsuranceQuoteForm } from "../components/InsuranceQuoteForm";
import { InsurancePlanCard } from "../components/InsurancePlanCard";
import { useInsuranceQuote } from "../hooks/useInsuranceQuote";
import { parseInsuranceVehicle, vehicleTypeLabel } from "../lib/insurance-routes";
import type { InsuranceVehicleType } from "../types";

export function InsuranceQuotePage() {
  const [params, setParams] = useSearchParams();
  const vehicleType = parseInsuranceVehicle(params.get("type"));
  const { input, patchInput, offers, bestOffer, loading } = useInsuranceQuote(vehicleType);

  useEffect(() => {
    setPageMeta({ title: `Insurance quote — ${vehicleTypeLabel(vehicleType)}` });
  }, [vehicleType]);

  const setType = (t: InsuranceVehicleType) => {
    setParams({ type: t }, { replace: true });
  };

  return (
    <InsuranceSubpageShell
      title="Instant insurance quote"
      subtitle="Real-time premiums from 6 insurers — IDV, NCB & add-ons calculated live."
      vehicleType={vehicleType}
    >
      <InsuranceVehicleToggle value={vehicleType} onChange={setType} className="mb-6" />

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="ins-panel">
            <h2 className="text-sm font-bold mb-4">Vehicle details</h2>
            <InsuranceQuoteForm input={input} onChange={patchInput} />
          </div>
        </div>
        <div className="lg:col-span-3 space-y-4">
          <div className="ins-panel ins-panel--glow">
            <div className="flex items-center justify-between gap-2 mb-4">
              <h2 className="text-sm font-bold">Live quotes</h2>
              {loading && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
            </div>
            {loading && !offers.length ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-36 rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {offers.map((o, i) => (
                  <InsurancePlanCard key={o.id} offer={o} rank={i + 1} featured={i === 0} />
                ))}
              </div>
            )}
          </div>
          {bestOffer && (
            <Button variant="outline" className="w-full rounded-xl" asChild>
              <Link to={`/insurance/compare?type=${vehicleType}`}>
                Open comparison table <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </InsuranceSubpageShell>
  );
}
