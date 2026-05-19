import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadTable } from "../components/LeadTable";
import { useDealerCRM } from "../hooks/useDealerCRM";
import { supabase } from "@/integrations/supabase/client";
import type { LeadStatus } from "@/types/database";
import { setPageMeta } from "@/utils/seo";
import toast from "react-hot-toast";

export function DealerLeadsPage() {
  const { leads, refetch } = useDealerCRM();

  useEffect(() => {
    setPageMeta({ title: "Lead Management" });
  }, []);

  const updateStatus = async (id: string, status: LeadStatus) => {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Lead updated");
      refetch();
    }
  };

  const byType = (type: string) => leads.filter((l) => l.type === type);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Lead Management</h1>
        <p className="text-muted-foreground">Track, qualify, and convert leads from all channels</p>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({leads.length})</TabsTrigger>
          <TabsTrigger value="lead">Leads ({byType("lead").length})</TabsTrigger>
          <TabsTrigger value="enquiry">Enquiries ({byType("enquiry").length})</TabsTrigger>
          <TabsTrigger value="test_drive">Test drives ({byType("test_drive").length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader><CardTitle>All leads</CardTitle></CardHeader>
            <CardContent><LeadTable leads={leads} onStatusChange={updateStatus} /></CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="lead" className="mt-4">
          <Card><CardContent className="pt-6"><LeadTable leads={byType("lead")} onStatusChange={updateStatus} /></CardContent></Card>
        </TabsContent>
        <TabsContent value="enquiry" className="mt-4">
          <Card><CardContent className="pt-6"><LeadTable leads={byType("enquiry")} onStatusChange={updateStatus} /></CardContent></Card>
        </TabsContent>
        <TabsContent value="test_drive" className="mt-4">
          <Card><CardContent className="pt-6"><LeadTable leads={byType("test_drive")} onStatusChange={updateStatus} /></CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
