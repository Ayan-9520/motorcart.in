import { Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { runInventoryOptimizer } from "../lib/inventory-optimizer";
import type { VehicleListing } from "@/types/vehicle";

export function InventoryOptimizer({ vehicles }: { vehicles: VehicleListing[] }) {
  const suggestions = runInventoryOptimizer(vehicles);

  if (!suggestions.length) {
    return (
      <Card className="border-primary/20 bg-accent/20">
        <CardContent className="flex items-center gap-3 p-6">
          <Sparkles className="h-8 w-8 text-primary" />
          <p className="text-sm">Your inventory looks optimized. AI will suggest improvements as you add listings.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Inventory Optimizer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-80 overflow-y-auto">
        {suggestions.slice(0, 8).map((s) => (
          <div key={`${s.vehicleId}-${s.issue}`} className="flex gap-3 rounded-lg border p-3">
            <Badge
              variant={s.priority === "high" ? "destructive" : "outline"}
              className="shrink-0 h-fit capitalize"
            >
              {s.priority}
            </Badge>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm line-clamp-1">{s.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.issue}</p>
              <p className="text-xs mt-1"><strong>Action:</strong> {s.action}</p>
              <p className="text-xs text-primary mt-0.5">{s.impact}</p>
            </div>
            <Button size="icon" variant="ghost" className="shrink-0 h-8 w-8">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
