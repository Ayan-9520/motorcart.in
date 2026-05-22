import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, Building2, ChevronRight, Package, ShieldCheck, Target, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { greetingForSupplier } from "../data/mock-ps-data";
import type { PsAiInsight, PsSupplierProfile } from "../types";

type PsSupplierHeroProps = {
  userName: string;
  profile: PsSupplierProfile;
  pendingDispatch: number;
  revenueAchieved: number;
  revenueTarget: number;
  topInsight?: PsAiInsight;
};

export function PsSupplierHero({
  userName,
  profile,
  pendingDispatch,
  revenueAchieved,
  revenueTarget,
  topInsight,
}: PsSupplierHeroProps) {
  const pct = Math.min(100, Math.round((revenueAchieved / revenueTarget) * 100));

  return (
    <motion.section
      className="psp-hero"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="psp-hero__glow" aria-hidden />
      <div className="psp-hero__grid">
        <div>
          <div className="flex items-center gap-3">
            <div className="psp-hero__logo">
              <Package className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="psp-hero__brand">{profile.businessName}</p>
              <p className="text-xs text-muted-foreground">{profile.city}</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.isGstVerified && (
              <span className="psp-hero__badge">
                <ShieldCheck className="h-3.5 w-3.5" /> GST verified
              </span>
            )}
            <span className="psp-hero__chip">
              <Warehouse className="h-3 w-3" /> {profile.warehouseCount} warehouses
            </span>
            <span className="psp-hero__chip">
              <Building2 className="h-3 w-3" /> {profile.activeDealers} active dealers
            </span>
          </div>
          <h1 className="psp-hero__title">{greetingForSupplier(userName)}</h1>
          <p className="psp-hero__alert">
            <span className="psp-hero__alert-dot" />
            <strong>{pendingDispatch} orders</strong> pending dispatch today.
          </p>
          {topInsight ? (
            <p className="psp-hero__ai text-sm">
              <Bot className="inline h-4 w-4 text-green-400" /> {topInsight.title} — {topInsight.summary}
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button className="rounded-xl bg-green-600 shadow-[0_0_24px_hsl(142_76%_45%_/_0.35)] hover:bg-green-500" asChild>
              <Link to="/dashboard/parts/logistics/dispatch">
                Dispatch center <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="rounded-xl border-primary/30" asChild>
              <Link to="/dashboard/parts/ai">AI insights</Link>
            </Button>
          </div>
        </div>
        <div className="psp-hero__target-card">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Target className="h-4 w-4 text-green-400" />
            Revenue progress
          </div>
          <p className="mt-2 text-3xl font-bold tabular-nums text-foreground">
            ₹{(revenueAchieved / 100000).toFixed(1)}L
            <span className="text-lg text-muted-foreground"> / ₹{(revenueTarget / 100000).toFixed(0)}L</span>
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-green-600 to-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{pct}% of monthly target · Order health on track</p>
          <p className="mt-3 text-sm font-medium text-primary">Warehouse ops: Active</p>
        </div>
      </div>
    </motion.section>
  );
}
