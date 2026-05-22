import { useEffect } from "react";
import { CustomerAiInsightList } from "../components/CustomerAiInsightList";
import { CustomerEcosystemPage } from "../components/CustomerEcosystemPage";
import { useCustomerEcosystem } from "../hooks/useCustomerEcosystem";
import { setPageMeta } from "@/utils/seo";

export function CustomerInsightsPage() {
  const { data } = useCustomerEcosystem();

  useEffect(() => {
    setPageMeta({ title: "AI Insights" });
  }, []);

  return (
    <CustomerEcosystemPage title="AI Insights" description="Intelligent reminders for insurance, service, resale & finance.">
      <CustomerAiInsightList insights={data?.insights ?? []} />
    </CustomerEcosystemPage>
  );
}
