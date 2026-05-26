import { Link } from "react-router-dom";
import { MapPin, Phone, Star, ShieldCheck, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { VehicleListing } from "@/types/vehicle";

export function DealerDetails({ vehicle }: { vehicle: VehicleListing }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Dealer Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold">{vehicle.dealerName}</h3>
            {vehicle.dealerVerified && (
              <Badge className="mt-1 gap-1 bg-primary text-primary-foreground border-0 text-white">
                <ShieldCheck className="h-3 w-3" /> Verified Dealer
              </Badge>
            )}
          </div>
          {vehicle.dealerRating != null && (
            <div className="flex items-center gap-1 rounded-lg bg-accent px-2 py-1 text-sm font-medium">
              <Star className="h-4 w-4 fill-primary text-primary" />
              {vehicle.dealerRating}
            </div>
          )}
        </div>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          {vehicle.location}
        </p>
        {vehicle.dealerPhone && (
          <p className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-primary" />
            {vehicle.dealerPhone}
          </p>
        )}
        {vehicle.dealerSlug && (
          <Button variant="outline" size="sm" className="w-full gap-1" asChild>
            <Link to={`/dealers/${vehicle.dealerSlug}`}>
              View dealer profile <ExternalLink className="h-3 w-3" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
