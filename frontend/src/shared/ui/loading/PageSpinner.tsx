import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type PageSpinnerProps = {
  label?: string;
  className?: string;
};

/** Full-view loading state — use inside layouts or suspense fallbacks. */
export function PageSpinner({ label = "Loading…", className }: PageSpinnerProps) {
  return (
    <div
      className={cn(
        "flex min-h-[40vh] flex-col items-center justify-center gap-3 text-muted-foreground",
        className
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
