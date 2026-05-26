import { useEffect } from "react";
import { NewCarDealerShell } from "../components/NewCarDealerShell";
import { NcdLeadPipeline } from "../components/NcdLeadPipeline";
import { useNewCarDealerOS } from "../hooks/useNewCarDealerOS";
import { setPageMeta } from "@/utils/seo";

export function NewCarLeadsPage() {
  const { data } = useNewCarDealerOS();

  useEffect(() => {
    setPageMeta({ title: "Lead CRM" });
  }, []);

  return (
    <NewCarDealerShell
      title="Automotive CRM"
      description="Website, WhatsApp, walk-in, Meta, Google, CarDekho & referrals — full pipeline."
    >
      <NcdLeadPipeline leads={data?.leads ?? []} />
    </NewCarDealerShell>
  );
}
