import { Share2, Link2, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { vehicleDetailPath } from "@/lib/vehicle-utils";
import type { VehicleListing } from "@/types/vehicle";
import toast from "react-hot-toast";

export function ShareVehicle({ vehicle }: { vehicle: VehicleListing }) {
  const url = `${window.location.origin}${vehicleDetailPath(vehicle)}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Link copied!");
  };

  const shareNative = async () => {
    if (navigator.share) {
      await navigator.share({ title: vehicle.title, text: `Check out ${vehicle.title} on Motorcart`, url });
    } else copyLink();
  };

  return (
    <div className="flex gap-2">
      <Button type="button" variant="outline" size="sm" className="gap-1" onClick={shareNative}>
        <Share2 className="h-4 w-4" /> Share
      </Button>
      <Button type="button" variant="outline" size="icon" className="h-9 w-9" onClick={copyLink} aria-label="Copy link">
        <Link2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")}
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </Button>
    </div>
  );
}
