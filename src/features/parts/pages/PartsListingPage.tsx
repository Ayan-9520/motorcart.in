import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { setPageMeta } from "@/utils/seo";
import { usePartsList } from "../hooks/usePartsList";
import { PartCategoryNav } from "../components/PartCategoryNav";
import { PartCard } from "../components/PartCard";
import { PartsAiRecommendations } from "../components/PartsAiRecommendations";
import { recommendParts } from "../lib/ai-parts";
import { MOCK_PARTS_CATALOG } from "../data/mock-parts-catalog";
import { parseCategoryParam } from "../lib/part-utils";
import { useAuth } from "@/hooks/useAuth";

export function PartsListingPage() {
  const { category: catParam } = useParams<{ category?: string }>();
  const category = parseCategoryParam(catParam);
  const [q, setQ] = useState("");
  const { user } = useAuth();
  const { parts, loading } = usePartsList(category, q);

  const aiPicks = useMemo(
    () => recommendParts(MOCK_PARTS_CATALOG, { category: category ?? undefined }, 6),
    [category]
  );

  useEffect(() => {
    setPageMeta({
      title: category ? `${category.replace(/-/g, " ")} — Parts` : "Auto Parts Marketplace",
      description: "Genuine OEM & aftermarket parts with dealer wholesale, COD & fast delivery.",
    });
  }, [category]);

  return (
    <div className="wa-pattern min-h-screen">
      <div className="container mx-auto space-y-8 px-4 py-8">
        <header className="space-y-2">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">Premium parts store</p>
          <h1 className="text-3xl font-bold md:text-4xl">Auto Parts Marketplace</h1>
          <p className="max-w-2xl text-muted-foreground">
            Engine, battery, tyres, brakes, accessories & more — bulk ordering, GST invoices & WhatsApp checkout.
          </p>
        </header>

        <PartCategoryNav active={category ?? "all"} />

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by name, brand, vehicle..." className="pl-9" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>

        <PartsAiRecommendations parts={aiPicks} />

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4] rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {parts.map((part, i) => (
              <motion.div key={part.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <PartCard part={part} role={user?.role} />
              </motion.div>
            ))}
          </div>
        )}

        {!loading && parts.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">No products match your search.</p>
        )}
      </div>
    </div>
  );
}
