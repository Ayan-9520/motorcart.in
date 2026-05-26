import { Link } from "react-router-dom";
import { Bot, ChevronRight, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { greetingForDealer } from "../data/mock-ncd-data";
import type { NcdAiInsight, NcdShowroom } from "../types";

type NewCarDealerHeroProps = {
  userName: string;
  showroom: NcdShowroom;
  hotLeadsCount: number;
  topInsight?: NcdAiInsight;
};

export function NewCarDealerHero({ userName, showroom, hotLeadsCount, topInsight }: NewCarDealerHeroProps) {
  const pct = Math.round((showroom.monthlyAchieved / showroom.monthlyTarget) * 100);

  return (
    <section className="ncd-hero">
      <div className="ncd-hero__glow" aria-hidden />
      <div className="ncd-hero__grid">
        <div>
          <p className="ncd-hero__brand">{showroom.brand} · {showroom.city}</p>
          <h1 className="ncd-hero__title">{greetingForDealer(userName)}</h1>
          <p className="ncd-hero__alert">
            <span className="ncd-hero__alert-dot" />
            <strong>{hotLeadsCount} hot leads</strong> waiting for follow-up today.
          </p>
          {topInsight ? (
            <p className="ncd-hero__ai text-sm text-slate-300">
              <Bot className="inline h-4 w-4 text-emerald-400" /> {topInsight.title} — {topInsight.summary}
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button className="rounded-xl bg-emerald-500 hover:bg-emerald-600" asChild>
              <Link to="/dashboard/new-car/leads">
                Lead CRM <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="rounded-xl border-slate-600 bg-slate-800/50 text-slate-100" asChild>
              <Link to="/dashboard/new-car/ai">AI assistant</Link>
            </Button>
          </div>
        </div>
        <div className="ncd-hero__target-card">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <Target className="h-4 w-4 text-emerald-400" />
            Monthly target
          </div>
          <p className="mt-2 text-3xl font-bold tabular-nums text-white">
            {showroom.monthlyAchieved}
            <span className="text-lg text-slate-400"> / {showroom.monthlyTarget} units</span>
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 text-xs text-slate-400">{pct}% achieved · {showroom.status} showroom</p>
          <p className="mt-3 text-sm font-medium text-slate-200">{showroom.name}</p>
        </div>
      </div>
    </section>
  );
}
