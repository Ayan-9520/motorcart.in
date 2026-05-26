import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DealerConsoleShell } from "../components/DealerConsoleShell";
import { BulkUploadZone } from "../components/BulkUploadZone";
import { useDealer } from "../hooks/useDealer";
import { useAuth } from "@/hooks/useAuth";
import { setPageMeta } from "@/utils/seo";

export function DealerBulkUploadPage() {
  const { dealer, loading } = useDealer();
  const { user } = useAuth();

  useEffect(() => {
    setPageMeta({ title: "Bulk inventory upload" });
  }, []);

  if (loading) return <p className="text-muted-foreground">Loading…</p>;
  if (!dealer) return <p className="text-muted-foreground">Dealer profile not found.</p>;

  return (
    <DealerConsoleShell
      title="Bulk upload"
      description="Excel / CSV import with validation, row-level errors, and inventory job tracking."
      crumbs={[{ label: "Inventory", href: "/dashboard/dealer/inventory" }, { label: "Bulk upload" }]}
      actions={
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard/dealer/inventory">
            <ArrowLeft className="h-4 w-4 mr-1" /> Inventory
          </Link>
        </Button>
      }
    >
      <BulkUploadZone dealer={dealer} sellerId={user?.id} onComplete={() => {}} />
    </DealerConsoleShell>
  );
}
