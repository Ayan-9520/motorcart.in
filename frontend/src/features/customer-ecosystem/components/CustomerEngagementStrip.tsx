import { Link } from "react-router-dom";
import { Award, ChevronRight, Gift, Heart, Shield, Sparkles, Wrench } from "lucide-react";
import type { EngagementCampaign } from "../types";
import { cn } from "@/lib/utils";

const ICONS = {
  gift: Gift,
  heart: Heart,
  shield: Shield,
  wrench: Wrench,
  sparkles: Sparkles,
  award: Award,
};

type CustomerEngagementStripProps = {
  campaigns: EngagementCampaign[];
};

export function CustomerEngagementStrip({ campaigns }: CustomerEngagementStripProps) {
  if (!campaigns.length) return null;

  return (
    <section className="space-y-3">
      <h2 className="cos-section-title cos-section-title--lg">
        <Sparkles className="h-5 w-5 text-primary" />
        For you
      </h2>
      <div className="cos-engagement-scroll flex gap-3 overflow-x-auto pb-1">
        {campaigns.map((c) => {
          const Icon = ICONS[c.icon ?? "sparkles"] ?? Sparkles;
          return (
            <Link
              key={c.id}
              to={c.ctaUrl}
              className={cn("cos-engagement-card shrink-0", `cos-engagement-card--${c.type}`)}
            >
              <span className="cos-engagement-card__icon">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">{c.title}</span>
                <span className="mt-0.5 block line-clamp-2 text-xs text-muted-foreground">{c.message}</span>
                <span className="mt-2 inline-flex items-center gap-0.5 text-xs font-semibold text-primary">
                  {c.ctaLabel} <ChevronRight className="h-3 w-3" />
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
