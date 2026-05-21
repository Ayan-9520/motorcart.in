import { Link } from "react-router-dom";
import { Bell, Hash, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { CommunityGroup, HashtagTrend } from "../types";

type Props = {
  trending?: HashtagTrend[];
  groups?: CommunityGroup[];
  notifications?: {
    id: string;
    title: string;
    message: string;
    link?: string | null;
    isRead: boolean;
  }[];
  onNotificationClick?: (id: string) => void;
};

export function CommunityFeedRightRail({
  trending = [],
  groups = [],
  notifications = [],
  onNotificationClick,
}: Props) {
  return (
    <aside className="community-feed-rail hidden w-[280px] shrink-0 xl:block">
      <Card className="rounded-2xl border-border/80 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Bell className="h-4 w-4 text-primary" />
            Activity
          </div>
          <ul className="mt-3 max-h-52 space-y-2 overflow-y-auto text-xs">
            {notifications.length === 0 ? (
              <li className="rounded-lg border border-dashed px-3 py-4 text-center text-muted-foreground">
                Likes, comments &amp; follows show here.
              </li>
            ) : (
              notifications.map((n) => (
                <li key={n.id}>
                  <Link
                    to={n.link ?? "/community"}
                    className={cn(
                      "block rounded-lg border border-border/60 p-2.5 hover:bg-muted/50",
                      n.isRead && "opacity-60"
                    )}
                    onClick={() => onNotificationClick?.(n.id)}
                  >
                    <span className="font-medium text-foreground">{n.title}</span>
                    <p className="mt-0.5 text-muted-foreground">{n.message}</p>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </CardContent>
      </Card>

      {trending.length > 0 && (
        <Card className="mt-4 rounded-2xl border-border/80 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Hash className="h-4 w-4" />
              Trending tags
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {trending.slice(0, 12).map((t) => (
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

      {groups.length > 0 && (
        <Card className="mt-4 rounded-2xl border-border/80 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-2 text-sm font-semibold">
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Groups
              </span>
              <Link to="/community/groups" className="text-xs font-medium text-primary hover:underline">
                All
              </Link>
            </div>
            <ul className="mt-3 space-y-2">
              {groups.slice(0, 5).map((g) => (
                <li key={g.id}>
                  <Link
                    to={`/community/groups/${g.slug}`}
                    className="block truncate rounded-lg px-2 py-1.5 text-sm font-medium hover:bg-muted/50"
                  >
                    {g.name}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </aside>
  );
}
