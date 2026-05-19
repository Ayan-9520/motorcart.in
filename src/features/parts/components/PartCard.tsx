import { Link } from "react-router-dom";
import { Package, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { PartProduct } from "../types";
import { partDetailPath } from "../lib/part-utils";
import type { AppRole } from "@/types/database";
import { displayUnitPrice } from "../lib/part-utils";

interface PartCardProps {
  part: PartProduct;
  role?: AppRole;
}

export function PartCard({ part, role }: PartCardProps) {
  const price = displayUnitPrice(part, role);
  const path = partDetailPath(part);

  return (
    <Card className="group h-full overflow-hidden border-border/80 transition-shadow hover:shadow-card-hover">
      <Link to={path} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={part.images[0]}
            alt={part.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {part.isFeatured && (
            <Badge className="absolute left-3 top-3 border-0 bg-primary text-primary-foreground text-white">Featured</Badge>
          )}
          {part.stock < 10 && part.stock > 0 && (
            <Badge variant="destructive" className="absolute right-3 top-3">Low stock</Badge>
          )}
        </div>
        <CardContent className="space-y-3 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">{part.brand}</p>
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug">{part.name}</h3>
          <div className="flex items-center gap-1 text-xs text-amber-600">
            <Star className="h-3.5 w-3.5 fill-current" />
            {part.rating.toFixed(1)} ({part.reviewCount.toLocaleString("en-IN")})
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">{formatCurrency(price)}</span>
            {part.originalPrice != null && part.originalPrice > price && (
              <span className="text-sm text-muted-foreground line-through">{formatCurrency(part.originalPrice)}</span>
            )}
          </div>
          {role && displayUnitPrice(part, role) < part.price && (
            <p className="text-xs font-medium text-primary">Wholesale / dealer price</p>
          )}
          <p className="text-[10px] text-muted-foreground">GST included · Min bulk: {part.bulkMinQty}</p>
        </CardContent>
      </Link>
      <div className="px-4 pb-4">
        <Button variant="outline" size="sm" className="w-full gap-2" asChild>
          <Link to={path}>
            <Package className="h-4 w-4" />
            View & buy
          </Link>
        </Button>
      </div>
    </Card>
  );
}
