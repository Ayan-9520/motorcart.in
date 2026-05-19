import { useState } from "react";
import { Car } from "lucide-react";
import { cn } from "@/lib/utils";

/** Reliable fallback when CDN / external image fails */
export const VEHICLE_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80";

export function vehicleImageSrc(images?: string[]): string {
  const src = images?.[0]?.trim();
  return src && src.length > 4 ? src : VEHICLE_IMAGE_FALLBACK;
}

interface VehicleImageProps {
  src?: string;
  alt: string;
  className?: string;
}

export function VehicleImage({ src, alt, className }: VehicleImageProps) {
  const initial = src?.trim() && src.length > 4 ? src : VEHICLE_IMAGE_FALLBACK;
  const [current, setCurrent] = useState(initial);
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {!failed ? (
        <img
          src={current}
          alt={alt}
          className={cn("h-full w-full", className)}
          loading="lazy"
          decoding="async"
          onError={() => {
            if (current !== VEHICLE_IMAGE_FALLBACK) {
              setCurrent(VEHICLE_IMAGE_FALLBACK);
            } else {
              setFailed(true);
            }
          }}
        />
      ) : (
        <div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-muted via-muted/80 to-primary/5 text-muted-foreground",
            className
          )}
        >
          <Car className="h-10 w-10 opacity-35" strokeWidth={1.25} />
          <span className="text-[10px] font-medium">No image</span>
        </div>
      )}
    </div>
  );
}
