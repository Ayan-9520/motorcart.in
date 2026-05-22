import { cn } from "@/lib/utils";

export function VehicleImageSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 animate-pulse bg-gradient-to-br from-muted via-muted/70 to-muted/40",
        className
      )}
      aria-hidden
    />
  );
}
