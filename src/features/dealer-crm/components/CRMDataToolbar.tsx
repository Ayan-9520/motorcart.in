import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CRMDataToolbarProps = {
  search: string;
  onSearchChange: (v: string) => void;
  searchPlaceholder?: string;
  page: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  filters?: { value: string; label: string }[];
  activeFilter?: string;
  onFilterChange?: (value: string) => void;
  className?: string;
};

export function CRMDataToolbar({
  search,
  onSearchChange,
  searchPlaceholder = "Search…",
  page,
  totalPages,
  totalCount,
  onPageChange,
  filters,
  activeFilter,
  onFilterChange,
  className,
}: CRMDataToolbarProps) {
  return (
    <div className={cn("dealer-crm-toolbar", className)}>
      <div className="dealer-crm-toolbar-search">
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="border-0 bg-transparent shadow-none focus-visible:ring-0 h-9"
        />
      </div>
      {filters && filters.length > 0 && (
        <div className="dealer-crm-toolbar-filters">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              className={cn(
                "dealer-crm-filter-chip",
                activeFilter === f.value && "dealer-crm-filter-chip-active"
              )}
              onClick={() => onFilterChange?.(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
      <div className="dealer-crm-toolbar-pagination">
        <span className="text-xs text-muted-foreground tabular-nums">
          {totalCount} result{totalCount !== 1 ? "s" : ""}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-xs font-medium tabular-nums min-w-[4rem] text-center">
          {page} / {totalPages}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
