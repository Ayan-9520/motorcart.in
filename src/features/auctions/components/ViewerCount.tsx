import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewerCountProps {
  count: number;
  className?: string;
}

export function ViewerCount({ count, className }: ViewerCountProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-sm font-medium shadow-sm",
        className
      )}
    >
      <Eye className="h-4 w-4 text-primary" />
      <span className="tabular-nums">{count}</span>
      <span className="text-muted-foreground">watching</span>
    </span>
  );
}
