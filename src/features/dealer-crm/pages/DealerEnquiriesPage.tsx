import { useEffect } from "react";
import { useDealerCRM } from "../hooks/useDealerCRM";
import { LeadTable } from "../components/LeadTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setPageMeta } from "@/utils/seo";

/** Dedicated enquiry inbox — filters website + form enquiries */
export function DealerEnquiriesPage() {
  const { leads } = useDealerCRM();
  const enquiries = leads.filter((l) => l.type === "enquiry");

  useEffect(() => {
    setPageMeta({ title: "Enquiry Management" });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Enquiry Management</h1>
        <p className="text-muted-foreground">Website and marketplace vehicle enquiries</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{enquiries.length} open enquiries</CardTitle>
        </CardHeader>
        <CardContent>
          <LeadTable leads={enquiries} />
        </CardContent>
      </Card>
    </div>
  );
}
