import type { PartOrderStatus, PartProduct } from "@/features/parts/types";

export type PsOrderStatus =
  | PartOrderStatus
  | "return_requested"
  | "refunded";

export type PsMetricVariant = "default" | "premium" | "success" | "warning";

export type PsMetric = {
  key: string;
  label: string;
  value: number | string;
  sublabel?: string;
  trend?: number;
  trendLabel?: string;
  variant?: PsMetricVariant;
  href?: string;
  /** Mini sparkline 0–100 */
  sparkline?: number[];
};

export type PsSmartAlert = {
  id: string;
  title: string;
  body: string;
  severity: "critical" | "warning" | "info";
  href?: string;
  createdAt: string;
};

export type PsSupplierProfile = {
  id: string;
  businessName: string;
  gstin: string | null;
  isGstVerified: boolean;
  tier: string;
  city: string;
  warehouseCount: number;
  activeDealers: number;
  isVerified: boolean;
  logoUrl?: string;
};

export type PsAiInsight = {
  id: string;
  title: string;
  summary: string;
  severity: "info" | "warning" | "success";
  actionLabel?: string;
  actionUrl?: string;
};

export type PsOrderPipeline = {
  stage: PsOrderStatus;
  label: string;
  count: number;
};

export type PsCatalogProduct = {
  id: string;
  sku: string;
  oemCode: string;
  name: string;
  brand: string;
  category: string;
  stock: number;
  reserved: number;
  retailPrice: number;
  wholesalePrice: number;
  marginPct: number;
  compatibility: string[];
  stockHealth: "fast" | "normal" | "low" | "dead";
};

export type PsSupplierOrder = {
  id: string;
  orderNo: string;
  customerName: string;
  customerType: "retail" | "dealer" | "garage" | "wholesale";
  status: PsOrderStatus;
  grandTotal: number;
  itemCount: number;
  city: string;
  paymentMode: string;
  createdAt: string;
};

export type PsSupplierOrderDetail = PsSupplierOrder & {
  gstin?: string;
  phone: string;
  email?: string;
  trackingNumber?: string;
  carrier?: string;
  warehouse: string;
  timeline: { label: string; at: string; done: boolean }[];
  items: { name: string; sku: string; qty: number; lineTotal: number }[];
};

export type PsWarehouse = {
  id: string;
  name: string;
  city: string;
  utilizationPct: number;
  skuCount: number;
  lowStock: number;
};

export type PsB2bCustomer = {
  id: string;
  name: string;
  type: "dealer" | "garage" | "workshop";
  city: string;
  ordersMtd: number;
  outstanding: number;
};

export type PartsSupplierSnapshot = {
  profile: PsSupplierProfile;
  metrics: PsMetric[];
  insights: PsAiInsight[];
  alerts: PsSmartAlert[];
  pipeline: PsOrderPipeline[];
  pendingDispatch: number;
  revenueTarget: number;
  revenueAchieved: number;
  grossMarginPct: number;
  catalog: PsCatalogProduct[];
  orders: PsSupplierOrder[];
  warehouses: PsWarehouse[];
  b2bCustomers: PsB2bCustomer[];
  topCategory: string;
  fastMovingSku: string;
  b2bRevenuePct: number;
};
