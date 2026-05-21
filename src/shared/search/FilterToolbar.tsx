import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type FilterToolbarProps = {
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters?: ReactNode;
  className?: string;
};

/** Reusable marketplace-style search + filter row (mobile-first). */
export function FilterToolbar({
  searchPlaceholder = "Search…",
  searchValue,
  onSearchChange,
  filters,
  className,
}: FilterToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-border/80 bg-card/50 p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4",
        className
      )}
    >
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-10 rounded-lg border-border/80 pl-9"
          aria-label="Search"
        />
      </div>
      {filters ? <div className="flex flex-wrap gap-2 sm:justify-end">{filters}</div> : null}
    </div>
  );
}
