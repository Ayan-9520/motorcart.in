import { cn } from "@/lib/utils";
import { AUCTION_TYPE_LABELS, type AuctionType } from "../types";

const TABS: { id: string; label: string; type?: AuctionType }[] = [
  { id: "all", label: "All" },
  { id: "dealer", label: "Dealer", type: "dealer" },
  { id: "bank_repo", label: "Bank Repo", type: "bank_repo" },
  { id: "government", label: "Government", type: "government" },
];

interface CategoryTabsProps {
  activeType: string | null;
  onTypeChange: (type: string | null) => void;
}

export function CategoryTabs({ activeType, onTypeChange }: CategoryTabsProps) {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-1">
      {TABS.map((tab) => {
        const active = (tab.type ?? null) === activeType || (tab.id === "all" && !activeType);
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTypeChange(tab.type ?? null)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all",
              active ? "bg-primary text-primary-foreground text-white shadow-wa" : "bg-card border hover:border-primary/40"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
