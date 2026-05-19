import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Hash, Users, TrendingUp, Shield, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { setPageMeta } from "@/utils/seo";
import { useCommunityFeed } from "../hooks/useCommunityFeed";
import { PostCard } from "../components/PostCard";
import { PostComposer } from "../components/PostComposer";
import { flagPost, fetchCommunityNotifications, markNotificationRead } from "../services/community.service";
import toast from "react-hot-toast";

type Tab = "for_you" | "vehicles" | "trending";

export function CommunityFeedPage() {
  const { user, isAuthenticated } = useAuth();
  const [tab, setTab] = useState<Tab>("for_you");
  const feed = useCommunityFeed({ vehicleOnly: tab === "vehicles" });
  const [notifs, setNotifs] = useState<Awaited<ReturnType<typeof fetchCommunityNotifications>>>([]);

  useEffect(() => {
    setPageMeta({
      title: "Community — Motorcart.in",
      description: "Social feed, groups, polls, reels & YouTube — built for Indian auto enthusiasts & dealers.",
    });
  }, []);

  useEffect(() => {
    if (user?.id) void fetchCommunityNotifications(user.id).then(setNotifs);
  }, [user?.id]);

  const displayPosts = useMemo(() => {
    if (tab !== "trending") return feed.posts;
    return [...feed.posts].sort((a, b) => b.likeCount + b.commentCount * 2 - (a.likeCount + a.commentCount * 2));
  }, [feed.posts, tab]);

  const flag = async (postId: string) => {
    if (!user?.id) return toast.error("Sign in to report");
    const reason = window.prompt("Reason for report (helps moderation AI):") ?? "";
    if (!reason.trim()) return;
    await flagPost({ postId, reporterId: user.id, reason, aiSpamScore: undefined });
    toast.success("Report submitted");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card/80 backdrop-blur">
        <div className="container mx-auto px-4 py-10">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-medium text-primary">Motorcart community</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Drive the conversation</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Feeds, auto-matched groups, dealer hubs, influencer studios, polls & embeds — with AI spam scoring and moderation.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant={tab === "for_you" ? "default" : "outline"} size="sm" onClick={() => setTab("for_you")}>
                For you
              </Button>
              <Button variant={tab === "vehicles" ? "default" : "outline"} size="sm" onClick={() => setTab("vehicles")}>
                Vehicle talk
              </Button>
              <Button variant={tab === "trending" ? "default" : "outline"} size="sm" onClick={() => setTab("trending")}>
                <TrendingUp className="mr-1 h-4 w-4" />
                Trending
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/community/groups">
                  <Users className="mr-1 h-4 w-4" />
                  Groups
                </Link>
              </Button>
              {user?.role === "admin" && (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard/admin/community">
                    <Shield className="mr-1 h-4 w-4" />
                    Moderation
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto grid gap-8 px-4 py-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {feed.tag && (
            <Badge variant="secondary" className="text-sm">
              Filter: #{feed.tag}{" "}
              <Link to="/community" className="ml-2 underline">
                clear
              </Link>
            </Badge>
          )}
          {isAuthenticated ? (
            <PostComposer
              disabled={!user}
              onSubmit={async (body, opts) => {
                await feed.createPost(body, opts);
                toast.success("Posted");
              }}
            />
          ) : (
            <Card>
              <CardContent className="p-6 text-sm text-muted-foreground">
                <Link to="/login" className="font-medium text-primary">
                  Sign in
                </Link>{" "}
                to post, like, comment, and follow creators.
              </CardContent>
            </Card>
          )}
          {feed.loading ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <div className="space-y-4">
              {displayPosts.map((p) => (
                <PostCard key={p.id} post={p} onLike={() => void feed.like(p)} onFlag={() => void flag(p.id)} />
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 font-semibold">
                <Bell className="h-4 w-4" />
                Community alerts
              </div>
              <ul className="mt-3 max-h-56 space-y-2 overflow-y-auto text-xs">
                {notifs.length === 0 && <li className="text-muted-foreground">No alerts yet (likes & comments notify here).</li>}
                {notifs.map((n) => (
                  <li key={n.id}>
                    <Link
                      to={n.link ?? "/community"}
                      className={`block rounded-md border p-2 hover:bg-muted/50 ${n.isRead ? "opacity-60" : ""}`}
                      onClick={() => user && void markNotificationRead(n.id, user.id)}
                    >
                      <span className="font-medium">{n.title}</span>
                      <p className="text-muted-foreground">{n.message}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 font-semibold">
                <Hash className="h-4 w-4" />
                Trending hashtags
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {feed.trending.map((t) => (
                  <Link key={t.hashtag} to={`/community?tag=${encodeURIComponent(t.hashtag)}`}>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                      #{t.hashtag} · {t.count}
                    </Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="font-semibold">Auto groups</div>
              <p className="mt-1 text-xs text-muted-foreground">Joined by interest & city — discover curated rooms.</p>
              <ul className="mt-3 space-y-2 text-sm">
                {feed.groups.slice(0, 6).map((g) => (
                  <li key={g.id}>
                    <Link to={`/community/groups/${g.slug}`} className="text-primary hover:underline">
                      {g.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
