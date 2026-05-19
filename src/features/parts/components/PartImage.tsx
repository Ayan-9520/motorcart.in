import { useState } from "react";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { optimizeImageUrl } from "@/lib/media-urls";

export const PART_IMAGE_FALLBACK = optimizeImageUrl(
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3",
  { w: 800, h: 600 }
);

export function partImageSrc(images?: string[]): string {
  const src = images?.[0]?.trim();
  return src && src.length > 4 ? src : PART_IMAGE_FALLBACK;
}

interface PartImageProps {
  src?: string;
  alt: string;
  className?: string;
}

export function PartImage({ src, alt, className }: PartImageProps) {
  const initial = partImageSrc(src ? [src] : undefined);
  const [current, setCurrent] = useState(initial);
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden bg-muted">
      {!failed ? (
        <img
          src={current}
          alt={alt}
          className={cn("h-full w-full object-cover", className)}
          loading="lazy"
          decoding="async"
          onError={() => {
            if (current !== PART_IMAGE_FALLBACK) setCurrent(PART_IMAGE_FALLBACK);
            else setFailed(true);
          }}
        />
      ) : (
        <div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-muted to-primary/5 text-muted-foreground",
            className
          )}
        >
          <Package className="h-8 w-8 opacity-40" strokeWidth={1.25} />
        </div>
      )}
    </div>
  );
}
