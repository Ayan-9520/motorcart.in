import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cleanImageUrls } from "@/lib/media/vehicle-media-registry";
import { VEHICLE_IMAGE_FALLBACK } from "./VehicleImage";

interface VehicleGalleryProps {
  images: string[];
  title: string;
}

export function VehicleGallery({ images, title }: VehicleGalleryProps) {
  const [active, setActive] = useState(0);
  const safe = cleanImageUrls(images);
  const list = safe.length ? safe : [VEHICLE_IMAGE_FALLBACK];

  const prev = () => setActive((i) => (i === 0 ? list.length - 1 : i - 1));
  const next = () => setActive((i) => (i === list.length - 1 ? 0 : i + 1));

  return (
    <>
      <div className="space-y-3">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
          <img
            src={list[active]}
            alt={`${title} - ${active + 1}`}
            className="h-full w-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {list.length > 1 && (
            <>
              <Button type="button" size="icon" variant="secondary" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-card" onClick={prev}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button type="button" size="icon" variant="secondary" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-card" onClick={next}>
                <ChevronRight className="h-5 w-5" />
              </Button>
              <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                {active + 1} / {list.length}
              </span>
            </>
          )}
          <Button type="button" size="icon" variant="secondary" className="absolute right-3 top-3 rounded-full border border-border bg-card" onClick={() => window.open(list[active], "_blank")}>
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {list.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                i === active ? "border-primary ring-2 ring-primary/30" : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <img src={img} alt="" className="h-full w-full object-cover object-center" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
