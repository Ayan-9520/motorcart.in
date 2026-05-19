import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AdvancedSearchBar({ onToggleFilters }: { onToggleFilters?: () => void }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [q, setQ] = useState(params.get("q") ?? "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(params);
    if (q.trim()) next.set("q", q.trim());
    else next.delete("q");
    next.delete("page");
    navigate({ search: next.toString() });
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search brand, model, city..."
          className="h-11 pl-10"
        />
      </div>
      <Button type="submit" variant="default" className="h-11 px-6">Search</Button>
      {onToggleFilters && (
        <Button type="button" variant="outline" className="h-11 lg:hidden" onClick={onToggleFilters}>
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      )}
    </form>
  );
}
