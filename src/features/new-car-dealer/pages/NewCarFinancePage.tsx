import { useEffect } from "react";
import { Link } from "react-router-dom";
import { NcdModulePlaceholder } from "../components/NcdModulePlaceholder";
import { Button } from "@/components/ui/button";
import { PRIMARY_PARTNER_BANKS } from "@/features/finance/data/primary-partner-banks";
import { setPageMeta } from "@/utils/seo";

export function NewCarFinancePage() {
  useEffect(() => setPageMeta({ title: "Finance desk" }), []);

  return (
    <NcdModulePlaceholder
      title="Finance hub"
      description="HDFC, ICICI, Kotak, Axis, SBI, Chola, Tata Capital — eligibility, EMI & payouts."
      features={[
        "Loan eligibility checker",
        "EMI calculator & offers",
        "Pre-approved campaigns",
        "Application status tracking",
        "DSA payout ledger",
      ]}
    >
      <div className="mt-6 flex flex-wrap gap-2">
        {PRIMARY_PARTNER_BANKS.map((b) => (
          <span key={b.id} className="rounded-full border border-border/80 bg-card px-3 py-1 text-xs font-medium">
            {b.name}
          </span>
        ))}
      </div>
      <Button className="mt-4 rounded-xl" asChild>
        <Link to="/dashboard/new-car/bookings">View bookings</Link>
      </Button>
    </NcdModulePlaceholder>
  );
}
