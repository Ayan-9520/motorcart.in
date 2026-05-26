import { useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewCarDealerShell } from "../components/NewCarDealerShell";
import { NcdInventoryGrid } from "../components/NcdInventoryGrid";
import { useNewCarDealerOS } from "../hooks/useNewCarDealerOS";
import { setPageMeta } from "@/utils/seo";

export function NewCarInventoryPage() {
  const { data, loading } = useNewCarDealerOS();

  useEffect(() => {
    setPageMeta({ title: "New car inventory" });
  }, []);

  return (
    <NewCarDealerShell
      title="Showroom inventory"
      description="Variants, pricing, stock health, offers & delivery timelines."
      actions={
        <Button className="rounded-xl">
          <Plus className="mr-1 h-4 w-4" /> Add new car
        </Button>
      }
    >
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="ncd-inventory-card h-72 animate-pulse bg-muted/30" />
          ))}
        </div>
      ) : (
        <NcdInventoryGrid items={data?.inventory ?? []} />
      )}
    </NewCarDealerShell>
  );
}
