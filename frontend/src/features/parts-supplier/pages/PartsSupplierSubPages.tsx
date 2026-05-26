import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PsModulePlaceholder } from "../components/PsModulePlaceholder";
import { PartsSupplierShell } from "../components/PartsSupplierShell";
import { usePartsSupplierOS } from "../hooks/usePartsSupplierOS";
import { PsAlertsPanel } from "../components/PsAlertsPanel";
import { PartsSupplierAnalyticsHubPage } from "./PartsSupplierAnalyticsPages";
import { setPageMeta } from "@/utils/seo";

export {
  PartsSupplierWarehousesPage,
  PartsSupplierRacksPage,
  PartsSupplierLowStockPage,
  PartsSupplierDeadStockPage,
  PartsSupplierDispatchPage,
  PartsSupplierOrdersFilteredPage,
  PartsSupplierOrdersPackedPage,
  PartsSupplierOrdersDispatchedPage,
  PartsSupplierOrdersDeliveredPage,
  PartsSupplierOrdersCancelledPage,
  PartsSupplierCrmDealersPage,
  PartsSupplierCrmGaragesPage,
  PartsSupplierCrmWorkshopsPage,
  PartsSupplierCrmRepeatPage,
  PartsSupplierCrmNegotiationsPage,
  PartsSupplierCrmPipelinePage,
  PartsSupplierRfqPage,
  PartsSupplierInvoicesPage,
  PartsSupplierPoPage,
  PartsSupplierWhatsAppPage,
  PartsSupplierStorefrontPage,
  PartsSupplierKycPage,
  PartsSupplierAutomationPage,
  PartsSupplierCategoriesPage,
  PartsSupplierBrandsPage,
} from "./PartsSupplierEnterprisePages";

export function PartsSupplierAiPage() {
  const { data } = usePartsSupplierOS();
  useEffect(() => setPageMeta({ title: "AI insights" }), []);
  return (
    <PartsSupplierShell title="AI parts assistant" description="Demand signals, restock & margin tips">
      <ul className="space-y-3">
        {(data?.insights ?? []).map((i) => (
          <li key={i.id} className="psp-ai-card">
            <p className="font-semibold">{i.title}</p>
            <p className="text-sm text-slate-400">{i.summary}</p>
          </li>
        ))}
      </ul>
    </PartsSupplierShell>
  );
}

export function PartsSupplierBulkUploadPage() {
  useEffect(() => setPageMeta({ title: "Bulk upload" }), []);
  return (
    <PsModulePlaceholder
      title="Bulk upload"
      description="Excel / CSV catalogue import — IndiaMART-style SKU onboarding"
      features={["Template download", "HSN & GST columns", "Compatibility columns", "Image URLs batch", "Validation report"]}
    >
      <Button className="mt-4 rounded-xl bg-green-600 hover:bg-green-500" asChild>
        <Link to="/dashboard/parts/upload">Single SKU add</Link>
      </Button>
    </PsModulePlaceholder>
  );
}

function placeholder(title: string, desc: string, features: string[]) {
  return function Page() {
    useEffect(() => setPageMeta({ title }), []);
    return <PsModulePlaceholder title={title} description={desc} features={features} />;
  };
}

export const PartsSupplierIncomingPage = placeholder("Incoming stock", "PO inbound pipeline", [
  "ASN tracking",
  "GRN workflow",
  "Vendor ETA",
]);
export const PartsSupplierPricingRetailPage = placeholder("Retail pricing", "B2C marketplace prices", [
  "MRP rules",
  "Flash sales",
]);
export const PartsSupplierPricingWholesalePage = placeholder("Wholesale pricing", "MOQ-based tiers", [
  "Volume slabs",
  "Garage tiers",
]);
export const PartsSupplierPricingDealerPage = placeholder("Dealer pricing", "Dealer-specific lists", [
  "Dealer contracts",
  "Credit terms",
]);
export const PartsSupplierOffersPage = placeholder("Offers & coupons", "Festive & cart offers", [
  "Coupon codes",
  "Bundle deals",
]);
export const PartsSupplierCouriersPage = placeholder("Courier partners", "BlueDart, Delhivery, DTDC…", [
  "Rate cards",
  "AWB generation",
]);
export const PartsSupplierTrackingPage = placeholder("Shipment tracking", "Live AWB status", [
  "Webhook tracking",
  "Customer SMS",
]);
export const PartsSupplierVendorsPage = placeholder("Vendor management", "Motherson, local OEM…", [
  "Vendor KYC",
  "Payment terms",
]);
export const PartsSupplierRevenuePage = placeholder("Revenue", "MTD & settlement view", [
  "GMV chart",
  "Margin bridge",
]);
export const PartsSupplierSettlementsPage = placeholder("Settlements & payouts", "Marketplace settlements", [
  "Payout calendar",
  "Commission",
]);
export const PartsSupplierMarketingPage = placeholder("Marketing center", "WhatsApp · SMS · email", [
  "Campaigns",
  "Abandoned cart",
]);
export const PartsSupplierBarcodePage = placeholder("Barcode & QR", "SKU & warehouse labels", [
  "Print labels",
  "Scan to pick",
  "Scan to dispatch",
]);

