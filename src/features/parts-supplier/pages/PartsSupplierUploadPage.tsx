import { useEffect } from "react";
import { PartsSupplierShell } from "../components/PartsSupplierShell";
import { PartsSupplierUploadPage as LegacyUpload } from "@/features/parts/pages/PartsSupplierUploadPage";
import { setPageMeta } from "@/utils/seo";

export function PartsSupplierUploadPage() {
  useEffect(() => setPageMeta({ title: "Add product" }), []);
  return (
    <PartsSupplierShell title="Add product" description="SKU · OEM · compatibility · GST · MOQ">
      <LegacyUpload />
    </PartsSupplierShell>
  );
}
