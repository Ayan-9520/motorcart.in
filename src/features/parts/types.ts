export type PartCategorySlug =
  | "engine-parts"
  | "battery"
  | "tyres"
  | "brake-parts"
  | "accessories"
  | "lubricants"
  | "electronics"
  | "body-parts"
  | "interior-parts";

export interface PartCategory {
  slug: PartCategorySlug;
  label: string;
  description: string;
}

export const PART_CATEGORIES: PartCategory[] = [
  { slug: "engine-parts", label: "Engine Parts", description: "Filters, belts, gaskets & more" },
  { slug: "battery", label: "Battery", description: "OEM & aftermarket batteries" },
  { slug: "tyres", label: "Tyres", description: "All-season & performance tyres" },
  { slug: "brake-parts", label: "Brake Parts", description: "Pads, discs, fluid" },
  { slug: "accessories", label: "Accessories", description: "Mats, covers, lighting" },
  { slug: "lubricants", label: "Lubricants", description: "Engine oil, ATF, coolants" },
  { slug: "electronics", label: "Electronics", description: "Infotainment, sensors" },
  { slug: "body-parts", label: "Body Parts", description: "Bumpers, panels, mirrors" },
  { slug: "interior-parts", label: "Interior Parts", description: "Seats, trims, consoles" },
];

export type PartOrderStatus =
  | "pending"
  | "confirmed"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PartPaymentMethod = "cod" | "online" | "whatsapp";

export interface PartProduct {
  id: string;
  sellerId: string;
  name: string;
  slug: string;
  categorySlug: PartCategorySlug;
  brand: string | null;
  price: number;
  originalPrice: number | null;
  wholesalePrice: number | null;
  gstRate: number;
  stock: number;
  bulkMinQty: number;
  rating: number;
  reviewCount: number;
  images: string[];
  compatibility: string[];
  isFeatured: boolean;
  isActive: boolean;
  description: string | null;
  sku: string | null;
  createdAt: string;
}

export interface PartReview {
  id: string;
  userId: string;
  rating: number;
  title: string | null;
  content: string | null;
  createdAt: string;
}

export interface PartOrderItem {
  id: string;
  partId: string;
  partName?: string;
  sellerId: string;
  qty: number;
  unitPrice: number;
  gstRate: number;
  lineSubtotal: number;
  lineGst: number;
  lineTotal: number;
}

export interface PartOrder {
  id: string;
  userId: string;
  status: PartOrderStatus;
  paymentMethod: PartPaymentMethod;
  codConfirmed: boolean;
  subtotal: number;
  gstTotal: number;
  grandTotal: number;
  shippingAddress: Record<string, unknown>;
  trackingNumber: string | null;
  carrier: string | null;
  invoiceNumber: string | null;
  invoiceSnapshot: Record<string, unknown> | null;
  items: PartOrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CartLine {
  partId: string;
  slug: string;
  name: string;
  categorySlug: PartCategorySlug;
  image: string;
  price: number;
  wholesalePrice: number | null;
  gstRate: number;
  bulkMinQty: number;
  sellerId: string;
  qty: number;
}
