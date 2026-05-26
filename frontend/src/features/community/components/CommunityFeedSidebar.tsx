import { Link } from "react-router-dom";
import {
  Bell,
  Calendar,
  Flame,
  Hash,
  Medal,
  Radio,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  COMMUNITY_FEATURED_GROUPS,
  COMMUNITY_LEADERBOARD,
  COMMUNITY_LIVE_EVENTS,
  COMMUNITY_TRENDING_TOPICS,
} from "../data/community-premium-data";

type CommunityFeedSidebarProps = {
  trending?: { hashtag: string; count: number }[];
  groups?: { id: string; name: string; slug: string }[];
  notifications?: { id: string; title: string; message: string; link?: string | null; isRead: boolean }[];
  onNotificationClick?: (id: string) => void;
  side: "left" | "right";
};

const HEAT_STYLES = {
  hot: "bg-orange-500/15 text-orange-700 dark:text-orange-300",
  rising: "bg-primary/15 text-primary",
  new: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
} as const;

export function CommunityFeedSidebar({
  trending = [],
  groups = [],
  notifications = [],
  onNotificationClick,
  side,
}: CommunityFeedSidebarProps) {
  if (side === "left") {
    return (
      <aside className="community-premium-aside community-premium-aside-left space-y-4">
        <Card className="community-premium-panel">
          <CardContent className="p-4">
            <div className="community-premium-panel-title">
              <Flame className="h-4 w-4 text-orange-500" />
              Trending now
            </div>
            <ul className="mt-3 space-y-2">
              {COMMUNITY_TRENDING_TOPICS.map((t, i) => (
                <li key={t.tag}>
                  <Link
                    to={`/community?tag=${encodeURIComponent(t.tag)}`}
                    className="community-premium-topic-row group"
                  >
                    <span className="community-premium-topic-rank">{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <span className="font-medium text-foreground group-hover:text-primary">
                        #{t.tag}
                      </span>
                      <span className="block text-[11px] text-muted-foreground">
                        {t.posts.toLocaleString()} posts
                      </span>
                    </div>
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase", HEAT_STYLES[t.heat])}>
                      {t.heat}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="community-premium-panel">
          <CardContent className="p-4">
            <div className="community-premium-panel-title">
              <Users className="h-4 w-4 text-primary" />
              Featured groups
            </div>
            <ul className="mt-3 space-y-2.5">
              {(groups.length > 0 ? groups.slice(0, 4) : COMMUNITY_FEATURED_GROUPS).map((g) => {
                const slug = "slug" in g ? g.slug : (g as { slug: string }).slug;
                const name = g.name;
                const members = "members" in g ? (g as { members: string }).members : undefined;
                const live = "live" in g ? (g as { live: boolean }).live : false;
                return (
                  <li key={slug}>
                    <Link to={`/community/groups/${slug}`} className="community-premium-group-row">
                      <span className="community-premium-group-icon">{name.charAt(0)}</span>
                      <div className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-sm">{name}</span>
                        {members && (
                          <span className="text-[11px] text-muted-foreground">{members} members</span>
                        )}
                      </div>
                      {live && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary">
                          <Radio className="h-3 w-3" />
                          Live
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link to="/community/groups" className="community-premium-panel-link mt-3 inline-block">
              Browse all groups →
            </Link>
          </CardContent>
        </Card>

        {trending.length > 0 && (
          <Card className="community-premium-panel">
            <CardContent className="p-4">
              <div className="community-premium-panel-title">
                <Hash className="h-4 w-4" />
                From your feed
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {trending.map((t) => (
                  <Link key={t.hashtag} to={`/community?tag=${encodeURIComponent(t.hashtag)}`}>
                    <Badge variant="outline" className="cursor-pointer rounded-full hover:bg-primary/10">
                      #{t.hashtag} · {t.count}
                    </Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </aside>
    );
  }

  return (
    <aside className="community-premium-aside community-premium-aside-right space-y-4">
      <Card className="community-premium-panel community-premium-panel-accent">
        <CardContent className="p-4">
          <div className="community-premium-panel-title">
            <Calendar className="h-4 w-4 text-primary" />
            Live & upcoming
          </div>
          <ul className="mt-3 space-y-3">
            {COMMUNITY_LIVE_EVENTS.map((ev) => (
              <li key={ev.id} className="community-premium-event">
                <ev.icon className="h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium leading-snug">{ev.title}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{ev.time}</p>
                  <p className="text-[11px] text-primary">{ev.host}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="community-premium-panel">
        <CardContent className="p-4">
          <div className="community-premium-panel-title">
            <Medal className="h-4 w-4 text-amber-500" />
            Top contributors
          </div>
          <ol className="mt-3 space-y-2">
            {COMMUNITY_LEADERBOARD.map((row) => (
              <li key={row.rank} className="community-premium-leader-row">
                <span className="community-premium-leader-rank">{row.rank}</span>
                <span className="min-w-0 flex-1 truncate font-medium text-sm">{row.name}</span>
                <span className="text-xs font-semibold text-primary">{row.score}</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400">{row.delta}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card className="community-premium-panel">
        <CardContent className="p-4">
          <div className="community-premium-panel-title">
            <Bell className="h-4 w-4" />
            Your alerts
          </div>
          <ul className="mt-3 max-h-48 space-y-2 overflow-y-auto text-xs">
            {notifications.length === 0 && (
              <li className="rounded-lg border border-dashed border-border/80 px-3 py-4 text-center text-muted-foreground">
                Sign in for likes, comments &amp; follow alerts.
              </li>
            )}
            {notifications.map((n) => (
              <li key={n.id}>
                <Link
                  to={n.link ?? "/community"}
                  className={cn(
                    "block rounded-lg border border-border/60 p-2.5 transition-colors hover:bg-muted/50",
                    n.isRead && "opacity-60"
                  )}
                  onClick={() => onNotificationClick?.(n.id)}
                >
                  <span className="font-medium text-foreground">{n.title}</span>
                  <p className="mt-0.5 text-muted-foreground">{n.message}</p>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="community-premium-tip">
        <TrendingUp className="h-4 w-4 text-primary" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          Posts with photos and honest reviews rank higher in Trending. Use #tags for discoverability.
        </p>
      </div>
    </aside>
  );
}
