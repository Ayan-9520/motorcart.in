import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, IndianRupee, AlertTriangle, Factory, Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  fetchSellerParts,
  fetchSellerPartOrders,
  computeSupplierAnalytics,
  fetchSupplierProfile,
} from "../services/parts.service";
import { PartsSupplierShell } from "../components/PartsSupplierShell";
import type { PartProduct, PartOrder, PartsSupplierProfile } from "../types";
import { formatCurrency } from "@/lib/utils";

export function PartsSupplierOverviewPage() {
  const { user } = useAuth();
  const [parts, setParts] = useState<PartProduct[]>([]);
  const [orders, setOrders] = useState<PartOrder[]>([]);
  const [profile, setProfile] = useState<PartsSupplierProfile | null>(null);

  useEffect(() => {
    if (!user) return;
    void Promise.all([
      fetchSellerParts(user.id),
      fetchSellerPartOrders(),
      fetchSupplierProfile(user.id),
    ]).then(([p, o, prof]) => {
      setParts(p);
      setOrders(o);
      setProfile(prof);
    });
  }, [user]);

  const analytics = computeSupplierAnalytics(parts, orders);

  return (
    <PartsSupplierShell
      title="Supplier dashboard"
      subtitle="Inventory · OEM & aftermarket pricing · order fulfilment"
      actions={
        <>
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard/parts/orders">Orders</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/dashboard/parts/upload">Add SKU</Link>
          </Button>
        </>
      }
    >
      {profile && (
        <p className="parts-supplier-dash__profile">
          {profile.businessName} · {profile.tier.replace(/_/g, " ")}
          {profile.isVerified && " · Verified supplier"}
        </p>
      )}

      <div className="parts-supplier-stats">
        <article className="parts-supplier-stat">
          <Package className="h-6 w-6 text-primary" />
          <p className="parts-supplier-stat__label">Active SKUs</p>
          <p className="parts-supplier-stat__value">{analytics.activeSkus}</p>
        </article>
        <article className="parts-supplier-stat">
          <Factory className="h-6 w-6 text-blue-600" />
          <p className="parts-supplier-stat__label">OEM lines</p>
          <p className="parts-supplier-stat__value">{analytics.oemCount}</p>
        </article>
        <article className="parts-supplier-stat">
          <Boxes className="h-6 w-6 text-amber-600" />
          <p className="parts-supplier-stat__label">Aftermarket</p>
          <p className="parts-supplier-stat__value">{analytics.aftermarketCount}</p>
        </article>
        <article className="parts-supplier-stat">
          <AlertTriangle className="h-6 w-6 text-amber-600" />
          <p className="parts-supplier-stat__label">Low stock</p>
          <p className="parts-supplier-stat__value">{analytics.lowStock}</p>
        </article>
        <article className="parts-supplier-stat">
          <IndianRupee className="h-6 w-6 text-primary" />
          <p className="parts-supplier-stat__label">Inventory value</p>
          <p className="parts-supplier-stat__value">{formatCurrency(analytics.inventoryValue)}</p>
        </article>
        <article className="parts-supplier-stat">
          <Package className="h-6 w-6 text-primary" />
          <p className="parts-supplier-stat__label">Pending orders</p>
          <p className="parts-supplier-stat__value">{analytics.pendingOrders}</p>
        </article>
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        <Button variant="default" asChild>
          <Link to="/dashboard/parts/inventory">Manage inventory</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/parts">Public marketplace</Link>
        </Button>
      </div>
    </PartsSupplierShell>
  );
}
