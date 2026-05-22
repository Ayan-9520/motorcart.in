import { Link } from "react-router-dom";
import { Award, ChevronRight, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { greetingForHour } from "../data/mock-customer-data";
import type { ProfileCheckItem } from "../lib/profile-utils";
import type { AiInsight, CustomerPreferences } from "../types";

type CustomerDashboardHeroProps = {
  displayName: string;
  preferences: CustomerPreferences;
  profileCompletion: number;
  checklist: ProfileCheckItem[];
  topInsight?: AiInsight;
  rewardPoints: number;
  unreadNotifications: number;
};

export function CustomerDashboardHero({
  displayName,
  preferences,
  profileCompletion,
  checklist,
  topInsight,
  rewardPoints,
  unreadNotifications,
}: CustomerDashboardHeroProps) {
  const alertText = topInsight
    ? topInsight.severity === "warning"
      ? topInsight.title
      : topInsight.summary.length > 72
        ? `${topInsight.summary.slice(0, 72)}…`
        : topInsight.summary
    : null;

  return (
    <section className="cos-hero">
      <div className="cos-hero__glow" aria-hidden />
      <div className="cos-hero__grid">
        <div className="cos-hero__main">
          <p className="cos-hero__eyebrow">
            <Sparkles className="inline h-3.5 w-3.5" /> Ownership super app
          </p>
          <h1 className="cos-hero__title">{greetingForHour(displayName)}</h1>
          {alertText ? (
            <p className="cos-hero__alert">
              <Shield className="h-4 w-4 shrink-0 text-amber-600" />
              <span>
                {alertText}
                {topInsight?.actionUrl ? (
                  <>
                    {" "}
                    <Link to={topInsight.actionUrl} className="font-semibold underline underline-offset-2">
                      {topInsight.actionLabel ?? "View"}
                    </Link>
                  </>
                ) : null}
              </span>
            </p>
          ) : (
            <p className="cos-hero__sub">Everything for your vehicles — in one intelligent wallet.</p>
          )}
          <div className="cos-hero__chips">
            <span className="cos-chip">
              <Award className="h-3.5 w-3.5" />
              {rewardPoints.toLocaleString("en-IN")} pts · {preferences.loyaltyTier}
            </span>
            {unreadNotifications > 0 ? (
              <Link to="/dashboard/customer/notifications" className="cos-chip cos-chip--live">
                <span className="cos-live-dot" aria-hidden />
                {unreadNotifications} new alert{unreadNotifications > 1 ? "s" : ""}
              </Link>
            ) : null}
          </div>
          <div className="cos-hero__actions">
            <Button className="rounded-xl shadow-sm" asChild>
              <Link to="/dashboard/customer/garage">
                My Garage <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="rounded-xl border-border/80 bg-background/80" asChild>
              <Link to="/dashboard/customer/insights">AI Insights</Link>
            </Button>
          </div>
        </div>
        <div className="cos-hero__profile-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Profile strength</p>
          <p className="mt-1 text-3xl font-bold tabular-nums">{profileCompletion}%</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="cos-hero__progress-fill h-full rounded-full"
              style={{ width: `${profileCompletion}%` }}
            />
          </div>
          <ul className="mt-4 space-y-2 text-xs">
            {checklist.map((item) => (
              <li key={item.id} className={item.done ? "text-foreground" : "text-muted-foreground"}>
                {item.done ? "✓" : "○"}{" "}
                {item.href && !item.done ? (
                  <Link to={item.href} className="hover:text-primary hover:underline">
                    {item.label}
                  </Link>
                ) : (
                  item.label
                )}
              </li>
            ))}
          </ul>
          <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-primary" asChild>
            <Link to="/dashboard/customer/profile">Complete profile</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
