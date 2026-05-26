import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { setPageMeta } from "@/utils/seo";
import { formatCurrency } from "@/lib/utils";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { InsuranceSubpageShell } from "../components/InsuranceSubpageShell";
import { InsuranceApplyForm } from "../components/InsuranceApplyForm";
import { useInsuranceQuote } from "../hooks/useInsuranceQuote";
import { parseInsuranceVehicle, vehicleTypeLabel } from "../lib/insurance-routes";
import { planTypeLabel } from "../lib/insurance-premium";

export function InsuranceApplyPage() {
  const [params] = useSearchParams();
  const vehicleType = parseInsuranceVehicle(params.get("type"));
  const quoteId = params.get("quote");
  const { offers, loading } = useInsuranceQuote(vehicleType);

  const offer = useMemo(
    () => offers.find((o) => o.id === quoteId) ?? offers[0] ?? null,
    [offers, quoteId]
  );

  useEffect(() => {
    setPageMeta({ title: "Buy insurance — Motorcart" });
  }, []);

  if (loading && !offer) {
    return (
      <InsuranceSubpageShell title="Checkout" subtitle="Loading your quote…" vehicleType={vehicleType}>
        <p className="text-muted-foreground animate-pulse">Preparing checkout…</p>
      </InsuranceSubpageShell>
    );
  }

  if (!offer) {
    return (
      <InsuranceSubpageShell title="Checkout" subtitle="Quote not found" vehicleType={vehicleType}>
        <Link to={`/insurance/quote?type=${vehicleType}`} className="text-primary font-semibold">
          Get a new quote
        </Link>
      </InsuranceSubpageShell>
    );
  }

  return (
    <InsuranceSubpageShell
      title="Complete purchase"
      subtitle={`${offer.partnerName} · ${planTypeLabel(offer.planType)} · ${vehicleTypeLabel(offer.vehicleType)}`}
      vehicleType={vehicleType}
    >
      <div className="grid gap-8 lg:grid-cols-2 max-w-4xl">
        <article className="ins-checkout-summary">
          <div className="flex items-center gap-3 mb-4">
            <BrandLogo src={offer.logoUrl ?? ""} alt={offer.partnerName} size="md" />
            <div>
              <p className="font-bold">{offer.partnerName}</p>
              <p className="text-sm text-muted-foreground">
                {offer.vehicleMake} {offer.vehicleModel} · {offer.registrationCity}
              </p>
            </div>
          </div>
          <p className="text-3xl font-bold text-primary">{formatCurrency(offer.annualPremium)}</p>
          <p className="text-xs text-muted-foreground">Annual premium · IDV {formatCurrency(offer.idvAmount)}</p>
          <ul className="mt-4 space-y-1 text-sm">
            {offer.breakdown.slice(0, 4).map((line) => (
              <li key={line.label} className="flex justify-between">
                <span className="text-muted-foreground">{line.label}</span>
                <span>{formatCurrency(Math.abs(line.amount))}</span>
              </li>
            ))}
          </ul>
        </article>
        <div className="ins-panel">
          <h2 className="text-sm font-bold mb-4">Policy holder</h2>
          <InsuranceApplyForm offer={offer} />
        </div>
      </div>
    </InsuranceSubpageShell>
  );
}
