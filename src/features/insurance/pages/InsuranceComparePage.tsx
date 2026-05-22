import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { setPageMeta } from "@/utils/seo";
import { Button } from "@/components/ui/button";
import { InsuranceSubpageShell } from "../components/InsuranceSubpageShell";
import { InsuranceVehicleToggle } from "../components/InsuranceVehicleToggle";
import { InsuranceCompareTable } from "../components/InsuranceCompareTable";
import { useInsuranceQuote } from "../hooks/useInsuranceQuote";
import { parseInsuranceVehicle, vehicleTypeLabel } from "../lib/insurance-routes";
import type { InsuranceVehicleType } from "../types";

export function InsuranceComparePage() {
  const [params, setParams] = useSearchParams();
  const vehicleType = parseInsuranceVehicle(params.get("type"));
  const { offers, loading } = useInsuranceQuote(vehicleType);

  useEffect(() => {
    setPageMeta({ title: `Compare insurance — ${vehicleTypeLabel(vehicleType)}` });
  }, [vehicleType]);

  return (
    <InsuranceSubpageShell
      title="Compare insurers"
      subtitle="Side-by-side premiums, IDV and claim settlement ratios."
      vehicleType={vehicleType}
    >
      <InsuranceVehicleToggle
        value={vehicleType}
        onChange={(t: InsuranceVehicleType) => setParams({ type: t }, { replace: true })}
        className="mb-6"
      />
      <div className="mb-4 flex justify-end">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/insurance/quote?type=${vehicleType}`}>Edit quote</Link>
        </Button>
      </div>
      <InsuranceCompareTable offers={offers} loading={loading} />
    </InsuranceSubpageShell>
  );
}
