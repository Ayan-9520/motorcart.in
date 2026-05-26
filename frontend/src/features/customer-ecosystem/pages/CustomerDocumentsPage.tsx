import { useEffect } from "react";
import { CustomerDocumentLocker } from "../components/CustomerDocumentLocker";
import { CustomerEcosystemPage } from "../components/CustomerEcosystemPage";
import { useCustomerEcosystem } from "../hooks/useCustomerEcosystem";
import { setPageMeta } from "@/utils/seo";

export function CustomerDocumentsPage() {
  const { data } = useCustomerEcosystem();

  useEffect(() => {
    setPageMeta({ title: "RC & Documents", description: "DigiLocker-style vehicle document wallet." });
  }, []);

  return (
    <CustomerEcosystemPage
      title="RC & Documents"
      description="Upload, verify & track expiry — RC, insurance, PUC, loan & warranty."
      wide
    >
      <CustomerDocumentLocker documents={data?.documents ?? []} />
    </CustomerEcosystemPage>
  );
}
