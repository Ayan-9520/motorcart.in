import {
  computeSupplierAnalytics,
  fetchSellerPartOrders,
  fetchSellerParts,
  fetchSupplierProfile,
} from "@/features/parts/services/parts.service";
import type { PartProduct } from "@/features/parts/types";
import { buildMockPartsSupplierSnapshot, getMockOrderDetail } from "../data/mock-ps-data";
import type { PartsSupplierSnapshot, PsCatalogProduct, PsSupplierOrder, PsSupplierOrderDetail } from "../types";

function mapPartToCatalog(p: PartProduct): PsCatalogProduct {
  const stock = p.stock;
  let stockHealth: PsCatalogProduct["stockHealth"] = "normal";
  if (stock <= 0) stockHealth = "dead";
  else if (stock < 10) stockHealth = "low";
  else if (stock > 50) stockHealth = "fast";

  const marginPct =
    p.wholesalePrice && p.wholesalePrice > 0
      ? Math.round(((p.price - p.wholesalePrice) / p.price) * 100)
      : 18;

  return {
    id: p.id,
    sku: p.sku ?? p.supplierSku ?? `SKU-${p.id.slice(0, 6)}`,
    oemCode: p.supplierSku ?? "—",
    name: p.name,
    brand: p.brand ?? "Generic",
    category: p.categorySlug.replace(/-/g, " "),
    stock,
    reserved: 0,
    retailPrice: p.price,
    wholesalePrice: p.wholesalePrice ?? Math.round(p.price * 0.82),
    marginPct,
    compatibility: p.compatibility,
    stockHealth,
  };
}

export async function fetchPartsSupplierSnapshot(
  sellerId: string,
  displayName?: string
): Promise<PartsSupplierSnapshot> {
  const mock = buildMockPartsSupplierSnapshot(
    displayName ? `${displayName} Auto Parts` : undefined
  );

  try {
    const [parts, orders, profile] = await Promise.all([
      fetchSellerParts(sellerId),
      fetchSellerPartOrders(),
      fetchSupplierProfile(sellerId),
    ]);

    if (parts.length === 0 && orders.length === 0 && !profile) {
      return mock;
    }

    const analytics = computeSupplierAnalytics(parts, orders);

    if (profile) {
      mock.profile = {
        ...mock.profile,
        id: profile.id,
        businessName: profile.businessName,
        gstin: profile.gstin,
        isGstVerified: !!profile.gstin,
        tier: profile.tier,
        isVerified: profile.isVerified,
      };
    }

    if (parts.length > 0) {
      mock.catalog = parts.map(mapPartToCatalog);
      mock.metrics = mock.metrics.map((m) => {
        if (m.key === "skus") return { ...m, value: analytics.activeSkus };
        if (m.key === "low_stock") return { ...m, value: analytics.lowStock };
        return m;
      });
    }

    if (orders.length > 0) {
      const mapped: PsSupplierOrder[] = orders.slice(0, 20).map((o) => ({
        id: o.id,
        orderNo: o.invoiceNumber ?? `MC-${o.id.slice(0, 8)}`,
        customerName: (o.shippingAddress?.name as string) ?? "Customer",
        customerType: "retail",
        status: o.status,
        grandTotal: o.grandTotal,
        itemCount: o.items.length,
        city: (o.shippingAddress?.city as string) ?? "—",
        paymentMode: o.paymentMethod,
        createdAt: o.createdAt,
      }));
      mock.orders = mapped;
      mock.pendingDispatch = orders.filter((x) =>
        ["pending", "confirmed", "packed"].includes(x.status)
      ).length;
    }

    return mock;
  } catch {
    return mock;
  }
}

export async function fetchPartsSupplierOrderDetail(
  orderId: string
): Promise<PsSupplierOrderDetail | null> {
  return getMockOrderDetail(orderId);
}
