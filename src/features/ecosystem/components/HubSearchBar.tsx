import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import type { EcosystemHubSlug } from "../types";
import { hubSearchPath } from "../lib/hub-paths";

type HubSearchBarProps = {
  hub: EcosystemHubSlug;
  placeholder: string;
  brands?: string[];
  budgets?: string[];
};

export function HubSearchBar({ hub, placeholder, brands = [], budgets = [] }: HubSearchBarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const submit = (q?: string) => {
    const term = (q ?? query).trim();
    navigate(hubSearchPath(hub, term || undefined));
  };

  return (
    <div className="hub-search">
      <form
        className="hub-search-form"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Search className="hub-search-icon h-5 w-5" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="hub-search-input"
          aria-label={`Search ${hub}`}
        />
        <button type="submit" className="hub-search-btn">
          Search
        </button>
      </form>
      {(brands.length > 0 || budgets.length > 0) && (
        <div className="hub-search-chips">
          {brands.slice(0, 5).map((brand) => (
            <button
              key={brand}
              type="button"
              className="hub-search-chip"
              onClick={() => submit(brand)}
            >
              {brand}
            </button>
          ))}
          {budgets.slice(0, 3).map((budget) => (
            <button
              key={budget}
              type="button"
              className="hub-search-chip hub-search-chip-muted"
              onClick={() => submit(budget)}
            >
              {budget}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