export const PartsSupplierVariantsPage = placeholder("Variants", "Size, spec & pack variants", ["Variant matrix", "Linked SKUs"]);
export const PartsSupplierOemMappingPage = placeholder("OEM mapping", "Cross-reference OEM numbers", ["OEM lookup", "Supersession"]);
export const PartsSupplierTransfersPage = placeholder("Inventory transfers", "Inter-warehouse moves", ["Transfer orders", "In-transit"]);
export const PartsSupplierPricingBulkPage = placeholder("Bulk pricing", "Volume slabs", ["MOQ tiers"]);
export const PartsSupplierPricingDynamicPage = placeholder("Dynamic pricing", "Rules engine", ["Demand-based", "Competitor"]);
export const PartsSupplierLogisticsSlaPage = placeholder("Delivery SLA", "On-time metrics", ["SLA breaches"]);
export const PartsSupplierLogisticsLabelsPage = placeholder("Shipping labels", "Print AWB labels", ["Thermal print"]);
export const PartsSupplierProcurementBillsPage = placeholder("Supplier bills", "Vendor invoices", ["TDS", "Match PO"]);
export const PartsSupplierProcurementIncomingPage = placeholder("Procurement incoming", "GRN from vendors", ["QC receive"]);
export const PartsSupplierFinancePayoutsPage = placeholder("Payouts", "Marketplace payouts", ["Settlement cycle"]);
export const PartsSupplierFinanceCreditNotesPage = placeholder("Credit notes", "Returns & adjustments", ["GSTR credit"]);
export const PartsSupplierFinanceProfitPage = placeholder("Profit reports", "Margin analytics", ["SKU margin", "TDS"]);
export const PartsSupplierMarketingWhatsappPage = placeholder("WhatsApp campaigns", "Broadcast & drips", ["Templates"]);
export const PartsSupplierMarketingSmsPage = placeholder("SMS campaigns", "Offers & alerts", ["DLT templates"]);
export const PartsSupplierMarketingEmailPage = placeholder("Email campaigns", "B2B newsletters", ["Catalogue embed"]);
export const PartsSupplierMarketingCataloguePage = placeholder("Catalogue sharing", "PDF & link share", ["WhatsApp catalogue"]);

export function PartsSupplierAlertsPage() {
  const { data } = usePartsSupplierOS();
  useEffect(() => setPageMeta({ title: "Smart alerts" }), []);
  return (
    <PartsSupplierShell title="Smart alerts" description="Low stock · dispatch · dead inventory">
      <PsAlertsPanel alerts={data?.alerts ?? []} />
    </PartsSupplierShell>
  );
}

export function PartsSupplierStaffPage() {
  useEffect(() => setPageMeta({ title: "Staff & roles" }), []);
  const staff = [
    { name: "Owner", role: "owner", active: true },
    { name: "Rajesh K.", role: "warehouse manager", active: true },
    { name: "Priya S.", role: "sales executive", active: true },
    { name: "Amit D.", role: "dispatch operator", active: true },
    { name: "Neha R.", role: "accountant", active: false },
  ];
  return (
    <PartsSupplierShell title="Staff & roles" description="Multi-user access — owner to support">
      <ul className="space-y-2">
        {staff.map((s) => (
          <li key={s.name} className="psp-staff-row">
            <span>
              <span className="font-medium">{s.name}</span>
              <span className="ml-2 text-xs text-slate-500">{s.role}</span>
            </span>
            <span className={s.active ? "text-green-400 text-xs" : "text-slate-500 text-xs"}>
              {s.active ? "Active" : "Invited"}
            </span>
          </li>
        ))}
      </ul>
    </PartsSupplierShell>
  );
}

export function PartsSupplierNotificationsPage() {
  useEffect(() => setPageMeta({ title: "Notifications" }), []);
  return (
    <PsModulePlaceholder
      title="Notifications"
      description="In-app · email · push for supplier desk"
      features={["Order alerts", "Stock alerts", "Payment alerts", "KYC updates"]}
    />
  );
}

/** @deprecated use analytics/revenue */
export const PartsSupplierAnalyticsPage = PartsSupplierAnalyticsHubPage;
