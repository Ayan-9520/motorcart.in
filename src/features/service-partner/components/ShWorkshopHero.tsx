import { Link } from "react-router-dom";
import { Bot, ChevronRight, ShieldCheck, Star, UserCog, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { greetingForWorkshop } from "../data/mock-sh-data";
import type { ShAiInsight, ShWorkshopProfile } from "../types";

type Props = {
  userName: string;
  profile: ShWorkshopProfile;
  activeVehicles: number;
  topInsight?: ShAiInsight;
};

export function ShWorkshopHero({ userName, profile, activeVehicles, topInsight }: Props) {
  return (
    <section className="sh-hero">
      <div className="sh-hero__glow" aria-hidden />
      <div className="sh-hero__grid">
        <div>
          <div className="flex items-center gap-3">
            <div className="sh-hero__logo">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="sh-hero__brand">{profile.name}</p>
              <p className="text-xs text-muted-foreground">{profile.city}</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.isVerified && (
              <span className="sh-hero__badge">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified workshop
              </span>
            )}
            <span className="sh-hero__chip">
              <Star className="h-3 w-3" /> {profile.rating} rating
            </span>
            <span className="sh-hero__chip">
              <UserCog className="h-3 w-3" /> {profile.techniciansOnline} techs online
            </span>
          </div>
          <h1 className="sh-hero__title">{greetingForWorkshop(userName)}</h1>
          <p className="sh-hero__alert">
            <span className="sh-hero__alert-dot" />
            You have <strong>{activeVehicles} active vehicles</strong> in workshop today.
          </p>
          {topInsight ? (
            <p className="sh-hero__ai text-sm">
              <Bot className="inline h-4 w-4 text-primary" /> {topInsight.title}
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button className="rounded-xl bg-green-600 hover:bg-green-500" asChild>
              <Link to="/dashboard/service/workshop/kanban">
                Workflow board <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="rounded-xl border-primary/30" asChild>
              <Link to="/dashboard/service/ai">AI insights</Link>
            </Button>
          </div>
        </div>
        <div className="sh-hero__stats-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Today</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-center">
            <div>
              <dt className="text-[10px] text-muted-foreground">Active jobs</dt>
              <dd className="text-2xl font-bold text-primary">{profile.activeJobs}</dd>
            </div>
            <div>
              <dt className="text-[10px] text-muted-foreground">CSAT</dt>
              <dd className="text-2xl font-bold">{profile.satisfactionPct}%</dd>
            </div>
            <div>
              <dt className="text-[10px] text-muted-foreground">Branches</dt>
              <dd className="text-lg font-semibold">{profile.branchCount}</dd>
            </div>
            <div>
              <dt className="text-[10px] text-muted-foreground">Rating</dt>
              <dd className="text-lg font-semibold">{profile.rating}★</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
