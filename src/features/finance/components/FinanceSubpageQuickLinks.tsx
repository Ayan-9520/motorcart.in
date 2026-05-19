import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { FinanceHubCategoryId } from "../data/finance-hub-categories";
import {
  financeApplyPath,
  financeComparePath,
  financeOffersPath,
} from "../lib/finance-hub-routes";

interface FinanceSubpageQuickLinksProps {
  active: "apply" | "compare" | "offers";
  loanType?: FinanceHubCategoryId;
}

const LINKS = [
  { key: "offers" as const, label: "Bank offers", path: (t?: FinanceHubCategoryId) => financeOffersPath(t) },
  { key: "compare" as const, label: "Compare lenders", path: financeComparePath },
  { key: "apply" as const, label: "Apply online", path: financeApplyPath },
];

export function FinanceSubpageQuickLinks({ active, loanType }: FinanceSubpageQuickLinksProps) {
  return (
    <nav className="finance-subpage-tabs mb-6 flex flex-wrap gap-2">
      {LINKS.map(({ key, label, path }) => {
        const href = path(loanType);
        const isActive = active === key;
        return (
          <Link
            key={key}
            to={href}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-semibold transition-all",
              isActive
                ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-primary)]"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            {label}
          </Link>
        );
      })}
      <Link
        to="/finance"
        className="rounded-full border border-dashed border-primary/30 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary/5"
      >
        ← Finance hub
      </Link>
    </nav>
  );
}
