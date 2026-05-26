import { useEffect } from "react";
import { NcdModulePlaceholder } from "../components/NcdModulePlaceholder";
import { setPageMeta } from "@/utils/seo";

export function NewCarSettingsPage() {
  useEffect(() => setPageMeta({ title: "Showroom settings" }), []);
  return (
    <NcdModulePlaceholder
      title="Showroom settings"
      description="Branding, business hours, notifications & integration keys."
      features={["Dealership profile", "Logo & cover", "Business hours", "Notification prefs", "API integrations"]}
    />
  );
}
