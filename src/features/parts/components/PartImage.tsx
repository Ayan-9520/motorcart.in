import { useState } from "react";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { MEDIA_DEFAULTS } from "@/lib/media/india-media-catalog";
import { resolvePartHero } from "@/lib/media/resolve-images";

export const PART_IMAGE_FALLBACK = MEDIA_DEFAULTS.part;

export type PartImageMeta = {
  categorySlug: string;
  slug: string;
};

export function partImageSrc(
  images?: string[] | null,
  meta?: PartImageMeta,
  seed = 0
): string {
  if (meta) return resolvePartHero(meta.categorySlug, meta.slug, images, seed);
  const src = images?.[0]?.trim();
  return src && src.length > 12 ? src : PART_IMAGE_FALLBACK;
}

interface PartImageProps {
  src?: string;
  alt: string;
  className?: string;
  images?: string[] | null;
  meta?: PartImageMeta;
}

export function PartImage({ src, alt, className, images, meta }: PartImageProps) {
  const resolved = partImageSrc(images ?? (src ? [src] : undefined), meta);
  const [current, setCurrent] = useState(resolved);
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
            const fallback = meta
              ? resolvePartHero(meta.categorySlug, meta.slug, null)
              : PART_IMAGE_FALLBACK;
            if (current !== fallback) setCurrent(fallback);
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
