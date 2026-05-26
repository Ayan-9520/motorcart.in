import { AIControlCenterPage } from "@/ai/pages/AIControlCenterPage";

/** AI controls embedded in super admin shell — reuses global control center. */
export function SuperAdminAIPage() {
  return (
    <div className="sa-ai-embed">
      <AIControlCenterPage />
    </div>
  );
}
