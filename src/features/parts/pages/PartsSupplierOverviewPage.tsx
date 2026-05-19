import { Link } from "react-router-dom";
import { Package, IndianRupee, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { fetchSellerParts } from "../services/parts.service";
import type { PartProduct } from "../types";

export function PartsSupplierOverviewPage() {
  const { user } = useAuth();
  const [parts, setParts] = useState<PartProduct[]>([]);

  useEffect(() => {
    if (!user) return;
    fetchSellerParts(user.id).then(setParts);
  }, [user]);

  const lowStock = parts.filter((p) => p.stock < 10).length;
  const revenue = parts.reduce((s, p) => s + p.price * Math.min(p.stock, 5), 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Supplier dashboard</h1>
        <p className="text-muted-foreground">Manage catalogue, stock levels & fulfilment</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <Package className="h-8 w-8 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Active SKUs</p>
              <p className="text-2xl font-bold">{parts.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <AlertTriangle className="h-8 w-8 text-amber-600" />
            <div>
              <p className="text-xs text-muted-foreground">Low stock</p>
              <p className="text-2xl font-bold">{lowStock}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <IndianRupee className="h-8 w-8 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Est. inventory value</p>
              <p className="text-2xl font-bold">₹{(revenue / 100000).toFixed(1)}L</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button variant="default" asChild><Link to="/dashboard/parts/upload">Upload product</Link></Button>
        <Button variant="outline" asChild><Link to="/dashboard/parts/inventory">Stock management</Link></Button>
      </div>
    </div>
  );
}
